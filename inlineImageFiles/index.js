const base64Img = require('base64-img');
const fs = require('fs');

const lineReader = require('readline').createInterface({
  input: fs.createReadStream('../../mozillas-pdf.js/build/generic/web/viewer.css')
});

let result = '';

lineReader
  .on('line', function(line) {
    let start = line.indexOf('url');
    if (start >= 0) {
      start = line.indexOf('(', start);
      let end = line.indexOf(')');
      let url = line.substring(start + 1, end);
      if (url.startsWith("'")) {
        url = url.substring(1, url.length - 1);
      }
      if (url.startsWith('"')) {
        url = url.substring(1, url.length - 1);
      }
      if (!url.startsWith('data:')) {
        url = '../../mozillas-pdf.js/build/generic/web/' + url;
        const data = base64Img.base64Sync(url);
        line = line.substring(0, start) + "('" + data + "'" + line.substring(end);
      }
    }
    if (line.includes('z-index: 99;')) {
      line = line.replace('99', '1');
    } else if (line.includes('z-index: 100;')) {
      line = line.replace('100', '2');
    } else if (line.includes('z-index: 199;')) {
      line = line.replace('199', '3');
    } else if (line.includes('z-index: 200;')) {
      line = line.replace('200', '4');
    } else if (line.includes('z-index: 1000;')) {
      line = line.replace('1000', '5');
    } else if (line.includes('z-index: 10000;')) {
      line = line.replace('10000', '6');
    } else if (line.includes('z-index: 30000;')) {
      line = line.replace('30000', '7');
    } else if (line.includes('z-index: 40000;')) {
      line = line.replace('40000', '8');
    } else if (line.includes('z-index: 50000;')) {
      line = line.replace('50000', '9');
    } else if (line.includes('html {')) {
      line = line.replace('html {', '.html {');
    } else if (line === '* {') {
      line = line.replace('* {', '.html * {');
    } else if (line.includes(' body {')) {
      // do nothing
    } else if (line.includes('body {')) {
      line = line.replace('body {', '.body {');
    } else if (line.includes('body,')) {
      line = line.replace('body,', '.body,');
    } else if (line.includes('-webkit-inner-spin-button')) {
      // do nothing
    } else if (line === 'input,') {
      line = line.replace('input,', '.pdf-viewer input,');
    } else if (line.includes('button,')) {
      line = line.replace('button,', '.pdf-viewer button,');
    } else if (line === 'select {') {
      line = line.replace('select', '.pdf-viewer select');
    }
    result += line + '\n';
  })
  .on('close', function() {
    fs.writeFile('../projects/ngx-extended-pdf-viewer/src/lib/viewer-with-images.css', result, function(err) {
      if (err) {
        return console.log(err);
      }

      console.log('The file was saved!');
    });
  });
