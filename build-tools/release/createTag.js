// build/createTag.js
//
// The manual counterpart to the push/tag half of 5-1-prepare-release.js, for a release that had to
// be finished by hand. It reads the same release-config.json, so it behaves correctly on a
// maintenance line too, and it pushes in the same order - see the note further down.
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const { loadReleaseConfig, describeReleaseConfig } = require('./release-config');

const releaseConfig = loadReleaseConfig();
const STABLE_BRANCH = releaseConfig.forkStableBranch;
const BLEEDING_EDGE_BRANCH = releaseConfig.forkBleedingEdgeBranch;
const IS_MAINTENANCE_RELEASE = releaseConfig.isMaintenanceRelease;
console.log(describeReleaseConfig(releaseConfig));

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

// Commit the library, but do not tag it yet. Pushing the library tag is what starts the publish
// workflow, and that workflow builds the engine from the fork's branch tip - so mypdf.js has to be
// on GitHub first. The other order publishes the previous engine under a pdf-default-options.ts
// naming the new one, and nothing downstream catches it.
runCommand(`git commit -a -m "published ${version}"`, 'Error committing changes:');
console.log('Committed changes.');

// Update mypdf.js repository
process.chdir(path.join('..', 'mypdf.js'));

// Push the bleeding-edge branch. Skipped on a maintenance line: that branch belongs to the next
// major, so committing and tagging a patch version onto it would misrepresent what it contains.
if (!IS_MAINTENANCE_RELEASE) {
  runCommand(`git checkout ${BLEEDING_EDGE_BRANCH}`, `Error checking out ${BLEEDING_EDGE_BRANCH} branch:`);
  console.log(`Checked out ${BLEEDING_EDGE_BRANCH} branch.`);
  runCommand(`git commit -a -m "published ${version}"`, `Error committing changes in mypdf.js ${BLEEDING_EDGE_BRANCH}:`);
  console.log('Committed changes in mypdf.js.');
  runCommand('git push', 'Error pushing changes in mypdf.js:');
  console.log('Pushed changes in mypdf.js.');

  runCommand(
    `git tag -a "ngx-extended-pdf-viewer-${version}-bleeding-edge" -m "ngx-extended-pdf-viewer ${version}"`,
    'Error creating bleeding-edge tag in mypdf.js:',
  );
  console.log(`Created bleeding-edge tag: ngx-extended-pdf-viewer-${version}-bleeding-edge`);
  runCommand('git push origin --tags', 'Error pushing bleeding-edge tag in mypdf.js:');
  console.log('Pushed bleeding-edge tag in mypdf.js.');
} else {
  console.log("⏭️  Skipped pushing/tagging the fork's bleeding-edge branch (maintenance release)");
}

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

// Leave the fork on the branch the next build expects: bleeding-edge on a normal line, the stable
// branch on a maintenance line, where bleeding-edge is not part of the release at all.
if (!IS_MAINTENANCE_RELEASE) {
  runCommand(`git checkout ${BLEEDING_EDGE_BRANCH}`, `Error switching back to ${BLEEDING_EDGE_BRANCH}:`);
  console.log(`Switched back to ${BLEEDING_EDGE_BRANCH} branch.`);
}

// The fork is public now - push the library and tag it. The tag push starts the release.
process.chdir(path.join('..', 'ngx-extended-pdf-viewer'));
runCommand('git push', 'Error pushing changes:');
console.log('Pushed changes.');
runCommand(`git tag -a ${version} -m "${version}"`, 'Error creating tag:');
console.log(`Created tag: ${version}`);
runCommand('git push origin --tags', 'Error pushing tags:');
console.log('Pushed tags.');

console.log('Tag creation and pushing completed successfully.');
