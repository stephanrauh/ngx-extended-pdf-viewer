#!/usr/bin/env node
// build-tools/hotfix/00-inspect-27.js
//
// READ-ONLY reconnaissance for "backport the CVE-2026-16633 fix to the 27 line and give it an SBOM".
//
// It writes nothing, checks nothing out and creates no branches. Every command it runs is a query.
// Run it, read the report, and only then decide whether the backport is worth doing.
//
//   node build-tools/hotfix/00-inspect-27.js            (defaults to 27.0.0)
//   node build-tools/hotfix/00-inspect-27.js 27.0.1
//
// It answers the four questions the plan is blocked on:
//
//   1. Is the 27 line even affected? The CVE needs pdf.js >= 5.6.83; below that there is nothing
//      to fix and the whole job collapses to "no action".
//   2. Which fork commit does 27.0.0 bundle, and is the fix already in it?
//   3. How big is the conflict surface? Which files the upstream fix touches, and whether those
//      files even exist at the 27 commit (they moved between the 5.x and 6.x layouts).
//   4. What does the 27 tag lack compared to main - the SBOM toolchain is 29.0.0-era, so
//      "add the SBOM" means porting files back, not regenerating one.
//
// Plus the one thing that can go wrong at publish time: which version currently owns npm's
// `latest` dist-tag, because a naive publish of 27.0.1 would take it over.

const { execSync, spawnSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const LIB_DIR = path.join(__dirname, '..', '..');
const FORK_DIR = path.join(LIB_DIR, '..', 'mypdf.js');
const PROVENANCE = path.join(LIB_DIR, 'projects', 'ngx-extended-pdf-viewer', 'pdfjs-provenance.json');

// The CVE was introduced upstream in this release - anything older is not affected.
const FIRST_AFFECTED_PDFJS = '5.6.83';

const VERSION = process.argv[2] || '27.0.0';

function git(cwd, args) {
  try {
    return execSync(`git ${args}`, { cwd, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).trim();
  } catch {
    return null;
  }
}

// "6.0.1167" -> [6, 0, 1167], so the comparison is numeric rather than lexicographic
// ("5.6.83" < "5.6.9" would be wrong as a string compare).
const parts = (v) => String(v).split(/[.-]/).map((n) => (/^\d+$/.test(n) ? Number(n) : 0));
function isAtLeast(version, floor) {
  const a = parts(version);
  const b = parts(floor);
  for (let i = 0; i < Math.max(a.length, b.length); i++) {
    if ((a[i] || 0) !== (b[i] || 0)) {
      return (a[i] || 0) > (b[i] || 0);
    }
  }
  return true;
}

const heading = (text) => console.log(`\n${'='.repeat(78)}\n${text}\n${'='.repeat(78)}`);

// ---------------------------------------------------------------- 0. sanity

heading(`Reconnaissance for ngx-extended-pdf-viewer ${VERSION}`);

if (!fs.existsSync(FORK_DIR)) {
  console.error(`the fork is not at ${FORK_DIR} - nothing here will work`);
  process.exit(94);
}
if (!git(LIB_DIR, `rev-parse --verify --quiet ${VERSION}^{commit}`)) {
  console.error(`the library has no tag ${VERSION}. Try "git fetch --tags".`);
  process.exit(94);
}
console.log(`library tag      ${VERSION} -> ${git(LIB_DIR, `rev-parse --short ${VERSION}`)} (${git(LIB_DIR, `show -s --format=%ad --date=short ${VERSION}`)})`);
console.log(`fork is on       ${git(FORK_DIR, 'rev-parse --abbrev-ref HEAD')}  (this script does not touch it)`);

// ---------------------------------------------------------------- 1. which engine, and is it affected?

heading('1. Which pdf.js does the 27 line bundle, and is it affected?');

// --from-npm because the constants committed at a tag can be stale; the tarball cannot lie about
// which pdf.worker file it contains. This is the only step that needs the network.
const lookup = spawnSync(process.execPath, [path.join(LIB_DIR, 'build-tools', 'release', 'find-fork-commit.js'), VERSION, '--from-npm', '--json'], {
  cwd: LIB_DIR,
  encoding: 'utf8',
  stdio: ['ignore', 'pipe', 'pipe'],
});

let found = null;
try {
  found = JSON.parse(lookup.stdout);
} catch {
  console.log('find-fork-commit.js produced no usable answer:');
  console.log((lookup.stdout || '') + (lookup.stderr || ''));
}

if (found) {
  console.log(`engine recorded by: ${found.recordedBy}`);
  for (const w of found.warnings || []) {
    console.log(`  warning: ${w}`);
  }
  for (const [channel, r] of Object.entries(found.channels)) {
    const engine = r.expectedEngine || '(unknown)';
    const affected = r.expectedEngine ? (isAtLeast(engine, FIRST_AFFECTED_PDFJS) ? `AFFECTED (>= ${FIRST_AFFECTED_PDFJS})` : `not affected (< ${FIRST_AFFECTED_PDFJS})`) : '(cannot tell)';
    console.log(`\n  ${channel}`);
    console.log(`    engine   ${engine}   ${affected}`);
    console.log(`    commit   ${r.commit || 'NOT FOUND'}${r.date ? `  (${r.date})` : ''}`);
    if (r.subject) {
      console.log(`    subject  ${r.subject}`);
      console.log(`    found by ${r.how}`);
      console.log(`    on       ${r.branches?.length ? r.branches.join(', ') : '(no branch contains it - reachable only through the tag)'}`);
    }
  }
}

// ---------------------------------------------------------------- 2. is the fix already there, and what does it touch?

heading('2. The fix commits: already present? how big is the conflict surface?');

const provenance = JSON.parse(fs.readFileSync(PROVENANCE, 'utf8'));
const fix = (provenance.channels?.stable?.securityFixes || []).find((f) => f.cve === 'CVE-2026-16633');

if (!fix) {
  console.log('main\'s pdfjs-provenance.json has no CVE-2026-16633 entry - nothing to backport from.');
} else {
  console.log(`${fix.cve} / ${fix.id}, fixed upstream in ${fix.fixedUpstreamIn}, applied here via ${fix.appliedVia}`);

  for (const [channel, r] of Object.entries(found?.channels || {})) {
    if (!r.commit) {
      continue;
    }
    console.log(`\n  against the ${channel} commit of ${VERSION} (${r.commit.slice(0, 12)}):`);
    for (const c of fix.upstreamCommits) {
      // --is-ancestor exits 0 when it is already contained. If it is, the backport for that
      // channel is a no-op and we would only be adding an SBOM.
      const already = spawnSync('git', ['merge-base', '--is-ancestor', c.inFork, r.commit], { cwd: FORK_DIR, stdio: 'ignore' }).status === 0;
      const subject = git(FORK_DIR, `show -s --format=%s ${c.inFork}`) || '(commit not found in the fork)';
      console.log(`    ${c.inFork.slice(0, 12)}  ${already ? 'ALREADY APPLIED' : 'missing - must be cherry-picked'}   ${subject}`);

      // The files the fix touches, and whether they still exist at the 27 commit. A file that is
      // missing means the code moved between the two versions and the cherry-pick will conflict.
      const files = (git(FORK_DIR, `show --name-only --format= ${c.inFork}`) || '').split('\n').filter(Boolean);
      for (const f of files) {
        const exists = git(FORK_DIR, `cat-file -e ${r.commit}:${f} && echo ok`) !== null;
        console.log(`        ${exists ? '     ' : ' !!  '}${f}${exists ? '' : '   <- does not exist at the 27 commit'}`);
      }
    }
  }
}

// ---------------------------------------------------------------- 3. what does the 27 tag lack?

heading('3. What the 27 tag is missing compared to main (the SBOM half of the job)');

// Everything the SBOM pipeline needs. Anything reported missing has to be cherry-picked or
// hand-written onto the maintenance branch before "npm run build:sbom" can work there.
const NEEDED = [
  'build-tools/generate-sbom.js',
  'build-tools/validate-sbom.js',
  'build-tools/test-sbom.js',
  'build-tools/schema/bom-1.6.schema.json',
  'build-tools/schema/spdx.schema.json',
  'build-tools/schema/jsf-0.82.schema.json',
  'build-tools/release/release-config.json',
  'build-tools/release/find-fork-commit.js',
  'build-tools/MAINTENANCE-RELEASE.md',
  'projects/ngx-extended-pdf-viewer/pdfjs-provenance.json',
  'build-tools/base-library/pdfjs-security-fixes.json',
  'SECURITY.md',
];

for (const file of NEEDED) {
  const present = git(LIB_DIR, `cat-file -e ${VERSION}:${file} && echo ok`) !== null;
  console.log(`  ${present ? 'present' : 'MISSING'}  ${file}`);
}

// The scripts are only useful if package.json can invoke them and ajv is installed.
const pkg = JSON.parse(git(LIB_DIR, `show ${VERSION}:package.json`) || '{}');
const scripts = Object.keys(pkg.scripts || {}).filter((s) => /sbom/i.test(s));
console.log(`\n  sbom-related npm scripts at ${VERSION}: ${scripts.length ? scripts.join(', ') : 'none'}`);
console.log(`  ajv devDependency:  ${pkg.devDependencies?.ajv || 'absent'}       ajv-formats: ${pkg.devDependencies?.['ajv-formats'] || 'absent'}`);
console.log(`  Angular at ${VERSION}:   ${pkg.devDependencies?.['@angular/core'] || '(unknown)'}   node engine: ${pkg.engines?.node || '(unspecified)'}`);

// ---------------------------------------------------------------- 4. the publish hazard

heading('4. Publish hazard: who owns npm\'s dist-tags right now?');

try {
  const tags = execSync('npm view ngx-extended-pdf-viewer dist-tags --json', { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] });
  console.log(tags.trim());
  console.log('\n  A 27.x publish MUST NOT take over `latest`. release-config.json on the maintenance');
  console.log('  branch needs npmDistTag set (e.g. "v27-lts") - see build-tools/MAINTENANCE-RELEASE.md.');
} catch {
  console.log('  could not reach the npm registry - check dist-tags manually before publishing.');
}

console.log('\nDone. Nothing was modified.\n');
