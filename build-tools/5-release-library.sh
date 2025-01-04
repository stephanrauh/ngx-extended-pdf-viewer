#!/bin/sh
# navigate to the root directory, no matter where the script is called
source "$(dirname "$0")/99-cd-to-root.sh"

./build-tools/release/check-commit-state.sh
if [ $? -ne 0 ]; then
  echo "Error 51: check-commit-state.sh failed"
  exit 51
fi

npx @cyclonedx/cyclonedx-npm --output-file sbom.json --mc-type library
if [ $? -ne 0 ]; then
  echo "Error 52: npm SBOM generation failed"
  exit 52
fi
./build-tools/1-build-base-library.sh
if [ $? -ne 0 ]; then
  echo "Error 53: build-base-library.sh failed"
  exit 53
fi
./build-tools/2-build-library.sh
if [ $? -ne 0 ]; then
  echo "Error 54: build-library.sh failed"
  exit 54
fi
cd dist/ngx-extended-pdf-viewer
npm publish
if [ $? -ne 0 ]; then
  echo "Error 55: npm publish failed"
  exit 55
fi
cd ..
cd ..
./build-tools/release/createTag.sh
if [ $? -ne 0 ]; then
  echo "Error 56: createTag.sh failed"
  exit 56
fi
node ./build-tools/release/increase-version-number.js
if [ $? -ne 0 ]; then
  echo "Error 57: increase-version-number.js failed"
  exit 57
fi

git commit . -m "bumped the version number after publishing $version"

cd ../mypdf.js
git checkout 4.7

node ../ngx-extended-pdf-viewer/build-tools/base-library/extract-versions.js

if [ $? -ne 0 ]; then
  echo "Error 50: extract-versions.js failed"
  exit 58
fi

git commit . -m "bumped the version number after publishing $version"

git checkout bleeding-edge

node ../ngx-extended-pdf-viewer/build-tools/base-library/extract-versions.js

if [ $? -ne 0 ]; then
  echo "Error 59: extract-versions.js failed"
  exit 59
fi
git commit . -m "bumped the version number after publishing $version"
