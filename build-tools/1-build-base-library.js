const path = require('path');
const { execSync } = require('child_process');

// Navigate to the root directory
process.chdir(path.join(__dirname, '..'));

// Write version number to base library
require('./base-library/write-version-number-to-base-library.js');

// Update Mozilla's PDF viewer
const quickMode = process.argv.includes('--quick') ? 'quick' : '';
try {
  execSync(`node ./build-tools/base-library/updateMozillasPdfViewer.js ${quickMode}`, { stdio: 'inherit', shell: true });
} catch (error) {
  console.error('Error: updateMozillasPdfViewer.js failed');
  process.exit(1);
}
console.log('Base library build completed successfully.');
