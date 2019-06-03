const fs = require('fs');

const lineReader = require('readline').createInterface({
  input: fs.createReadStream('../../mozillas-pdf.js/build/generic/web/viewer.js')
});

let result = '';

let dropLines = 0;
currentFunction = '';
lineReader
  .on('line', function(line) {
    if (dropLines > 0) {
      dropLines--;
      console.log('Dropping ' + line);
    } else {
      if (line.includes('function ')) {
        currentFunction = line;
      }
      if (line.includes("require('../build/pdf.js')")) {
        line = line.replace("require('../build/pdf.js')", "require('./pdf.js')");
      } else if (line.includes('compressed.tracemonkey-pldi-09.pdf')) {
        line = line.replace('compressed.tracemonkey-pldi-09.pdf', '');
      } else if (line.includes("if (document.readyState === 'interactive' || document.readyState === 'complete') {")) {
        line = 'window.webViewerLoad = webViewerLoad;';
        dropLines = 4;
      } else if (line.includes('for (var anyCaseLang in dict.locales) {')) {
        line = line + '\n            originalCaseLang = anyCaseLang; // added line';
      } else if (line.includes('function loadLocale(lang, callback) {')) {
        line = line + '\nlet originalCaseLang = lang;';
      } else if (line.includes('gL10nData = dict.locales[lang];')) {
        line = '              gL10nData = dict.locales[originalCaseLang]; // modified line';
      } else if (line.includes('gL10nData = dict.locales[defaultLocale];')) {
        line = line.replace('gL10nData = dict.locales[defaultLocale];', 'gL10nData = dict.locales[originalCaseLang]; // modified line');
      } else if (line.includes('_this5.setInitialView(hash, {')) {
        line =
          '// added to solve bug #6 and #11\n' +
          'if (PDFViewerApplication.overrideHistory.sidebarViewOnLoad !== undefined) {\n' +
          'sidebarView = PDFViewerApplication.overrideHistory.sidebarViewOnLoad;\n' +
          '}\n' +
          '// end of the bugfix solving #6 and #11\n' +
          line;
      } else if (line.includes("this.bar.classList.add('hidden');")) {
        if (currentFunction.includes('hide')) {
          line =
            '      if (this.div) {\n' +
            "        this.div = document.querySelector('.progress'); // always set this new instead of trying to cache this value\n" +
            '        this.bar = this.div.parentNode; // always set this new instead of trying to cache this value\n' +
            '      }\n' +
            line;
        }
      } else if (line.includes('if (!this.visible) {')) {
        line = line.replace('if (!this.visible) {', 'if (false) { // modified line');
      } else if (line.includes('Stats.add(page, pageView.stats);')) {
        dropLines = 2;

        line =
          line +
          '\n    }\n  }' +
          "\n  let pageNumberInput = document.getElementById('pageNumber');" +
          '\n  if (pageNumberInput) {' +
          "\n    var pageScrollEvent = new CustomEvent('page-change');" +
          '\n    pageNumberInput.dispatchEvent(pageScrollEvent);' +
          '\n  }';
      } else if (line.includes('var defaultFilename')) {
        line = line.replace("'document.pdf'", 'PDFViewerApplication.appConfig.filenameForDownload');
        line =
          line + '\nif (PDFViewerApplication.appConfig.filenameForDownload) return PDFViewerApplication.appConfig.filenameForDownload;';
      } else if (line.includes('this.bar = this.div.parentNode;') && currentFunction.includes('ProgressBar')) {
        line = '    if (this.div) {\n  ' + line + '\n    }';
      } else if (line.includes('this.div.style.height = this.height + this.units;') && currentFunction.includes('ProgressBar')) {
        line = '    if (this.div) {\n  ' + line + '\n    }';
      } else if (line.includes("this.div.classList.remove('indeterminate');") && currentFunction.includes('_updateBar')) {
        line = '      if (this.div) {\n  ' + line + '\n      }';
      } else if (line.includes('this.div.style.width = progressSize + this.units;') && currentFunction.includes('_updateBar')) {
        line = '      if (this.div) {\n  ' + line + '\n      }';
      } else if (line.includes('function _loop(button) {')) {
        line = line + '\n    if (!isNaN(button)) {';
      } else if (line.includes('_this2.close();') && currentFunction.includes('click')) {
        line = line + '\n          }' + '\n        });' + '\n      }';
        dropLines = 2;
      } else if (line.includes('//# sourceMappingURL=viewer.js.map')) {
        line = ''; // the file hasn't been minified, so there's not source map
      }
      result += line + '\n';
    }
  })
  .on('close', function() {
    fs.writeFile('../projects/ngx-extended-pdf-viewer/src/assets/viewer-2.2.199.js', result, function(err) {
      if (err) {
        return console.log(err);
      }

      console.log('The file was saved to ../projects/ngx-extended-pdf-viewer/src/assets/viewer-2.2.199.js!');
    });
  });
