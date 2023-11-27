#!/bin/sh
cd ../mypdf.js

rm -r build

FOLDER="assets"
BRANCH=$(git rev-parse --abbrev-ref HEAD)
if [ "$BRANCH" == "bleeding-edge" ]; then
  FOLDER="bleeding-edge"
fi

gulp minified-legacy &
gulp minified &
wait


mv build/minified/web/pdf.viewer.js build/minified/web/viewer.min.js
mv build/minified/web/pdf.viewer.mjs build/minified/web/viewer.min.mjs

mv build/minified-legacy/web/pdf.viewer.js build/minified-legacy/web/viewer-es5.min.js
mv build/minified-legacy/web/pdf.viewer.mjs build/minified-legacy/web/viewer-es5.min.mjs
mv build/minified-legacy/web/viewer.js build/minified-legacy/web/viewer-es5.js
mv build/minified-legacy/web/viewer.mjs build/minified-legacy/web/viewer-es5.mjs

mv build/minified-legacy/build/pdf.js build/minified-legacy/build/pdf-es5.js
mv build/minified-legacy/build/pdf.mjs build/minified-legacy/build/pdf-es5.mjs
mv build/minified-legacy/build/pdf.min.js build/minified-legacy/build/pdf-es5.min.js
mv build/minified-legacy/build/pdf.min.mjs build/minified-legacy/build/pdf-es5.min.mjs

mv build/minified-legacy/build/pdf.sandbox.js build/minified-legacy/build/pdf.sandbox-es5.js
mv build/minified-legacy/build/pdf.sandbox.mjs build/minified-legacy/build/pdf.sandbox-es5.mjs
mv build/minified-legacy/build/pdf.sandbox.min.js build/minified-legacy/build/pdf.sandbox-es5.min.js
mv build/minified-legacy/build/pdf.sandbox.min.mjs build/minified-legacy/build/pdf.sandbox-es5.min.mjs

mv build/minified-legacy/build/pdf.worker.js build/minified-legacy/build/pdf.worker-es5.js
mv build/minified-legacy/build/pdf.worker.mjs build/minified-legacy/build/pdf.worker-es5.mjs
mv build/minified-legacy/build/pdf.worker.min.js build/minified-legacy/build/pdf.worker-es5.min.js
mv build/minified-legacy/build/pdf.worker.min.mjs build/minified-legacy/build/pdf.worker-es5.min.mjs


cd ../ngx-extended-pdf-viewer
# cd inlineImageFiles
# node index.js $FOLDER
# cd ..
rm -R ./projects/ngx-extended-pdf-viewer/$FOLDER/pdf*.js
rm -R ./projects/ngx-extended-pdf-viewer/$FOLDER/pdf*.mjs
rm -R ./projects/ngx-extended-pdf-viewer/$FOLDER/viewer*.js
rm -R ./projects/ngx-extended-pdf-viewer/$FOLDER/viewer*.mjs
cp -R ../mypdf.js/build/minified/web/locale/* ./projects/ngx-extended-pdf-viewer/$FOLDER/locale/
cp -R ../mypdf.js/build/minified/web/cmaps/* ./projects/ngx-extended-pdf-viewer/$FOLDER/cmaps/

cp -R "../mypdf.js/build/minified/web/standard_fonts" ./projects/ngx-extended-pdf-viewer/$FOLDER

cp -R ../mypdf.js/build/minified/build/pdf.* ./projects/ngx-extended-pdf-viewer/$FOLDER/
cp -R ../mypdf.js/build/minified/web/viewer.* ./projects/ngx-extended-pdf-viewer/$FOLDER/
cp -R ../mypdf.js/build/minified/web/viewer.min* ./projects/ngx-extended-pdf-viewer/$FOLDER/
cp -R ../mypdf.js/build/minified-legacy/build/pdf* ./projects/ngx-extended-pdf-viewer/$FOLDER/
cp -R ../mypdf.js/build/minified-legacy/web/viewer-* ./projects/ngx-extended-pdf-viewer/$FOLDER/

if [ $BRANCH == "bleeding-edge" ]
then
  echo "Generating types"
  "./node_modules/.bin/tsc" --target ES2020 --allowJS --declaration --outDir projects/ngx-extended-pdf-viewer/types/ --strict --esModuleInterop --forceConsistentCasingInFileNames --emitDeclarationOnly --moduleResolution node ../mypdf.js/src/pdf.js ../mypdf.js/web/pdf_viewer.js
fi

cd addBaseLanguages
node index.js $FOLDER
node add-additional-translations.js $FOLDER
cd ..
cd convertI18nFilesToJson
node index.js $FOLDER
cd ..

cd add-version-number-to-file-name
node run-outside-ngzone.js
node add-version-number.js
cd ..
