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
18. cd ..
19. cp ../mozillas-pdf.js/build/generic/build/pdf.\* ./projects/ngx-extended-pdf-viewer/src/assets
20. cp ../mozillas-pdf.js/build/generic/build/web/viewer.js ./projects/ngx-extended-pdf-viewer/src/assets
21. open viewer.js and replace "require('../build/pdf.js')" by "require('./pdf.js')"
22. In the same file: replace "value: 'compressed.tracemonkey-pldi-09.pdf'" by "value: ''"
23. In the same file, rougly line 256: replace the lines
    if (document.readyState === 'interactive' || document.readyState === 'complete') {
    webViewerLoad();
    } else {
    document.addEventListener('DOMContentLoaded', webViewerLoad, true);
    }

    by

    window.webViewerLoad = webViewerLoad;

24. open pdf.js and remove these three lines (roughly at line 16234):
    var fs = require('fs');
    var http = require('http');
    var https = require('https');
25. (not necessary? npm run package )
26. ng build ngx-extended-pdf-viewer
27. npm run package
28. ng serve
