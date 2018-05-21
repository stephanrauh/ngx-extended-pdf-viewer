const base64Img = require('base64-img');
const fs = require('fs');

const lineReader = require('readline').createInterface({
  input: fs.createReadStream('viewer.css')
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
      if (!url.startsWith('data:')) {
        const data = base64Img.base64Sync(url);
        line = line.substring(0, start) + "('" + data + "'" + line.substring(end);
      }
    }
    result += line + '\n';
  })
  .on('close', function() {
    fs.writeFile('./viewer-with-images.css', result, function(err) {
      if (err) {
        return console.log(err);
      }

      console.log('The file was saved!');
    });
  });
