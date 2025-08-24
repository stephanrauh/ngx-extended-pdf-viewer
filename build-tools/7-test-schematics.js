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

// Build ngx-extended-pdf-viewer
runCommand('ng build ngx-extended-pdf-viewer', 'Error 70: Building ngx-extended-pdf-viewer failed', 70);

// Build schematics
process.chdir('projects/ngx-extended-pdf-viewer');
runCommand('npm run build', 'Error 71: Building schematics failed', 70);
process.chdir('../..');

// Create or navigate to test project
if (!fs.existsSync(path.join('..', 'test'))) {
  runCommand('cd .. && pwd && ls -alsi && ng new test --routing=false --style=css', 'Error 73: Creating test project failed', 70);
  process.chdir('../test');
} else {
  process.chdir(path.join('..', 'test'));
}

// Stash any changes in the test project
runCommand('git stash', 'Error 75: Git stash failed', 70);

// Install dependencies
runCommand('npm i', 'Error 76: npm install failed', 70);

// Add ngx-extended-pdf-viewer to the test project
runCommand('ng g ../ngx-extended-pdf-viewer/dist/ngx-extended-pdf-viewer:ng-add', 'Error 77: ng add failed', 71);

console.log('Schematics test completed successfully');
