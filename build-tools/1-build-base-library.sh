#!/bin/sh
# navigate to the root directory, no matter where the script is called
source "$(dirname "$0")/99-cd-to-root.sh"

node ./build-tools/base-library/extract-versions.js

./build-tools/base-library/updateMozillasPdfViewer.sh
