const fs = require('fs');

const packageJsonFile = fs.readFileSync('./projects/ngx-extended-pdf-viewer/package.json');
const packageJson = JSON.parse(packageJsonFile);
const version = packageJson['version'];
const lastDot = version.lastIndexOf('.');
const lastDigit = version.substring(lastDot+1);
const newVersion = version.substring(0, lastDot+1) +  (Number(lastDigit) + 1);
const newPackageJsonFile = packageJsonFile.toString().replace(version, newVersion);
fs.writeFileSync('./projects/ngx-extended-pdf-viewer/package.json', newPackageJsonFile);
