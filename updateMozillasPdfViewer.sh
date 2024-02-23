#!/bin/sh
cd ../mypdf.js
FOLDER="assets"
BRANCH=$(git rev-parse --abbrev-ref HEAD)
if [ "$BRANCH" == "bleeding-edge" ]; then
echo "new"
  cd ../ngx-extended-pdf-viewer
  sh ./update-4.1-and-higher.sh
else
echo "old"
  rm -rf build

  gulp minified-legacy
  gulp minified

  mv build/minified/web/pdf.viewer.mjs build/minified/web/viewer.min.mjs

  mv build/minified-legacy/web/pdf.viewer.mjs build/minified-legacy/web/viewer-es5.min.mjs
  mv build/minified-legacy/web/viewer.mjs build/minified-legacy/web/viewer-es5.mjs

  mv build/minified/build/pdf.mjs build/minified/build/pdf.mjs

  mv build/minified-legacy/build/pdf.min.mjs build/minified-legacy/build/pdf-es5.min.mjs
  mv build/minified-legacy/build/pdf.mjs build/minified-legacy/build/pdf-es5.mjs

  mv build/minified/build/pdf.sandbox.mjs build/minified/build/pdf.sandbox.mjs

  mv build/minified-legacy/build/pdf.sandbox.min.mjs build/minified-legacy/build/pdf.sandbox-es5.min.mjs
  mv build/minified-legacy/build/pdf.sandbox.mjs build/minified-legacy/build/pdf.sandbox-es5.mjs

  mv build/minified-legacy/build/pdf.worker.min.mjs build/minified-legacy/build/pdf.worker-es5.min.mjs
  mv build/minified-legacy/build/pdf.worker.mjs build/minified-legacy/build/pdf.worker-es5.mjs

  cd ../ngx-extended-pdf-viewer

  rm -R ./projects/ngx-extended-pdf-viewer/$FOLDER/pdf*.mjs
  rm -R ./projects/ngx-extended-pdf-viewer/$FOLDER/viewer*.mjs
  cp -R ../mypdf.js/build/minified/web/locale/* ./projects/ngx-extended-pdf-viewer/$FOLDER/locale/
  cp -R ../mypdf.js/build/minified/web/cmaps/* ./projects/ngx-extended-pdf-viewer/$FOLDER/cmaps/

  cp -R "../mypdf.js/build/minified/web/standard_fonts" ./projects/ngx-extended-pdf-viewer/$FOLDER

  cp -R ../mypdf.js/build/minified/build/pdf.* ./projects/ngx-extended-pdf-viewer/$FOLDER/
  cp -R ../mypdf.js/build/minified/web/viewer*.mjs ./projects/ngx-extended-pdf-viewer/$FOLDER/
  cp -R ../mypdf.js/build/minified/web/viewer.min*.mjs ./projects/ngx-extended-pdf-viewer/$FOLDER/
  cp -R ../mypdf.js/build/minified-legacy/build/pdf* ./projects/ngx-extended-pdf-viewer/$FOLDER/
  cp -R ../mypdf.js/build/minified-legacy/web/viewer-*.mjs ./projects/ngx-extended-pdf-viewer/$FOLDER/
  rm -R ./projects/ngx-extended-pdf-viewer/$FOLDER/*.d.mts
  rm -R ./projects/ngx-extended-pdf-viewer/$FOLDER/*.html
  rm -R ./projects/ngx-extended-pdf-viewer/$FOLDER/*.css

  cd addBaseLanguages
  # node index.js $FOLDER
  node add-additional-translations.js $FOLDER
  cd ..

  cd add-version-number-to-file-name
  node run-outside-ngzone.js
  node add-version-number.js
  cd ..

  if [ $BRANCH != "bleeding-edge" ]
  then
    echo "Generating types"
    cd ../mypdf.js
    gulp types
    cd ../ngx-extended-pdf-viewer
    cp -r ../mypdf.js/build/types/ ./projects/ngx-extended-pdf-viewer/types
  fi
fi
