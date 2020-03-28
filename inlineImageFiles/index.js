const base64Img = require('base64-img');
const fs = require('fs');

const lineReader = require('readline').createInterface({
  input: fs.createReadStream('../../mozillas-pdf.js/build/generic/web/viewer.css')
});

const ignore=[
  '.toolbarButton.findPrevious::before',
  '.toolbarButton.findNext::before',
  '.toolbarButton.pageDown::before',
  '.toolbarButton.pageUp::before',
  '#viewFind.toolbarButton::before',
  'toolbarButton.presentationMode::before',
  '.toolbarButton.openFile::before',
  '.toolbarButton.print::before',
  '.toolbarButton.download::before',
  '.toolbarButton.bookmark::before',
  '.toolbarButton#secondaryToolbarToggle::before',
  '.toolbarButton#sidebarToggle::before',
  '.secondaryToolbarButton.firstPage::before',
  '.secondaryToolbarButton.lastPage::before',
  '.secondaryToolbarButton.rotateCw::before',
  '.secondaryToolbarButton.rotateCcw::before'
  ];

let result = '';

let ignoring = false;
let count = 0;

lineReader
  .on('line', function(line) {
    let start = line.indexOf('url');
    ignoring |= ignore.some(identifier => line.includes(identifier));
    if (ignoring) {
      if (line.includes('}')) {
        ignoring = false;
        count++;
      }
    } else {
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
      if (line.includes('.secondaryToolbarButton.selectTool::before')) {
        line = '.toolbarButton.selectTool::before, ' + line;
      } else if (line.includes('.secondaryToolbarButton.handTool::before')) {
        line = '.toolbarButton.handTool::before, ' + line;
      }
      else if (line.includes('z-index: 99;')) {
        line = line.replace('99', '1');
      } else if (line.includes('z-index: 100;')) {
        line = line.replace('100', '2');
      } else if (line.includes('z-index: 199;')) {
        line = line.replace('199', '3');
      } else if (line.includes('z-index: 200;')) {
        line = line.replace('200', '4');
      } else if (line.includes('z-index: 1000;')) {
        line = line.replace('1000', '5');
      } else if (line.includes('z-index: 9999;')) {
        line = line.replace('9999', '7');
      } else if (line.includes('z-index: 10000;')) {
        line = line.replace('10000', '7');
      } else if (line.includes('z-index: 30000;')) {
        line = line.replace('30000', '8');
      } else if (line.includes('z-index: 40000;')) {
        line = line.replace('40000', '9');
      } else if (line.includes('z-index: 50000;')) {
        line = line.replace('50000', '10');
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
      } else if (line === '#overlayContainer > .container > .dialog {') {
        line = line.replace('#overlayContainer > .container > .dialog', '#overlayContainer > .container .dialog');
      }
      line = line.replace(' > .toolbarButton', ' .toolbarButton');
      line = line.replace(' > .splitToolbarButton', ' .splitToolbarButton');
      line = line.replace(' min-width: 140px;', ' width: 140px;')
      result += line + '\n';
    }
  })
  .on('close', function() {
    fs.writeFile('../projects/ngx-extended-pdf-viewer/src/lib/viewer-with-images-2.2.css', result, function(err) {
      if (err) {
        return console.log(err);
      }

      console.log('The file was saved to ../projects/ngx-extended-pdf-viewer/src/lib/viewer-with-images-2.2.css!');
    });
  });
