// build/updateMozillasPdfViewer.js
const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs-extra');
const glob = require('glob');

// Function to execute a command and handle errors
function runCommand(command, errorMessage) {
  try {
    execSync(command, { stdio: 'inherit', shell: true });
  } catch (error) {
    console.error(errorMessage);
    process.exit(1);
  }
}

function copyFilesWithoutRecursion(sourceDir, targetDir) {
  const files = fs.readdirSync(sourceDir);
  files.forEach((file) => {
    const sourcePath = path.join(sourceDir, file);
    const destPath = path.join(targetDir, file);
    if (fs.statSync(sourcePath).isFile()) {
      fs.copySync(sourcePath, destPath);
    }
  });
}

// Navigate to mypdf.js directory
process.chdir(path.join(__dirname, '..', '..', '..', 'mypdf.js'));

// Clean build directory
fs.removeSync('build');

// Determine folder and branch
let FOLDER = 'assets';
const BRANCH = execSync('git rev-parse --abbrev-ref HEAD', { encoding: 'utf8' }).trim();
if (BRANCH === 'bleeding-edge') {
  FOLDER = 'bleeding-edge';
}

// Build based on argument
if (process.argv[2] === 'quick') {
  runCommand('gulp generic', 'Gulp generic failed');
} else {
  runCommand('gulp generic && gulp minified && gulp generic-legacy', 'Gulp build failed');
}

// Rename files
const renameOperations = [
  ['build/generic-legacy/build/pdf.sandbox.mjs', 'build/generic-legacy/build/pdf.sandbox-es5.mjs'],
  ['build/generic-legacy/build/pdf.worker.mjs', 'build/generic-legacy/build/pdf.worker-es5.mjs'],
  ['build/generic-legacy/web/viewer.mjs', 'build/generic-legacy/web/viewer-es5.mjs'],
  // ['build/minified/build/pdf.sandbox.min.mjs', 'build/minified/build/pdf.sandbox.min.mjs'],
  // ['build/minified/build/pdf.worker.min.mjs', 'build/minified/build/pdf.worker.min.mjs'],
  ['build/minified/web/viewer.mjs', 'build/minified/web/viewer.min.mjs'],
];

renameOperations.forEach(([oldPath, newPath]) => {
  fs.moveSync(oldPath, newPath, { overwrite: true });
});

// Navigate back to ngx-extended-pdf-viewer
process.chdir(path.join('..', 'ngx-extended-pdf-viewer'));

// Remove and copy files (they may bear the old version number, so they're not always overwritten)
const targetDir = path.join('projects', 'ngx-extended-pdf-viewer', FOLDER);
const pdfFiles = glob.sync(path.join(targetDir, 'pdf*.mjs'));
pdfFiles.forEach((file) => fs.removeSync(file));
const viewerFiles = glob.sync(path.join(targetDir, 'viewer*.mjs'));
viewerFiles.forEach((file) => fs.removeSync(file));

fs.copySync(path.join('..', 'mypdf.js', 'build', 'minified', 'web', 'locale'), path.join(targetDir, 'locale'));
copyFilesWithoutRecursion(path.join('..', 'mypdf.js', 'build', 'minified', 'web', 'cmaps'), path.join(targetDir, 'cmaps'));
copyFilesWithoutRecursion(path.join('..', 'mypdf.js', 'build', 'minified', 'web', 'standard_fonts'), path.join(targetDir, 'standard_fonts'));

copyFilesWithoutRecursion(path.join('..', 'mypdf.js', 'build', 'generic', 'build'), targetDir);
copyFilesWithoutRecursion(path.join('..', 'mypdf.js', 'build', 'generic', 'web'), targetDir);
copyFilesWithoutRecursion(path.join('..', 'mypdf.js', 'build', 'minified', 'build'), targetDir);
copyFilesWithoutRecursion(path.join('..', 'mypdf.js', 'build', 'minified', 'web'), targetDir);
copyFilesWithoutRecursion(path.join('..', 'mypdf.js', 'build', 'generic-legacy', 'build'), targetDir);
copyFilesWithoutRecursion(path.join('..', 'mypdf.js', 'build', 'generic-legacy', 'web'), targetDir);

console.log(targetDir);
fs.removeSync(path.join(targetDir, 'debugger.mjs'));
fs.removeSync(path.join(targetDir, 'debugger.css'));
fs.removeSync(path.join(targetDir, 'compressed.tracemonkey-pldi-09.pdf'));

// Remove all CSS files
const cssFiles = glob.sync(path.join(targetDir, '*.css'));
cssFiles.forEach((file) => fs.removeSync(file));

// remove all HTML files
const htmlFiles = glob.sync(path.join(targetDir, '*.html'));
htmlFiles.forEach((file) => fs.removeSync(file));

// Run additional scripts
runCommand('node build-tools/addBaseLanguages/add-additional-translations.js ' + FOLDER, 'Adding additional translations failed');
runCommand('node build-tools/add-version-number-to-file-name/run-outside-ngzone.js', 'Running outside ngzone failed');
runCommand('node build-tools/add-version-number-to-file-name/add-version-number.js ' + process.argv[2], 'Adding version number failed');

if (BRANCH !== 'bleeding-edge') {
  console.log('Generating types');
  process.chdir(path.join('..', 'mypdf.js'));
  runCommand('gulp types', 'Generating types failed');
  process.chdir(path.join('..', 'ngx-extended-pdf-viewer'));
  fs.copySync(path.join('..', 'mypdf.js', 'build', 'types'), path.join('projects', 'ngx-extended-pdf-viewer', 'types'));
}

console.log('Mozilla PDF viewer updated successfully');
