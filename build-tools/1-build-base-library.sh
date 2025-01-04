#!/bin/sh
# navigate to the root directory, no matter where the script is called
source "$(dirname "$0")/99-cd-to-root.sh"

node ./build-tools/base-library/extract-versions.js
if [ $? -ne 0 ]; then
  echo "Error 11: extract-versions.js failed"
  exit 11
fi
./build-tools/base-library/updateMozillasPdfViewer.sh
if [ $? -ne 0 ]; then
  echo "Error 12: updateMozillasPdfViewer.sh failed"
  exit 12
fi
