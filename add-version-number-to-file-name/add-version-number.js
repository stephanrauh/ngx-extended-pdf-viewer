const fs = require('fs');
const originalOptions = fs.readFileSync('../projects/ngx-extended-pdf-viewer/src/lib/options/pdf-default-options.ts').toString();
let options = originalOptions;

function fixVersionNumber(folder = 'assets', suffix = '.mjs') {
  const f = '../projects/ngx-extended-pdf-viewer/' + folder + '/';
  if (fs.existsSync(f + 'pdf' + suffix)) {
    const pdfjs = fs.readFileSync(f + 'pdf' + suffix).toString();

    let pattern = /pdfjsVersion\s?=\s?\'.+\'/g;
    if (!pdfjs.match(pattern)) {
      pattern = /pdfjsVersion\s?=\s?\".+\"/g;
    }

    let pdfjsVersion = pdfjs.match(pattern)[0].match(/[\'|\"].+?[\'|\"]/g)[0];
    pdfjsVersion = pdfjsVersion.substring(1, pdfjsVersion.length - 1);
    const pdfjsWorker = fs.readFileSync(f + 'pdf.worker' + suffix).toString();
    let workerVersion = pdfjsWorker.match(/pdfjsVersion\s?=\s?[\'|\"].+[\'|\"]/g)[0].match(/[\'|\"].+?[\'|\"]/g)[0];
    workerVersion = workerVersion.substring(1, workerVersion.length - 1);
    if (workerVersion !== pdfjsVersion) {
      console.error("Version numbers don't match");
      process.exit(-10);
    }
    fs.renameSync(f + 'pdf' + suffix, f + `pdf-${pdfjsVersion}${suffix}`);
    try {
      fs.renameSync(f + 'pdf.min' + suffix, f + `pdf-${pdfjsVersion}.min${suffix}`);
      fs.renameSync(f + 'pdf-es5' + suffix, f + `pdf-${pdfjsVersion}-es5${suffix}`);
      fs.renameSync(f + 'pdf-es5.min' + suffix, f + `pdf-${pdfjsVersion}-es5.min${suffix}`);
    } catch (e) {
      console.log('ES5 files are missing');
    }

    fs.renameSync(f + 'pdf.sandbox' + suffix, f + `pdf.sandbox-${pdfjsVersion}${suffix}`);
    try {
      fs.renameSync(f + 'pdf.sandbox.min' + suffix, f + `pdf.sandbox-${pdfjsVersion}.min${suffix}`);
      fs.renameSync(f + 'pdf.sandbox-es5' + suffix, f + `pdf.sandbox-${pdfjsVersion}-es5${suffix}`);
      fs.renameSync(f + 'pdf.sandbox-es5.min' + suffix, f + `pdf.sandbox-${pdfjsVersion}-es5.min${suffix}`);
    } catch (e) {}

    fs.renameSync(f + 'pdf.worker' + suffix, f + `pdf.worker-${pdfjsVersion}${suffix}`);
    try {
      fs.renameSync(f + 'pdf.worker.min' + suffix, f + `pdf.worker-${pdfjsVersion}.min${suffix}`);
      fs.renameSync(f + 'pdf.worker-es5' + suffix, f + `pdf.worker-${pdfjsVersion}-es5${suffix}`);
      fs.renameSync(f + 'pdf.worker-es5.min' + suffix, f + `pdf.worker-${pdfjsVersion}-es5.min${suffix}`);
    } catch (e) {
      console.log('ES5 files are missing');
    }

    fs.renameSync(f + 'viewer' + suffix, f + `viewer-${pdfjsVersion}${suffix}`);
    try {
      fs.renameSync(f + 'viewer.min' + suffix, f + `viewer-${pdfjsVersion}.min${suffix}`);
      fs.renameSync(f + 'viewer-es5' + suffix, f + `viewer-${pdfjsVersion}-es5${suffix}`);
      fs.renameSync(f + 'viewer-es5.min' + suffix, f + `viewer-${pdfjsVersion}-es5.min${suffix}`);
    } catch (e) {
      console.log('ES5 files are missing');
    }

    if (folder === 'assets') {
      options = options.replace(/pdfjsVersion = \'.+\'/g, `pdfjsVersion = '${pdfjsVersion}'`);
    } else {
      options = options.replace(/pdfjsBleedingEdgeVersion = \'.+\'/g, `pdfjsBleedingEdgeVersion = '${pdfjsVersion}'`);
    }
  }
}

fixVersionNumber('assets', '.mjs');
fixVersionNumber('bleeding-edge', '.mjs');
if (options != originalOptions) {
  fs.writeFileSync('../projects/ngx-extended-pdf-viewer/src/lib/options/pdf-default-options.ts', options);
}
