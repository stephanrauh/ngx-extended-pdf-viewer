# Preparations
You need a current node.js and roughly 20-30 minutes of time, maybe even less. Most of the build process is automated. This recipe shows the Unix and MacOS scripts, but there are also Windows batch files you can use. Sometimes the two sets of files diverge (because I'm lazy - feel free to blame me!). If you run into trouble, have a look at the Unix files. I use them much more often, so they are the "source of truth".

## Use the default demo
Well... don't do it. 

OK, maybe that was too short. The ngx-extended-pdf-viewer project consists both of a tradtional Angular project and an Angular libray. For a long time, I used the project to test the library. However, at some point in time, the showcase - which is another project hosted at https://github.com/stephanrauh/extended-pdf-viewer-showcase - began to cover all the interesting use-cases. So I used the default project less and less often, until it started to show signs of neglect. I still use it every once in a while to test whether the library works in a context path, but more often than not, I have to spend some time to get it up and running. My daily (or almost daily, since this is a leisure-time project, and I'm a part-time nerd) workflow focuses on https://github.com/stephanrauh/extended-pdf-viewer-showcase and https://github.com/stephanrauh/ngx-extended-pdf-viewer-issues.
## Use the showcase to test your changes of ngx-extended-pdf-viewer

In a nutshell: you need two projects, ngx-extended-pdf-viewer and extended-pdf-viewer, in the same parent folder.

1. Create a new folder "embedded-pdf". It must be in the same folder as ngx-extended-pdf-viewer.
2. cd embedded-pdf
3. git clone https://github.com/stephanrauh/ngx-extended-pdf-viewer
4. cd ngx-extended-pdf-viewer
5. npm install
6. npm run showcase
7. cd ../extended-pdf-viewer-showcase  (or open a new terminal window)
8. git clone https://github.com/stephanrauh/extended-pdf-viewer-showcase
9. cd extended-pdf-viewer-showcase (or open a new terminal window)
10. npm install
11. cd ..
12. cd ngx-extended-pdf-viewer
13. npm run showcase
14. cd ..
15. cd extended-pdf-viewer-showcase
16. ng serve -o

Instead of changing the directory all the time, you can also open multiple terminal windows. The showcase updates automatically each time you execute `npm run showcase`.

## Build ngx-extended-pdf-viewer with a custom version of pdf.js
In a nutshell: you need three projects, my clone of pdf.js, ngx-extended-pdf-viewer, and extended-pdf-viewer-showcase, in the same parent folder. pdf.js needs to be built first, followed by ngx-extended-pdf-viewer and extended-pdf-viewer-showcase. 

1. cd embedded-pdf
2. git clone git@github.com:stephanrauh/extended-pdf-viewer-showcase.git
3. cd extended-pdf-viewer-showcase
4. npm install
5. cd ..
6. git clone https://github.com/stephanrauh/pdf.js.git
7. mv pdf.js mypdf.js (or rename pdf.js mypdf.js if you're using Windows)
8. cd mypdf.js
9. npm install -g gulp-cli
10. npm install
11. gulp generic (not necessary - but it gives you faster feedback if there's a compile error)
12. cd ngx-extended-pdf-viewer
13. sh ./updateMozillasPdfViewer.sh
14. npm run showcase
15. cd ../extended-pdf-viewer-showcase
16. ng s -o

Since a couple of versions, Angular fails to hot reload the showcase when you run `npm showcase` again. So you need to `CTRL+C` your showcase each time you re-build the library.
