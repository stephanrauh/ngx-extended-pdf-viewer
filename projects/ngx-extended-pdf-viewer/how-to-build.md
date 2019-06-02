1. Switch off the prettier plugin. It scrambles the line numbers, rendering the line numbers in this README file useless.
   (Note to myself: Prettier also adds several backslashes to excape special characters when saving the README.md file. Don't forget to delete the extra backslashes again).
2. Create a new folder "embedded-pdf". It must be in the same folder as ngx-extended-pdf-viewer.
3. cd embedded-pdf
4. git clone https://github.com/stephanrauh/pdf.js.git
5. mv pdf.js mozillas-pdf.js (or rename pdf.js mozilla-pdf.js if you're using Windows)
6. cd mozillas-pdf.js
7. npm install -g gulp-cli
8. npm install
9. gulp server (steps 9 - 11 only check if the installation went well)
10. open http://localhost:8888/web/viewer.html
11. stop the server (CTRL+C)
12. gulp generic
13. cd ..
14. cd ngx-extended-pdf-viewer
15. cd inlineImageFiles
16. node index.js (modifies the CSS file to make it embeddable)
17. cd ..
18. cp -R ../mozillas-pdf.js/build/generic/web/locale/* ./projects/ngx-extended-pdf-viewer/src/assets/locale/
19. cp ../mozillas-pdf.js/build/generic/build/pdf.* ./projects/ngx-extended-pdf-viewer/src/assets
20. cp ../mozillas-pdf.js/build/generic/web/viewer.js ./projects/ngx-extended-pdf-viewer/src/assets
21. cd addBaseLanguages
22. node index.js
23. cd ..
24. cd convertI18nFilesToJson
25. node index.js
26. cd ..
38. examine the history of https://github.com/mozilla/pdf.js/blob/master/web/viewer.html and copy the changes to ngx-extended-pdf-viewer.component.html. Warning: ngx-extended-pdf-viewer.component.html has a lot of additions to the original file. Proceed with care.

39. npm run win-package (or npm run unix-package, depending on your OS) (this command copies the viewer files to the dist folder so you can run the demo)
40. ng serve

Note to myself: to deploy the library on npm, change to the folder `dist/ngx-extended-pdf-viewer` and run `npm publish` from there. Or: run `npm run unix-package` followed by `npm run release`.
