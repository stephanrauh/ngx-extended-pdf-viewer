#!/bin/sh
cd ../mypdf.js

rm -r build

FOLDER="assets"
BRANCH=$(git rev-parse --abbrev-ref HEAD)
if [ "$BRANCH" == "bleeding-edge" ]; then
  FOLDER="bleeding-edge"
fi
if [ $BRANCH == "3.11" ]; then
  FOLDER="bleeding-edge"
fi

gulp generic
gulp generic-legacy
gulp minified-legacy
gulp minified
wait

mv build/minified/web/pdf.viewer.js build/minified/web/viewer.min.js
mv build/generic/web/viewer.js build/minified/web/viewer.js

mv build/minified-legacy/web/pdf.viewer.js build/minified-legacy/web/viewer-es5.min.js
mv build/generic-legacy/web/viewer.js build/minified-legacy/web/viewer-es5.js

mv build/minified/build/pdf.js build/minified/build/pdf.min.js
mv build/generic/build/pdf.js build/minified/build/pdf.js

mv build/minified-legacy/build/pdf.js build/minified-legacy/build/pdf-es5.min.js
mv build/generic-legacy/build/pdf.js build/minified-legacy/build/pdf-es5.js

mv build/minified/build/pdf.sandbox.js build/minified/build/pdf.sandbox.min.js
mv build/generic/build/pdf.sandbox.js build/minified/build/pdf.sandbox.js

mv build/minified-legacy/build/pdf.sandbox.js build/minified-legacy/build/pdf.sandbox-es5.min.js
mv build/generic-legacy/build/pdf.sandbox.js build/minified-legacy/build/pdf.sandbox-es5.js

mv build/minified/build/pdf.worker.js build/minified/build/pdf.worker.min.js
mv build/generic/build/pdf.worker.js build/minified/build/pdf.worker.js

mv build/minified-legacy/build/pdf.worker.js build/minified-legacy/build/pdf.worker-es5.min.js
mv build/generic-legacy/build/pdf.worker.js build/minified-legacy/build/pdf.worker-es5.js

cd ../ngx-extended-pdf-viewer
# cd inlineImageFiles
# node index.js $FOLDER
# cd ..
rm -R ./projects/ngx-extended-pdf-viewer/$FOLDER/pdf*.js
rm -R ./projects/ngx-extended-pdf-viewer/$FOLDER/viewer*.js
cp -R ../mypdf.js/build/minified/web/locale/* ./projects/ngx-extended-pdf-viewer/$FOLDER/locale/
cp -R ../mypdf.js/build/minified/web/cmaps/* ./projects/ngx-extended-pdf-viewer/$FOLDER/cmaps/

cp -R "../mypdf.js/build/minified/web/standard_fonts" ./projects/ngx-extended-pdf-viewer/$FOLDER

cp -R ../mypdf.js/build/minified/build/pdf.* ./projects/ngx-extended-pdf-viewer/$FOLDER/
cp -R ../mypdf.js/build/minified/web/viewer.js* ./projects/ngx-extended-pdf-viewer/$FOLDER/
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
echo "adding version numbers"
node add-version-number.js
cd ..
