#!/bin/sh
# navigate to the root directory, no matter where the script is called
source "$(dirname "$0")/99-cd-to-root.sh"

./build-tools/1-build-base-library.sh
if [ $? -ne 0 ]; then
  echo "Error 1230: Building base library failed"
  exit 1230
fi
./build-tools/2-build-library.sh
if [ $? -ne 0 ]; then
  echo "Error 1231: Building library failed"
  exit 1231
fi
./build-tools/3-build-new-showcase.sh  "$1"
if [ $? -ne 0 ]; then
  echo "Error 1232: Building new showcase failed"
  exit 1232
fi

