#!/bin/sh
cd inlineImageFiles
node index.js
cd ..
cp -R ../mozillas-pdf.js/build/generic/web/locale/* ./projects/ngx-extended-pdf-viewer/src/assets/locale/
cp ../mozillas-pdf.js/build/generic/build/pdf.worker.js ./projects/ngx-extended-pdf-viewer/src/assets/pdf.worker-2.2.222.js
cd addBaseLanguages
node index.js
cd ..
cd convertI18nFilesToJson
node index.js
cd ..
cd modifyPdfJs
node modifyPdf.js
node modifyViewer.js
cd ..
