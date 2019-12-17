const fs = require('fs');

const lineReader = require('readline').createInterface({
  input: fs.createReadStream('../../mozillas-pdf.js/build/generic/build/pdf.worker.js')
});

let result = '';
let expectedChanges = 12;

let dropLines = 0;
currentFunction = '';
let printKeyDownListener = false;
let unregisterPrintOverlayDone = false;
let es2015 = false;
let lines = [];
lineReader
  .on('line', function(line) {
    lines.push(line);
    if (line.includes('function ') || line.startsWith('class ')) {
      if (line.startsWith('class ')) {
        if (!es2015) {
          console.log('ES 2015 version');
          // expectedChanges -= 4;
        }
        es2015 = true;
      }
    }
  })
  .on('close', function() {
    convertLines();
    const filename = es2015 ? 'pdf.worker.js' : 'pdf.worker-es5.js';
    fs.writeFile('../projects/ngx-extended-pdf-viewer/src/assets/' + filename, result, function(err) {
      if (err) {
        return console.log(err);
      }

      console.log('The file was saved to ../projects/ngx-extended-pdf-viewer/src/assets/' + filename);
      if (expectedChanges !== 0) {
        console.error(expectedChanges + " changes couldn't be appied!");
      }
    });
  });

function convertLines() {
  lines.forEach(line => {
    if (dropLines > 0) {
      dropLines--;
      //      console.log('Dropping ' + line);
    } else {
      if (line.includes('function ') || line.startsWith('class ')) {
        currentFunction = line;
      }
      if (line.includes("return workerHandlerName;")) {
        const before = `    // #171 receive options from ngx-extended-pdf-viewer
    handler.on('showUnverifiedSignatures', function wphReady(data) {
      console.log("showUnverifiedSignatures " + data);
      self.showUnverifiedSignatures = data;
    });
    // #171 end of receive options from ngx-extended-pdf-viewer
`;
        line = before + line;
        expectedChanges--;
      } else if (line.includes('.setFlags(_util.AnnotationFlag.HIDDEN)')) {
        const before = `      // #171 modification start
      if (!self.showUnverifiedSignatures) {
  `;
        line = before + line + `
        console.log("The PDF file contains a signature. Please take into account that it can't be verified yet.");
      }
    // #171 modification end`;
        expectedChanges--;
      } else if (line.includes('"TT: ')) {
        line = line.replace('"TT: ', 'The embedded font contains errors: TT: ');
        expectedChanges--;
      }
      if (line != null) {
        result += line + '\n';
      }
    }
  });
}
