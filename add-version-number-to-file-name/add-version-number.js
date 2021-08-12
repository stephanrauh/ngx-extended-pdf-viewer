const fs = require('fs');
const originalOptions = fs.readFileSync('../projects/ngx-extended-pdf-viewer/src/lib/options/pdf-default-options.ts').toString();
let options = originalOptions;

function fixVersionNumber(folder="assets") {
  const f = '../projects/ngx-extended-pdf-viewer/' + folder + "/";
  if (fs.existsSync(f+'pdf.js')) {
    const pdfjs = fs.readFileSync(f+'pdf.js').toString();
    let pdfjsVersion = pdfjs.match(/pdfjsVersion = \'.+\'/g)[0].match(/\'.+\'/g)[0];
    pdfjsVersion = pdfjsVersion.substring(1, pdfjsVersion.length-1);
    const pdfjsWorker = fs.readFileSync(f+'pdf.worker.js').toString();
    let workerVersion =  pdfjsWorker.match(/pdfjsVersion = \'.+\'/g)[0].match(/\'.+\'/g)[0];
    workerVersion = workerVersion.substring(1, workerVersion.length-1);
    if (workerVersion !== pdfjsVersion) {
      console.error("Version numbers don't match");
      process.exit(-10);
    }
    fs.renameSync(f+'pdf.js', f+`pdf-${pdfjsVersion}.js`);
    fs.renameSync(f+'pdf.min.js', f+`pdf-${pdfjsVersion}.min.js`);
    try {
    fs.renameSync(f+'pdf-es5.js', f+`pdf-${pdfjsVersion}-es5.js`);
    fs.renameSync(f+'pdf-es5.min.js', f+`pdf-${pdfjsVersion}-es5.min.js`);
    } catch (e) {
      console.log("ES5 files are missing");
    }

    try {
    fs.renameSync(f+'pdf.sandbox.js', f+`pdf.sandbox-${pdfjsVersion}.js`);
    fs.renameSync(f+'pdf.sandbox.min.js', f+`pdf.sandbox-${pdfjsVersion}.min.js`);
    fs.renameSync(f+'pdf.sandbox-es5.js', f+`pdf.sandbox-${pdfjsVersion}-es5.js`);
    fs.renameSync(f+'pdf.sandbox-es5.min.js', f+`pdf.sandbox-${pdfjsVersion}-es5.min.js`);
    } catch (e) {}

    fs.renameSync(f+'pdf.worker.js', f+`pdf.worker-${pdfjsVersion}.js`);
    fs.renameSync(f+'pdf.worker.min.js', f+`pdf.worker-${pdfjsVersion}.min.js`);
    try {
    fs.renameSync(f+'pdf.worker-es5.js', f+`pdf.worker-${pdfjsVersion}-es5.js`);
    fs.renameSync(f+'pdf.worker-es5.min.js', f+`pdf.worker-${pdfjsVersion}-es5.min.js`);
    } catch (e) {
      console.log("ES5 files are missing");
    }

    fs.renameSync(f+'viewer.js', f+`viewer-${pdfjsVersion}.js`);
    fs.renameSync(f+'viewer.min.js', f+`viewer-${pdfjsVersion}.min.js`);
    try {
    fs.renameSync(f+'viewer-es5.js', f+`viewer-${pdfjsVersion}-es5.js`);
    fs.renameSync(f+'viewer-es5.min.js', f+`viewer-${pdfjsVersion}-es5.min.js`);
    } catch (e) {
      console.log("ES5 files are missing");
    }

    if (folder === 'assets') {
      options = options.replace(/pdfjsVersion = \'.+\'/g, `pdfjsVersion = '${pdfjsVersion}'`);
    } else {
      options = options.replace(/pdfjsBleedingEdgeVersion = \'.+\'/g, `pdfjsBleedingEdgeVersion = '${pdfjsVersion}'`);

    }
  }
}

fixVersionNumber("assets");
fixVersionNumber("bleeding-edge");
if (options != originalOptions) {
  fs.writeFileSync('../projects/ngx-extended-pdf-viewer/src/lib/options/pdf-default-options.ts', options);
}
