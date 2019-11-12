const fs = require('fs');

const lineReader = require('readline').createInterface({
  input: fs.createReadStream('../../mozillas-pdf.js/build/generic/build/pdf.js')
});

let result = '';

let expectedChanges = 8;
let dropLines = 0;
let es2015 = false;
lineReader
  .on('line', function (line) {
    if (dropLines > 0) {
      dropLines--;
      //      console.log('Dropping ' + line);
    } else {
      if (line.includes('let fs')) {
        if (!es2015) console.log('ES 2015 version');
        es2015 = true;
      }
      if (line.includes("var fs = require('fs');") || line.includes("let fs = require('fs');")) {
        line = '';
        expectedChanges--;
      } else if (line.includes("var http = require('http');") || line.includes("let http = require('http');")) {
        line = '';
        expectedChanges--;
      } else if (line.includes("var https = require('https');") || line.includes("let https = require('https');")) {
        expectedChanges--;
        line = '';
      } else if (
        line.includes("var output = require('zlib').deflateSync(input, {") ||
        line.includes("const output = require('zlib').deflateSync(input, {")
      ) {
        expectedChanges--;
        line = 'throw Error("zlib not available in the browser");';
        dropLines = 2;
      } else if (line.includes('pdfjs-dist/build/pdf.worker')) {
        if (es2015) {
          line = line.replace('pdfjs-dist/build/pdf.worker', './assets/pdf.worker');
        } else {
          line = line.replace('pdfjs-dist/build/pdf.worker', './assets/pdf.worker-es5');
        }
        expectedChanges--;
      } else if (line.includes('pdfjs-dist/build/pdf.worker.js')) {
        if (es2015) {
          line = line.replace('pdfjs-dist/build/pdf.worker.js', './assets/pdf.worker.js');
        } else {
          line = line.replace('pdfjs-dist/build/pdf.worker.js', './assets/pdf.worker-es5.js');
        }
        line = line.replace('pdfjs-dist/build/pdf.worker.js', './pdf.worker-2.2.js');
        expectedChanges--;
      } else if (line.includes('./pdf.worker.js')) {
        if (es2015) {
          line = line.replace('./pdf.worker.js', './assets/pdf.worker.js');
        } else {
          line = line.replace('./pdf.worker.js', './assets/pdf.worker-es5.js');
        }
        expectedChanges--;
      } else if (line.includes('//# sourceMappingURL=pdf.js.map')) {
        line = ''; // the file hasn't been minified, so there's no use for a source map
        expectedChanges--;
      /* temporarily deactivated during migration to version 2.3.200
      } else if (line.includes('if (fontSize !== this._layoutTextLastFontSize')) {
        expectedChanges--;
        // dropLines = 7;
        line = '//if (this._layoutTextCtx) {\n';
        line += '//if (fontSize !== this._layoutTextLastFontSize || fontFamily !== this._layoutTextLastFontFamily) {\n';
        line += "//this._layoutTextCtx.font = fontSize + ' ' + fontFamily;\n";
        line += '//this._layoutTextLastFontSize = fontSize;\n';
        line += '//this._layoutTextLastFontFamily = fontFamily;\n';
        line += '//}\n';
        line += '//}\n';
        line += '//let width = this._layoutTextCtx?this._layoutTextCtx.measureText(textDiv.textContent).width:0;\n';
      */
      }

      result += line + '\n';
    }
  })
  .on('close', function () {
    let filename = 'pdf-es5.js';
    if (es2015) {
      filename = 'pdf.js';
    }
    fs.writeFile('../projects/ngx-extended-pdf-viewer/src/assets/' + filename, result, function (err) {
      if (err) {
        return console.log(err);
      }

      console.log('The file was saved to ../projects/ngx-extended-pdf-viewer/src/assets/' + filename);
      if (expectedChanges !== 0) {
        console.error(expectedChanges + " changes couldn't be appied!");
      }
    });
  });
