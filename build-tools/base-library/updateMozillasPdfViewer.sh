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
  gulp generic && gulp minified && gulp generic-legacy
fi

mv build/generic-legacy/build/pdf.sandbox.mjs build/generic-legacy/build/pdf.sandbox-es5.mjs
mv build/generic-legacy/build/pdf.worker.mjs build/generic-legacy/build/pdf.worker-es5.mjs
mv build/generic-legacy/web/viewer.mjs build/generic-legacy/web/viewer-es5.mjs

mv build/minified/build/pdf.sandbox.min.mjs build/minified/build/pdf.sandbox.min.mjs
mv build/minified/build/pdf.worker.min.mjs build/minified/build/pdf.worker.min.mjs
mv build/minified/web/viewer.mjs build/minified/web/viewer.min.mjs

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

rm -R ./projects/ngx-extended-pdf-viewer/$FOLDER/*.html
rm -R ./projects/ngx-extended-pdf-viewer/$FOLDER/*.css

node build-tools/addBaseLanguages/add-additional-translations.js $FOLDER

node build-tools/add-version-number-to-file-name/run-outside-ngzone.js
node build-tools/add-version-number-to-file-name/add-version-number.js $1

if [ $BRANCH != "bleeding-edge" ]
then
  echo "Generating types"
  cd ../mypdf.js
  gulp types
  cd ../ngx-extended-pdf-viewer
  cp -r ../mypdf.js/build/types/ ./projects/ngx-extended-pdf-viewer/types
fi

node ./build-tools/base-library/update-version-number-in-viewer.js
