// build-tools/5-1-prepare-release.js
// This script prepares a release by updating version numbers and pushing changes locally
// The actual npm publish happens in CI via 5-release-library.js

const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

// Function to execute a command and handle errors
function runCommand(command, errorMessage, exitCode) {
  try {
    execSync(command, { stdio: 'inherit', shell: true });
  } catch (error) {
    if (!command.includes('git commit')) {
      console.error(errorMessage);
      process.exit(exitCode);
    }
  }
}

// Navigate to the root directory
process.chdir(path.join(__dirname, '..'));

// Check commit state - ensure everything is clean before starting
runCommand('node ./build-tools/release/check-commit-state.js', 'Error 51: check-commit-state.js failed', 51);

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

// Update version number in mypdf.js 5.4.149 branch
process.chdir(path.join('..', 'mypdf.js'));
runCommand('git checkout 5.4.149', 'Error 59: Git checkout failed', 59);

runCommand(
  'node ../ngx-extended-pdf-viewer/build-tools/base-library/write-version-number-to-base-library.js',
  'Error 62: write-version-number-to-base-library failed at version 5.4.149',
  62,
);

// Commit changes in mypdf.js 5.4.149
runCommand(`git commit . -m "bumped the version number to ${newVersion}"`, 'Error 61: Git commit in mypdf.js failed', 61);

// Update version number in mypdf.js bleeding-edge branch
runCommand('git checkout bleeding-edge', 'Error 63: Git checkout failed', 63);

runCommand(
  'node ../ngx-extended-pdf-viewer/build-tools/base-library/write-version-number-to-base-library.js',
  'Error 64: write-version-number-to-base-library failed at bleeding-edge',
  64,
);

// Commit changes in mypdf.js bleeding-edge
runCommand(`git commit . -m "bumped the version number to ${newVersion}"`, 'Error 65: Git commit in mypdf.js failed', 65);

// Back to ngx-extended-pdf-viewer
process.chdir(path.join('..', 'ngx-extended-pdf-viewer'));

// Build base library from bleeding-edge to update pdf-default-options.ts
console.log('\n🔨 Building base library (bleeding-edge) to update version numbers...');
process.chdir(path.join('..', 'mypdf.js'));
runCommand('git checkout bleeding-edge', 'Error 66: Git checkout failed', 66);
runCommand('rm -rf node_modules', 'Error 66a: Removing node_modules failed', 66);
runCommand('npm ci --ignore-scripts', 'Error 66b: npm install failed', 66);
runCommand('npm audit fix --ignore-scripts || true', 'Error 66c: npm audit fix failed', 66);
runCommand('../ngx-extended-pdf-viewer/build-tools/search-for-shai-hulud.sh --full', 'Error 66d: shai-hulud scan failed', 66);
runCommand('npm rebuild', 'Error 66e: npm rebuild failed', 66);
process.chdir(path.join('..', 'ngx-extended-pdf-viewer'));
runCommand('node ./build-tools/1-build-base-library.js', 'Error 67: build-base-library.js failed for bleeding-edge', 67);

// Clean up package-lock.json changes from audit fix before switching branches
process.chdir(path.join('..', 'mypdf.js'));
runCommand('git reset --hard', 'Error 67a: Git reset failed', 67);

// Build base library from stable branch (5.4.149) to update pdf-default-options.ts
console.log('\n🔨 Building base library (5.4.149) to update version numbers...');
runCommand('git checkout 5.4.149', 'Error 68: Git checkout failed', 68);
runCommand('rm -rf node_modules', 'Error 68a: Removing node_modules failed', 68);
runCommand('npm ci --ignore-scripts', 'Error 68b: npm install failed', 68);
runCommand('npm audit fix --ignore-scripts || true', 'Error 68c: npm audit fix failed', 68);
runCommand('../ngx-extended-pdf-viewer/build-tools/search-for-shai-hulud.sh --full', 'Error 68d: shai-hulud scan failed', 68);
runCommand('npm rebuild', 'Error 68e: npm rebuild failed', 68);
process.chdir(path.join('..', 'ngx-extended-pdf-viewer'));
runCommand('node ./build-tools/1-build-base-library.js', 'Error 69: build-base-library.js failed for 5.4.149', 69);

// Clean up package-lock.json changes from audit fix
process.chdir(path.join('..', 'mypdf.js'));
runCommand('git reset --hard', 'Error 69a: Git reset failed', 69);
process.chdir(path.join('..', 'ngx-extended-pdf-viewer'));

// Commit changes in ngx-extended-pdf-viewer (including updated pdf-default-options.ts)
runCommand(`git commit . -m "bumped the version number to ${newVersion}"`, 'Error 58: Git commit failed', 58);

// Push all changes to ngx-extended-pdf-viewer
runCommand('git push', 'Error 70: Git push failed', 70);

// Create and push tag
runCommand(`git tag -a ${newVersion} -m "${newVersion}"`, 'Error 71: Creating tag failed', 71);
runCommand('git push origin --tags', 'Error 72: Pushing tags failed', 72);

// Push mypdf.js changes and create tags
process.chdir(path.join('..', 'mypdf.js'));

// Push 5.4.149 branch
runCommand('git checkout 5.4.149', 'Error 73: Git checkout failed', 73);
runCommand('git push', 'Error 74: Git push in mypdf.js 5.4.149 failed', 74);
runCommand(`git tag -a "ngx-extended-pdf-viewer-${newVersion}" -m "ngx-extended-pdf-viewer ${newVersion}"`, 'Error 75: Creating 5.4.149 tag failed', 75);
runCommand('git push origin --tags', 'Error 76: Pushing 5.4.149 tags failed', 76);

// Push bleeding-edge branch
runCommand('git checkout bleeding-edge', 'Error 77: Git checkout failed', 77);
runCommand('git push', 'Error 78: Git push in mypdf.js bleeding-edge failed', 78);
runCommand(
  `git tag -a "ngx-extended-pdf-viewer-${newVersion}-bleeding-edge" -m "ngx-extended-pdf-viewer ${newVersion}"`,
  'Error 79: Creating bleeding-edge tag failed',
  79,
);
runCommand('git push origin --tags', 'Error 80: Pushing bleeding-edge tags failed', 80);

console.log('\n✅ Release preparation complete!');
console.log(`Version ${newVersion} has been committed and tagged.`);
console.log('\nNext steps:');
console.log('1. The GitHub Actions workflow will automatically trigger on the new tag');
console.log('2. It will build the library and publish to npm with provenance');
console.log(`3. Monitor the workflow at: https://github.com/stephanrauh/ngx-extended-pdf-viewer/actions`);
