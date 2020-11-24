#!/bin/sh
cd ../mypdf.js

FOLDER="assets"
BRANCH=$(git rev-parse --abbrev-ref HEAD)
if [[ "$BRANCH" == "bleeding-edge" ]]; then
  FOLDER="bleeding-edge"
fi

gulp minified
gulp minified-es5


cd ../ngx-extended-pdf-viewer
# cd inlineImageFiles
# node index.js $FOLDER
# cd ..
rm -R ./projects/ngx-extended-pdf-viewer/src/$FOLDER/*.js
cp -R ../mypdf.js/build/minified/web/locale/* ./projects/ngx-extended-pdf-viewer/src/$FOLDER/locale/
# cp -R ../mypdf.js/build/minified/web/images/*.svg ./projects/ngx-extended-pdf-viewer/src/$FOLDER/images/
cp -R ../mypdf.js/build/minified/web/cmaps/* ./projects/ngx-extended-pdf-viewer/src/$FOLDER/cmaps/
cp -R ../mypdf.js/build/minified/build/pdf.* ./projects/ngx-extended-pdf-viewer/src/$FOLDER/
cp -R ../mypdf.js/build/minified/web/viewer.js* ./projects/ngx-extended-pdf-viewer/src/$FOLDER/
cp -R ../mypdf.js/build/minified/web/viewer.min* ./projects/ngx-extended-pdf-viewer/src/$FOLDER/
cp -R ../mypdf.js/build/minified-es5/build/pdf* ./projects/ngx-extended-pdf-viewer/src/$FOLDER/
cp -R ../mypdf.js/build/minified-es5/web/viewer-* ./projects/ngx-extended-pdf-viewer/src/$FOLDER/

"../mypdf.js/node_modules/.bin/tsc" --target ES2020 --allowJS --declaration --outDir projects/ngx-extended-pdf-viewer/types/ --strict --esModuleInterop --forceConsistentCasingInFileNames --emitDeclarationOnly ../mypdf.js/src/pdf.worker.js ../mypdf.js/src/pdf.js ../mypdf.js/web/pdf_viewer.js

cd addBaseLanguages
node index.js $FOLDER
node add-additional-translations.js $FOLDER
cd ..
cd convertI18nFilesToJson
node index.js $FOLDER
cd ..

cd add-version-number-to-file-name
node add-version-number.js
cd ..
