cd ../mypdf.js
gulp minified
gulp minified-es5

cd ../ngx-extended-pdf-viewer

cd inlineImageFiles
node index.js
cd ..
xcopy /S/E ../mypdf.js/build/minified/web/locale ./projects/ngx-extended-pdf-viewer/src/assets/locale/
xcopy /S/E ../mypdf.js/build/minified/web/images/*.svg ./projects/ngx-extended-pdf-viewer/src/assets/imges/
xcopy /S/E ../mypdf.js/build/minified/web/cmaps ./projects/ngx-extended-pdf-viewer/src/assets/cmaps/
xcopy ../mypdf.js/build/minified/build/pdf.* ./projects/ngx-extended-pdf-viewer/src/assets/
xcopy ../mypdf.js/build/minified/web/viewer.js* ./projects/ngx-extended-pdf-viewer/src/assets/
xcopy ../mypdf.js/build/minified-es5/build/pdf* ./projects/ngx-extended-pdf-viewer/src/assets/
xcopy ../mypdf.js/build/minified-es5/web/viewer-* ./projects/ngx-extended-pdf-viewer/src/assets/

cd addBaseLanguages
node index.js
cd ..
cd convertI18nFilesToJson
node index.js
cd ..
