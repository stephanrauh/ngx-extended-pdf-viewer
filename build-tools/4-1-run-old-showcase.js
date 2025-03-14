// build-tools/4-build-old-showcase.js
const { execSync } = require('child_process');
const path = require('path');

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

// Navigate to the extended-pdf-viewer-showcase directory
process.chdir(path.join('..', 'extended-pdf-viewer-showcase'));

// Run prebuild
runCommand('npm run prebuild', 'Error 40: Prebuild failed', 40);

// Check if --open or -o flag is provided
const openFlag = process.argv.includes('--open') || process.argv.includes('-o');

runCommand('npx ng serve --host 0.0.0.0 --open', 'Error 40: Serving old showcase failed', 40);
