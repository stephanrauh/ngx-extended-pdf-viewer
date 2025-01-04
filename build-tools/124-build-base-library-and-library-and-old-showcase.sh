#!/bin/sh
# navigate to the root directory, no matter where the script is called
source "$(dirname "$0")/99-cd-to-root.sh"

./build-tools/1-build-base-library.sh
if [ $? -ne 0 ]; then
  echo "Error 1240: Building base library failed"
  exit 1240
fi
./build-tools/2-build-library.sh
if [ $? -ne 0 ]; then
  echo "Error 1241: Building library failed"
  exit 1241
fi
./build-tools/4-build-old-showcase.sh "$1"
if [ $? -ne 0 ]; then
  echo "Error 1242: Building old showcase failed"
  exit 1242
fi
