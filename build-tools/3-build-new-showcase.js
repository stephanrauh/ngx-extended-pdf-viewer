// build-tools/3-build-new-showcase.js
const { execSync } = require('child_process');
const path = require('path');

// Navigate to the root directory
process.chdir(path.join(__dirname, '..'));

// Function to execute a command and handle errors
function runCommand(command, errorMessage) {
  try {
    execSync(command, { stdio: 'inherit', shell: true });
  } catch (error) {
    console.error(errorMessage);
    process.exit(30);
  }
}

// Build search index
runCommand('node ./build-tools/showcase/build-search-index.js', 'Error 30: Building search index failed');

// Write version numbers to showcase
runCommand('node ./build-tools/showcase/write-version-numbers-to-showcase.js', 'Error 30: Writing version numbers failed');

// Check if --open or -o flag is provided
const openFlag = process.argv.includes('--open') || process.argv.includes('-o');

// Build the showcase
runCommand('npx ng build showcase --configuration production --base-href /relaunch/', 'Error 30: Building new showcase failed');

console.log('Showcase built successfully');
