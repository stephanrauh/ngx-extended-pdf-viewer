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
runCommand('npm run build', 'Error 70: Building schematics failed', 70);
process.chdir('../..');

// Link the built library
runCommand('npm link ./dist/ngx-extended-pdf-viewer', 'Error 70: Linking library failed', 70);

// Create or navigate to test project
if (!fs.existsSync(path.join('..', 'test'))) {
  process.chdir('..');
  runCommand('ng new test --routing=false --style=css', 'Error 70: Creating test project failed', 70);
  process.chdir('test');
} else {
  process.chdir(path.join('..', 'test'));
}

// Link the library in the test project
runCommand('npm link ../ngx-extended-pdf-viewer/dist/ngx-extended-pdf-viewer', 'Error 70: Linking library in test project failed', 70);

// Stash any changes in the test project
runCommand('git stash', 'Error 70: Git stash failed', 70);

// Install dependencies
runCommand('npm i', 'Error 70: npm install failed', 70);

// Add ngx-extended-pdf-viewer to the test project
runCommand('ng add ngx-extended-pdf-viewer', 'Error 71: ng add failed', 71);

console.log('Schematics test completed successfully');
