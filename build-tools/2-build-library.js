const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Change to the root directory
process.chdir(path.join(__dirname, '..'));

// Remove dist directory
try {
  fs.rmSync('dist', { recursive: true, force: true });
} catch (error) {
  // console.error('Error removing dist directory:', error);
}

// Compile SASS
try {
  execSync('npx ts-node ./build-tools/viewer/compile-sass.ts', { stdio: 'inherit', shell: true });
  console.log('CSS built successfully');
} catch (error) {
  console.error('Error 20: Building CSS failed');
  process.exit(20);
}

// Build library
try {
  execSync(`npx ng build ngx-extended-pdf-viewer --configuration production ${process.argv[2] || ''}`, { stdio: 'inherit', shell: true });
} catch (error) {
  console.error('Error 21: Building library failed');
  process.exit(21);
}

// Pack library
try {
  execSync('npx ng-packagr -p projects/ngx-extended-pdf-viewer/ng-package.json', { stdio: 'inherit', shell: true });
} catch (error) {
  console.error('Error 22: Packing library failed');
  process.exit(22);
}

// Build schematics
try {
  execSync('node ./build-tools/2-1-build-schematics.js', { stdio: 'inherit', shell: true });
} catch (error) {
  console.error('Error 23: Building schematics failed');
  process.exit(23);
}

// Copy library to old showcase
const showcasePath = path.join('..', 'extended-pdf-viewer-showcase', 'node_modules', 'ngx-extended-pdf-viewer');
try {
  fs.rmSync(showcasePath, { recursive: true, force: true });
  fs.cpSync(path.join('dist', 'ngx-extended-pdf-viewer'), showcasePath, { recursive: true });
} catch (error) {
  console.error('Error 24: Copying library to old showcase failed');
  process.exit(24);
}

console.log('Build completed successfully');
