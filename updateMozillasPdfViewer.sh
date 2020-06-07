#!/bin/sh
cd ../mypdf.js
gulp minified
gulp minified-es5

cd ../ngx-extended-pdf-viewer
cd inlineImageFiles
node index.js
cd ..
cp -R ../mypdf.js/build/minified/web/locale/* ./projects/ngx-extended-pdf-viewer/src/assets/locale/
cp -R ../mypdf.js/build/minified/web/images/*.svg ./projects/ngx-extended-pdf-viewer/src/assets/images/
cp -R ../mypdf.js/build/minified/web/cmaps/* ./projects/ngx-extended-pdf-viewer/src/assets/cmaps/
cp -R ../mypdf.js/build/minified/build/pdf.* ./projects/ngx-extended-pdf-viewer/src/assets/
cp -R ../mypdf.js/build/minified/web/viewer.js* ./projects/ngx-extended-pdf-viewer/src/assets/
cp -R ../mypdf.js/build/minified-es5/build/pdf* ./projects/ngx-extended-pdf-viewer/src/assets/
cp -R ../mypdf.js/build/minified-es5/web/viewer-* ./projects/ngx-extended-pdf-viewer/src/assets/
cd addBaseLanguages
node index.js
node add-additional-translations.js
cd ..
cd convertI18nFilesToJson
node index.js
cd ..
