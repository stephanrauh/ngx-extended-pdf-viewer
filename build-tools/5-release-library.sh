#!/bin/sh
# navigate to the root directory, no matter where the script is called
source "$(dirname "$0")/99-cd-to-root.sh"

echo "to be continued..."

    "generate-sbom": "cyclonedx-npm --output-file sbom.json --mc-type library",
    "prerelease": "./check-commit-state.sh && npm run generate-sbom",
    "release": "npm run unix-package && cd dist/ngx-extended-pdf-viewer && npm publish && cd .. && cd .. && ./createTag.sh && node ./increase-version-number.js",
