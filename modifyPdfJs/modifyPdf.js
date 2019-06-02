const fs = require('fs');

const lineReader = require('readline').createInterface({
  input: fs.createReadStream('../../mozillas-pdf.js/build/generic/build/pdf.js')
});

let result = '';

let dropLines = 0;
lineReader
  .on('line', function(line) {
    if (dropLines > 0) {
      dropLines--;
      console.log('Dropping ' + line);
    } else {
      if (line.includes("var fs = require('fs');")) {
        line = '';
      } else if (line.includes("var http = require('http');")) {
        line = '';
      } else if (line.includes("var https = require('https');")) {
        line = '';
      } else if (line.includes("var output = require('zlib').deflateSync(input, {")) {
        line = 'throw Error("zlib not available in the browser");';
        dropLines = 2;
      } else if (line.includes('//# sourceMappingURL=pdf.js.map')) {
        line = ''; // the file hasn't been minified, so there's not source map
      }

      result += line + '\n';
    }
  })
  .on('close', function() {
    fs.writeFile('../projects/ngx-extended-pdf-viewer/src/assets/pdf-2.2.199.js', result, function(err) {
      if (err) {
        return console.log(err);
      }

      console.log('The file was saved to ../projects/ngx-extended-pdf-viewer/src/assets/pdf-2.2.199.js!');
    });
  });
