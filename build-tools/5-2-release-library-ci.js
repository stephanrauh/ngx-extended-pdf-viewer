// build-tools/5-2-release-library-ci.js
// This script is designed to run in CI after version numbers have been updated locally
// It builds the library from both pdf.js branches and publishes to npm with provenance

const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

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

// Read the version number
const packageJsonPath = path.join('projects', 'ngx-extended-pdf-viewer', 'package.json');
let packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
let version = packageJson.version;
console.log(`Building and publishing version: ${version}`);

// Generate SBOM
console.log('\n📦 Generating SBOM...');
runCommand('npx -y @cyclonedx/cyclonedx-npm --output-file sbom.json --mc-type library', 'Error 52: npm SBOM generation failed', 52);

// Build base library from bleeding-edge
console.log('\n🔨 Building base library (bleeding-edge)...');
process.chdir(path.join('..', 'mypdf.js'));
runCommand('git checkout bleeding-edge', 'Error 66: Git checkout failed', 66);
runCommand('npm i', 'Error 66b: npm install failed', 66);
process.chdir(path.join('..', 'ngx-extended-pdf-viewer'));

runCommand('node ./build-tools/1-build-base-library.js', 'Error 53: build-base-library.js failed', 53);

// Verify bleeding-edge assets were created
const bleedingEdgePath = path.join('projects', 'ngx-extended-pdf-viewer', 'bleeding-edge');
const minFileSize = 700 * 1024; // 700 KB in bytes

function verifyFile(filePath, description) {
  if (!fs.existsSync(filePath)) {
    console.error(`Error: Missing file - ${description}: ${filePath}`);
    return false;
  }
  const stats = fs.statSync(filePath);
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

// Build base library from stable branch (5.4.149)
console.log('\n🔨 Building base library (5.4.149)...');
process.chdir(path.join('..', 'mypdf.js'));
runCommand('git checkout 5.4.149', 'Error 68: Git checkout failed', 68);
runCommand('npm i', 'Error 68b: npm install failed', 68);
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
// 1) print package name from dist
runCommand("node -e \"console.log('name in dist:', require('./ngx-extended-pdf-viewer/package.json').name)\"", 'Error: failed to read dist package name', 91);

// 2) show the registry
runCommand('npm config get registry', 'Error: failed to read npm registry', 92);

// 3) ping npm
runCommand('npm ping', 'Error: npm ping failed', 93);

console.log('\n📤 Publishing to npm with provenance...');
runCommand('npm publish --provenance --access public', 'Error 55: npm publish failed', 55);
const distPkg = require('../dist/ngx-extended-pdf-viewer/package.json');
console.log('dist name:', distPkg.name);

runCommand('npm config get registry');
process.chdir(path.join('..', '..'));

console.log('\n✅ Library published successfully with provenance!');
console.log(`Published version: ${version}`);
console.log(`View on npm: https://www.npmjs.com/package/ngx-extended-pdf-viewer`);
