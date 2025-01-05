const path = require('path');

// Navigate to the root directory
process.chdir(path.join(__dirname, '..'));

// Write version number to base library
require('./base-library/write-version-number-to-base-library.js');

// Update Mozilla's PDF viewer
require('./base-library/updateMozillasPdfViewer.js');
console.log('Base library build completed successfully.');
