#!/bin/sh
# navigate to the root directory, no matter where the script is called
source "$(dirname "$0")/99-cd-to-root.sh"

./build-tools/2-build-library.sh
if [ $? -ne 0 ]; then
  echo "Error 230: Building library failed"
  exit 230
fi
./build-tools/3-build-new-showcase.sh  "$1"
if [ $? -ne 0 ]; then
  echo "Error 231: Building new showcase failed"
  exit 231
fi

