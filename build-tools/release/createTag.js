// build/createTag.js
const { execSync } = require('child_process');
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

// Checkout 5.4.149 branch
runCommand('git checkout 5.4.149', 'Error checking out 5.4.149 branch:');
console.log('Checked out 5.4.149 branch.');
// Commit changes in 5.4.149 branch
runCommand(`git commit -a -m "published ${version}"`, 'Error committing changes in 5.4.149 branch:');
console.log('Committed changes in 5.4.149 branch.');
runCommand('git push', 'Error pushing changes in 5.4.149 branch:');
console.log('Pushed changes in 5.4.149 branch.');

// Create and push tag for 5.4.149
runCommand(`git tag -a "ngx-extended-pdf-viewer-${version}" -m "ngx-extended-pdf-viewer ${version}"`, 'Error creating 5.4.149 tag in mypdf.js:');
console.log(`Created 5.4.149 tag: ngx-extended-pdf-viewer-${version}`);
runCommand('git push origin --tags', 'Error pushing 5.4.149 tag in mypdf.js:');
console.log('Pushed 5.4.149 tag in mypdf.js.');

// Switch back to bleeding-edge
runCommand('git checkout bleeding-edge', 'Error switching back to bleeding-edge:');
console.log('Switched back to bleeding-edge branch.');

console.log('Tag creation and pushing completed successfully.');
