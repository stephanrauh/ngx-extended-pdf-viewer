#!/bin/sh
# navigate to the root directory, no matter where the script is called
source "$(dirname "$0")/99-cd-to-root.sh"

node ./build-tools/showcase/build-search-index.js

if [ "$1" == "--open" ] || [ "$1" == "-o" ]; then
  ng s showcase --host 0.0.0.0 --open
else
  ng b showcase --configuration production
fi
if [ $? -ne 0 ]; then
  echo "Error 30: Building new showcase failed"
  exit 30
fi
