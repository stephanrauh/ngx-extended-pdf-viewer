const fs = require('fs');

const extendedPdfViewerJsonFile = fs.readFileSync('./projects/ngx-extended-pdf-viewer/package.json');
const extendedPdfViewerJson = JSON.parse(extendedPdfViewerJsonFile);
const extendedPdfViewer = extendedPdfViewerJson['version'];

const ngxVersion = `export const ngxExtendedPdfViewerVersion = '${extendedPdfViewer}';`;
fs.writeFileSync('../mypdf.js/web/ngx-extended-pdf-viewer-version.js', ngxVersion);
