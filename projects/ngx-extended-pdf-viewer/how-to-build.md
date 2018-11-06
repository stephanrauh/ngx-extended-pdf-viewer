1.  Create a new folder "embedded-pdf".
2.  cd embedded-pdf
3.  git clone https://github.com/stephanrauh/pdf.js.git
4.  mv pdf.js mozillas-pdf.js
5.  cd mozillas-pdf.js
6.  npm install -g gulp-cli
7.  npm install
8.  gulp server
9.  open http://localhost:8888/web/viewer.html
10. stop the server (CTRL+C)
11. gulp generic
12. cd ..
13. cd ..
14. cd ngx-extended-pdf-viewer
15. cd inlineImageFiles
16. node index.js
17. open ngx-extended-pdf-viewer/src/lib/viewer-with-images.css and replace the first "html" by ".html"
18. in the same file: replace the first and the second "body" by ".body"
19. cd ..
20. cp -R ../mozillas-pdf.js/build/generic/web/locale/\* ./projects/ngx-extended-pdf-viewer/src/assets/locale/
21. cp ../mozillas-pdf.js/build/generic/build/pdf.\* ./projects/ngx-extended-pdf-viewer/src/assets
22. cp ../mozillas-pdf.js/build/generic/web/viewer.js ./projects/ngx-extended-pdf-viewer/src/assets
23. cd convertI18nFilesToJson
24. node index.js
25. cd ..
26. open ngx-extended-pdf-viewer/src/assets/viewer.js and replace "require('../build/pdf.js')" by "require('./pdf.js')"
27. In the same file: replace "value: 'compressed.tracemonkey-pldi-09.pdf'" by "value: ''"
28. In the same file, rougly line 259: replace the lines
    if (document.readyState === 'interactive' || document.readyState === 'complete') {
    webViewerLoad();
    } else {
    document.addEventListener('DOMContentLoaded', webViewerLoad, true);
    }

    by

    window.webViewerLoad = webViewerLoad;

29. In the same file: search for "for (var anyCaseLang in dict.locales) {" (roughly at line 12551). Replace the for loop by this version:
    for (var anyCaseLang in dict.locales) {
    const originalCase = anyCaseLang; // added line
    anyCaseLang = anyCaseLang.toLowerCase();
    if (anyCaseLang === lang) {
    gL10nData = dict.locales[lang];
    break;
    } else if (anyCaseLang === defaultLocale) {
    gL10nData = dict.locales[originalCase]; // modified line
    }
    }

30. open ngx-extended-pdf-viewer/src/assets/pdf.js and remove these three lines (roughly at line 17698):
    var fs = require('fs');
    var http = require('http');
    var https = require('https');

    (the next line, require('url'), does not cause problems. That's because the 'url' dependencies is available in web projects)

31. In the same file: replace the line (roughly at line 16677)
    var output = require('zlib').deflateSync(input, { level: 9 });
    by
    throw Error("zlib not available in the browser");

32. (not necessary? npm run package )
33. ng build ngx-extended-pdf-viewer
34. npm run package
35. ng serve
