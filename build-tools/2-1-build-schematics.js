const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Navigate to the root directory
process.chdir(path.join(__dirname, '..'));

// Compile the "ng add ngx-extended-pdf-viewer" schematics
try {
  process.chdir('projects/ngx-extended-pdf-viewer');
  execSync('npm run build', { stdio: 'inherit', shell: true });
} catch (error) {
  console.error('Error 210: Compiling schematics failed');
  process.exit(210);
}

// Copy the schematics to the dist folder
const distPath = path.join('..', '..', 'dist', 'ngx-extended-pdf-viewer', 'schematics');
fs.mkdirSync(distPath, { recursive: true });

// Copy collection.json
fs.copyFileSync(path.join('schematics', 'collection.json'), path.join(distPath, 'collection.json'));

// Copy schema.json files
glob.sync('schematics/**/schema.json').forEach((file) => {
  const destPath = path.join('..', '..', 'dist', 'ngx-extended-pdf-viewer', file);
  fs.mkdirSync(path.dirname(destPath), { recursive: true });
  fs.copyFileSync(file, destPath);
});

// Copy files in the 'files' directories
glob.sync('schematics/**/files/**/*', { nodir: true }).forEach((file) => {
  const destPath = path.join('..', '..', 'dist', 'ngx-extended-pdf-viewer', file);
  fs.mkdirSync(path.dirname(destPath), { recursive: true });
  fs.copyFileSync(file, destPath);
});

// Navigate back to the root directory
process.chdir(path.join('..', '..'));

console.log('Schematics built and copied successfully');
