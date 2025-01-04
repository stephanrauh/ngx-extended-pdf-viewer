#!/bin/sh
# navigate to the root directory, no matter where the script is called
source "$(dirname "$0")/99-cd-to-root.sh"

rm -r dist

npx ts-node ./build-tools/viewer/compile-sass.ts

if [ $? -ne 0 ]; then
  exit 1
fi
echo "CSS built successfully"

ng b ngx-extended-pdf-viewer --configuration production $1
# rm -r dist
npx ng-packagr -p projects/ngx-extended-pdf-viewer/ng-package.json

./build-tools/2-1-build-schematics.sh

# copy the library to the old showcase
rm -r -f ../extended-pdf-viewer-showcase/node_modules/ngx-extended-pdf-viewer
cp -R dist/ngx-extended-pdf-viewer ../extended-pdf-viewer-showcase/node_modules/ngx-extended-pdf-viewer
