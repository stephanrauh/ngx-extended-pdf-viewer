#!/bin/sh
cd ../mypdf.js

rm -rf build

FOLDER="assets"
BRANCH=$(git rev-parse --abbrev-ref HEAD)
if [ "$BRANCH" == "bleeding-edge" ]; then
  FOLDER="bleeding-edge"
fi

if [ "$1" == "quick" ]; then
  gulp generic
else
  gulp generic && gulp minified && gulp generic-legacy && gulp minified-legacy
fi

mv build/generic-legacy/build/pdf.mjs build/generic-legacy/build/pdf-es5.mjs
mv build/generic-legacy/build/pdf.sandbox.mjs build/generic-legacy/build/pdf.sandbox-es5.mjs
mv build/generic-legacy/build/pdf.worker.mjs build/generic-legacy/build/pdf.worker-es5.mjs
mv build/generic-legacy/web/viewer.mjs build/generic-legacy/web/viewer-es5.mjs

mv build/minified/build/pdf.min.mjs build/minified/build/pdf.min.mjs
mv build/minified/build/pdf.sandbox.min.mjs build/minified/build/pdf.sandbox.min.mjs
mv build/minified/build/pdf.worker.min.mjs build/minified/build/pdf.worker.min.mjs
mv build/minified/web/viewer.mjs build/minified/web/viewer.min.mjs

mv build/minified-legacy/build/pdf.min.mjs build/minified-legacy/build/pdf-es5.min.mjs
mv build/minified-legacy/build/pdf.sandbox.min.mjs build/minified-legacy/build/pdf.sandbox-es5.min.mjs
mv build/minified-legacy/build/pdf.worker.min.mjs build/minified-legacy/build/pdf.worker-es5.min.mjs
mv build/minified-legacy/web/viewer.mjs build/minified-legacy/web/viewer-es5.min.mjs


cd ../ngx-extended-pdf-viewer

rm -R ./projects/ngx-extended-pdf-viewer/$FOLDER/pdf*.mjs
rm -R ./projects/ngx-extended-pdf-viewer/$FOLDER/viewer*.mjs
cp -R ../mypdf.js/build/minified/web/locale/* ./projects/ngx-extended-pdf-viewer/$FOLDER/locale/
cp -R ../mypdf.js/build/minified/web/cmaps/* ./projects/ngx-extended-pdf-viewer/$FOLDER/cmaps/

cp -R "../mypdf.js/build/minified/web/standard_fonts" ./projects/ngx-extended-pdf-viewer/$FOLDER

cp -R ../mypdf.js/build/generic/build/pdf.* ./projects/ngx-extended-pdf-viewer/$FOLDER/
cp -R ../mypdf.js/build/generic/web/viewer.* ./projects/ngx-extended-pdf-viewer/$FOLDER/

cp -R ../mypdf.js/build/minified/build/pdf.* ./projects/ngx-extended-pdf-viewer/$FOLDER/
cp -R ../mypdf.js/build/minified/web/viewer.min* ./projects/ngx-extended-pdf-viewer/$FOLDER/

cp -R ../mypdf.js/build/generic-legacy/build/pdf* ./projects/ngx-extended-pdf-viewer/$FOLDER/
cp -R ../mypdf.js/build/generic-legacy/web/viewer-* ./projects/ngx-extended-pdf-viewer/$FOLDER/

cp -R ../mypdf.js/build/minified-legacy/build/pdf* ./projects/ngx-extended-pdf-viewer/$FOLDER/
cp -R ../mypdf.js/build/minified-legacy/web/viewer-* ./projects/ngx-extended-pdf-viewer/$FOLDER/

rm -R ./projects/ngx-extended-pdf-viewer/$FOLDER/*.d.mts

cd addBaseLanguages
# node index.js $FOLDER
node add-additional-translations.js $FOLDER
cd ..

cd add-version-number-to-file-name
node run-outside-ngzone.js
node add-version-number.js $1
cd ..

if [ $BRANCH != "bleeding-edge" ]
then
  echo "Generating types"
  cd ../mypdf.js
  gulp types
  cd ../ngx-extended-pdf-viewer
  cp -r ../mypdf.js/build/types/ ./projects/ngx-extended-pdf-viewer/types
fi

