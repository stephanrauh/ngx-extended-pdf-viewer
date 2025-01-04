#!/bin/sh
# navigate to the root directory, no matter where the script is called
source "$(dirname "$0")/99-cd-to-root.sh"

# compile the "ng ad ngx-extended-pdf-viewer" schematics
cd projects/ngx-extended-pdf-viewer
npm run build
# copy the schematics to the dist folder
mkdir -p ../../dist/ngx-extended-pdf-viewer/schematics
cp schematics/collection.json ../../dist/ngx-extended-pdf-viewer/schematics/
find schematics -name 'schema.json' | while read file; do
  mkdir -p "../../dist/ngx-extended-pdf-viewer/$(dirname "$file")"
  cp "$file" "../../dist/ngx-extended-pdf-viewer/$file"
done
find schematics -path '*/files/*' -type f | while read file; do
  mkdir -p "../../dist/ngx-extended-pdf-viewer/$(dirname "$file")"
  cp "$file" "../../dist/ngx-extended-pdf-viewer/$file"
done

cd ../..
