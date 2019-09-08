cd inlineImageFiles
node index.js
cd ..
xcopy /S/E ../mozillas-pdf.js/build/generic/web/locale ./projects/ngx-extended-pdf-viewer/src/assets/locale/
xcopy ../mozillas-pdf.js/build/generic/build/pdf.worker.js ./projects/ngx-extended-pdf-viewer/src/assets/pdf.worker-es5.js
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
