// build-tools/5-2-release-library-ci.js
// This script is designed to run in CI after version numbers have been updated locally
// It builds the library from both pdf.js branches and publishes to npm with provenance

const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

// Which fork branches this release line builds from, and which npm dist-tag it publishes under.
// Kept in release-config.json rather than hardcoded here so that this script stays identical on
// main and on every maintenance branch - see build-tools/release/release-config.js. 5-1 reads the
// same file, so the two can no longer drift apart; if they did, npm would get a stable bundle
// whose file names don't match `pdfjsVersion`, and every worker request would 404.
const { loadReleaseConfig, describeReleaseConfig } = require('./release/release-config');

// Function to execute a command and handle errors
function runCommand(command, errorMessage, exitCode) {
  try {
    execSync(command, { stdio: 'inherit', shell: true });
  } catch (error) {
    console.error(errorMessage);
    process.exit(exitCode);
  }
}

// Navigate to the root directory
process.chdir(path.join(__dirname, '..'));

// This *is* a publish, so the SBOM has to match the engines on disk exactly. Set here rather than
// on the single generate-sbom.js call below, because 2-build-library.js generates it a second
// time and inherits this environment. Outside a release the same check only warns - see
// generate-sbom.js.
process.env.NGX_SBOM_STRICT = '1';

const releaseConfig = loadReleaseConfig();
console.log(describeReleaseConfig(releaseConfig));

// Read the version number
const packageJsonPath = path.join('projects', 'ngx-extended-pdf-viewer', 'package.json');
let packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
let version = packageJson.version;
console.log(`Building and publishing version: ${version}`);

// The SBOM is generated further down, once both engines have been built - it describes the
// bundled pdf.js fork, so it cannot be written before the bundles exist (#3244).

// Build the bleeding-edge bundle. On a maintenance line there is no bleeding-edge branch of its
// own - that branch has moved on to a newer engine and a newer major, which must not end up in a
// patch release - so both bundles are built from the stable branch and carry the same engine.
const BLEEDING_EDGE_SOURCE = releaseConfig.forkBleedingEdgeBranch || releaseConfig.forkStableBranch;
console.log(`\n🔨 Building base library (bleeding-edge bundle, from ${BLEEDING_EDGE_SOURCE})...`);
process.chdir(path.join('..', 'mypdf.js'));
runCommand('git reset --hard', 'Error 66a: Git reset failed', 66);
runCommand(`git checkout ${BLEEDING_EDGE_SOURCE}`, 'Error 66: Git checkout failed', 66);
runCommand('npm ci --ignore-scripts', 'Error 66b: npm install failed', 66);
runCommand('npm audit fix --ignore-scripts || true', 'Error 66c: npm audit fix failed', 66);
runCommand('../ngx-extended-pdf-viewer/build-tools/search-for-shai-hulud.sh --full', 'Error 66d: shai-hulud scan failed', 66);
runCommand('npm rebuild', 'Error 66e: npm rebuild failed', 66);
process.chdir(path.join('..', 'ngx-extended-pdf-viewer'));

// State the destination explicitly instead of letting it be derived from the checked-out fork
// branch: on a maintenance line that branch is the *stable* one, which would otherwise send this
// build into assets/. On main the two are equivalent.
runCommand('NGX_ASSETS_FOLDER=bleeding-edge node ./build-tools/1-build-base-library.js', 'Error 53: build-base-library.js failed', 53);

// Verify bleeding-edge assets were created
const bleedingEdgePath = path.join('projects', 'ngx-extended-pdf-viewer', 'bleeding-edge');

// Per-file-type minimum sizes, chosen ~25% below observed sizes: big enough to catch an
// empty or truncated build, loose enough not to fire on every legitimate shrink.
//
// The sandbox has shrunk twice for legitimate reasons, so resist the urge to "restore" a
// bigger threshold when it trips:
//   - pdf.js 6.0 cut it from ~1 MB (v5.x) to ~140-340 KB;
//   - pdf.js 6.2 (Babel 8) cut the MODERN flavours again, to ~126 KB plain / ~73 KB
//     minified. Until then the fork polyfilled twice - preset-env with
//     `useBuiltIns: "usage"` AND babel-plugin-polyfill-corejs3. Babel 8 dropped the
//     preset options, so core-js now comes only from the plugin, which the build gates on
//     `!SKIP_BABEL`. Modern bundles therefore contain no core-js at all.
//
// That is why the flavours need different numbers: `-es5` still carries the polyfills
// (~353 KB) and is the one place a missing-polyfill regression would show up as a size drop.
function expectedMinSize(fileName) {
  if (fileName.includes('pdf.sandbox-')) {
    if (fileName.includes('-es5')) {
      return 250 * 1024; // observed ~353 KB - polyfilled
    }
    return fileName.endsWith('.min.mjs')
      ? 50 * 1024 // observed ~73 KB
      : 90 * 1024; // observed ~126 KB
  }
  // pdf.worker-* and viewer-* are always > 1 MB even minified.
  return 700 * 1024;
}

function verifyFile(filePath, description) {
  if (!fs.existsSync(filePath)) {
    console.error(`Error: Missing file - ${description}: ${filePath}`);
    return false;
  }
  const stats = fs.statSync(filePath);
  const minFileSize = expectedMinSize(description);
  if (stats.size < minFileSize) {
    console.error(`Error: File too small (${stats.size} bytes, expected >= ${minFileSize}) - ${description}: ${filePath}`);
    return false;
  }
  console.log(`✓ ${description}: ${Math.round(stats.size / 1024)} KB`);
  return true;
}

// Get the bleeding-edge PDF.js version
const bleedingEdgeVersionPath = path.join('..', 'mypdf.js', 'build', 'version.json');
const bleedingEdgeVersionJson = JSON.parse(fs.readFileSync(bleedingEdgeVersionPath, 'utf8'));
const bleedingEdgeVersion = bleedingEdgeVersionJson.version;
console.log(`Bleeding-edge PDF.js version: ${bleedingEdgeVersion}`);

console.log('\nVerifying bleeding-edge build artifacts...');
const bleedingEdgeFiles = [
  `pdf.sandbox-${bleedingEdgeVersion}-es5.mjs`,
  `pdf.sandbox-${bleedingEdgeVersion}.min.mjs`,
  `pdf.sandbox-${bleedingEdgeVersion}.mjs`,
  `pdf.worker-${bleedingEdgeVersion}-es5.mjs`,
  `pdf.worker-${bleedingEdgeVersion}.min.mjs`,
  `pdf.worker-${bleedingEdgeVersion}.mjs`,
  `viewer-${bleedingEdgeVersion}-es5.mjs`,
  `viewer-${bleedingEdgeVersion}.min.mjs`,
  `viewer-${bleedingEdgeVersion}.mjs`,
];

let allBleedingEdgeFilesValid = true;
for (const fileName of bleedingEdgeFiles) {
  const filePath = path.join(bleedingEdgePath, fileName);
  if (!verifyFile(filePath, fileName)) {
    allBleedingEdgeFilesValid = false;
  }
}

if (!allBleedingEdgeFilesValid) {
  console.error('Error 81: Bleeding-edge build did not create all expected files with correct sizes');
  process.exit(81);
}
console.log('✓ All bleeding-edge assets verified');

// Build base library from the stable branch
console.log(`\n🔨 Building base library (${releaseConfig.forkStableBranch})...`);
process.chdir(path.join('..', 'mypdf.js'));
runCommand('git reset --hard', 'Error 68a: Git reset failed', 68);
runCommand(`git checkout ${releaseConfig.forkStableBranch}`, 'Error 68: Git checkout failed', 68);
runCommand('npm ci --ignore-scripts', 'Error 68b: npm install failed', 68);
runCommand('npm audit fix --ignore-scripts || true', 'Error 68c: npm audit fix failed', 68);
runCommand('../ngx-extended-pdf-viewer/build-tools/search-for-shai-hulud.sh --full', 'Error 68d: shai-hulud scan failed', 68);
runCommand('npm rebuild', 'Error 68e: npm rebuild failed', 68);
process.chdir(path.join('..', 'ngx-extended-pdf-viewer'));

runCommand('node ./build-tools/1-build-base-library.js', 'Error 53: build-base-library.js failed', 53);

// Verify stable assets were created
const assetsPath = path.join('projects', 'ngx-extended-pdf-viewer', 'assets');

// Get the stable PDF.js version
const stableVersionPath = path.join('..', 'mypdf.js', 'build', 'version.json');
const stableVersionJson = JSON.parse(fs.readFileSync(stableVersionPath, 'utf8'));
const stableVersion = stableVersionJson.version;
console.log(`Stable PDF.js version: ${stableVersion}`);

console.log('\nVerifying stable build artifacts...');
const stableFiles = [
  `pdf.sandbox-${stableVersion}-es5.mjs`,
  `pdf.sandbox-${stableVersion}.min.mjs`,
  `pdf.sandbox-${stableVersion}.mjs`,
  `pdf.worker-${stableVersion}-es5.mjs`,
  `pdf.worker-${stableVersion}.min.mjs`,
  `pdf.worker-${stableVersion}.mjs`,
  `viewer-${stableVersion}-es5.mjs`,
  `viewer-${stableVersion}.min.mjs`,
  `viewer-${stableVersion}.mjs`,
];

let allStableFilesValid = true;
for (const fileName of stableFiles) {
  const filePath = path.join(assetsPath, fileName);
  if (!verifyFile(filePath, fileName)) {
    allStableFilesValid = false;
  }
}

if (!allStableFilesValid) {
  console.error('Error 82: Stable build did not create all expected files with correct sizes');
  process.exit(82);
}
console.log('✓ All stable assets verified');

// Generate the SBOM now that both bundles exist. 1-build-base-library.js has recorded the
// provenance of each engine as it was built, so this only has to turn it into CycloneDX.
// Both files are published inside the npm package (see ng-package.json assets).
//
// An old maintenance line has no generator: backporting the SBOM toolchain onto a branch built for
// an older Angular would drag in ajv and the CycloneDX schemas for no benefit, so those lines carry
// the documents as committed artifacts instead (see build-tools/HOTFIX.md). Detect that case rather
// than branching on the version number, and still refuse to publish if the documents are simply
// absent - "no generator" must not become a way to ship a package with no SBOM at all.
if (fs.existsSync(path.join('build-tools', 'generate-sbom.js'))) {
  console.log('\n📦 Generating SBOM...');
  runCommand('node ./build-tools/generate-sbom.js', 'Error 52: SBOM generation failed', 52);
} else {
  console.log('\n📦 No SBOM generator on this branch - expecting committed SBOM documents...');
  const missing = ['sbom.json', 'vex.json', 'pdfjs-provenance.json'].filter((f) => !fs.existsSync(path.join('projects', 'ngx-extended-pdf-viewer', f)));
  if (missing.length > 0) {
    console.error(`Error 52: this branch has no build-tools/generate-sbom.js and is missing committed ${missing.join(', ')}`);
    process.exit(52);
  }
  console.log('✓ sbom.json, vex.json and pdfjs-provenance.json are present');
}

// Build Angular library
console.log('\n🔨 Building Angular library...');
runCommand('node ./build-tools/2-build-library.js', 'Error 54: build-library.js failed', 54);

// Verify dist was created
const distPath = path.join('dist', 'ngx-extended-pdf-viewer');
if (!fs.existsSync(distPath)) {
  console.error('Error 83: Library build did not create dist folder');
  process.exit(83);
}
console.log('✓ Library build verified');

// Verify package.json exists in dist
const distPackageJson = path.join(distPath, 'package.json');
if (!fs.existsSync(distPackageJson)) {
  console.error('Error 84: package.json not found in dist folder');
  process.exit(84);
}

// Verify version matches in dist
const distPackageJsonContent = JSON.parse(fs.readFileSync(distPackageJson, 'utf8'));
if (distPackageJsonContent.version !== version) {
  console.error(`Error 85: Version mismatch. Expected ${version}, got ${distPackageJsonContent.version}`);
  process.exit(85);
}
console.log(`✓ Version ${version} verified in dist`);

// Verify no suspicious lifecycle scripts in dist package.json
const suspiciousScripts = ['preinstall', 'install', 'postinstall', 'preuninstall', 'uninstall', 'postuninstall'];
const foundSuspiciousScripts = [];
if (distPackageJsonContent.scripts) {
  for (const scriptName of suspiciousScripts) {
    if (distPackageJsonContent.scripts[scriptName]) {
      foundSuspiciousScripts.push(scriptName);
    }
  }
}
if (foundSuspiciousScripts.length > 0) {
  console.error(`Error 86: Suspicious lifecycle scripts found in dist package.json: ${foundSuspiciousScripts.join(', ')}`);
  console.error('This could indicate a security compromise. Aborting publish.');
  process.exit(86);
}
console.log('✓ No suspicious lifecycle scripts in dist package.json');

// Publish to npm with provenance
console.log('\n📤 Final checks before publishing');
process.chdir(distPath);
runCommand('echo "GITHUB_REPOSITORY=$GITHUB_REPOSITORY"');
runCommand('echo "GITHUB_WORKFLOW_REF=$GITHUB_WORKFLOW_REF"');
runCommand('[ -n "$ACTIONS_ID_TOKEN_REQUEST_URL" ] && echo "OIDC URL: set" || echo "OIDC URL: NOT SET"');
runCommand('[ -n "$ACTIONS_ID_TOKEN_REQUEST_TOKEN" ] && echo "OIDC Token: set" || echo "OIDC Token: NOT SET"');

// Check npm version
runCommand('npm --version', 'Error: failed to get npm version', 90);

// 1) print package name from dist
runCommand("node -e \"console.log('name in dist:', require('./package.json').name)\"", 'Error: failed to read dist package name', 91);

// 2) show the registry
runCommand('npm config get registry', 'Error: failed to read npm registry', 92);

// 3) ping npm
runCommand('npm ping', 'Error: npm ping failed', 93);

// Determine the npm tag based on version (alpha/beta/rc/latest)
let npmTag = 'latest';
if (version.includes('-alpha')) {
  npmTag = 'alpha';
} else if (version.includes('-beta')) {
  npmTag = 'beta';
} else if (version.includes('-rc')) {
  npmTag = 'rc';
}

// A maintenance release of an older line must NOT become the default install. Without an override,
// publishing e.g. 28.1.2 after 29.0.0 is out would point `latest` back at the older major and every
// `npm install ngx-extended-pdf-viewer` would silently downgrade. `npmDistTag` in
// release-config.json pins it; NGX_NPM_TAG wins over both for a one-off. Both are null/unset on
// main, where deriving the tag from the version string is right.
if (releaseConfig.npmDistTag) {
  npmTag = releaseConfig.npmDistTag;
  console.log(`ℹ️  npm dist-tag pinned by release-config.json: ${npmTag}`);
}
if (process.env.NGX_NPM_TAG) {
  npmTag = process.env.NGX_NPM_TAG;
  console.log(`ℹ️  npm dist-tag overridden via NGX_NPM_TAG: ${npmTag}`);
}

console.log(`\n📤 Publishing to npm with provenance (tag: ${npmTag})...`);
runCommand(`npm publish --provenance --access public --tag ${npmTag}`, 'Error 55: npm publish failed', 55);
process.chdir(path.join('..', '..'));

console.log('\n✅ Library published successfully with provenance!');
console.log(`Published version: ${version}`);
console.log(`View on npm: https://www.npmjs.com/package/ngx-extended-pdf-viewer`);
