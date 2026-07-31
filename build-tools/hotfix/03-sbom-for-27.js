#!/usr/bin/env node
// build-tools/hotfix/03-sbom-for-27.js
//
// Step 3 of the CVE-2026-16633 backport: produce sbom.json, vex.json and pdfjs-provenance.json for
// the 27 line - without backporting any of the SBOM toolchain onto a branch that predates it.
//
//   node build-tools/hotfix/03-sbom-for-27.js [--version 27.0.1]
//
// How: generate-sbom.js already honours NGX_SBOM_LIB_DIR (that is how test-sbom.js drives it
// against a fixture), so this assembles a staging directory that looks like the 27 library package
// and points main's generator at it. The documents therefore come out of the same tested generator
// that ships on main, and the 27 branch needs no ajv, no schemas and no new npm scripts.
//
// Everything it writes goes to build-tools/hotfix/out-27/. It does not touch the 27.0.x branch, the
// fork, or anything on main - copying the results onto the branch is a separate, deliberate step,
// and the commands for it are printed at the end.
//
// The facts in the provenance are derived from git, never assumed:
//   - the engine version is recomputed the way gulp does it, so it reflects the *patched* engine
//     (two cherry-picks past 27.0.0, so 5.6.1113 -> 5.6.1115 and 5.6.1112 -> 5.6.1114)
//   - the upstream release comes from `git describe --tags --match v*` on the 27 branch
//   - the fix commit ids are the *cherry-picked* commits on the 27 branches, not the originals on
//     main, because those are the commits that are actually in this engine

const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const LIB_DIR = path.join(__dirname, '..', '..');
const FORK_DIR = path.join(LIB_DIR, '..', 'mypdf.js');
const MAIN_PROVENANCE = path.join(LIB_DIR, 'projects', 'ngx-extended-pdf-viewer', 'pdfjs-provenance.json');
const STAGE = path.join(__dirname, 'out-27');

const LIB_BRANCH = '27.0.x';
const CVE = 'CVE-2026-16633';

// Same channels as 01-prepare-27.js. `bundle` is the folder inside the published package, and the
// key ("stable" / "bleedingEdge") is the channel name the SBOM and VEX use - it must match the
// spelling main's provenance uses, because validate-sbom.js keys off it.
const CHANNELS = {
  stable: { forkBranch: 'ngx-27.0.x', bundle: 'assets' },
  bleedingEdge: { forkBranch: 'ngx-27.0.x-bleeding-edge', bundle: 'bleeding-edge' },
};

const argv = process.argv.slice(2);
const versionFlag = argv.indexOf('--version');
const LIB_VERSION = versionFlag >= 0 ? argv[versionFlag + 1] : '27.0.1';

function git(cwd, args) {
  const r = spawnSync('git', args, { cwd, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] });
  return r.status === 0 ? (r.stdout || '').trim() : null;
}

const fatal = (message) => {
  console.error(`\n✗ ${message}\n`);
  process.exit(1);
};

console.log(`\nBuilding SBOM documents for ngx-extended-pdf-viewer ${LIB_VERSION} (the 27 line)\n`);

// ---------------------------------------------------------------- gather the facts

// The security-fix description is reused verbatim from main - same CVE, same upstream fix, same
// wording - so the two release lines describe the issue identically. Only the commit ids differ.
const mainProvenance = JSON.parse(fs.readFileSync(MAIN_PROVENANCE, 'utf8'));
const mainFix = (mainProvenance.channels?.stable?.securityFixes || []).find((f) => f.cve === CVE);
if (!mainFix) {
  fatal(`main's pdfjs-provenance.json has no ${CVE} entry`);
}

const channels = {};

for (const [name, channel] of Object.entries(CHANNELS)) {
  const head = git(FORK_DIR, ['rev-parse', channel.forkBranch]);
  if (!head) {
    fatal(`the fork has no branch ${channel.forkBranch} - run 01-prepare-27.js first`);
  }

  // Engine version, recomputed exactly as gulpfile.mjs does: versionPrefix + commits since
  // baseVersion, both read from the branch itself. This is the *patched* number.
  const config = JSON.parse(git(FORK_DIR, ['show', `${channel.forkBranch}:pdfjs.config`]));
  const build = config.versionPrefix + git(FORK_DIR, ['rev-list', '--count', `${config.baseVersion}..${head}`]);

  // The upstream release this engine derives from - the value the purl and CPE are built from, so
  // it is resolved from the tag graph rather than guessed from a branch name.
  const describe = git(FORK_DIR, ['describe', '--tags', '--abbrev=0', '--match', 'v*', channel.forkBranch]);
  if (!describe) {
    fatal(`cannot determine the upstream release behind ${channel.forkBranch}`);
  }
  const release = describe.replace(/^v/, '');
  const upstreamCommit = git(FORK_DIR, ['rev-parse', `${describe}^{commit}`]);

  // Remap each fix to the commit that actually carries it on THIS branch. -x wrote a "cherry picked
  // from commit <sha>" trailer, which is the only reliable link back to the original.
  const upstreamCommits = mainFix.upstreamCommits.map((c) => {
    const picked = git(FORK_DIR, ['log', `${channel.forkBranch}`, '--grep', `cherry picked from commit ${c.inFork}`, '--format=%H', '--max-count=1']);
    if (!picked) {
      fatal(`${channel.forkBranch} does not contain a cherry-pick of ${c.inFork} - re-run 01-prepare-27.js`);
    }
    return { upstream: c.upstream, inFork: picked, via: 'cherry-pick' };
  });

  channels[name] = {
    bundle: channel.bundle,
    pdfjsBuildVersion: build,
    upstream: {
      project: 'mozilla/pdf.js',
      repository: 'https://github.com/mozilla/pdf.js',
      release,
      tag: describe,
      commit: upstreamCommit,
      committedAt: git(FORK_DIR, ['show', '-s', '--format=%cI', upstreamCommit]),
    },
    fork: {
      repository: 'https://github.com/stephanrauh/pdf.js',
      branch: channel.forkBranch,
      commit: head,
      committedAt: git(FORK_DIR, ['show', '-s', '--format=%cI', head]),
    },
    securityFixes: [{ ...mainFix, upstreamCommits }],
  };

  console.log(`  ${name.padEnd(13)} engine ${build}  from upstream ${describe}  fork ${head.slice(0, 12)}`);
}

// ---------------------------------------------------------------- assemble the staging directory

fs.rmSync(STAGE, { recursive: true, force: true });
fs.mkdirSync(STAGE, { recursive: true });

// The package metadata the generator stamps into the SBOM has to be the 27 package's own, so it is
// read from the 27.0.x branch rather than from main (where name/homepage/author could have changed).
const pkgSource = git(LIB_DIR, ['show', `${LIB_BRANCH}:projects/ngx-extended-pdf-viewer/package.json`]);
if (!pkgSource) {
  fatal(`cannot read projects/ngx-extended-pdf-viewer/package.json from branch ${LIB_BRANCH} - run 01-prepare-27.js first`);
}
const pkg = JSON.parse(pkgSource);
// The SBOM must describe the version being published, and validate-sbom.js enforces that they
// agree. The 27 branch has no release script to bump it, so it is set explicitly here.
pkg.version = LIB_VERSION;
fs.writeFileSync(path.join(STAGE, 'package.json'), `${JSON.stringify(pkg, null, 2)}\n`);

fs.writeFileSync(path.join(STAGE, 'pdfjs-provenance.json'), `${JSON.stringify({ channels }, null, 2)}\n`);

// Placeholder worker files. The generator only checks that a file with the expected name exists -
// it never reads it - and the name here is the one the real build will produce, computed above from
// the branch. This makes the staging run self-consistent; it does NOT prove the real bundles match.
// That is what step 4 is for: re-run validate-sbom.js against the actual assets/ after build:base.
for (const [name, entry] of Object.entries(channels)) {
  const dir = path.join(STAGE, entry.bundle);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, `pdf.worker-${entry.pdfjsBuildVersion}.mjs`), `// placeholder for ${name}, see 03-sbom-for-27.js\n`);
}

// ---------------------------------------------------------------- generate

// STRICT because there is no excuse for a mismatch here: this directory was just assembled from the
// very numbers the generator is about to check.
const result = spawnSync(process.execPath, [path.join(LIB_DIR, 'build-tools', 'generate-sbom.js')], {
  cwd: LIB_DIR,
  env: { ...process.env, NGX_SBOM_LIB_DIR: STAGE, NGX_SBOM_STRICT: '1' },
  encoding: 'utf8',
  stdio: ['ignore', 'pipe', 'pipe'],
});
console.log(`\n${(result.stdout || '').trim()}`);
if (result.status !== 0) {
  console.error((result.stderr || '').trim());
  fatal('generate-sbom.js failed - the documents above are not usable');
}

// The placeholders exist only to satisfy the existence check; leaving them behind would invite
// someone to mistake out-27/ for a real package.
for (const entry of Object.values(channels)) {
  fs.rmSync(path.join(STAGE, entry.bundle), { recursive: true, force: true });
}
fs.rmSync(path.join(STAGE, 'package.json'), { force: true });

console.log(`
Written to build-tools/hotfix/out-27/:
    sbom.json
    vex.json
    pdfjs-provenance.json

Nothing else was touched. To put them on the 27 branch:

    git checkout ${LIB_BRANCH}
    cp build-tools/hotfix/out-27/*.json projects/ngx-extended-pdf-viewer/
    # add sbom.json, vex.json and pdfjs-provenance.json to the package's "files" list
    git add projects/ngx-extended-pdf-viewer && git commit

Then step 4 - prove the documents describe the engine that will actually ship:

    # with the fork on ngx-27.0.x, then again on ngx-27.0.x-bleeding-edge
    npm run build:base
    NGX_SBOM_LIB_DIR=projects/ngx-extended-pdf-viewer NGX_SBOM_STRICT=1 node build-tools/validate-sbom.js

  That last command is the real check. The staging run above only proves the documents are
  internally consistent - it cannot prove they match bundles that have not been built yet.
`);
