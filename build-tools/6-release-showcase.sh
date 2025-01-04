#!/bin/sh
# navigate to the root directory, no matter where the script is called
source "$(dirname "$0")/99-cd-to-root.sh"

npm run build:showcase
cp ftp/.htaccess dist/showcase/browser
cd ftp
npx tsx upload.ts
