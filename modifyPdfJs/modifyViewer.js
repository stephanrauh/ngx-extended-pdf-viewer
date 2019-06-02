const fs = require('fs');

const lineReader = require('readline').createInterface({
  input: fs.createReadStream('../../mozillas-pdf.js/build/generic/web/viewer.js')
});

let result = '';

let dropLines = 0;
lineReader
  .on('line', function(line) {
    if (dropLines > 0) {
      dropLines--;
      console.log('Dropping ' + line);
    } else {
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
      } else if (line.includes("zoom = _app_options.AppOptions.get('defaultZoomValue');")) {
        line = line + '\n // added to solve bug #6 and #11';
        line = line + '\n if (PDFViewerApplication.overrideHistory.zoom !== undefined) {';
        line = line + '\n zoom = PDFViewerApplication.overrideHistory.zoom;';
        line = line + '\n }';
        line = line + '\n // end of the bugfix solving #6 and #11';
      } else if (line.includes('_this5.setInitialView(hash, {')) {
        line =
          '// added to solve bug #6 and #11\n' +
          'if (PDFViewerApplication.overrideHistory.sidebarViewOnLoad !== undefined) {\n' +
          'sidebarView = PDFViewerApplication.overrideHistory.sidebarViewOnLoad;\n' +
          '}\n' +
          '// end of the bugfix solving #6 and #11\n' +
          line;
      } else if (line.includes("this.bar.classList.add('hidden');")) {
        line =
          "this.div = document.querySelector('.progress'); // always set this new instead of trying to cache this value\n" +
          'this.bar = this.div.parentNode; // always set this new instead of trying to cache this value\n' +
          line;
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
      }
      result += line + '\n';
    }
  })
  .on('close', function() {
    fs.writeFile('../projects/ngx-extended-pdf-viewer/src/assets/viewer-2.2.197.js', result, function(err) {
      if (err) {
        return console.log(err);
      }

      console.log('The file was saved to ../projects/ngx-extended-pdf-viewer/src/assets/viewer-2.2.197.js!');
    });
  });
