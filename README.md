# Ng6PdfViewer

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.0.0.

## Build and run the demo project

1.  ng build ngx-extended-pdf-viewer
2.  npm run package
3.  ng serve -o

Now the (tiny) demo app will automatically reload if you change any of the source files.

## Build

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
13. git clone https://github.com/stephanrauh/pdf.js.git
14. cd pdf.js
15. npm install
16. cd inlineImageFiles
17. node index.js
18. open viewer-with-images.css and replace the first "html" by ".html"
19. in the same file: replace the first "body" by ".body"
20. cd ..
21. cp ../mozillas-pdf.js/build/generic/build/pdf.\* ./projects/ngx-extended-pdf-viewer/src/assets
22. cp ../mozillas-pdf.js/build/generic/build/web/viewer.js ./projects/ngx-extended-pdf-viewer/src/assets
23. open viewer.js and replace "require('../build/pdf.js')" by "require('./pdf.js')"
24. In the same file: replace "value: 'compressed.tracemonkey-pldi-09.pdf'" by "value: ''"
25. In the same file, rougly line 256: replace the lines
    if (document.readyState === 'interactive' || document.readyState === 'complete') {
    webViewerLoad();
    } else {
    document.addEventListener('DOMContentLoaded', webViewerLoad, true);
    }

    by

    window.webViewerLoad = webViewerLoad;

26. open pdf.js and remove these three lines (roughly at line 16234):
    var fs = require('fs');
    var http = require('http');
    var https = require('https');
27. (not necessary? npm run package )
28. ng build ngx-extended-pdf-viewer
29. npm run package
30. ng serve

Note to myself: to deploy the library on npm, change to the folder `dist/ngx-extended-pdf-viewer` and run `npm publish` from there.
