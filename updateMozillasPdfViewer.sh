#!/bin/sh
cd inlineImageFiles
node index.js
cd ..
cp -R ../mozillas-pdf.js/build/generic/web/locale/* ./projects/ngx-extended-pdf-viewer/src/assets/locale/
cp -R ../mozillas-pdf.js/build/generic/web/images/*.svg ./projects/ngx-extended-pdf-viewer/src/assets/images/
cd addBaseLanguages
node index.js
node add-additional-translations.js
cd ..
cd convertI18nFilesToJson
node index.js
cd ..
cd modifyPdfJs
node modifyPdf.js
node modifyViewer.js
node modifyPdfWorker.js
cd ..
