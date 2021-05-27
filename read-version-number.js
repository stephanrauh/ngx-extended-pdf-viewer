const fs = require('fs');

const packageJsonFile = fs.readFileSync('./projects/ngx-extended-pdf-viewer/package.json');
const packageJson = JSON.parse(packageJsonFile);
const version = packageJson['version'];
console.log(version);
