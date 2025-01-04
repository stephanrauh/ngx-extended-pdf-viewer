#!/bin/sh
# navigate to the root directory, no matter where the script is called
source "$(dirname "$0")/99-cd-to-root.sh"

./build-tools/2-build-library.sh
if [ $? -ne 0 ]; then
  echo "Error 240: Building library failed"
  exit 240
fi
./build-tools/4-build-old-showcase.sh "$1"
if [ $? -ne 0 ]; then
  echo "Error 241: Building old showcase failed"
  exit 241
fi

