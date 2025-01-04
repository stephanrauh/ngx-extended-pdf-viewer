#!/bin/sh
# navigate to the root directory, no matter where the script is called
source "$(dirname "$0")/99-cd-to-root.sh"

rm -r dist

npx ts-node ./build-tools/viewer/compile-sass.ts

if [ $? -ne 0 ]; then
  echo "Error 20: Building CSS failed"
  exit 20
fi
echo "CSS built successfully"

ng b ngx-extended-pdf-viewer --configuration production $1
if [ $? -ne 0 ]; then
  echo "Error 21: Building library failed"
  exit 21
fi
npx ng-packagr -p projects/ngx-extended-pdf-viewer/ng-package.json
if [ $? -ne 0 ]; then
  echo "Error 22: Packing library failed"
  exit 22
fi

./build-tools/2-1-build-schematics.sh
if [ $? -ne 0 ]; then
  echo "Error 23: Building schematics failed"
  exit 23
fi

# copy the library to the old showcase
rm -r -f ../extended-pdf-viewer-showcase/node_modules/ngx-extended-pdf-viewer
cp -R dist/ngx-extended-pdf-viewer ../extended-pdf-viewer-showcase/node_modules/ngx-extended-pdf-viewer
if [ $? -ne 0 ]; then
  echo "Error 24: Copying library to old showcase failed"
  exit 24
fi

