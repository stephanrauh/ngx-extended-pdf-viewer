#!/usr/bin/env node
// build-tools/release/find-fork-commit.js
//
// Answers the question "which commit of the mypdf.js fork was version X.Y.Z of the library built
// from?" - for both the stable bundle (assets/) and the bleeding-edge bundle (bleeding-edge/).
//
// Needed whenever an old release has to be reproduced or patched: the release scripts and the CI
// workflow build from a *branch tip*, so simply checking out `6.0` or `bleeding-edge` today gives
// you a different engine than the one that shipped back then.
//
// Three independent ways to find the commit, tried in order, and the answer is always verified by
// recomputing the engine version from the commit itself:
//
//   1. the fork tag  ngx-extended-pdf-viewer-<version>[-bleeding-edge]  (present for most releases)
//   2. the commit "bumped the version number to <version>" that 5-1-prepare-release.js writes
//   3. a binary search over the branch history for the commit whose build number matches
//
// Usage:
//   node build-tools/release/find-fork-commit.js 28.0.4
//   node build-tools/release/find-fork-commit.js 28.0.4 --json
//   node build-tools/release/find-fork-commit.js 28.0.4 --branches bleeding-edge,6.0,6.1
//   node build-tools/release/find-fork-commit.js 28.1.1 --from-npm     (trust the tarball, not git)
//   node build-tools/release/find-fork-commit.js --engine 6.0.1168     (skip the library lookup)
//
// Exit codes: 0 = both channels resolved and verified, 94 = at least one channel unresolved or
// resolved to a commit whose build number disagrees with what the library recorded.

const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const LIB_DIR = path.join(__dirname, '..', '..');
const FORK_DIR = path.join(LIB_DIR, '..', 'mypdf.js');
const OPTIONS_FILE = 'projects/ngx-extended-pdf-viewer/src/lib/options/pdf-default-options.ts';

function git(cwd, args) {
  return execSync(`git ${args}`, { cwd, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).trim();
}

// Several lookups probe for refs that may not exist; git's "fatal: ..." on stderr would otherwise
// drown out our own diagnostics.
function gitOrNull(cwd, args) {
  try {
    return git(cwd, args);
  } catch {
    return null;
  }
}

// ---------------------------------------------------------------------------
// Step 1: which engine versions did this library release record?
// ---------------------------------------------------------------------------

// 5-1-prepare-release.js rebuilds both bundles and commits the regenerated pdf-default-options.ts
// *before* it tags, so the file at the library tag is an authoritative record of what shipped.
function readEngineVersionsFromLibraryTag(version) {
  const source = gitOrNull(FORK_DIR === null ? LIB_DIR : LIB_DIR, `show ${version}:${OPTIONS_FILE}`);
  if (!source) {
    return null;
  }
  const stable = source.match(/pdfjsVersion\s*=\s*'([^']+)'/);
  const bleedingEdge = source.match(/pdfjsBleedingEdgeVersion\s*=\s*'([^']+)'/);
  if (!stable) {
    return null;
  }
  return {
    stable: stable[1],
    // Very old releases shipped a single bundle and had no bleeding-edge constant.
    'bleeding-edge': bleedingEdge ? bleedingEdge[1] : stable[1],
  };
}

// The tarball on npm is the only unarguable record of what shipped: the bundle file names carry
// the engine version. Worth preferring whenever the release was not produced by a clean run of
// 5-1-prepare-release.js - 28.1.1 for instance shipped 6.0.1174 in *both* bundles, while the
// pdf-default-options.ts committed at that tag still claims 6.0.1172 for bleeding-edge.
function readEngineVersionsFromNpm(version) {
  const tmp = fs.mkdtempSync(path.join(require('os').tmpdir(), 'ngx-fork-lookup-'));
  try {
    const tarball = execSync(`npm view ngx-extended-pdf-viewer@${version} dist.tarball`, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).trim();
    execSync(`curl -sSfL ${tarball} -o package.tgz`, { cwd: tmp, stdio: ['ignore', 'pipe', 'pipe'] });
    const listing = execSync('tar -tzf package.tgz', { cwd: tmp, encoding: 'utf8' });
    const pick = (folder) => {
      const hit = listing.split('\n').find((f) => new RegExp(`^package/${folder}/pdf\\.worker-([\\d.]+?)(-es5)?\\.mjs$`).test(f.trim()));
      return hit ? hit.trim().match(/pdf\.worker-([\d.]+?)(-es5)?\.mjs$/)[1] : null;
    };
    const stable = pick('assets');
    if (!stable) {
      return null;
    }
    return { stable, 'bleeding-edge': pick('bleeding-edge') || stable };
  } catch {
    return null;
  } finally {
    fs.rmSync(tmp, { recursive: true, force: true });
  }
}

// ---------------------------------------------------------------------------
// Step 2: recompute a commit's engine version, exactly the way gulp does it
// ---------------------------------------------------------------------------

// gulpfile.mjs derives the version as versionPrefix + "number of commits since baseVersion", both
// read from pdfjs.config. Both values change over the fork's history, so they must be read from
// the candidate commit itself rather than from the branch tip.
function engineVersionAt(commit) {
  const config = gitOrNull(FORK_DIR, `show ${commit}:pdfjs.config`);
  if (!config) {
    return null;
  }
  let parsed;
  try {
    parsed = JSON.parse(config);
  } catch {
    return null;
  }
  const count = gitOrNull(FORK_DIR, `rev-list --count ${parsed.baseVersion}..${commit}`);
  if (count === null) {
    return null;
  }
  return { version: parsed.versionPrefix + count, build: Number(count), baseVersion: parsed.baseVersion };
}

// ---------------------------------------------------------------------------
// Step 3: the three lookup strategies
// ---------------------------------------------------------------------------

function viaForkTag(version, channel) {
  const tag = `ngx-extended-pdf-viewer-${version}${channel === 'bleeding-edge' ? '-bleeding-edge' : ''}`;
  const commit = gitOrNull(FORK_DIR, `rev-parse --verify --quiet ${tag}^{commit}`);
  return commit ? { commit, how: `fork tag ${tag}` } : null;
}

function viaBumpCommit(version, branches) {
  for (const branch of branches) {
    // The trailing anchor stops "28.1.0" from also matching "bumped the version number to
    // 28.1.0-rc.1". The dots stay regex wildcards, which is harmless here.
    const hit = gitOrNull(FORK_DIR, `log ${branch} --grep="bumped the version number to ${version}$" --format=%H --max-count=1`);
    if (hit) {
      return { commit: hit, how: `commit "bumped the version number to ${version}" on ${branch}` };
    }
  }
  return null;
}

// Walking back along a branch, the build number decreases monotonically, so the commit with a
// given build number can be found by binary search instead of recomputing it for every commit.
// --first-parent keeps the walk on the branch's own line of development.
function viaBuildNumberSearch(engineVersion, branches) {
  const target = Number(engineVersion.slice(engineVersion.lastIndexOf('.') + 1));

  for (const branch of branches) {
    const tip = engineVersionAt(branch);
    // A branch whose tip is already older than what we are looking for cannot contain it, and a
    // branch on a different version line (5.6.x vs 6.0.x) is the wrong place to look.
    if (!tip || tip.build < target || tip.version.slice(0, tip.version.lastIndexOf('.')) !== engineVersion.slice(0, engineVersion.lastIndexOf('.'))) {
      continue;
    }
    const list = gitOrNull(FORK_DIR, `rev-list --first-parent ${branch}`);
    if (!list) {
      continue;
    }
    const commits = list.split('\n');
    let low = 0;
    // One first-parent step can drop the build number by more than one (a merge pulls in a whole
    // side branch), never by less - so the answer is at most (tip - target) steps back. Bounding
    // the window this way also keeps the search away from the pre-fork history, where pdfjs.config
    // does not exist yet.
    let high = Math.min(commits.length - 1, tip.build - target);
    while (low <= high) {
      const mid = (low + high) >> 1;
      const at = engineVersionAt(commits[mid]);
      if (at && at.version === engineVersion) {
        return { commit: commits[mid], how: `build-number search on ${branch}` };
      }
      // Newer commits sit at lower indices and carry higher build numbers. A commit we cannot
      // evaluate is older than the fork point, so head back towards the newer half.
      if (at && at.build > target) {
        low = mid + 1;
      } else {
        high = mid - 1;
      }
    }
  }
  return null;
}

// Last resort for old releases whose branch was deleted after the line was retired: the commit may
// still be reachable from some other release tag. Slower than the searches above (it evaluates
// every tag), so it only runs once those have come up empty.
function viaTagSweep(engineVersion) {
  const tags = (gitOrNull(FORK_DIR, "tag -l 'ngx-extended-pdf-viewer-*'") || '').split('\n').filter(Boolean);
  for (const tag of tags) {
    const at = engineVersionAt(tag);
    if (at && at.version === engineVersion) {
      const commit = gitOrNull(FORK_DIR, `rev-parse ${tag}^{commit}`);
      return { commit, how: `tag sweep - same engine as ${tag}` };
    }
  }
  return null;
}

// ---------------------------------------------------------------------------

function candidateBranches(explicit) {
  if (explicit) {
    return explicit.split(',').map((b) => b.trim());
  }
  // The format string has to be quoted - execSync runs through /bin/sh, which would otherwise
  // treat the parentheses as shell syntax and fail the whole call.
  const listed = gitOrNull(FORK_DIR, "for-each-ref --format='%(refname:short)' refs/heads refs/remotes/origin") || '';
  const all = listed.split('\n').filter(Boolean);
  const preferred = ['bleeding-edge', 'origin/bleeding-edge'];
  // Release lines are named after the pdf.js version they track (6.0, 5.6.205, ...). Newest first,
  // so a lookup normally hits on the first or second branch it tries.
  const releaseLines = all
    .filter((b) => /^(origin\/)?\d+\.\d+/.test(b))
    .sort()
    .reverse();
  return [...preferred.filter((b) => all.includes(b)), ...releaseLines];
}

function resolveChannel(version, channel, engineVersion, branches) {
  const attempts = [
    () => (version ? viaForkTag(version, channel) : null),
    () => (version ? viaBumpCommit(version, branches) : null),
    () => (engineVersion ? viaBuildNumberSearch(engineVersion, branches) : null),
    () => (engineVersion ? viaTagSweep(engineVersion) : null),
  ];

  for (const attempt of attempts) {
    const found = attempt();
    if (!found) {
      continue;
    }
    const at = engineVersionAt(found.commit);
    // A tag or bump commit is only the right answer if the engine version it produces is the one
    // the library recorded. On a maintenance release both bundles come from the same stable commit,
    // so the -bleeding-edge tag can be absent or point somewhere else entirely.
    if (engineVersion && at && at.version !== engineVersion) {
      continue;
    }
    const branch = gitOrNull(FORK_DIR, `branch -a --contains ${found.commit} --format='%(refname:short)'`);
    return {
      commit: found.commit,
      how: found.how,
      engine: at ? at.version : '(unknown)',
      verified: !engineVersion || (at && at.version === engineVersion),
      date: gitOrNull(FORK_DIR, `show -s --format=%ad --date=short ${found.commit}`),
      subject: gitOrNull(FORK_DIR, `show -s --format=%s ${found.commit}`),
      branches: branch ? branch.split('\n').filter(Boolean) : [],
    };
  }
  return null;
}

function main() {
  const argv = process.argv.slice(2);
  const json = argv.includes('--json');
  const flag = (name) => {
    const i = argv.indexOf(name);
    return i >= 0 ? argv[i + 1] : null;
  };
  const version = argv.find((a) => !a.startsWith('--') && argv[argv.indexOf(a) - 1] !== '--branches' && argv[argv.indexOf(a) - 1] !== '--engine');
  const engineOverride = flag('--engine');
  const branches = candidateBranches(flag('--branches'));

  if (!version && !engineOverride) {
    console.error('Usage: node build-tools/release/find-fork-commit.js <library-version> [--branches a,b] [--json]');
    console.error('   or: node build-tools/release/find-fork-commit.js --engine 6.0.1168 [--branches a,b] [--json]');
    process.exit(94);
  }

  if (!fs.existsSync(FORK_DIR)) {
    console.error(`Error 94: the fork is not where it is expected to be: ${FORK_DIR}`);
    process.exit(94);
  }

  let engines = engineOverride ? { stable: engineOverride, 'bleeding-edge': engineOverride } : null;
  let recordedBy = engineOverride ? '--engine' : null;
  const warnings = [];

  if (!engines) {
    const fromTag = readEngineVersionsFromLibraryTag(version);
    // --from-npm is the escape hatch for releases whose committed constants cannot be trusted;
    // otherwise npm is only consulted when the library tag is missing.
    const fromNpm = argv.includes('--from-npm') || !fromTag ? readEngineVersionsFromNpm(version) : null;

    if (fromTag && fromNpm) {
      for (const channel of ['stable', 'bleeding-edge']) {
        if (fromTag[channel] !== fromNpm[channel]) {
          warnings.push(`${channel}: the library tag records ${fromTag[channel]}, but npm actually shipped ${fromNpm[channel]} - trusting npm.`);
        }
      }
    }
    engines = fromNpm || fromTag;
    recordedBy = fromNpm ? (fromTag ? `npm tarball (cross-checked against library tag ${version})` : 'npm tarball') : fromTag ? `library tag ${version}` : null;
  }

  const channels = engineOverride ? ['stable'] : ['stable', 'bleeding-edge'];
  const result = { version: version || null, recordedBy, warnings, channels: {} };
  let ok = true;

  for (const channel of channels) {
    const engineVersion = engines ? engines[channel] : null;
    const found = resolveChannel(version, channel, engineVersion, branches);
    result.channels[channel] = found ? { expectedEngine: engineVersion, ...found } : { expectedEngine: engineVersion, commit: null };
    if (!found) {
      ok = false;
    }
  }

  if (json) {
    console.log(JSON.stringify(result, null, 2));
  } else {
    console.log(`\nLibrary version ${version || '(engine lookup only)'}`);
    console.log(recordedBy ? `Engine versions recorded by: ${recordedBy}` : 'Engine versions: unknown (no library tag found, and npm had nothing either)');
    if (!recordedBy && version) {
      console.log(`  Hint: the tag ${version} is missing locally. Try "git fetch --tags" in the library repo.`);
    }
    for (const w of warnings) {
      console.log(`  ⚠️  ${w}`);
    }
    for (const channel of channels) {
      const r = result.channels[channel];
      console.log(`\n  ${channel}`);
      console.log(`    engine   ${r.expectedEngine || '(unknown)'}`);
      if (r.commit) {
        console.log(`    commit   ${r.commit}  (${r.date})`);
        console.log(`    subject  ${r.subject}`);
        console.log(`    found by ${r.how}`);
        console.log(`    on       ${r.branches.length ? r.branches.join(', ') : '(no branch contains it - it is only reachable through the tag)'}`);
        if (!r.verified) {
          console.log('    ⚠️  could not verify the build number against the recorded engine version');
        }
      } else {
        console.log('    commit   NOT FOUND');
      }
    }
    console.log('');
  }

  if (!ok) {
    console.error('Error 94: at least one channel could not be resolved.');
    process.exit(94);
  }
}

main();
