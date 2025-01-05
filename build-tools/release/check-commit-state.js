// build/check-commit-state.js
const { execSync } = require('child_process');
const path = require('path');

function checkGitStatus(directory) {
  try {
    process.chdir(directory);
    const status = execSync('git status --porcelain', { encoding: 'utf8' });
    if (status.trim() !== '') {
      console.error(`There are uncommitted files in ${directory}`);
      process.exit(1);
    }
  } catch (error) {
    console.error(`Error checking git status in ${directory}:`, error.message);
    process.exit(1);
  }
}

// Navigate to the root directory of ngx-extended-pdf-viewer
const rootDir = path.join(__dirname, '../..');
process.chdir(rootDir);

// Check ngx-extended-pdf-viewer repository
checkGitStatus(rootDir);

// Check mypdf.js repository
const mypdfDir = path.join(rootDir, '..', 'mypdf.js');
checkGitStatus(mypdfDir);

console.log('All files are committed.');
