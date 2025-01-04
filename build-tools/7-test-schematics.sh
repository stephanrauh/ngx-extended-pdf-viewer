#!/bin/sh
# navigate to the root directory, no matter where the script is called
source "$(dirname "$0")/99-cd-to-root.sh"

ng build ngx-extended-pdf-viewer
cd projects/ngx-extended-pdf-viewer
npm run build
if [ $? -ne 0 ]; then
  echo "Error 70: Building schematics failed"
  exit 70
fi
cd ../..
npm link ./dist/ngx-extended-pdf-viewer
if [ ! -d "../test" ]
then
  cd ..
  ng new test --routing=false --style=css
  cd test
fi
npm link ../ngx-extended-pdf-viewer/dist/ngx-extended-pdf-viewer
cd ../test
git stash
npm i
ng add ngx-extended-pdf-viewer npm link ngx-extended-pdf-viewer
if [ $? -ne 0 ]; then
  echo "Error 71: ng add failed"
  exit 71
fi

