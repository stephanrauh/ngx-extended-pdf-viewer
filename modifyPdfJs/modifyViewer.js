const fs = require('fs');

const lineReader = require('readline').createInterface({
  input: fs.createReadStream('../../mozillas-pdf.js/build/generic/web/viewer.js')
});

let result = '';
let expectedChanges = 35;

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
          expectedChanges -= 4;
        }
        es2015 = true;
      }
    }
  })
  .on('close', function() {
    addPolyfills();
    convertLines();
    const filename = es2015 ? 'viewer.js' : 'viewer-es5.js';
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

function addPolyfills() {
  if (!es2015) {
    result += '(function () {\n';
    result += '\n';
    result += "  if ( typeof window.CustomEvent === 'function' ) return false;\n";
    result += '\n';
    result += '  function CustomEvent ( event, params ) {\n';
    result += '    params = params || { bubbles: false, cancelable: false, detail: null };\n';
    result += "    var evt = document.createEvent( 'CustomEvent' );\n";
    result += '    evt.initCustomEvent( event, params.bubbles, params.cancelable, params.detail );\n';
    result += '    return evt;\n';
    result += '   }\n';
    result += '\n';
    result += '  window.CustomEvent = CustomEvent;\n';
    result += '})();\n';
  }
}

function convertLines() {
  lines.forEach(line => {
    if (dropLines > 0) {
      dropLines--;
      //      console.log('Dropping ' + line);
    } else {
      if (line.includes('function ') || line.startsWith('class ')) {
        currentFunction = line;
      }
      if (line.includes("require('../build/pdf.js')")) {
        line = line.replace("require('../build/pdf.js')", "require('./pdf-2.2.js')");
        expectedChanges--;
      } else if (line.includes('compressed.tracemonkey-pldi-09.pdf')) {
        line = line.replace('compressed.tracemonkey-pldi-09.pdf', '');
        expectedChanges--;
      } else if (line.includes("if (document.readyState === 'interactive' || document.readyState === 'complete') {")) {
        line = 'window.webViewerLoad = webViewerLoad;';
        dropLines = 4;
        expectedChanges--;
      } else if (line.includes('for (var anyCaseLang in dict.locales) {')) {
        line = line + '\n            originalCaseLang = anyCaseLang; // added line';
        expectedChanges--;
      } else if (line.includes('function loadLocale(lang, callback) {')) {
        line = line + '\nlet originalCaseLang = lang;';
        expectedChanges--;
      } else if (line.includes('gL10nData = dict.locales[lang];')) {
        line = '              gL10nData = dict.locales[originalCaseLang]; // modified line';
        expectedChanges--;
      } else if (line.includes('gL10nData = dict.locales[defaultLocale];')) {
        line = line.replace('gL10nData = dict.locales[defaultLocale];', 'gL10nData = dict.locales[originalCaseLang]; // modified line');
        expectedChanges--;
      } else if (line.includes("this.bar.classList.add('hidden');")) {
        if (currentFunction.includes('hide') || currentFunction.includes('ProgressBar')) {
          line =
            "    this.div = document.querySelector('.body #mainContainer .progress'); // always set this new instead of trying to cache this value\n" +
            '    if (this.div) {\n' +
            '      this.bar = this.div.parentNode; // always set this new instead of trying to cache this value\n' +
            '  ' +
            line +
            '\n    }\n';
        }
        expectedChanges--;
      } else if (line.includes('if (!this.visible) {')) {
        line = null;
        dropLines = 3;
        expectedChanges--;
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
        expectedChanges--;
      } else if (line.includes('var defaultFilename') || line.includes("defaultFilename = 'document.pdf'")) {
        line = line.replace("'document.pdf'", 'PDFViewerApplication.appConfig.filenameForDownload');
        line =
          line + '\nif (PDFViewerApplication.appConfig.filenameForDownload) return PDFViewerApplication.appConfig.filenameForDownload;';
        expectedChanges--;
      } else if (line.includes('this.bar = this.div.parentNode;') && currentFunction.includes('ProgressBar')) {
        line = '    if (this.div) {\n  ' + line + '\n    }';
        expectedChanges--;
      } else if (line.includes('this.div.style.height = this.height + this.units;') && currentFunction.includes('ProgressBar')) {
        line = '    if (this.div) {\n  ' + line + '\n    }';
        expectedChanges--;
      } else if (line.includes("this.div.classList.remove('indeterminate');") && currentFunction.includes('_updateBar')) {
        line = '      if (this.div) {\n  ' + line + '\n      }';
        expectedChanges--;
      } else if (line.includes('this.div.style.width = progressSize + this.units;') && currentFunction.includes('_updateBar')) {
        line = '      if (this.div) {\n  ' + line + '\n      }';
        expectedChanges--;
      } else if (line.includes('function _loop(button) {')) {
        // Babel version
        line = line + '\n    if (!isNaN(button)) {';
        expectedChanges--;
      } else if (line.includes('_this2.close();') && currentFunction.includes('click')) {
        // Babel version
        line = line + '\n          }' + '\n        });' + '\n      }';
        dropLines = 2;
        expectedChanges--;
      } else if (line.includes('//# sourceMappingURL=viewer.js.map')) {
        line = ''; // the file hasn't been minified, so there's not source map
        expectedChanges--;
      } else if (line.includes("window.addEventListener('keydown', function (event) {")) {
        line = '_app.PDFViewerApplication.printKeyDownListener = function (event) {';
        printKeyDownListener = true;
        expectedChanges--;
      } else if (printKeyDownListener && line.includes('}, true);')) {
        line = '};';
        printKeyDownListener = false;
        expectedChanges--;
      } else if (line.includes('this.printService.destroy();')) {
        line = "document.body.removeAttribute('data-pdfjsprinting');\n" + line;
        expectedChanges--;
      } else if (line.includes("overlayManager.close('printServiceOverlay');") && !unregisterPrintOverlayDone) {
        unregisterPrintOverlayDone = true;
        expectedChanges--;
        dropLines = 1;
        line += "\n      overlayManager.unregister('printServiceOverlay'); // #104";
        line += '\n    });';
        line += '\n    overlayPromise = undefined; // #104';
      } else if (line.includes('(!handled && !isViewerInPresentationMode)')) {
        line = '    if (false) {';
        expectedChanges--;
      } else if (line.includes('../build/pdf.worker.js')) {
        if (es2015) {
          line = line.replace('../build/pdf.worker.js', './assets/pdf.worker.js');
        } else {
          line = line.replace('../build/pdf.worker.js', './assets/pdf.worker-es5.js');
        }
        expectedChanges--;
      } else if (line.includes('function nextEntry() {')) {
        dropLines = 2;
        line = '        var languagefound = false; // #150\n' + line;
        line += '\n          var genericMatch = undefined; // #150';
        line += '\n          while (true) {';
        line += '\n            if ((!entries.length) && genericMatch) { // #150';
        line += '\n              if (!languagefound) loadImport(genericMatch, nextEntry); else nextEntry(); // #150';
        line += '\n              return; // #150';
        line += '\n            }// #150';
        line += '\n            else if (!entries.length) { // #150';
        expectedChanges--;
      } else if (line.includes('loadImport(baseURL')) {
        line = "              if (currentLang === '*' || currentLang === lang) { // #150\n" + line;
        line += '\n                languagefound = true;';
        line += '\n                return;';
        line += '\n              } else { // #150';
        line += '\n                genericMatch = baseURL + match[1]; // #150';
        line += '\n              } // #150';
        dropLines = 1;
        expectedChanges--;
      } else if (line.includes('no resource to load, early way out')) {
        expectedChanges--;
        line = line.replace(
          'no resource to load, early way out',
          'Could not load the translation files for the PDF viewer. Check the flag useBrowserLocale, check the locales subfolder of the assets folder, or add the locale definition to the index.html'
        );
      } else if (line.includes('using the embedded JSON directory, early way out')) {
        expectedChanges--;
        line = line.replace(
          'using the embedded JSON directory, early way out',
          'The PDF viewer uses the pre-compiled language bundle stored in the HTML page.'
        );
      } else if (line.includes('cmd === 1 || cmd === 8 || cmd === 5 || cmd === 12')) {
        expectedChanges--;

        let addition = '  if (isKeyIgnored(cmd, evt.keyCode)) {\n';
        addition += '    return;\n';
        line = addition + '  }\n' + line;

      } else if (line.includes("fileInput.setAttribute('type', 'file');")) {
        expectedChanges--;
        let addition = "  fileInput.setAttribute('accept', '.pdf,application/pdf');";
        line = addition + '\n' + line;
      } else if (line.includes("function xhrLoadText(url, onSuccess, onFailure) {")) {
        // breaking change in pdf.js 2.2 -> 2.3.200
        let before = "function fireL10nReadyEvent(lang) {\n";
        before +=  "var evtObject = document.createEvent('Event');\n";
        before +=  "  evtObject.initEvent('localized', true, false);\n";
        before +=  "  evtObject.language = lang;\n";
        before +=  "  document.dispatchEvent(evtObject);\n";
        before +=  "}\n";
        before += "\n";
        line = before + line;
        expectedChanges--;
      } else if (line.includes("gReadyState = 'complete';")) {
        // breaking change in pdf.js 2.2 -> 2.3.200
        line = "fireL10nReadyEvent(lang);\n" + line;
        expectedChanges--;
      }

      if (line != null) {
        line = line.replace(' print(', ' printPDF(');
        line = line.replace('.print(', '.printPDF(');
        line = line.replace('window.print ', 'window.printPDF ');
        result += line + '\n';
      }
    }
  });
}
