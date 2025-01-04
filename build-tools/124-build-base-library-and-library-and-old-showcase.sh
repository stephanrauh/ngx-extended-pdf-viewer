#!/bin/sh
# navigate to the root directory, no matter where the script is called
source "$(dirname "$0")/99-cd-to-root.sh"

./build-tools/1-build-base-library.sh
./build-tools/2-build-library.sh
./build-tools/4-build-old-showcase.sh "$1"
