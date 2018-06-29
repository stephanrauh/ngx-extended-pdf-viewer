# ngx-extended-pdf-viewer

This library provides an embeddable
PDF viewer component. It's different from other approaches like ng2-pdf-viewer in that it
shows the full suite of UI widgets. In other words, it looks exactly like the PDF viewer of the browser.

## State of the art

The library is very young, but it _should_ already be useful. Use at own risk. I've managed
to get it up and running with an Angular 6 project. When I tried to use it with an Angular 5
project, it failed because the Angular CLI seems to use different paths. This is still suject
to investigation.

The library has been developed with Angular 6, so probably npm will complain if you're using
an older version of Angular. In theory, ngx-extended-pdf-viewer should be compatible with
every Angular version since 2.0, but that hasn't been tested yet.

## Know bugs

Version 0.2.0 doesn't survive compiling with the "--prod" flag yet.

## How to use the library

There's a minimalistic demo project at https://github.com/stephanrauh/ExploringAngular/tree/master/embedding-pdf.

1.  Install the library with npm i ngx-extended-pdf-viewer --save
2.  Open the file "angular.json" (or ".angular-cli.json" if you're using an older version of Angular)
    and add these two JavaScript files to the "scripts" section:

            "scripts": [
              "node_modules/ngx-extended-pdf-viewer/assets/pdf.js",
              "node_modules/ngx-extended-pdf-viewer/assets/pdf.worker.js"
            ]

3.  Add the translations to the assets by adding them to the "assets" section in the angular.json:

            "assets": [
              "src/favicon.ico",
              "src/assets",
              { "glob": "**/*", "input": "node_modules/ngx-extended-pdf-viewer/assets/locale", "output": "/assets/locale/" }
            ]

    If you need only one language, you can reduce the list to 'locale-properties' and your language folder.

4.  Add "NgxExtendedPdfViewerModule" to the import section of your module file. If your IDE doesn't find
    the import automatically, here it is:

            import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';

5.  Now you can display the PDF file using "&lt;ngx-extended-pdf-viewer src="'assets/example.pdf'"&gt;&lt;/ngx-extended-pdf-viewer&gt;".

## Configuration

Currently, the library is in a very early stage, so there's almost nothing to configure.

src defines the URL of the PDF file to display.

## Feedback, pull requests and bug reports

Pull requests and bug reports are welcome. Please send them to the bug tracker of
the project page: https://github.com/stephanrauh/ExploringAngular/tree/master/embedding-pdf

## Building the library from scratch (and updating to the latest version of Mozilla's pdf.js)

Have a look at https://github.com/stephanrauh/ngx-extended-pdf-viewer/blob/master/README.md

## License and Kudos

The library is based on https://github.com/mozilla/pdf.js, which has been published under an Apache V2 license.

Hence the licence of the ngx-extended-pdf-viewer is the Apache V2 license, too.

## Changelog

till 0.1.3: initial version based on the embeddable PDF-Viewer https://github.com/legalthings/pdf.js-viewer
0.2.0: use Mozilla's pdf.js (https://github.com/mozilla/pdf.js) directly. Update to pdf.js 2.0.641.
