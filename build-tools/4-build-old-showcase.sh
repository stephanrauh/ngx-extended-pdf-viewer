#!/bin/sh
# navigate to the root directory, no matter where the script is called
source "$(dirname "$0")/99-cd-to-root.sh"

cd ../extended-pdf-viewer-showcase
npm run prebuild

if [ "$1" == "--open" ] || [ "$1" == "-o" ]; then
  ng s --host 0.0.0.0 --open
else
  ng b --configuration production
fi
