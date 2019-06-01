1. Switch off the prettier plugin. It scrambles the line numbers, rendering the line numbers in this README file useless.
   (Note to myself: Prettier also adds several backslashes to excape special characters when saving the README.md file. Don't forget to delete the extra backslashes again).
2. Create a new folder "embedded-pdf". It must be in the same folder as ngx-extended-pdf-viewer.
3. cd embedded-pdf
4. git clone https://github.com/stephanrauh/pdf.js.git
5. mv pdf.js mozillas-pdf.js (or rename pdf.js mozilla-pdf.js if you're using Windows)
6. cd mozillas-pdf.js
7. npm install -g gulp-cli
8. npm install
9. gulp server
10. open http://localhost:8888/web/viewer.html
11. stop the server (CTRL+C)
12. gulp generic
13. cd ..
14. cd ngx-extended-pdf-viewer
15. cd inlineImageFiles
16. node index.js
17. open projects/ngx-extended-pdf-viewer/src/lib/viewer-with-images.css and replace the first "html" by ".html" (roughly line 404)
18. a few lines above that, add the qualifier ".html " in front of the "\*" selector (roughly line 399)
19. in the same file: replace the first and the second "body" by ".body"
20. in the same file: insert ".pdf-viewer " in front of "input", "button", and "select" (roughly line 419-421)
21. cd ..
22. cp -R ../mozillas-pdf.js/build/generic/web/locale/\* ./projects/ngx-extended-pdf-viewer/src/assets/locale/
23. cp ../mozillas-pdf.js/build/generic/build/pdf.\* ./projects/ngx-extended-pdf-viewer/src/assets
24. cp ../mozillas-pdf.js/build/generic/web/viewer.js ./projects/ngx-extended-pdf-viewer/src/assets
25. cd addBaseLanguages
26. node index.js
27. cd ..
28. cd convertI18nFilesToJson
29. node index.js
30. cd ..
31. open ngx-extended-pdf-viewer/src/assets/viewer.js and replace "require('../build/pdf.js')" by "require('./pdf.js')" (rougly at line 4203)
32. In the same file: replace "value: 'compressed.tracemonkey-pldi-09.pdf'" by "value: ''" (roughly at line 5128)
33. In the same file, rougly line 259: replace the lines
    if (document.readyState === 'interactive' || document.readyState === 'complete') {
    webViewerLoad();
    } else {
    document.addEventListener('DOMContentLoaded', webViewerLoad, true);
    }

    by

    window.webViewerLoad = webViewerLoad;

34. In the same file: search for "for (var anyCaseLang in dict.locales) {" (roughly at line 12551). Replace the for loop by this version:
    for (var anyCaseLang in dict.locales) {
    const originalCase = anyCaseLang; // added line
    anyCaseLang = anyCaseLang.toLowerCase();
    if (anyCaseLang === lang) {
    gL10nData = dict.locales[originalCase];
    break;
    } else if (anyCaseLang === defaultLocale) {
    gL10nData = dict.locales[originalCase]; // modified line
    }
    }

35. open ngx-extended-pdf-viewer/src/assets/pdf.js and remove these three lines (roughly at line 17698):
    var fs = require('fs');
    var http = require('http');
    var https = require('https');

    (the next line, require('url'), does not cause problems. That's because the 'url' dependencies is available in web projects)

36. In the same file: replace the line (roughly at line 16677)
    var output = require('zlib').deflateSync(input, { level: 9 });
    by
    throw Error("zlib not available in the browser");

37. open ngx-extended-pdf-viewer/src/assets/viewer.js (roughly line 1155): locate "zoom = \_app_options.AppOptions.get('defaultZoomValue');" and add these lines after this line:
    // added to solve bug #6 and #11
    if (PDFViewerApplication.overrideHistory.zoom !== undefined) {
    zoom = PDFViewerApplication.overrideHistory.zoom;
    }
    // end of the bugfix solving #6 and #11

38. A few lines below (roughly line 1176): find "\_this5.setInitialView(hash, {" and insert these lines before:
    // added to solve bug #6 and #11
    if (PDFViewerApplication.overrideHistory.sidebarViewOnLoad !== undefined) {
    sidebarView = PDFViewerApplication.overrideHistory.sidebarViewOnLoad;
    }
    // end of the bugfix solving #6 and #11

39. In the same file, find the class Progressbar by looking for "var ProgressBar = function ()". Continue looking for the method "hide" (roughly line 3464). Modify the implementation like so:
    value: function hide() {
    // if (!this.visible) { // commented
    // return; // commented
    // } // uncommented
    this.visible = false;
    this.div = document.querySelector('.progress'); // always set this new instead of trying to cache this value
    this.bar = this.div.parentNode; // always set this new instead of trying to cache this value
    this.bar.classList.add('hidden');
    document.body.classList.remove('loadingInProgress');
    }

40. In the same file, add these lines to the end of webViewerPageChanging (roughly lines 2258):
    let pageNumberInput = document.getElementById('pageNumber');
    if (pageNumberInput) {
    var pageScrollEvent = new CustomEvent('page-change');
    pageNumberInput.dispatchEvent(pageScrollEvent);
    }

41. In the same file, find function getPDFFileNameFromURL(url), locate "var defaultFilename" and insert this line after that (roughly line 3867):
    if (PDFViewerApplication.appConfig.filenameForDownload) return PDFViewerApplication.appConfig.filenameForDownload;

42. examine the history of https://github.com/mozilla/pdf.js/blob/master/web/viewer.html and copy the changes to ngx-extended-pdf-viewer.component.html. Warning: ngx-extended-pdf-viewer.component.html has a lot of additions to the original file. Proceed with care.

43. npm run win-package (or npm run unix-package, depending on your OS) (this command copies the viewer files to the dist folder so you can run the demo)
44. ng serve

Note to myself: to deploy the library on npm, change to the folder `dist/ngx-extended-pdf-viewer` and run `npm publish` from there. Or: run `npm run unix-package` followed by `npm run release`.
