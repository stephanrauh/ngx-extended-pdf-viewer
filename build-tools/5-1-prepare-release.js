// build-tools/5-1-prepare-release.js
// This script prepares a release by updating version numbers and pushing changes locally
// The actual npm publish happens in CI via 5-release-library.js

const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

// Set while the release has local commits or changes but nothing has been pushed yet. Any failure
// in that window undoes them, so a failed test no longer leaves bump commits to reset by hand.
let rollback = null;
let interrupted = false;

function fail(errorMessage, exitCode) {
  console.error(errorMessage);
  if (rollback) {
    const undo = rollback;
    rollback = null;
    undo();
  }
  process.exit(exitCode);
}

// Function to execute a command and handle errors
function runCommand(command, errorMessage, exitCode) {
  try {
    execSync(command, { stdio: 'inherit', shell: true });
  } catch (error) {
    if (!command.includes('git commit') || interrupted) {
      fail(interrupted ? `${errorMessage} (interrupted)` : errorMessage, exitCode);
    }
  }
  if (interrupted) {
    fail(`Interrupted after: ${command}`, 130);
  }
}

// Robustly remove a directory, retrying up to 3 times with a short delay.
// On macOS, rm -rf node_modules can fail with "Directory not empty" when
// Spotlight, Finder (.DS_Store), or a recently exited child process still
// holds a file handle.
function removeDirectoryWithRetry(dir, errorMessage, exitCode) {
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      fs.rmSync(dir, { recursive: true, force: true });
      return;
    } catch (error) {
      if (attempt < 3) {
        console.warn(`${errorMessage} (attempt ${attempt}/3, retrying in 2s...)`);
        execSync('sleep 2');
      } else {
        fail(`${errorMessage} (all 3 attempts failed)`, exitCode);
      }
    }
  }
}

// Navigate to the root directory
process.chdir(path.join(__dirname, '..'));

// Which fork branches this release line builds from, and whether it has a bleeding-edge channel of
// its own. Kept in release-config.json rather than hardcoded here so that this script stays
// identical on main and on every maintenance branch - see build-tools/release/release-config.js.
const { loadReleaseConfig, describeReleaseConfig } = require('./release/release-config');

const releaseConfig = loadReleaseConfig();
const STABLE_BRANCH = releaseConfig.forkStableBranch;
const BLEEDING_EDGE_BRANCH = releaseConfig.forkBleedingEdgeBranch;
const IS_MAINTENANCE_RELEASE = releaseConfig.isMaintenanceRelease;
console.log(describeReleaseConfig(releaseConfig));

// Check commit state - ensure everything is clean before starting
runCommand('node ./build-tools/release/check-commit-state.js', 'Error 51: check-commit-state.js failed', 51);

// Jest needs no built bundles, so it runs here: it is the cheapest way to abort while the
// working tree is still pristine. The browser-based suites moved further down, after the
// bundles are rebuilt - see "Browser test suites" below.
console.log('\n🧪 Running Jest tests in ngx-extended-pdf-viewer...');
runCommand('npm test', 'Error 52: Jest tests failed', 52);

// ---------------------------------------------------------------------------
// Automatic rollback
//
// The fork's version bump has to be committed before the bundles are built: the pdf.js build
// number is the fork's commit count (e.g. 6.5.1518), and CI builds from the branch tips, so the
// bundles under test must contain the bump commit or their build number would differ from what
// CI publishes. The browser tests therefore run after these commits. Instead of leaving them
// behind when a test fails, every failure (or Ctrl-C) before the first push restores the state
// recorded here. check-commit-state.js has just verified that both working trees are clean, so
// this state contains no work of the user's.
// ---------------------------------------------------------------------------
const LIBRARY_DIR = process.cwd();
const FORK_DIR = path.join(LIBRARY_DIR, '..', 'mypdf.js');

function gitOutput(dir, args) {
  return execSync(`git -C "${dir}" ${args}`, { encoding: 'utf8' }).trim();
}

const forkBranchesToRestore = IS_MAINTENANCE_RELEASE ? [STABLE_BRANCH] : [STABLE_BRANCH, BLEEDING_EDGE_BRANCH];
const startState = {
  forkCheckout: gitOutput(FORK_DIR, 'rev-parse --abbrev-ref HEAD'),
  forkBranches: Object.fromEntries(forkBranchesToRestore.map((branch) => [branch, gitOutput(FORK_DIR, `rev-parse "refs/heads/${branch}"`)])),
  library: gitOutput(LIBRARY_DIR, 'rev-parse HEAD'),
};

function undoLocalReleaseChanges() {
  console.error('\n↩️  Undoing the local release changes (nothing has been pushed)...');
  const step = (description, command) => {
    try {
      execSync(command, { stdio: 'inherit', shell: true });
      console.error(`   ✓ ${description}`);
    } catch (error) {
      console.error(`   ✗ ${description} failed - please check by hand: ${command}`);
    }
  };
  // Discards the uncommitted package-lock.json changes of `npm audit fix`, so the checkouts below work.
  step('mypdf.js: discarded uncommitted changes', `git -C "${FORK_DIR}" reset --hard`);
  for (const [branch, sha] of Object.entries(startState.forkBranches)) {
    if (gitOutput(FORK_DIR, `rev-parse "refs/heads/${branch}"`) === sha) {
      continue;
    }
    step(`mypdf.js: reset ${branch} to ${sha.substring(0, 9)}`, `git -C "${FORK_DIR}" checkout "${branch}" && git -C "${FORK_DIR}" reset --hard ${sha}`);
  }
  step(`mypdf.js: checked out ${startState.forkCheckout} again`, `git -C "${FORK_DIR}" checkout "${startState.forkCheckout}"`);
  step(`ngx-extended-pdf-viewer: reset to ${startState.library.substring(0, 9)}`, `git -C "${LIBRARY_DIR}" reset --hard ${startState.library}`);
  const untracked = gitOutput(LIBRARY_DIR, 'ls-files --others --exclude-standard');
  if (untracked) {
    console.error('\n   The build created these untracked files in ngx-extended-pdf-viewer. They are left alone;');
    console.error('   delete them before the next release:lib, or check-commit-state.js will refuse to start:');
    console.error(untracked.replace(/^/gm, '     '));
  }
  console.error('\n   The bundles in assets/ and bleeding-edge/ still carry the new version number;');
  console.error('   the next release:lib rebuilds both of them.');
}

rollback = undoLocalReleaseChanges;
// Ctrl-C reaches the running child too, so it fails and the rollback above runs. Without this
// listener Node would die on the spot and leave the bump commits behind.
process.on('SIGINT', () => {
  interrupted = true;
  console.error('\n⚠️  Interrupted - waiting for the running step to stop...');
});

// Read the current version number
const packageJsonPath = path.join('projects', 'ngx-extended-pdf-viewer', 'package.json');
let packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
let currentVersion = packageJson.version;
console.log(`Current version: ${currentVersion}`);

// Increase version number
runCommand('node ./build-tools/release/increase-version-number.js', 'Error 57: increase-version-number.js failed', 57);

// Read the new version number
packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
let newVersion = packageJson.version;
console.log(`New version: ${newVersion}`);

// Build the bleeding-edge bundle to update pdf-default-options.ts. On a maintenance release this
// is skipped here and produced from STABLE_BRANCH further down, in the same checkout - the fork's
// bleeding-edge branch is neither built nor committed to.
if (!IS_MAINTENANCE_RELEASE) {
  console.log('\n🔨 Building base library (bleeding-edge) to update version numbers...');
  process.chdir(path.join('..', 'mypdf.js'));
  runCommand(`git checkout ${BLEEDING_EDGE_BRANCH}`, 'Error 63: Git checkout failed', 63);

  // Update version number
  runCommand(
    'node ../ngx-extended-pdf-viewer/build-tools/base-library/write-version-number-to-base-library.js',
    'Error 64: write-version-number-to-base-library failed at bleeding-edge',
    64,
  );

  // Commit version number changes
  runCommand(`git commit . -m "bumped the version number to ${newVersion}"`, 'Error 65: Git commit in mypdf.js failed', 65);

  // Install dependencies and build
  removeDirectoryWithRetry('node_modules', 'Error 66a: Removing node_modules failed', 66);
  runCommand('npm ci --ignore-scripts', 'Error 66b: npm install failed', 66);
  runCommand('npm audit fix --ignore-scripts || true', 'Error 66c: npm audit fix failed', 66);
  runCommand('../ngx-extended-pdf-viewer/build-tools/search-for-shai-hulud.sh --full', 'Error 66d: shai-hulud scan failed', 66);
  runCommand('npm rebuild', 'Error 66e: npm rebuild failed', 66);
  process.chdir(path.join('..', 'ngx-extended-pdf-viewer'));
  // Not --quick, for the reason given at the stable build below.
  runCommand('node ./build-tools/1-build-base-library.js', 'Error 67: build-base-library.js failed for bleeding-edge', 67);

  // Clean up package-lock.json changes from audit fix before switching branches
  process.chdir(path.join('..', 'mypdf.js'));
  runCommand('git reset --hard', 'Error 67a: Git reset failed', 67);
} else {
  process.chdir(path.join('..', 'mypdf.js'));
}

// Build base library from the stable branch to update pdf-default-options.ts
console.log(`\n🔨 Building base library (${STABLE_BRANCH}) to update version numbers...`);
runCommand(`git checkout ${STABLE_BRANCH}`, 'Error 59: Git checkout failed', 59);

// Update version number
runCommand(
  'node ../ngx-extended-pdf-viewer/build-tools/base-library/write-version-number-to-base-library.js',
  'Error 62: write-version-number-to-base-library failed at version 6.0',
  62,
);

// Commit version number changes
runCommand(`git commit . -m "bumped the version number to ${newVersion}"`, 'Error 61: Git commit in mypdf.js failed', 61);

// Install dependencies and build
removeDirectoryWithRetry('node_modules', 'Error 68a: Removing node_modules failed', 68);
runCommand('npm ci --ignore-scripts', 'Error 68b: npm install failed', 68);
runCommand('npm audit fix --ignore-scripts || true', 'Error 68c: npm audit fix failed', 68);
runCommand('../ngx-extended-pdf-viewer/build-tools/search-for-shai-hulud.sh --full', 'Error 68d: shai-hulud scan failed', 68);
runCommand('npm rebuild', 'Error 68e: npm rebuild failed', 68);
process.chdir(path.join('..', 'ngx-extended-pdf-viewer'));

// On a maintenance release the bleeding-edge bundle comes from this same stable checkout, so both
// bundles carry the same engine. NGX_ASSETS_FOLDER overrides the branch-derived destination.
if (IS_MAINTENANCE_RELEASE) {
  runCommand(
    'NGX_ASSETS_FOLDER=bleeding-edge node ./build-tools/1-build-base-library.js',
    `Error 67: build-base-library.js failed for the bleeding-edge bundle (from ${STABLE_BRANCH})`,
    67,
  );
}

// Deliberately NOT --quick: the full build also produces viewer-*.min.mjs and the *-es5.mjs
// legacy bundles. The showcase e2e suite (T34-shipped-bundles) loads exactly those variants,
// which is the only check the minified/legacy artefacts get before CI publishes them. With
// --quick the files don't exist and T34 skips itself. The same goes for the bleeding-edge build
// above: demos that force the bleeding-edge bundle (e.g. /options) load its *-es5.mjs files in the
// old-Chrome e2e projects. CI (5-2-release-library-ci.js) builds both bundles in full, too.
runCommand('node ./build-tools/1-build-base-library.js', `Error 69: build-base-library.js failed for ${STABLE_BRANCH}`, 69);

// Clean up package-lock.json changes from audit fix
process.chdir(path.join('..', 'mypdf.js'));
runCommand('git reset --hard', 'Error 69a: Git reset failed', 69);
process.chdir(path.join('..', 'ngx-extended-pdf-viewer'));

// ---------------------------------------------------------------------------
// Browser test suites
//
// These run HERE, not before the version bump, because they are the only checks that
// exercise the actual release artefacts. Both bundles have just been rebuilt and
// pdf-default-options.ts now names those exact builds; running the suites earlier tested
// whatever happened to be on disk from a previous session - and since `build:base` writes
// only the bundle selected by the fork's checked-out branch, "earlier" could mean the
// stable bundle was never rebuilt at all.
//
// A failure here leaves the version bump behind - uncommitted in ngx-extended-pdf-viewer, and a
// "bumped the version number" commit on each built fork branch. Nothing has been pushed or
// published yet, so undoLocalReleaseChanges() (see "Automatic rollback" above) undoes all of it.
// ---------------------------------------------------------------------------
console.log('\n🔨 Building the library so the browser suites test the release artefacts...');
runCommand('npm run build:lib', 'Error 55: Building the library before the browser tests failed', 55);

// The compatibility matrix needs Docker. Set SKIP_COMPAT=1 to bypass it on
// machines without a working Docker daemon (CI still runs the full matrix).
if (process.env.SKIP_COMPAT === '1') {
  console.log('\n⏭️  Skipping Playwright compatibility tests (SKIP_COMPAT=1)');
} else {
  console.log('\n🧪 Running Playwright compatibility tests (Angular 19–22)...');
  // SKIP_LIBRARY_BUILD=1: the harness must not rebuild, or it would replace the artefacts
  // under test with a fresh build of whichever branch the fork happens to be on.
  runCommand('SKIP_LIBRARY_BUILD=1 npm run test:compat', 'Error 53: Playwright compatibility tests failed', 53);
}

// The showcase is a separate repo that always tracks the newest library API, so it cannot
// compile against a maintenance branch: releasing 28.1.1 while the showcase is on 29.x fails
// with "Can't bind to 'supportsDownloading'" and similar. Set SKIP_E2E=1 there. On main, leave
// it on - a showcase that stops compiling is a real signal about a breaking API change.
if (process.env.SKIP_E2E === '1') {
  console.log('\n⏭️  Skipping the showcase Playwright tests (SKIP_E2E=1)');
} else {
  console.log('\n🧪 Running Playwright tests of the showcase...');
  process.chdir(path.join('..', 'extended-pdf-viewer-showcase'));
  runCommand('npm run test:e2e', 'Error 54: Showcase Playwright tests failed', 54);
  process.chdir(path.join('..', 'ngx-extended-pdf-viewer'));
}

// Commit changes in ngx-extended-pdf-viewer (including updated pdf-default-options.ts)
runCommand(`git commit . -m "bumped the version number to ${newVersion}"`, 'Error 58: Git commit failed', 58);

// From the first push on, the commits are public: undoing them locally would only make the local
// branches diverge from origin. A failure from here on stops and leaves everything as it is.
rollback = null;

// Push mypdf.js first. Pushing the ngx tag further down is what triggers the publish workflow,
// and that workflow clones the fork and builds the engine from its branch tips. If the fork's
// bump commit were not there yet, CI would build the *previous* engine while the tagged
// pdf-default-options.ts already names the new one - and every worker request in the published
// package would 404. Nothing downstream catches that mismatch (5-2 verifies the bundle against
// the version it just built, and the SBOM compares the provenance to the files on disk, so both
// agree with each other while being wrong), which is why the push order is the only guard.
process.chdir(path.join('..', 'mypdf.js'));

// Push the stable branch
runCommand(`git checkout ${STABLE_BRANCH}`, 'Error 73: Git checkout failed', 73);
runCommand('git push', `Error 74: Git push in mypdf.js ${STABLE_BRANCH} failed`, 74);
runCommand(
  `git tag -a "ngx-extended-pdf-viewer-${newVersion}" -m "ngx-extended-pdf-viewer ${newVersion}"`,
  `Error 75: Creating ${STABLE_BRANCH} tag failed`,
  75,
);
// Push only the new tag: `--tags` would also push every Mozilla tag fetched from upstream, and each
// of those carries Mozilla's workflows, which then run (and fail) in the fork.
runCommand(`git push origin "refs/tags/ngx-extended-pdf-viewer-${newVersion}"`, `Error 76: Pushing ${STABLE_BRANCH} tags failed`, 76);

// Push bleeding-edge branch. Skipped on a maintenance release: that branch belongs to the next
// major, and committing/tagging a patch version onto it would misrepresent what it contains.
if (!IS_MAINTENANCE_RELEASE) {
  runCommand(`git checkout ${BLEEDING_EDGE_BRANCH}`, 'Error 77: Git checkout failed', 77);
  runCommand('git push', 'Error 78: Git push in mypdf.js bleeding-edge failed', 78);
  runCommand(
    `git tag -a "ngx-extended-pdf-viewer-${newVersion}-bleeding-edge" -m "ngx-extended-pdf-viewer ${newVersion}"`,
    'Error 79: Creating bleeding-edge tag failed',
    79,
  );
  runCommand(`git push origin "refs/tags/ngx-extended-pdf-viewer-${newVersion}-bleeding-edge"`, 'Error 80: Pushing bleeding-edge tags failed', 80);
} else {
  console.log("\n⏭️  Skipped pushing/tagging the fork's bleeding-edge branch (maintenance release)");
}

// The fork is public now, so the engine CI builds is guaranteed to be the one this version names.
// Push ngx-extended-pdf-viewer and tag it - the tag push starts the release.
process.chdir(path.join('..', 'ngx-extended-pdf-viewer'));
runCommand('git push', 'Error 70: Git push failed', 70);
runCommand(`git tag -a ${newVersion} -m "${newVersion}"`, 'Error 71: Creating tag failed', 71);
runCommand(`git push origin "refs/tags/${newVersion}"`, 'Error 72: Pushing tags failed', 72);

console.log('\n✅ Release preparation complete!');
console.log(`Version ${newVersion} has been committed and tagged.`);
console.log('\nNext steps:');
console.log('1. The GitHub Actions workflow will automatically trigger on the new tag');
console.log('2. It will build the library and publish to npm with provenance');
console.log(`3. Monitor the workflow at: https://github.com/stephanrauh/ngx-extended-pdf-viewer/actions`);
