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

// Build showcase
runCommand('npm run build:showcase', 'Error 60: Building showcase failed', 60);

// Copy .htaccess file
const htaccessSrc = path.join('ftp', '.htaccess');
const htaccessDest = path.join('dist', 'showcase', 'browser', '.htaccess');
fs.copyFileSync(htaccessSrc, htaccessDest);

// Change to ftp directory and upload
process.chdir('ftp');
runCommand('npx tsx upload.ts', 'Error 61: Uploading showcase failed', 61);

console.log('Showcase released successfully');
