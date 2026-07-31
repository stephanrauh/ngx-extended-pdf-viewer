// build-tools/base-library/update-pdfjs-provenance.js
//
// Records which pdf.js the library actually bundles, so that consumers (and their
// security scanners) can tell. We ship a *fork* of pdf.js, so pdfjs-dist can never be
// a normal npm dependency - see https://github.com/stephanrauh/ngx-extended-pdf-viewer/issues/3244.
// This script writes the provenance of the engine that was just built into
// projects/ngx-extended-pdf-viewer/pdfjs-provenance.json, which is published as part
// of the npm package and is the input for generate-sbom.js.
//
// Run it right after the engine build, from the library root:
//   node ./build-tools/base-library/update-pdfjs-provenance.js
//
// The fork's checked-out branch selects the channel, exactly like updateMozillasPdfViewer.js:
// branch `bleeding-edge` -> the bleeding-edge/ bundle, anything else -> the stable assets/ bundle.
//
// Pass `--ref <branch>` to read the git data from another branch of the fork instead of HEAD.
// That backfills the entry for a bundle that is already built without checking that branch out:
//   node ./build-tools/base-library/update-pdfjs-provenance.js --ref 6.1

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const FORK_DIR = path.join('..', 'mypdf.js');
const SECURITY_FIXES_PATH = path.join(__dirname, 'pdfjs-security-fixes.json');
const PROVENANCE_PATH = path.join('projects', 'ngx-extended-pdf-viewer', 'pdfjs-provenance.json');
const NOTICE_PATHS = [path.join('projects', 'ngx-extended-pdf-viewer', 'NOTICE'), 'NOTICE'];

const NOTICE_BEGIN = '--- BEGIN BUNDLED PDF.JS PROVENANCE (generated) ---';
const NOTICE_END = '--- END BUNDLED PDF.JS PROVENANCE (generated) ---';

function git(args) {
  // stderr is piped rather than inherited: several callers probe for commits that may not exist,
  // and git's "fatal: Not a valid commit name" would otherwise drown out our own error message.
  return execSync(`git ${args}`, { cwd: FORK_DIR, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).trim();
}

function gitOrNull(args) {
  try {
    return git(args);
  } catch (e) {
    return null;
  }
}

const refArgIndex = process.argv.indexOf('--ref');
const REF = refArgIndex === -1 ? 'HEAD' : process.argv[refArgIndex + 1];
if (refArgIndex !== -1 && !REF) {
  console.error('Error: --ref needs a branch name');
  process.exit(2);
}

// Which bundle did we just build? Same rule as updateMozillasPdfViewer.js.
function detectChannel() {
  const branch = REF === 'HEAD' ? git('rev-parse --abbrev-ref HEAD') : REF;
  // NGX_ASSETS_FOLDER overrides the branch-derived choice, exactly as it does in
  // updateMozillasPdfViewer.js - the two must agree on the destination or the provenance would
  // describe a bundle that was written somewhere else. A maintenance line needs it: both of its
  // bundles are built from the stable fork branch, so without the override the bleeding-edge
  // entry would never be written and validate-sbom.js would report the bundle as undocumented.
  if (process.env.NGX_ASSETS_FOLDER) {
    const folder = process.env.NGX_ASSETS_FOLDER;
    return { channel: folder === 'bleeding-edge' ? 'bleedingEdge' : 'stable', folder, branch };
  }
  if (branch === 'bleeding-edge') {
    return { channel: 'bleedingEdge', folder: 'bleeding-edge', branch };
  }
  if (branch === 'HEAD') {
    const tag = gitOrNull(`describe --tags --exact-match ${REF}`);
    if (tag && tag.includes('bleeding-edge')) {
      return { channel: 'bleedingEdge', folder: 'bleeding-edge', branch: tag };
    }
  }
  return { channel: 'stable', folder: 'assets', branch };
}

// The version stamped into the bundled file names, e.g. 6.1.1155. It is the fork's own
// build number (versionPrefix + commit count), not a version Mozilla ever published.
function readBuildVersion(folder) {
  const dir = path.join('projects', 'ngx-extended-pdf-viewer', folder);
  const worker = fs.readdirSync(dir).find((f) => /^pdf\.worker-[\d.]+\.mjs$/.test(f));
  if (!worker) {
    console.error(`Error: no pdf.worker-<version>.mjs in ${dir} - build the engine first`);
    process.exit(86);
  }
  return worker.replace(/^pdf\.worker-/, '').replace(/\.mjs$/, '');
}

// The last upstream release merged into this branch. Mozilla's tags travel with the merges,
// so `git describe` on the fork points at the pdf.js release the bundle is derived from.
function readUpstreamRelease() {
  const tag = gitOrNull(`describe --tags --match 'v*' --abbrev=0 ${REF}`);
  if (!tag) {
    console.error('Error: cannot determine the upstream pdf.js release - no v* tag reachable from HEAD');
    process.exit(87);
  }
  const commit = git(`rev-parse ${tag}^{commit}`);
  return { tag, release: tag.replace(/^v/, ''), commit, committedAt: git(`show -s --format=%cI ${commit}`) };
}

// Is an upstream commit part of this branch - either because we merged the release that contains
// it, or because we cherry-picked it ahead of that merge? `git cherry-pick -x` writes a
// "(cherry picked from commit <sha>)" trailer, which is what makes the second case detectable.
function isCommitApplied(sha, ref) {
  try {
    git(`merge-base --is-ancestor ${sha} ${ref}`);
    return { applied: true, via: 'merge' };
  } catch (e) {
    // not an ancestor - fall through to the cherry-pick check
  }
  const picked = gitOrNull(`log ${ref} --grep=${sha} --fixed-strings --format=%H --max-count=1`);
  return picked ? { applied: true, via: 'cherry-pick', commit: picked } : { applied: false };
}

// Which of the advisories we track are fixed in the engine built from this ref? An advisory only
// counts as fixed when EVERY commit that makes it up is present - a partially applied fix is
// worse than none, because it would be reported as safe.
function detectSecurityFixes(ref) {
  if (!fs.existsSync(SECURITY_FIXES_PATH)) {
    return [];
  }
  const { advisories = [] } = JSON.parse(fs.readFileSync(SECURITY_FIXES_PATH, 'utf8'));
  const applied = [];
  for (const advisory of advisories) {
    const results = advisory.upstreamCommits.map((sha) => ({ sha, ...isCommitApplied(sha, ref) }));
    const missing = results.filter((r) => !r.applied);
    if (missing.length === advisory.upstreamCommits.length) {
      continue; // none of it is here - the engine is simply the unpatched upstream version
    }
    if (missing.length > 0) {
      console.error(`Error 93: ${advisory.cve} is only partially applied to ${ref}.`);
      console.error(`         missing: ${missing.map((m) => m.sha.slice(0, 10)).join(', ')}`);
      console.error('         Apply the remaining commits, or the SBOM would misreport this engine as fixed.');
      process.exit(93);
    }
    applied.push({
      id: advisory.id,
      cve: advisory.cve,
      url: advisory.url,
      summary: advisory.summary,
      fixedUpstreamIn: advisory.fixedUpstreamIn,
      appliedVia: results.every((r) => r.via === 'merge') ? 'merge' : 'cherry-pick',
      upstreamCommits: results.map((r) => ({ upstream: r.sha, inFork: r.commit || r.sha, via: r.via })),
      detail: advisory.detail,
    });
  }
  return applied;
}

function updateNotice(provenance) {
  const lines = [NOTICE_BEGIN, ''];
  for (const entry of Object.values(provenance.channels)) {
    lines.push(`  ${entry.bundle}/`);
    lines.push(`    based on Mozilla pdf.js ${entry.upstream.release} (${entry.upstream.tag}, commit ${entry.upstream.commit})`);
    lines.push(`    built from ${entry.fork.repository} branch ${entry.fork.branch}, commit ${entry.fork.commit}`);
    lines.push(`    bundled build version: ${entry.pdfjsBuildVersion} (fork build number, not an upstream release)`);
    for (const fix of entry.securityFixes || []) {
      lines.push(`    security fix applied ahead of upstream: ${fix.cve} (${fix.appliedVia},`);
      lines.push(`      fixed upstream in pdf.js ${fix.fixedUpstreamIn}) - ${fix.url}`);
    }
    lines.push('');
  }
  lines.push('  A machine-readable form of the above is published as pdfjs-provenance.json,');
  lines.push('  sbom.json (CycloneDX, incl. pedigree) and vex.json (CycloneDX VEX) inside this');
  lines.push('  package.');
  lines.push('');
  lines.push(NOTICE_END);
  const block = lines.join('\n');

  for (const noticePath of NOTICE_PATHS) {
    if (!fs.existsSync(noticePath)) {
      continue;
    }
    const notice = fs.readFileSync(noticePath, 'utf8');
    const begin = notice.indexOf(NOTICE_BEGIN);
    const end = notice.indexOf(NOTICE_END);
    let updated;
    if (begin !== -1 && end !== -1) {
      updated = notice.slice(0, begin) + block + notice.slice(end + NOTICE_END.length);
    } else {
      // First run: put the block right after the paragraph that mentions the fork.
      const anchor = 'customizations and enhancements for Angular integration.';
      const at = notice.indexOf(anchor);
      if (at === -1) {
        console.warn(`⚠️  ${noticePath}: anchor paragraph not found, appending the provenance block`);
        updated = `${notice.trimEnd()}\n\n${block}\n`;
      } else {
        const cut = at + anchor.length;
        updated = `${notice.slice(0, cut)}\n\n${block}${notice.slice(cut)}`;
      }
    }
    fs.writeFileSync(noticePath, updated);
    console.log(`✓ ${noticePath} updated`);
  }
}

const { channel, folder, branch } = detectChannel();
const upstream = readUpstreamRelease();
const entry = {
  bundle: folder,
  pdfjsBuildVersion: readBuildVersion(folder),
  upstream: {
    project: 'mozilla/pdf.js',
    repository: 'https://github.com/mozilla/pdf.js',
    release: upstream.release,
    tag: upstream.tag,
    commit: upstream.commit,
    committedAt: upstream.committedAt,
  },
  fork: {
    repository: 'https://github.com/stephanrauh/pdf.js',
    branch,
    commit: git(`rev-parse ${REF}^{commit}`),
    committedAt: git(`show -s --format=%cI ${REF}^{commit}`),
  },
  // pdf.js advisories whose upstream fix is in this engine even though its version number still
  // says otherwise - the reason the SBOM can claim more than the bare version implies.
  securityFixes: detectSecurityFixes(REF),
};

let provenance = { channels: {} };
if (fs.existsSync(PROVENANCE_PATH)) {
  provenance = JSON.parse(fs.readFileSync(PROVENANCE_PATH, 'utf8'));
  provenance.channels = provenance.channels || {};
}
provenance = {
  $comment:
    'ngx-extended-pdf-viewer bundles a fork of Mozilla pdf.js, so pdfjs-dist cannot appear in package.json. ' +
    'This file records which pdf.js each bundle is derived from. Generated by build-tools/base-library/update-pdfjs-provenance.js.',
  generatedBy: 'build-tools/base-library/update-pdfjs-provenance.js',
  channels: { ...provenance.channels, [channel]: entry },
};

fs.writeFileSync(PROVENANCE_PATH, `${JSON.stringify(provenance, null, 2)}\n`);
console.log(`✓ ${PROVENANCE_PATH} updated (${channel}: pdf.js ${entry.upstream.release}, build ${entry.pdfjsBuildVersion})`);

updateNotice(provenance);
