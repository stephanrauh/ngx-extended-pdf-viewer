const fs = require('fs');

const lineReader = require('readline').createInterface({
  input: fs.createReadStream('../../mozillas-pdf.js/build/generic/web/viewer.js')
});

console.log("\n");

let result = '';
let expectedChanges = 84;

const successfulChanges = {};
for (let i = 1; i <= expectedChanges; i++) {
  successfulChanges[i] = 'not found';
}
successfulChanges[16] = 'ES5 only';
successfulChanges[17] = 'ES5 only';
successfulChanges[43] = true; // this changes is counted twice (ES5 and ES2015)
successfulChanges[45] = true; // this changes is counted twice (ES5 and ES2015)
successfulChanges[61] = true; // this changes is counted twice (ES5 and ES2015)

let dropLines = 0;
currentFunction = '';
let printKeyDownListener = false;
let unregisterPrintOverlayDone = false;
let es2015 = false;
let version2_4 = true;
let lines = [];
lineReader
  .on('line', function (line) {
    lines.push(line);
    if (line.includes('function ') || line.startsWith('class ')) {
      if (line.startsWith('class ')) {
        if (!es2015) {
          console.log('ES 2015 version');
          expectedChanges -= 1;
        }
        es2015 = true;
      }
    }
  })
  .on('close', function () {
    addPolyfills();
    convertLines();
    const filename = es2015 ? 'viewer.js' : 'viewer-es5.js';
    fs.writeFileSync('../projects/ngx-extended-pdf-viewer/src/assets-2.6/' + filename, result);

    console.log('The file was saved to ../projects/ngx-extended-pdf-viewer/src/assets-2.6/' + filename);
    if (expectedChanges !== 0) {
      console.error(expectedChanges + " changes couldn't be applied!");
      for (const [key, value] of Object.entries(successfulChanges)) {
        if (value !== true) {
          console.log("V" + key + ' ' + value);
        }
      }
    }
  });

function addPolyfills() {
  if (!es2015) {
    result += `if (!HTMLCollection.prototype[Symbol.iterator]) {
  HTMLCollection.prototype[Symbol.iterator] = Array.prototype[Symbol.iterator];
}
    `;
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
  let indentAfter = 0;
  let lineNumber = 0;
  let currentMethod = '';
  let currentClass = '';
  lines.forEach(line => {
    lineNumber++;
    indentAfter += line.split('{').length - 1;
    indentAfter -= line.split('}').length - 1;
    if (dropLines > 0) {
      dropLines--;
      //      console.log('Dropping ' + line);
    } else {
      const line2 = line.replace(/"/g, "'").trim(); // since pdf.js 2.4, the ES2015 uses double quotes
      if (line2.includes('function ') || line.startsWith('class ')) {
        if (!line.includes('function (')) {
          currentFunction = line;
          currentMethod = '';
        }
      }
      if (line2.startsWith('_classCallCheck(') || line2.startsWith('class ')) {
        currentClass = line2;
      }
      if (line2.startsWith('_updateUIState(') || line2.startsWith('value: function _updateUIState() {')) {
        currentMethod = '_updateUIState';
      }
      if (line2.includes('_calculateMatch(pageIndex) {')) {
        currentFunction = '_calculateMatch';
      }
      if (line2.includes('../build/pdf.js')) {
        line = line.replace('../build/pdf.js', './pdf.js');
        expectedChanges--;
        successfulChanges[1] = true;
      } else if (line2.includes('compressed.tracemonkey-pldi-09.pdf')) {
        line = line.replace('compressed.tracemonkey-pldi-09.pdf', '');
        expectedChanges--;
        successfulChanges[2] = true;
      } else if (line2.includes("if (document.readyState === 'interactive' || document.readyState === 'complete') {")) {
        line = 'window.webViewerLoad = webViewerLoad;';
        dropLines = 4;
        expectedChanges--;
        successfulChanges[3] = true;
      } else if (line2.includes('for (var anyCaseLang in dict.locales) {')) {
        line = line + '\n            originalCaseLang = anyCaseLang; // added line';
        expectedChanges--;
        successfulChanges[4] = true;
      } else if (line2.includes('function loadLocale(lang, callback) {')) {
        line = line + '\nlet originalCaseLang = lang;';
        expectedChanges--;
        successfulChanges[5] = true;
      } else if (line2.includes('gL10nData = dict.locales[lang];')) {
        line = '              gL10nData = dict.locales[originalCaseLang]; // modified line';
        expectedChanges--;
        successfulChanges[6] = true;
      } else if (line2.includes('gL10nData = dict.locales[defaultLocale];')) {
        line = line.replace('gL10nData = dict.locales[defaultLocale];', 'gL10nData = dict.locales[originalCaseLang]; // modified line');
        expectedChanges--;
        successfulChanges[7] = true;
      } else if (line2.includes("this.bar.classList.add('hidden');")) {
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
        successfulChanges[8] = true;
      } else if (line2.includes('if (!this.visible) {')) {
        line = null;
        dropLines = 3;
        expectedChanges--;
        successfulChanges[9] = true;
      } else if (line2.includes('Stats.add(page, pageView.stats);')) {
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
        successfulChanges[10] = true;
      } else if (line2.includes('var defaultFilename') || line2.includes("defaultFilename = 'document.pdf'")) {
        line = line.replace("'document.pdf'", 'PDFViewerApplication.appConfig.filenameForDownload');
        line = line + '\nif (PDFViewerApplication.appConfig.filenameForDownload) return PDFViewerApplication.appConfig.filenameForDownload;';
        expectedChanges--;
        successfulChanges[11] = true;
      } else if (line2.includes('this.bar = this.div.parentNode;') && currentFunction.includes('ProgressBar')) {
        line = '    if (this.div) {\n  ' + line + '\n    }';
        expectedChanges--;
        successfulChanges[12] = true;
      } else if (line2.includes('this.div.style.height = this.height + this.units;') && currentFunction.includes('ProgressBar')) {
        line = '    if (this.div) {\n  ' + line + '\n    }';
        expectedChanges--;
        successfulChanges[13] = true;
      } else if (line2.includes("this.div.classList.remove('indeterminate');")) {
        line = '      if (this.div) {\n  ' + line + '\n      }';
        expectedChanges--;
        successfulChanges[14] = true;
      } else if (line2.includes('this.div.style.width = progressSize + this.units;')) {
        line = '      if (this.div) {\n  ' + line + '\n      }';
        expectedChanges--;
        successfulChanges[15] = true;
      } else if (line2.includes('function _loop(button) {')) {
        // Babel version
        line = line + '\n    if (!isNaN(button)) {';
        expectedChanges--;
        successfulChanges[16] = true;
        version2_4 = false;
      } else if (line2.includes('_this2.close();') && currentFunction.includes('click') && (version2_4 === false)) {
        // Babel version
        line = line + '\n          }' + '\n        });' + '\n      }';
        dropLines = 2;
        expectedChanges--;
        successfulChanges[17] = true;
      } else if (line2.includes('//# sourceMappingURL=viewer.js.map')) {
        line = ''; // the file hasn't been minified, so there's not source map
        expectedChanges--;
        successfulChanges[18] = true;
      } else if (line2.includes("window.addEventListener('keydown', function (event) {")) {
        line = '_app.PDFViewerApplication.printKeyDownListener = function (event) {';
        printKeyDownListener = true;
        expectedChanges--;
        successfulChanges[19] = true;
      } else if (printKeyDownListener && line2.includes('}, true);')) {
        line = '};';
        printKeyDownListener = false;
        expectedChanges--;
        successfulChanges[20] = true;
      } else if (line2.includes('this.printService.destroy();')) {
        line = "document.body.removeAttribute('data-pdfjsprinting');\n" + line;
        expectedChanges--;
        successfulChanges[21] = true;
      } else if (line2.includes("overlayManager.close('printServiceOverlay');") && !unregisterPrintOverlayDone) {
        unregisterPrintOverlayDone = true;
        expectedChanges--;
        successfulChanges[22] = true;
        dropLines = 1;
        line += "\n      overlayManager.unregister('printServiceOverlay'); // #104";
        line += '\n    });';
        line += '\n    overlayPromise = undefined; // #104';
      } else if (line2.includes('(!handled && !isViewerInPresentationMode)')) {
        line = '    if (false) {';
        expectedChanges--;
        successfulChanges[23] = true;
      } else if (line2.includes('../build/pdf.worker.js')) {
        if (es2015) {
          line = line.replace('../build/pdf.worker.js', './assets/pdf.worker.js');
        } else {
          line = line.replace('../build/pdf.worker.js', './assets/pdf.worker-es5.js');
        }
        expectedChanges--;
        successfulChanges[24] = true;
      } else if (line2.includes('function nextEntry() {')) {
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
        successfulChanges[25] = true;
      } else if (line2.includes('loadImport(baseURL')) {
        line = "              if (currentLang === '*' || currentLang === lang) { // #150\n" + line;
        line += '\n                languagefound = true;';
        line += '\n                return;';
        line += '\n              } else { // #150';
        line += '\n                genericMatch = baseURL + match[1]; // #150';
        line += '\n              } // #150';
        dropLines = 1;
        expectedChanges--;
        successfulChanges[26] = true;
      } else if (line2.includes('no resource to load, early way out')) {
        expectedChanges--;
        successfulChanges[27] = true;
        line = line.replace(
          'no resource to load, early way out',
          'Could not load the translation files for the PDF viewer. Check the flag useBrowserLocale, check the locales subfolder of the assets folder, or add the locale definition to the index.html'
        );
      } else if (line2.includes('using the embedded JSON directory, early way out')) {
        expectedChanges--;
        successfulChanges[28] = true;
        line = line.replace(
          'using the embedded JSON directory, early way out',
          'The PDF viewer uses the pre-compiled language bundle stored in the HTML page.'
        );
      } else if (line2.includes('cmd === 1 || cmd === 8 || cmd === 5 || cmd === 12')) {
        expectedChanges--;
        successfulChanges[29] = true;

        let addition = '  if (isKeyIgnored(cmd, evt.keyCode)) {\n';
        addition += '    return;\n';
        line = addition + '  }\n' + line;
      } else if (line2.includes("fileInput.setAttribute('type', 'file');")) {
        expectedChanges--;
        successfulChanges[30] = true;
        let addition = "  fileInput.setAttribute('accept', '.pdf,application/pdf');";
        line = addition + '\n' + line;
      } else if (line2.includes('function xhrLoadText(url, onSuccess, onFailure) {')) {
        // breaking change in pdf.js 2.2 -> 2.3.200
        let before = 'function fireL10nReadyEvent(lang) {\n';
        before += "var evtObject = document.createEvent('Event');\n";
        before += "  evtObject.initEvent('localized', true, false);\n";
        before += '  evtObject.language = lang;\n';
        before += '  document.dispatchEvent(evtObject);\n';
        before += '}\n';
        before += '\n';
        line = before + line;
        expectedChanges--;
        successfulChanges[31] = true;
      } else if (line2.includes("gReadyState = 'complete';")) {
        // breaking change in pdf.js 2.2 -> 2.3.200
        line = 'fireL10nReadyEvent(lang);\n' + line;
        expectedChanges--;
        successfulChanges[32] = true;
      } else if (line2.includes("entireWordCheckbox: document.getElementById('findEntireWord')")) {
        line = line + '\n' + "      findMultipleSearchTextsCheckbox: document.getElementById('findMultipleSearchTexts'), // #201";
        line = line + '\n' + "      ignoreAccentsCheckbox: document.getElementById('findIgnoreAccents'), // #177";
        expectedChanges--;
        successfulChanges[33] = true;
      } else if (line2.includes('entireWord: evt.entireWord')) {
        line = line + '\n' + '    ignoreAccents: evt.ignoreAccents, // #177';
        expectedChanges--;
        successfulChanges[34] = true;
      } else if (line2.includes('entireWord: false')) {
        line = line + '\n' + '    ignoreAccents: false, // #177';
        expectedChanges--;
        successfulChanges[35] = true;
      } else if (line2.includes('entireWord: findState.entireWord')) {
        line = line + '\n' + '              ignoreAccents: findState.ignoreAccents, // #177';
        expectedChanges--;
        successfulChanges[36] = true;
        expectedChanges--;
        successfulChanges[37] = true;
      } else if (line2.includes('this.entireWord = options.entireWordCheckbox || null')) {
        line = line + '\n' + '    this.multipleSearchTexts = options.findMultipleSearchTextsCheckbox || null; // #201';
        line = line + '\n' + '    this.ignoreAccents = options.ignoreAccentsCheckbox || null; // #177';
        expectedChanges--;
        successfulChanges[38] = true;
      } else if (
        line2.includes("this.eventBus.on('resize', this._adjustWidth.bind(this))") ||
        line2.includes("this.eventBus._on('resize', this._adjustWidth.bind(this))")
      ) {
        if (es2015) {
          line =
            "    this.multipleSearchTexts.addEventListener('click', () => { // #201\n" +
            "          this.dispatchEvent('multiplesearchtextschange'); // #201\n" +
            '    }); // #201\n' +
            "    this.ignoreAccents.addEventListener('click', () => { // #177\n" +
            "          this.dispatchEvent('ignoreAccentsChange'); // #177\n" +
            '    }); // #177\n' +
            line;
        } else {
          line =
            "    this.multipleSearchTexts.addEventListener('click', function () { // #201\n" +
            "     _this.dispatchEvent('multiplesearchtextschange');\n" +
            '    });\n' +
            "    this.ignoreAccents.addEventListener('click', function () { // #177\n" +
            "     _this.dispatchEvent('ignoreAccentsChange');\n" +
            '    });\n' +
            line;
        }
        expectedChanges--;
        successfulChanges[39] = true;
      } else if (line2.includes('phraseSearch: true,')) {
        line = '      phraseSearch: !this.multipleSearchTexts.checked, // #201';
        expectedChanges--;
        successfulChanges[40] = true;
      } else if (line2.includes('entireWord: this.entireWord.checked')) {
        line = line + '\n' + '      ignoreAccents: this.ignoreAccents.checked, // #177';
        expectedChanges--;
        successfulChanges[41] = true;
      } else if (line.includes('  _calculatePhraseMatch(')) {
        line = `  _calculatePhraseMatch(query, pageIndex, pageContent, entireWord, ignoreAccents) { // #177
            if (ignoreAccents) { // #177
              pageContent = window.deburr(pageContent); // #177
              query = window.deburr(query); // #177
            } // #177
  `;
        expectedChanges--;
        successfulChanges[42] = true;
      } else if (line2.includes('function _calculatePhraseMatch(query, pageIndex, pageContent, entireWord)')) {
        line = `    value: function _calculatePhraseMatch(query, pageIndex, pageContent, entireWord, ignoreAccents) { // #177
            if (ignoreAccents) { // #177
              pageContent = window.deburr(pageContent); // #177
              query = window.deburr(query); // #177
            } // #177
  `;
        expectedChanges--;
        successfulChanges[42] = true;
      } else if (line.includes('  _calculateWordMatch(')) {
        line = `  _calculateWordMatch(query, pageIndex, pageContent, entireWord, ignoreAccents) { // #177
            if (ignoreAccents) { // #177
              pageContent = window.deburr(pageContent); // #177
              query = window.deburr(query); // #177
            } // #177
  `;
        expectedChanges--;
        successfulChanges[44] = true;
      } else if (line2.includes('function _calculateWordMatch(query, pageIndex, pageContent, entireWord)')) {
        line = `    value: function _calculateWordMatch(query, pageIndex, pageContent, entireWord, ignoreAccents) { // #177
            if (ignoreAccents) { // #177
              pageContent = window.deburr(pageContent); // #177
              query = window.deburr(query); // #177
            } // #177
  `;
        expectedChanges--;
        successfulChanges[44] = true;
      } else if (line2.includes('queryArray = query.match(/\\S+/g);')) {
        line = "    var queryArray = (query.includes('\\n')) ? query.trim().split(/\\n+/g) : query.trim().match(/\\S+/g); // #201";
      } else if (currentFunction == '_calculateMatch' && line2.includes('entireWord,')) {
        if (es2015) {
          line = line + '\n      ignoreAccents, // #177';
        } else {
          line = line + '\n          ignoreAccents = _this$_state.ignoreAccents, // #177';
        }
        currentFunction = '';
        expectedChanges--;
        successfulChanges[46] = true;
      } else if (line2.includes('this._calculatePhraseMatch(query, pageIndex, pageContent, entireWord')) {
        line = '      this._calculatePhraseMatch(query, pageIndex, pageContent, entireWord, ignoreAccents); // #177';
        expectedChanges--;
        successfulChanges[47] = true;
      } else if (line2.includes('this._calculateWordMatch(query, pageIndex, pageContent, entireWord')) {
        line = '      this._calculateWordMatch(query, pageIndex, pageContent, entireWord, ignoreAccents); // #177';
        expectedChanges--;
        successfulChanges[48] = true;
      } else if (line2.includes("console.log('PDF ' + pdfDocument.fingerprint")) {
        line = line.replace("')');", "' modified by ngx-extended-pdf-viewer)');");
        line = "      console.log('PDF viewer: ngx-extended-pdf-viewer running on pdf.js ' + _pdfjsLib.version);\n" + line;
        expectedChanges--;
        successfulChanges[49] = true; // only till version 2.4
      } else if (line2.includes("console.log(`PDF ${pdfDocument.fingerprint}")) {
        line = line.replace("`);", " modified by ngx-extended-pdf-viewer)`);");
        line = "      console.log('PDF viewer: ngx-extended-pdf-viewer running on pdf.js ' + _pdfjsLib.version);\n" + line;
        expectedChanges--;
        successfulChanges[49] = true; // since version 2.5

      } else if (line2.includes("if ('verbosity' in hashParams) {")) {
        line = `    if ('removepageborders' in hashParams) { // #194
      _app_options.AppOptions.set('removePageBorders', hashParams['removepageborders'] === 'true'); // #194
    }

${line}`;
        expectedChanges--;
        successfulChanges[50] = true;
      } else if (line2.includes("imageResourcesPath: _app_options.AppOptions.get('imageResourcesPath'),")) {
        line += "\n      removePageBorders: _app_options.AppOptions.get('removePageBorders'), // #194";
      } else if (line2.includes('renderer: {')) {
        line =
          `  removePageBorders: { // #194
          value: false,
          kind: OptionKind.VIEWER + OptionKind.PREFERENCE
        },
        ` + line;
        expectedChanges--;
        successfulChanges[51] = true;
      } else if (line2.includes("imageResourcesPath: _app_options.AppOptions.get('imageResourcesPath'),")) {
        line += '\n        removePageBorders: this.removePageBorders, // #194';
      } else if (line.includes('      "renderer": "canvas",')) {
        line = '      "removePageBorders": false,// #194 \n' + line;
        expectedChanges--;
        successfulChanges[52] = true;
      } else if (line2.includes('imageResourcesPath: this.imageResourcesPath,') || line2.includes('imageResourcesPath: _this.imageResourcesPath,')) {
        if (es2015) {
          line += '\n          removePageBorders: this.removePageBorders, // #194';
        } else {
          line += '\n          removePageBorders: _this.removePageBorders, // #194';
        }
        expectedChanges--;
        successfulChanges[53] = true;
      } else if (line2.includes("findField: document.getElementById('findInput'),")) {
        line += "\n      findFieldMultiline: document.getElementById('findInputMultiline'), // #201";
        expectedChanges--;
        successfulChanges[54] = true;
      } else if (line2.includes('this.findField = options.findField || null;')) {
        line += '\n    this.findFieldMultiline = options.findFieldMultiline || null; // #201';
      } else if (line2.includes("this.findField.addEventListener('input', () => {")) {
          line =
          `    this.findFieldMultiline.addEventListener('input', () => { // #201
      this.dispatchEvent('');
    });
` + line;
        expectedChanges--;
        successfulChanges[55] = true; // ES2015 version
      } else if (line2.includes("this.findField.addEventListener('input', function () {")) {
        line =
          `    this.findFieldMultiline.addEventListener('input', function () { // #201
      _this.dispatchEvent('');
    });
` + line;
        expectedChanges--;
        successfulChanges[55] = true; // ES5 version
      } else if (line.includes(' type,')) {
        line = `      type: type,
      query: this.findFieldMultiline.classList.contains('hidden')? this.findField.value: this.findFieldMultiline.value, // #201`;
        dropLines = 1;
        expectedChanges--;
        successfulChanges[56] = true;
      } else if (line2.includes("this.findField.setAttribute('data-status', status);")) {
        line += `
    this.findFieldMultiline.classList.toggle('notFound', notFound); // #201
    this.findFieldMultiline.setAttribute('data-status', status);    // #201
`;
        expectedChanges--;
        successfulChanges[57] = true;
      } else if (line2.includes("console.warn('#' + key + ' is undefined.')")) {
        line = line.replace("'#'", "'Translation for the key #'");
        line = line.replace('undefined', 'missing');
        expectedChanges--;
        successfulChanges[58] = true;
      } else if (line2.includes("console.warn('#' + l10n.id + ' is undefined.');")) {
        line = line.replace("'#'", "'Translation for the key #'");
        line = line.replace('undefined', 'missing');
        expectedChanges--;
        successfulChanges[59] = true;
      } else if (line2.includes('get pageMatchesLength() {')) {
        line =
          `  get pageMatchesColor() {         // #201
    return this._pageMatchesColor; // #201
  }                                // #201
` + line;
        expectedChanges--;
        successfulChanges[60] = true; // ES2015 version
      } else if (line.includes('key: "pageMatchesLength",')) {
        line =
          `    key: "pageMatchesColor",
    get: function get() {  // #201
      return this._pageMatchesColor;
    }
  }, {
` + line;
        expectedChanges--;
        successfulChanges[60] = true; // ES5 version
      } else if (line2.includes('this._pageMatchesLength = [];')) {
        line += '\n    this._pageMatchesColor = [];  // #201';
        expectedChanges--;
        successfulChanges[62] = true;
      } else if (line2.includes('_prepareMatches(matchesWithLength, matches, matchesLength) {')) {
        line = line.replace('matchesLength)', 'matchesLength, /* #201 */ matchesColor)');
        expectedChanges--;
        successfulChanges[63] = true;
      } else if (line2.includes('matchesLength.push(matchesWithLength[i].matchLength);')) {
        line += '\n      matchesColor.push(matchesWithLength[i].color);  // #201';
        expectedChanges--;
        successfulChanges[64] = true;
      } else if (line2.includes('skipped: false')) {
        line += ',\n          color: i  // #201';
        expectedChanges--;
        successfulChanges[65] = true;
      } else if (line2.includes('this._pageMatchesLength[pageIndex] = [];')) {
        line += '\n    this._pageMatchesColor[pageIndex] = [];  // #201';
        expectedChanges--;
        successfulChanges[66] = true;
      } else if (line2.includes('this._prepareMatches(matchesWithLength, this._pageMatches[pageIndex], this._pageMatchesLength[pageIndex]);')) {
        line = line.replace('this._pageMatchesLength[pageIndex])', 'this._pageMatchesLength[pageIndex], /* #201 */ this._pageMatchesColor[pageIndex]);');
        expectedChanges--;
        successfulChanges[67] = true;
      } else if (line2.includes('this._pageMatchesLength.length = 0;')) {
        line += '\n      this._pageMatchesColor.length = 0;  // #201';
        expectedChanges--;
        successfulChanges[68] = true;
      } else if (line2.includes('_convertMatches(matches, matchesLength) {')) {
        line = line.replace('matchesLength)', 'matchesLength, /* #201 */ matchesColor)');
        expectedChanges--;
        successfulChanges[69] = true;
      } else if (line2.includes('begin: {')) {
        line = '        color: matchesColor ? matchesColor[m] : 0, // #201\n' + line;
        expectedChanges--;
        successfulChanges[70] = true;
      } else if (line2.includes("highlightSuffix = isSelected ? ' selected' : '';")) {
        line = "      var highlightSuffix = (isSelected ? ' selected' : '') + ' color' + match.color; // #201";
        expectedChanges--;
        successfulChanges[71] = true;
      } else if (line2.includes('this.matches = this._convertMatches(pageMatches, pageMatchesLength);')) {
        line = `      var pageMatchesColor = findController.pageMatchesColor[pageIdx] || null; // #201
      this.matches = this._convertMatches(pageMatches, pageMatchesLength, pageMatchesColor); // #201`;
        expectedChanges--;
        successfulChanges[72] = true;
      } else if (line2.includes('this.findField.focus();')) {
        line = line + "\n    this.dispatchEvent(''); // #206";
        expectedChanges--;
        successfulChanges[73] = true;
      } else if (line2.includes('throw new Error(msg);')) {
        line =
          `        var error = new Error(msg); // #205
        this.onError(error); // #205
` + line.replace('new Error(msg)', 'error');
        expectedChanges--;
        successfulChanges[74] = true; // until version 2.4
      } else if (line2.includes('throw exception;')) {
        line =
          `        this.onError(exception); // #205
` + line;
        expectedChanges--;
        successfulChanges[74] = true; // until version 2.4
      } else if (line2.includes('if (evt.ctrlKey && supportedMouseWheelZoomModifierKeys.ctrlKey')) {
        line =
          `  let cmd = (evt.ctrlKey ? 1 : 0) | (evt.altKey ? 2 : 0) | (evt.shiftKey ? 4 : 0) | (evt.metaKey ? 8 : 0);

  if (isKeyIgnored(cmd, "WHEEL")) {
    return;
  }

` + line.replace('new Error(msg)', 'error');
        expectedChanges--;
        successfulChanges[75] = true;
      } else if (line2.includes('window.print =')) {
        line += '\n if (!PDFViewerApplication.enablePrint) { return; }';
        expectedChanges--;
        successfulChanges[76] = true;
      } else if (line2.includes('PDFViewerApplication.pdfViewer.containsElement(evt.target)')) {
        expectedChanges--;
        successfulChanges[77] = true;
        line += `
          if (evt.target && evt.target.parentElement === appConfig.secondaryToolbar.toggleButton) {
            return;
          }
          if (evt.target && evt.target.parentElement && evt.target.parentElement.parentElement === appConfig.secondaryToolbar.toggleButton) {
            return;
          }`;
      } else if (currentMethod.includes('_updateUIState') && !currentClass.includes('PDFFindController')) {
        if (indentAfter === (es2015 ? 2 : 3)) {
          let info = '';
          if (currentClass.includes('SecondaryToolbar')) {
            info = `, {
        source: this,
        widget: 'SecondaryToolbar',
        pageNumber: this.pageNumber,
        pagesCount: this.pagesCount`;
          }
          else if (currentClass.includes('Toolbar')) {
            info = `, {
      source: this,
      widget: 'Toolbar',
      pageNumber: pageNumber,
      pagesCount: pagesCount,
      pageScaleValue: pageScaleValue,
      pageScale: pageScale`;
          }
          line = `
    this.eventBus.dispatch("updateuistate"` + info + `
    });
` + line;
          currentMethod = '';
        }
      } else if (line.includes("subqueryLen = subquery.length")) {
        line = line + `
        if (subqueryLen === 0) continue;`;
        successfulChanges[78] = true;
      } else if (line.includes("this.input.focus();")) {
        line = '      this.input.type="password";\n' + line;
        successfulChanges[79] = true;
      } else if (line.includes("_this2.input.focus();")) {
        line = '        _this2.input.type="password";\n' + line;
        successfulChanges[79] = true;
      } else if (line.includes('this.input.value = "";')) {
        line = '      this.input.type="";\n' + line;
        successfulChanges[80] = true;
      } else if (line.includes('_this3.input.value = "";')) {
        line = '        _this3.input.type="";\n' + line;
        successfulChanges[80] = true;
      } else if (line.includes('maxWidth += 1.5 * overflow;')) {
        line = line.replace("+=", "+= 10 + "); // #329 fix the select box layout
        successfulChanges[81] = true;
      } else if (line.includes('if (++this.currentPage >= pageCount)')) {
        line = line.replace('++', '');
        line = `
      while (true) { // #243
        ++this.currentPage; // #243
        if (this.currentPage >= pageCount) { // #243
          break; // #243
        } // #243
        if ((!window.isInPDFPrintRange) || window.isInPDFPrintRange(this.currentPage)) { // #243
          break; // #243
        } // #243
      } // #243
` + line;
        successfulChanges[82] = true; // ES2015 version
      } else if (line.includes('if (++_this.currentPage >= pageCount)')) {
        line = line.replace('++', '');
        line = `
      while (++_this.currentPage) { // #243
        if (_this.currentPage >= pageCont) { // #243
          break; // #243
        } // #243
        if ((!window.isInPDFPrintRange) || window.isInPDFPrintRange(_this.currentPage)) { // #243
          break; // #243
        } // #243
      } // #243
` + line;
        successfulChanges[82] = true; // ES5 version
      } else if (line.includes('renderProgress(index, pageCount, this.l10n);')) {
        line = 'renderProgress(index, window.filteredPageCount | pageCount, this.l10n); // #243';
        successfulChanges[83] = true; // ES2015 version
      } else if (line.includes('renderProgress(index, pageCount, _this.l10n);')) {
        line = 'renderProgress(index, window.filteredPageCount | pageCount, _this.l10n); // #243';
        successfulChanges[83] = true; // ES5 version
      } else if (line.includes('renderProgress(pageCount, pageCount, this.l10n);')) {
        line = 'renderProgress(window.filteredPageCount | pageCount, window.filteredPageCount | pageCount, this.l10n); // #243';
        successfulChanges[84] = true; // ES2015 version
      } else if (line.includes('renderProgress(pageCount, pageCount, _this.l10n);')) {
        line = 'renderProgress(window.filteredPageCount | pageCount, window.filteredPageCount | pageCount, _this.l10n); // #243';
        successfulChanges[84] = true; // ES5 version
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
