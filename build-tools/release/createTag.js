// build/createTag.js
const { execSync } = require('child_process');

// Keep in sync with STABLE_BRANCH in 5-1-prepare-release.js / 5-2-release-library-ci.js.
const STABLE_BRANCH = '6.1';
const fs = require('fs');
const path = require('path');

function runCommand(command, errorMessage) {
  try {
    const result = execSync(command, { encoding: 'utf8', stdio: 'pipe' }).trim();
    console.log(`Ran command: ${command}`);
    console.log(`Result: ${result}`);
    return result;
  } catch (error) {
    // ignore errors on git commit because if it reports an error if there's nothing to commit
    if (!command.includes('git commit')) {
      console.error(errorMessage, error.message);
      process.exit(1);
    }
  }
}

// Navigate to the root directory
process.chdir(path.join(__dirname, '..', '..'));
console.log(path.join(__dirname, '..', '..'));

// Read the version from package.json
const packageJson = JSON.parse(fs.readFileSync(path.join('projects', 'ngx-extended-pdf-viewer', 'package.json'), 'utf8'));
const version = packageJson.version;

// Commit all changes
runCommand(`git commit -a -m "published ${version}"`, 'Error committing changes:');
console.log('Committed changes.');
runCommand('git push', 'Error pushing changes:');
console.log('Pushed changes.');

// Create and push the tag
runCommand(`git tag -a ${version} -m "${version}"`, 'Error creating tag:');
console.log(`Created tag: ${version}`);
runCommand('git push origin --tags', 'Error pushing tags:');
console.log('Pushed tags.');

// Update mypdf.js repository
process.chdir(path.join('..', 'mypdf.js'));

runCommand(`git commit -a -m "published ${version}"`, 'Error committing changes in mypdf.js: git commit -a -m "published ${version}"');

// Checkout bleeding-edge branch
runCommand('git checkout bleeding-edge', 'Error checking out bleeding-edge branch:');
console.log('Checked out bleeding-edge branch.');
// Commit changes in mypdf.js
runCommand(`git commit -a -m "published ${version}"`, 'Error committing changes in mypdf.js: git commit -a -m "published ${version}"');
console.log('Committed changes in mypdf.js.');
runCommand('git push', 'Error pushing changes in mypdf.js:');
console.log('Pushed changes in mypdf.js.');

// Create and push tag for bleeding-edge
runCommand(
  `git tag -a "ngx-extended-pdf-viewer-${version}-bleeding-edge" -m "ngx-extended-pdf-viewer ${version}"`,
  'Error creating bleeding-edge tag in mypdf.js:',
);
console.log(`Created bleeding-edge tag: ngx-extended-pdf-viewer-${version}-bleeding-edge`);
runCommand('git push origin --tags', 'Error pushing bleeding-edge tag in mypdf.js:');
console.log('Pushed bleeding-edge tag in mypdf.js.');

// Checkout the stable branch
runCommand(`git checkout ${STABLE_BRANCH}`, `Error checking out ${STABLE_BRANCH} branch:`);
console.log(`Checked out ${STABLE_BRANCH} branch.`);
// Commit changes in the stable branch
runCommand(`git commit -a -m "published ${version}"`, `Error committing changes in ${STABLE_BRANCH} branch:`);
console.log(`Committed changes in ${STABLE_BRANCH} branch.`);
runCommand('git push', `Error pushing changes in ${STABLE_BRANCH} branch:`);
console.log(`Pushed changes in ${STABLE_BRANCH} branch.`);

// Create and push tag for the stable branch
runCommand(`git tag -a "ngx-extended-pdf-viewer-${version}" -m "ngx-extended-pdf-viewer ${version}"`, `Error creating ${STABLE_BRANCH} tag in mypdf.js:`);
console.log(`Created ${STABLE_BRANCH} tag: ngx-extended-pdf-viewer-${version}`);
runCommand('git push origin --tags', `Error pushing ${STABLE_BRANCH} tag in mypdf.js:`);
console.log(`Pushed ${STABLE_BRANCH} tag in mypdf.js.`);

// Switch back to bleeding-edge
runCommand('git checkout bleeding-edge', 'Error switching back to bleeding-edge:');
console.log('Switched back to bleeding-edge branch.');

console.log('Tag creation and pushing completed successfully.');
