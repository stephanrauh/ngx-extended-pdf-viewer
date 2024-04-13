const fs = require('fs');

function updateVersionNumber(file, replacementVersion) {
  if (fs.existsSync(file)) {
    // console.log('Updating version number in', file, 'to version', replacementVersion);
    const js = fs.readFileSync(file).toString();

    let regex = /(ngxExtendedPdfViewerVersion\s*=\s*')\d+\.\d+\.\d+.*(')/;
    let modifiedString = js.replace(regex, `$1${replacementVersion}$2`);
    if (modifiedString !== js) {
      console.log('Updated version number', file);
    } else {
      let regex = /(ngxExtendedPdfViewerVersion:\(\)=>.*")\d+\.\d+\.\d+.{0-10}("\},)\d/;
      modifiedString = js.replace(regex, `$1${replacementVersion}$2`);
    }
    if (modifiedString !== js) {
      console.log('Updated version number', file);
      fs.writeFileSync(file, modifiedString);
    } else {
      console.log('Version number already up to date', file);
    }
  }
}

function getMatchingFiles(directoryPath, pattern) {
  try {
    const files = fs.readdirSync(directoryPath);
    const matchingFiles = files.filter((file) => file.startsWith(pattern)).filter((file) => file.endsWith('.mjs'));
    return matchingFiles;
  } catch (err) {
    throw err;
  }
}

const packageJsonFile = fs.readFileSync('./projects/ngx-extended-pdf-viewer/package.json');
const packageJson = JSON.parse(packageJsonFile);
const currentVersion = packageJson['version'];
console.log('Updating the version number of the viewer*.mjs files to ', currentVersion);

let matchingFiles = getMatchingFiles('./projects/ngx-extended-pdf-viewer/assets', 'viewer-');

matchingFiles.forEach((file) => {
  updateVersionNumber(`./projects/ngx-extended-pdf-viewer/assets/${file}`, currentVersion);
});

matchingFiles = getMatchingFiles('./projects/ngx-extended-pdf-viewer/bleeding-edge', 'viewer-');

matchingFiles.forEach((file) => {
  updateVersionNumber(`./projects/ngx-extended-pdf-viewer/bleeding-edge/${file}`, currentVersion);
});
