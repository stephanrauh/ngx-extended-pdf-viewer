# Preparations
You need a current node.js and roughly 20-30 minutes of time. Most of the build process is automated. This recipe shows the Unix and MacOS scripts, but there are also Windows batch files you can use. Sometime the two sets of files diverge. If you run into trouble, have a look at the Unix files. I use them much more often, so they are the "source of truth".

## Build ngx-extended-pdf-viewer without modifying pdf.js
1. Create a new folder "embedded-pdf". It must be in the same folder as ngx-extended-pdf-viewer.
2. cd embedded-pdf
3. git clone https://github.com/stephanrauh/ngx-extended-pdf-viewer
4. cd ngx-extended-pdf-viewer
5. npm install
6.  npm run win-package (or npm run unix-package, depending on your OS) (this command copies the viewer files to the dist folder so you can run the demo)
7. npm run start

## Use the showcase to test your changes of ngx-extended-pdf-viewer
Follow the recipe above first to install your local copy of ngx-extended-pdf-viewer.

1. cd embedded-pdf
2. git clone https://github.com/stephanrauh/extended-pdf-viewer-showcase
3. cd extended-pdf-viewer-showcase
4. npm install
5. cd ..
6. cd ngx-extended-pdf-viewer
7. npm run showcase
8. cd ..
9. cd extended-pdf-viewer-showcase
10. ng serve -o

Instead of changing the directory all the time, you can also open multiple terminal windows. The showcase updates automatically each time you execute `npm run showcase`.

## Build ngx-extended-pdf-viewer with a custom version of pdf.js
I assume you've already followed the first recipe above.

1. cd embedded-pdf
3. git clone https://github.com/stephanrauh/pdf.js.git
4. mv pdf.js mypdf.js (or rename pdf.js mypdf.js if you're using Windows)
5. cd mypdf.js
6. npm install -g gulp-cli
7. npm install
8.  gulp server (steps 9 - 11 are not necessary; they only check if the installation is healthy)
9.  open http://localhost:8888/web/viewer.html. Note that the source-code version of pdf.js is a lot slower than the production version. It takes a while until the PDF file shows.
10. stop the server (CTRL+C)
11. cd ..
12. cd ngx-extended-pdf-viewer
13. sh ./updateMozillasPdfViewer.sh
14. npm run win-package (or npm run unix-package, depending on your OS) (this command copies the viewer files to the dist folder so you can run the demo)
15. npm run start
