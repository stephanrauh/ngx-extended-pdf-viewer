1. Create a new folder "embedded-pdf". It must be in the same folder as ngx-extended-pdf-viewer.
2. cd embedded-pdf
3. git clone https://github.com/mozilla/pdf.js.git
4. mv pdf.js mozillas-pdf.js (or rename pdf.js mozillas-pdf.js if you're using Windows)
5. cd mozillas-pdf.js
6. npm install -g gulp-cli
7. npm install
8. gulp server (steps 9 - 11 only check if the installation went well)
9. open http://localhost:8888/web/viewer.html
10. stop the server (CTRL+C)
11. gulp generic
12. cd ..
13. cd ngx-extended-pdf-viewer
14. sh ./updateMozillasPdfViewer.sh
15. examine the history of https://github.com/mozilla/pdf.js/blob/master/web/viewer.html and copy the changes to ngx-extended-pdf-viewer.component.html. Warning: ngx-extended-pdf-viewer.component.html has a lot of additions to the original file. Proceed with care.

16. npm run win-package (or npm run unix-package, depending on your OS) (this command copies the viewer files to the dist folder so you can run the demo)
17. ng serve

Note to myself: to deploy the library on npm, change to the folder `dist/ngx-extended-pdf-viewer` and run `npm publish` from there. Or: run `npm run unix-package` followed by `npm run release`.
