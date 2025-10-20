// Add --quick flag to process.argv so 1-build-base-library.js runs in quick mode
process.argv.push('--quick');

require('./1-build-base-library');

// Remove --quick flag before building the Angular library
const quickIndex = process.argv.indexOf('--quick');
if (quickIndex !== -1) {
  process.argv.splice(quickIndex, 1);
}

require('./2-build-library');
require('./4-1-run-old-showcase');
