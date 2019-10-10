# ngx-extended-pdf-viewer

<p>
  <a href="https://www.npmjs.com/package/ngx-extended-pdf-viewer">
    <img src="https://img.shields.io/npm/dm/ngx-extended-pdf-viewer.svg?style=flat" alt="downloads">
  </a>
  <a href="https://badge.fury.io/js/ngx-extended-pdf-viewer">
    <img src="https://badge.fury.io/js/ngx-extended-pdf-viewer.svg" alt="npm version">
  </a>
  <a href="https://opensource.org/licenses/Apache-2.0"><img src="https://img.shields.io/badge/License-Apache%202.0-brightgreen.svg"></a>
  </p>
  <p>
  CDN: <a href="https://unpkg.com/browse/ngx-extended-pdf-viewer/">unpkg.com</a>
 </p>

## Showcase

There's a showcase at <a href="https://pdfviewer.net">https://pdfviewer.net</a>. Check this page for live demos and source code examples!

## Bringing PDF to the Angular world

This library provides an embeddable PDF viewer component. It's different from other approaches like [ng2-pdf-viewer](https://vadimdez.github.io/ng2-pdf-viewer/) in that it shows the full suite of UI widgets. In other words, it looks exactly like the PDF viewer of your browser:

<img src="https://beyondjava.net/blog/images/ngx-extended-pdf-viewer/example-screenshot.png">

## Features

- Searching (even programatically)
- Printing
- Sidebar with thumbails, outlines, and attachments
- Rotating
- Download and upload
- Zoom (with optional two-way binding to an attribute)
- Full-screen mode
- various selection tools
- standard display or even / odd spreads (like a book)
- several event listeners
- various approaches to scrolling (vertical, horizontal, "wrapped" scrolling)
- Internationalization (providing translations to several dozen languages)
- plus the ability to deactivate each of these features.

Not to mention the ability to display PDF files, running on Mozilla's pdf.js 2.2.228.

## Alternatives

If you only need the base functionality, I'll happily pass you to [the project of Vadym Yatsyuk](https://github.com/vadimdez/ng2-pdf-viewer/). Vadym does a great job delivering a no-nonsense PDF viewer. However, if you need something that can easily pass as the native viewer on a gloomy day, ngx-extended-pdf-viewer is your friend.

There's also a direct counterpart to my library: <a href="https://www.npmjs.com/package/ng2-pdfjs-viewer" target="#">ng2-pdfjs-viewer</a>. As far as I can see, it's also a good library. Recently (May 24, 2019), it has been updated to PDF.js 2.2.171. It wraps the PDF viewer in an iFrame. That's a more reliable approach, but it also offers less options. The list of attributes is shorter, and the PDF viewer can't emit events to your application.

You might also try to use the native PDF viewer of your browser. That's a valid approach. Actually, it's even the preferred approach. The advantages of both `ngx-extended-pdf-viewer` and `ng2-pdfjs-viewer` are they also support Internet Explorer 11 (with some help of the polyfills). `ngx-extended-pdf-viewer` also gives you a wide range of options that aren't available using the native API.

## Angular 2, 4, and 5

With a little effort, ngx-extended-pdf-viewer works with Angular 5 and Ionic 3. Thanks to GitHub user @tanzl88 for finding out how. They've also provided a running demo projekt: https://github.com/tanzl88/ionic-3-extended-pdf-viewer.

For technical reasons, the binary files of ngx-extended-pdf-viewer are not compatible with Angular 5 or below. So do not run npm install. Instead, copy these files into your local project:

- <a href="https://github.com/stephanrauh/ngx-extended-pdf-viewer/blob/master/projects/ngx-extended-pdf-viewer/src/assets/pdf.js">pdf.js</a>
- <a href="https://github.com/stephanrauh/ngx-extended-pdf-viewer/blob/master/projects/ngx-extended-pdf-viewer/src/assets/pdf.worker.js">pdf.worker.js</a>
- <a href="https://github.com/stephanrauh/ngx-extended-pdf-viewer/blob/master/projects/ngx-extended-pdf-viewer/src/assets/viewer.js">viewer.js</a>
- <a href="https://github.com/stephanrauh/ngx-extended-pdf-viewer/tree/master/projects/ngx-extended-pdf-viewer/src/lib">the folder ngx-extended-pdf-viewer</a>
- <a href="https://github.com/stephanrauh/ngx-extended-pdf-viewer/tree/master/projects/ngx-extended-pdf-viewer/src/assets/locale">the locale folder</a>

After that, follow these steps:

1.  Load the file `pdf.js` in index.html
2.  Copy the source code ngx-extended-pdf-viewer into your own project (as a new component)
3.  Convert the file `ngx-extended-pdf-viewer.css` into the Ionic format (remove styleUrls)

## Breaking changes

- 1.0.0-rc.5 reactivated IE11 support. The default files `pdf.js`, `pdf-worker.js`, and `viewer.js` use a modern ES6 dialect of JavaScript. Your benefit: the files are smaller. My benefit: it's easier to understand and debug your error messages. To support IE11, you must include another set of JavaScript files: `pdf-es5.js`, `pdf-worker-es5.js`, and `viewer-es5.js`.
- 1.0.0-rc.2 This shouldn't break anything, but just to be sure: the default files `pdf.js`, `pdf-worker.js`, and `viewer.js` have been updated to version 2.2.228. Plus, they are compiled without Babel and without minifiying to make debugging easier. The Angular CLI minifies and transpiles the files, so you shouldn't notice any difference (apart from being able to debug).
- 0.9.54 renames the "sneak preview" files `pdf-2.2.222.js` and `pdf.worker-2.2.222.js` to `pdf.*-2.2` (i.e. the minor version 222 is dropped). Also deleted the `pdf.*-2.2.199.js` files in favor of the `pdf.*-2.2.js` files.
- 0.9.47 introduces a small breaking change: `[showHandTool]` now is false by default, while `[handTool]` is true by default. This allows it to deactivate the CPU-intensive text layer by default.

## Known bugs
Mozilla's PDF viewer suffers from several memory leaks. Currently, ngx-extended-pdf-viewer inherits these leaks (or I didn't find out yet how to remove the viewer from memory properly). If you know how to solve the bug, please leave a message at [the corresponding issue on GitHub](https://github.com/stephanrauh/ngx-extended-pdf-viewer/issues/12). Any help is appreciated!

There's also a layout glitch that seems to be intentional: you may need to set the font size of the input field containing the page number explicitly. By default, it's a lot larger than the rest of the text of the toolbar in some applications.

## Unknown bugs

If you run into problems using `&lt;ngx-extended-pdf-viewer&gt;`, please open an issue on the [project bug tracker](https://github.com/stephanrauh/ngx-extended-pdf-viewer/issues).

## Compatibility to Bootstrap (and other CSS frameworks)

Bootstrap interferes with the printing algorithm of `pdf.js`. Guard it with a media query to avoid unwanted effects, such as scaling the print to 65%. For example, if you're using SCSS and Bootstrap 4, remove the import of Bootstrap.min.css from the Angular.json file. Instead, import it by including Bootstrap by adding this line to the global `styles.scss` file:

```css
@media screen {
  @import '../node_modules/bootstrap/scss/bootstrap';
}
```

## Internet Explorer 11 (and old versions of the "evergreen browsers")

`ngx-extended-pdf-viewer` is compatible to Internet Explorer 11:

- add `pdf-es5.js`, `pdf-worker-es5.js`, and `viewer-es5.js` to the `scripts` section of the `angular.json` (instead of the smaller default files `pdf.js`, `pdf-worker.js`, and `viewer.js`).
- Don't forget to activate your polyfills. Or - even better - use the clever approach of the Angular CLI 7.3+ to import the polyfills automatically if and only if they are needed (see [my article on Angular 7.3 polyfills](https://beyondjava.net/what-happened-to-the-polyfills). Otherwise, you'll end up with an error message like this:

```
SCRIPT438: Object doesn't support property or method `fill`
```

## There shall be only one viewer - or: beware of timing problems!

The PDF viewer is very prone to timing problems:

- Hiding and re-displaying a PDF quickly (or vice versa) results in errors. This is because the bulk of `pdf.js` works asynchronously. It takes some time to initialize the widget. If it's destroyed while still being initialized, you run into problems. The same happens if it's initialized while an earlier instance is still being destroyed.
- Putting PDFs in tab frequently causes this problem. Switching between tabs often means that the content of one of the tabs is hidden. At the same time, the content of the new tab is shown. I've observed this when using @angular/material. The solution is to hide the first tab and to show the new tab after a timeout, as demonstrated in [the demo project](https://github.com/stephanrauh/ngx-extended-pdf-viewer/tree/master/src/app).

```html
<mat-tab-group (selectedTabChange)="activateTab($event.index)">
  <mat-tab label="BootsFAces Deep-Dive PDF">
    <ng-template matTabContent>
      <ngx-extended-pdf-viewer *ngIf="visible[0]" [src]="'assets/pdfs/BootsFaces_Deep_Dive_1.0.pdf'"> </ngx-extended-pdf-viewer>
    </ng-template>
  </mat-tab>
  <mat-tab label="Codpaste PDF">
    <ng-template matTabContent>
      <ngx-extended-pdf-viewer *ngIf="visible[1]" [src]="'assets/pdfs/codpaste-teachingpack.pdf'"> </ngx-extended-pdf-viewer>
    </ng-template>
  </mat-tab>
</mat-tab-group>
```

```typescript
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public visible = { 0: true };

  public activateTab(tab: number): void {
    this.hideOtherPDFs();
    setTimeout(() => {
      this.visible[tab] = true;
    }, 100);
  }

  public hideOtherPDFs(): void {
    console.log('Hiding');
    this.visible[0] = false;
    this.visible[1] = false;
  }
}
```

## Memory footprint

It's a bit difficult to measure, but the library seems to add a hefty 1445 KB of disk space. Gzipping reduces this to 476 KB.
(The precise numbers may differ between versions. The base library, `pdf.js`, tends to grow with each version).

## How to use the library

As a rule of thumb, I recommend to clone the [showcase project from GitHub](https://github.com/stephanrauh/extended-pdf-viewer-showcase) before doing anything else. It's a standard Angular CLI application, so you'll get it up and running in less than ten minutes. It's a good starting point to do your own experiments. Maybe even more important: you'll learn if the library works on your machine. (Of course it does, but it's always good to double-check!)

Basically, there are (at least) two ways to create an Angular application: you can use the Angular tooling (ng new), or you can have it generated by JHipster. JHipster replaces the entire Angular build chain by their own webpack scripts. So there are two slightly different approaches:

1.  Install the library with `npm i ngx-extended-pdf-viewer --save`
    2.a. (CLI users only) Open the file `angular.json` (or `.angular-cli.json` if you're using an older version of Angular) and add these three JavaScript files to the `scripts` section:

```json
"scripts": [
  "node_modules/ngx-extended-pdf-viewer/assets/pdf.js",
  "node_modules/ngx-extended-pdf-viewer/assets/viewer.js"
]
```

If you need to support Internet Exporer 11, use these files instead:

```json
"scripts": [
  "node_modules/ngx-extended-pdf-viewer/assets/pdf-es5.js",
  "node_modules/ngx-extended-pdf-viewer/assets/viewer-es5.js"
]
```

2.b. (CLI users only) Add the translations to the assets by adding them to the "assets" section in the angular.json. This is also the correct place to add the `pdf.worker.js` file. Like above, copy the file `pdf.worker-es5.js` instead of the file `pdf.worker.js` if you need to support Internet Explorer 11.

```json
"assets": [
  "src/favicon.ico",
  "src/assets",
  {
    "glob": "**/*",
    "input": "node_modules/ngx-extended-pdf-viewer/assets/locale",
    "output": "/assets/locale/"
  },
  {
    "glob": "**/*",
    "input": "node_modules/ngx-extended-pdf-viewer/assets/images",
    "output": "/assets/images/"
  },
  { 
    "glob": "pdf.worker.js", // or pdf.worker-es5.js to support IE11
    "input": "node_modules/ngx-extended-pdf-viewer/ngx-extended-pdf-viewer/assets", 
    "output": "/assets/" 
  }
]
```

IE11 users also need to configure the path to the file pdf.worker-es5.js in the component using ngx-extended-pdf-viewer:

```typescript
import { defaultOptions } from 'ngx-extended-pdf-viewer';

@Component(...)
export class PdfDisplayComponent {
constructor() {
    defaultOptions.workerSrc = './assets/pdf.worker-es5.js';
  }
```

If you need only one language, you can reduce the list to `locale.properties` and your language folder.

_Hint:_ There are two ways to define the language files needed for the labels of the buttons and screen elements of the PDF viewer. The second method is described below in the "internationalization" section.

3.a. (Webpack and JHipster users only) Locate the `CopyWebpackPlugin` in the file `webpack.common.js` (currently line 70) and add this line:

```js
  new CopyWebpackPlugin([
    { from: "./node_modules/ngx-extended-pdf-viewer/assets/locale", to: 'content/assets/locale' },
```

3.b. (Webpack and JHipster users only) Copy the files `node_modules/ngx-extended-pdf-viewer/assets/pdf.worker.js` and `node_modules/ngx-extended-pdf-viewer/assets/pdf.js` manually to `src/main/webcontent/app`.

3.c. (Webpack and JHipster users only) Copy the file `node_modules/ngx-extended-pdf-viewer/assets/viewer.js` manually to a new folder `src/main/webcontent/app/web`.

3.d. (Webpack and JHipster users only) Add these lines to the imports section of the `app.main.ts` file:

```typescript
require('ngx-extended-pdf-viewer/assets/pdf.js');
require('ngx-extended-pdf-viewer/assets/pdf.worker.js');
require('ngx-extended-pdf-viewer/assets/web/viewer.js');
```

3.e. (Webpack and JHipster users only) Open the freshly copied `pdf.js` file, locate the function `webpackUniversalModuleDefinition()` and replace the first ten lines by this version:

```javascript
(function webpackUniversalModuleDefinition(root, factory) {
  if(typeof exports === 'object' && typeof module === 'object')
    module.exports = factory();
  else if(typeof define === 'function' && define.amd)
    define("pdfjs-dist/build/pdf", [], factory);
  else if(typeof exports === 'object')
    exports["pdfjs-dist/build/pdf"] = factory();
  // else <-- delete line
  window["pdfjs-dist/build/pdf"] = root["pdfjs-dist/build/pdf"] = root.pdfjsLib = factory(); // <-- modified line
})(this, function() {
```

4.  Add `NgxExtendedPdfViewerModule` to the `imports` section of your module file. If your IDE doesn't find
    the import automatically, here it is:

```typescript
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
```

5.  Now you can display the PDF file like so:

```html
<ngx-extended-pdf-viewer [src]="'assets/example.pdf'" useBrowserLocale="true" height="80vh"></ngx-extended-pdf-viewer>
```

If you are using JHipster, note there's no `assets` folder, so most like the path of the URL is something like `[src]="'content/example.pdf'"`.

6. If you want to display a PDF file you have downloaded from a server, you probably have a `Blob` or a Base64 encoded string. `Blobs` can be passed directly to the attribute `[src]`. Base64 string must be passed to the attribute `[base64Src]` instead.

## Configuration

Do you miss a configuration option? File an issue on the [project bug tracker](https://github.com/stephanrauh/ExploringAngular/tree/master/embedding-pdf). If the base library [pdf.js](https://mozilla.github.io/pdf.js/) supports the requested option, I'll probably add it. BTW, you can speed up the process by providing a code snippet telling me how to implement the feature or by submitting a pull request.

_Legend:_

- [(attribute)] describes an attribute with two-way-binding
- [attribute] means that PDF-viewer reacts when the attribute changes
- (attribute) means an event is raised when the user changes a setting
- attribute (without special characters) means the attribute is used at load time only. Subsequent changes are ignored.

Also see [the attribute list on the showcase](https://pdfviewer.net/attributes). It's the same list, just a little more useful because the showcase doesn't truncate the table on the right hand side.

| _Attribute_                  | _default value_ | _description_                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| :--------------------------- | :-------------: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| (afterPrint)                 |                 | This event is fired after the print jov has either been sent to the printer, or after the user has cancelled the print job. Note there's no way to tell printing from aborting the print.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| (beforePrint)                |                 | This event is fired when the print is initiated. Note that this simply means the print preview window is opened. There's no way to predict if the user is actually going to print.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| [base64Src]                  |                 | accepts a PDF file as base64 encoded string                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| [backgroundColor]            |        ?        | background color                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| [contextMenuAllowed]         |      true       | should the context menu show when the right-hand side button is clicked?                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| (currentZoomFactor)          |       n/a       | fires each time the viewer changes the zoom level. The parameter is the scale factor (not the percentage, nor one of the string "auto", "page fit", "page width" or "original size"). This event seems to fire often enough to make it reliable for detecting the current zoom factor all the time.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| delayFirstView               |        0        | Number of milliseconds to wait between initializing the PDF viewer and loading the PDF file. Most users can let this parameter safely at it's default value of zero. Set this to 1000 or higher if you run into timing problems (typically caused by loading the locale files after the PDF files, so they are not available when the PDF viewer is initialized).                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| [filenameForDownload]        |  document.pdf   | Allows the user to define the name of the file after clicking "download"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| [(handTool)]                 |      false      | setting this flag to true, activates the "hand tool" to scroll the PDF file by dragging. Setting this to false activates the "text selection" tool. You can also use this flag as a two-way binding attribute. If you're only interested in the event, the event name is `(handToolChange)`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| [height]                     |   (see text)    | define the height of the PDF window. By default, it's 100%. On most web pages, this results in a height of 0 pixels. In this case, the height is set to fill all the available space. More precisely, the all the space to the bottom of the window. If that's less then 100 pixel, the height is set to 100 pixel. Note that this is just an initial setting. It doesn't change when the window is resized.                                                                                                                                                                                                                                                                                                                                                                                             |
| [ignoreResponsiveCSS]        |   (see text)    | Hint: see the live demo at <a target="#" href="https://pdfviewer.net/responsive-design">https://pdfviewer.net/responsive-design</a>. CSS is not flexible enough to embed the PDF viewer without retaining responsive design. If the PDF viewer doesn't have the full window width available, this flag is automatically set to "true". In this case, the standard CSS rules of the viewer are ignored in favor of dynamic styles defined by JavaScript. The disadvantage of this approach is that you can't override these rules by custom CSS rules. Hence you can deactivate the responsive JavaScript engine by setting this flag to "false". That's also the default value if the PDF viewer spans the entire width of the window. In this case, the default CSS rules define the responsive design. |
| imageResourcesPath           | ./assets/images | allows you to put the viewer's SVG file into an arbitrary folder.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| language                     |    undefined    | Language of the UI. Must the the complete locale name, such as "es-ES" or "es-AR". It may be all lowercase.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| listenToURL                  |      false      | deactivates the URL listener of the PDF viewer. You can set it to "true" to allow for anchor tags like "#page=23" or "#nameddest=chapter_3". Only activate this flag if you don't use the anchor to encode the URLs for the router.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| [nameddest]                  |    undefined    | allows you to jump to a "named destination" inside the document. Typical examples of names destinations are "chapter_7" oder "image_3". The named destination are defined within the PDF document; you can only jump to destinations defined by the author of the PDF file.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| [showSidebarButton]          |      true       | Show or hide the button to toggle the sidebar                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| [mobileFriendlyZoom]         |      100%       | Increases the size of the UI elements so you can use them on small mobile devices. Must be a percentage (`'150%'`) or a floating-point number (`'1.5'`). Alternatively you can set this attribute to `'true'` (= `'150%'`) or `'false'` (= `'100%'`).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| [password]                   |    undefined    | Allows you to pass a password programatically. If you pass the wrong password, a red error message claiming "corrupt pdf file" is show in below the toolbar. Caveat: the password must be a string. During my test I accidentially used a numerical value. This fails even if the password consists only of digits. Please note that the password is stored in the main memory without encryption. If you're really serious about protecting your user's data from hackers, this might be a security issue.                                                                                                                                                                                                                                                                                              |
| [(page)]                     |    undefined    | two-way binding attribute to determine the page to display; more precisely: `[page]="25"` makes the PDF viewer show page 25 (at any time - even after load time); `[(page)]="attribute"` updates the attribute each time the user scrolls to another page. If you're only interested in the event, that's `(pageChange)`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| [(pageLabel)]                |    undefined    | two-way binding attribute to determine the page to display; more precisely: `[pageLabel]="25"` makes the PDF viewer show the page the author called page "25". This may or may not be a numeric value. For instance, many books use roman numbers for the preface and arab numbers for the rest of the document. In this case, `[pageLabe]="iv"` usually refers to the same page as `[page]="4"`.  `[(pageLabel)]="attribute"` updates the attribute each time the user scrolls to another page. If you're only interested in the event, that's `(pageLabelChange)`.                                                                                                                                                                                                                                     |
| (pagesLoaded)                |    undefined    | emits the number of pages when a document is loaded; more precisely: emits an instance of `PagesLoadedEvent`. The attribute `pagesCount` tells how many pages the document has. The source attribute contains a reference to the PDF viewer. You can also use this event to detect when a document has been loaded.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| (pageRendered)               |    undefined    | fires each time a page is rendered. Emits an instance of `PageRenderedEvent`. The `pageNumber` attribute tells you which page has been rendered.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| (pdfDownloaded)              |    undefined    | fires when a user downloads a document. Strictly speaking, it fires when they click the "download" button. Caveat: Even if the user cancels the download, the event is fired.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| (pdfLoaded)                  |    undefined    | emits when the PDF file has been load successfully. The paramter \$event is an `PdfLoadedEvent`, containing the number of pages of the PDF file.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| (pdfLoadingFailed)           |    undefined    | emits when trying to load and open a PDF file has failed. The parameter `$event` is an `Error`, which may or may not contain the stacktrace and additional info about the root cause of the error.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| [printResolution]            |       150       | set the print resolution in DPI. Sensible values are 300, 600, and maybe even 900. Note that higher values result in more memory consumption, more CPU uses, and may even cause browser crashes. During my tests setting the resolution to 1100 dpi worked, but 1150 failed. In my case, the browser seemed to ignore the print request without displaying any error message.                                                                                                                                                                                                                                                                                                                                                                                                                            |
| [(rotation)]                 |        0        | [rotation] allows you to rotate every page. Note that this attribute is not responsible to rotate individual pages - it always rotates the entire document. (rotationChange) notifies you when the user rotates the document. This attribute can be used as a two-way binding attribute, i.e. [(rotation)]="angle". Legal values are 0, 90, 180, and 270. Every other value is ignored.                                                                                                                                                                                                                                                                                                                                                                                                                  |
| [showBookmarkButton]         |      true       | Show or hide the "bookmark" button                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| [showDownloadButton]         |      true       | Show or hide the "download" button (aka "save" button)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| [showFindButton]             |      true       | Show or hide the "find" button                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| [showHandToolButton]         |      true       | Show or hide the "hand tool" menu item in the secondary toolbar. (The hand tool allows you to move the page by clicking and dragging)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| [showOpenFileButton]         |      true       | Show or hide the "open file" button                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| [showPagingButtons]          |      true       | Show or hide the buttons to navigate between pages and the input field to navigate to a particular input field                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| [showPresentationModeButton] |      true       | Show or hide the "full screen" button                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| [showPrintButton]            |      true       | Show or hide the "print" button                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| [showPropertiesButton]       |      true       | Show or hide the "show document properties" menu item in the secondary toolbar                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| [showRotateButton]           |      true       | Show or hide the "rotate" menu items in the secondary toolbar                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| [showScrollingButton]        |      true       | show or hide the button switching between horizontal and vertical scrolling                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| [showSecondaryToolbarButton] |      true       | Show or hide the secondary toolbar (the menu hiding behind the arrows at the right-hand side)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| [showSelectToolButton]       |       n/a       | This attribute has been removed with version 0.9.47. Use [showHandToolButton] instead.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| showSidebarOnLoad            |    undefined    | If this flag is set to "false", the sidebar is hidden until the user clicks the "show sidebar" button. If this flag is set to "true", the sidebar is shown (unless `[showSidebarButton]="false"`). If the flag is `undefined`, the setting used when the PDF file was shown previously is used. Note that since version 1.5.0, there's also an attribute `[(sidebarVisible)]`. If the new attribute has a value, it always overrides `showSidebarOnLoad`.                                                                                                                                                                                                                                                                                                                                                |
| [showSpreadButton]           |      true       | Show or hide the "spread" menu items in the secondary toolbar. Also see the attribute `[(spread)]` below.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| [showZoomButtons]            |      true       | Show or hide the "zoom" button                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| [(sidebarVisible)]           |    undefined    | Two-way-binding attribute determining whether the sidebar is visible. If you're only interested in the event, the event name is `(sidebarVisibleChange)`. Note that there's an overlap with the attribute `showSidebarOnLoad`. The value of `showSidebarOnLoad` is only considered if the attribute `sidebar` is undefined.                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| [(spread)]                   |       off       | determines if you're seeing one page or two pages at once (like a paper book). `'off'` means there's only one page. `'odd'` is the traditional book-like view, with two pages side-by-side. `'even'` is similar, only the first page is displayed alone.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| useBrowserLocale             |      false      | if true, the PDF viewer assumes the locale files are in the assets folder. If false, you are responsible for providing the translated texts.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| [(zoom)]                     |    undefined    | `[zoom]="undefined"` (default value): use the zoom level `"auto"`. If not `undefined`: Set the zoom level of the page, no matter which zoom level was previously configured. Legal values are `[zoom]="'auto'"`, `="'page-actual'"`, `="'page-fit'"`, `="'page-width'"`, or `="50"` (or any other percentage). Numbers are always considered percentages; the trailing "%" character is optional. This attribute supports two-way binding. `[(zoom)]="zoomAttribute"` updates the variable `zoomAttribute` each time the user changes the zoom setting. This is useful to use the same zoom accross multiple PDF viewer instances or PDF document. If you're only interest in the event, that's `(zoomChange)`.                                                                                          |

## Searching programmatically

The service `NgxExtendedPdfViewerService` allows you to search programmatically. If the PDF viewer hasn't been initialized, or if it has already been destroyed, calling the service results in an error message on the console.

| _method_                     | action                                                                                                                                                                                    |
| ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `find(text: string):boolean` | finds a certain text. If the PDF viewer is not initialized, the method returns `false` and prints an error message on the console.                                                        |
| `findNext(): boolean`        | finds the next search result. Only call it after calling `find()` first. If the PDF viewer is not initialized, the method returns `false` and prints an error message on the console.     |
| `findPrevious(): boolean`    | finds the previous search result. Only call it after calling `find()` first. If the PDF viewer is not initialized, the method returns `false` and prints an error message on the console. |

## Internationalization

### Slow default way

If you add the translation files to your project as described above in step 3, the PDF viewer uses the browser language setting to determine which language to load. First, it loads the `locale.properties`, scans it for the desired language files, and loads the language file from the corresponding folder. That's two additional HTTP calls. That's slow, and it may even lead to errors if the network is already congested loading other resource files.

Don't forget to set the attribute `useBrowserLocale="true"` if you follow this approach.

### Slow way with custom translation files

If you want to use the slow way, but prefer to load the language files from a different URL, add a link to your application like so:

```html
<link rel="resource" type="application/l10n" href="https://www.example.com/locale/locale.properties" />
```

In this case, don't set `useBrowserLocale` (or set it explicitely to false).

### Inlining (aka embedding) the language files

Alternatively, you can provide the translations as a Json file. This Json file has to be part of the HTML page, like so:

```html
<script type="application/l10n">
  {"default_locale":"de","locales":{"de": ... }}
</script>
```

The folder `node_modules/ngx-extended-pdf-viewer/assets/inline-locale-files` contains snippet files you can simply copy into your HTML page.

_Hint_: You can also add the language definition in another HTML file. The bottom line is that the HTML snippet is already part of the DOM when the PDF viewer is initialized. Cluttering the root index file with the translations is an ugly and inflexible hack, but it works.

If you're using the "inline" approach, don't set `useBrowserLocale` (or set it explicitely to `false`).

## Troubleshooting

| Error message or description                                            |                                                                                                                                                                                                                               Solution                                                                                                                                                                                                                               |
| ----------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| "TypeError: Cannot read property 'setPagesCount' of null"               | The language files couldn't be loaded. If you're following the default approach, `useBrowserLocale="true"`. In any case, check whether the language files are part of your project and if they are loaded from the correct path. Note that there's no default translation. You have to load a language file for any language, including English. In rare cases the language files are loaded, just not in time. In this case increase the value of `delayFirstView`. |
| sticky toolbar (when scrolling, the PDF file appears above the toolbar) |                                                                    This happens if you're using the `z-index` to position the `<ngx-extended-pdf-viewer>`. If you can't avoid to do so, add the global CSS rule `.body .toolbar { z-index: 0; }`. The PDF viewer works without the `z-index` of the toolbar. The only difference is that the shadow of the toolbar is hidden by the PDF document.                                                                    |
| Print also includes UI elements                                         |                                                              Usually, the entire screen is hidden automatically, but sometimes this fails, especially with widgets that are dynamically added, such as error messages, progress bars, and block UI overlays. Use media queries to hide the unwanted UI elements. For example, use something like `@media print { #modal-error-dialog: display none; }`.                                                              |

## Feedback, pull requests and bug reports

Pull requests and bug reports are welcome. Please send them to the bug tracker of
the project page: https://github.com/stephanrauh/ngx-extended-pdf-viewer/issues

## Building the library from scratch (and updating to the latest version of Mozilla's pdf.js)

Have a look at [this walkthrough](https://github.com/stephanrauh/ngx-extended-pdf-viewer/blob/master/projects/ngx-extended-pdf-viewer/how-to-build.md).

## License and Kudos

The library is based on https://github.com/mozilla/pdf.js, which has been published under an Apache V2 license.

Hence the licence of the `ngx-extended-pdf-viewer` is the Apache V2 license, too.

Thanks to the awesome pdf.j team and to all the users you've reported bugs and even sent me pull requests!

## Changelog

- till 0.1.3 initial version based on the embeddable PDF-Viewer https://github.com/legalthings/pdf.js-viewer
- 0.2.0 use Mozilla's pdf.js (https://github.com/mozilla/pdf.js) directly. Update to pdf.js 2.0.641.
- 0.2.1 minor bugfixes
- 0.2.2 Make the library compatible to the `--prod` build; improve the CSS locality
- 0.3.0 Solved the timing issue; added options for internationalization; improved the documentation
- 0.3.1 improved the documentation
- 0.3.2 stop registering event listeners multiple times if the component is used multiple times; tentative bugfix that occurred when switching from a file with few thumbnails (i.e. pages) to another instance of the viewer showing a file with many thumbnails
- 0.3.3 removed debug code and solved the bug causing crashing when switching to a new instance of <ngx-extended-pdf-viewe>
- 0.3.4 removed debug code
- 0.9.0 added options to hide every button from the UI
- 0.9.1 tried to add a screenshot to the readme file
- 0.9.2 managed to add a screenshot to the readme file
- 0.9.3 removed debug code
- 0.9.4 improved the documentation
- 0.9.5 recompiled with Angular 7 and updated the peer dependencies, allowing for both Angular 6 and 7
- 0.9.6 updated to pdf.js 2.0.943; added more language files; fixed a bug preventing loading the language defined in a script tag for many language; repaired the parameter `[showSidebarButton]`; fixed broken i18n on OSX Chrome 70 by adding several translations for languages without region specifier (such as "es" instead of "es-ES")
- 0.9.7 fixed the CSS file (font size and margins accidentially spilled to the surrounding page); corrected the link to the bug tracker
- 0.9.8 make the option `[showSidebarOnLoad]` configurable; plus, don't load a sidebar if `[showSidebarButton]="false"`. Kudos go to GitHub user AlexandrosG. Stop the PDF viewer from crashing if the page is left before the PDF is rendered (issue #9). Kudos go to GitHub user Max Dertcaf. Prevent auto-completion in the search input field because it sometimes shows user names and email addresses (#8). Kudos go to Paul Kocher. Also added the optional property `[zoom]`.
- 0.9.9 added the attribute `[mobileZoom]`; repaired the paginator buttons after hiding and re-displaying the PDF viewer; reduced the memory leaks of the `pdf.js` viewer (work in progress); documented how to use ngx-extended-pdf-viewer with tabs
- 0.9.10 adjust the position of the document and the thumbails after increasing the size of the toolbar via `[mobileZoom]="200%"`; implemented the two-way-binding of the `[zoom]` attribute
- 0.9.11 Now the `[zoom]` attribute is also respected when a new document is loaded in the same instance of the PDF viewer
- 0.9.12 fixed the IE11 compatibility of `[mobileFriendlyZoom]` (dirty hack / temporary solution); correct positioning of the findbar when the sidebar is disabled
- 0.9.13 Added some documentation about how to use a `Blob` (e.g. a PDF file downloaded from the server); fixed #21 (progress bar wouldn't hide on any instance of `<ngx-extended-pdf-viewer>`except for the fist instance)
- 0.9.14 #24 fixed the IE11 compatibility of `[zoom]`
- 0.9.15 #27 removed the "j" hidden in the HTML code; updated to PDF.js 2.1.266; # fixed a few bugs in the library README.md and mentioned it in the README.md of the root project; #37 mentioned the memory footprint; #39 updated / corrected the "how to build" instructions
- 0.9.16 #45 allow percentage for the `height` option
- 0.9.17 #40 added an option for the hand tool; #48 improved the documentation concerning Bootstrap; the `[zoom]` attribute now reacts to changes after loading the PDF viewer (previously: only at load time)
- 0.9.18 #49 documented IE11 compatibility with polyfills; #25 implemented the two-way binding attribute `[(page)]` to select the page to display
- 0.9.19 #35 add an option to override the default file name after clicking the "download" button; #34 implemented (pagesLoaded); fixed the `[page]` attribute which always showed page 13 on startup; reduced the timeout to set the initial `[page]`; removed debug code
- 0.9.20 #55 if the setting `"height=100%"` results in a container with 0 pixels height, the PDF viewer automatically resizes to fill all available space.; #38 initial support for `[(spread)]` (work in progress!)
- 0.9.21 #56 made the `[src]` attribute more flexible. Now it also accepts `Blobs`, `Uint8Arrays`, and `ArrayBuffers`. Also added a new attribute, `[base64Src]`, to display PDFs encoded as base64 encoded strings
- 0.9.22 #29 `[backgroundColor]` can now be set to "white" or "#ffffff". Until 0.9.21, pdf.js always converted white to off-white. I am still trying to understand what is going on, so there might be side-effects. However, my tests did not reveal such side-effects yet.
- 0.9.23 #38 fixed the `[spread]` attribute, and made the `[height]` property more reliable
- 0.9.24 #57 added the documentation to get the PDF viewer up and running on JHipster
- 0.9.25 fixed the formatting of the README file
- 0.9.26 mentioned the showcase; added the missing documentation of (pagesLoaded); updated to Angular 8.0.0-rc.4
- 0.9.27 updated to Angular 8.0.0-rc.5; reduced the z-indices
- 0.9.28 #72 added `[password]`
- 0.9.29 #51 added `[nameddest]`; #71 added `listenToURL` and deactivate the hash listener by default
- 0.9.30 #38 improved the attribute `[spread]`; now it works's more reliable (although it's still not perfect, because sometime the PDF file is already shown before applying the correct spread mode); also successfully tested `(spread)`. Now `[(spread)]` is a two-way-binding attribute.
- 0.9.31 #60 added the attribute `language` and repaired the language resolution algorithm
- 0.9.32 #81 implemented `(pageRendered)`
- 0.9.33 #82 sometimes the code initializing the app is called before the app is completely configured. Added code to deal with both early and late calls.
- 0.9.34 #12 fixed a minor memory leak.
- 0.9.35 #67 revisited: reduced the `z-index` of the toolbar to 7. Now every `z-index` is below 11.
- 0.9.36 `[mobileFriendlyZoom]` can now also be 'true' (= '150%') or 'false' (= '100%'); #85 now the zoom buttons are hidden if you want them to be hidden, even if you're using an iPad
- 0.9.37 #85 reverted the bugfix because it's a bug itself
- 0.9.38 #85 addressed the real bug: now the pdf viewer toolbar is responsive on small screen even if the pdf viewer covers only part of the screen width
- 0.9.39 fully automated the process to update to a new version of `pdf.js`; added `pdf.js 2.2.222` as an optional preview version; added pull request #76 (additional null checks and type checks)
- 0.9.40 #84 fixed `[zoom]` (didn't work on page load)
- 0.9.41 #33 implemented a service to call `find()`, `findNext()`, and `findPrevious()` programatically
- 0.9.42 #33 added the documentation for the `find()` service and published `NgxExtendedPdfViewerService` (possibly work in progress)
- 0.9.43 #86 compile the library with Angular 7 because compiling it with Angular 8 breaks backward compatibility
- 0.9.44 #87 wait until the localization event has been fired before opening a PDF file
- 0.9.45 #87 added error messages to make `useBrowserLocale` less confusing
- 0.9.46 #90 fixed the default value of `[zoom]`; corrected the documentation
- 0.9.47 #88 deactivate the text layer by default; it's only active if `[showHandToolButton]="true"`; removed `[showSelectToolButton]` in favor of `[showHandToolButton]`; optimized the way the PDF viewer is configured; breaking change: `[showHandTool]` now is false by default, while `[handTool]` is true by default
- 0.9.48 #95 if the user defines a button to be hidden, it should remain hidden even if responsive design indicates there's enough space to show it.
- 0.9.49 #91 one of the validation checks introduced with 0.9.45 stumbled over a DOM node added by ngx-extended-pdf-viewer itself; 0.9.49 fixes that
- 0.9.50 #86 documented how to use ngx-extended-pdf-viewer with Angular 5 / Ionic 3; updated the preview version of `pdf.js` to 2.2.222 and replaced the ES5 version of these files by the debugger-friendly ES2016 version
- 0.9.51 #80 changed the change detection strategy to "on push" to reduce CPU load. Mentioned that the "find" function become slow in very large documents (above 10 MB and 500 pages).
- 0.9.52 #96 starting with 0.9.47, the attribute `filenameForDownload` was partially broken. 0.9.52 fixes that.
- 0.9.53 #101 stop overwriting `window.print()` by renaming `print()` to `printPDF()`. This is an experimental feature, so currently only the preview JS file `viewer-2.2.222.js` is modified. The 2.1 file is going to be changed after checking for detrimental side-effects.
- 0.9.54 Updated to `pdf.js 2.2.226`. #101 now the print service of the PDF viewer is properly deactivated when the `<ngx-extended-pdf-viewer>` widget is detroyed. Standard printing is reactivated. Also see https://github.com/mozilla/pdf.js/issues/10948 and https://github.com/mozilla/pdf.js/issues/10946
- 0.9.55 #103 finished the migration of responsive design to JavaScript in order to support PDF viewers that have less then the full window width available; added the flag ignoreResponsiveCSS to allow users to deactivate this features; set the flag `[ignoreResponsiveCSS]` to sensible default values depending on the available window width
- 1.0.0-rc.1 #103 implemented the ngOnChanges bit of `[ignoreResponsiveCSS]` so the showcase can demonstrate the effect of returning to the CSS-only approach
- 1.0.0-rc.2 #105 when the user downloads a document, the event `(pdfDownloaded)` is fired. #104 fixed the print overlay which didn't work after creating a second instance of the pdf viewer. Updated the JavaScript files from version 2.1.266 to 2.2.228 of Mozilla's PDF viewer.
- 1.0.0-rc.3 #17 reduced the memory leak
- 1.0.0-rc.4 #113 added an option to suppress the context menu when the right-hand side button is clicked
- 1.0.0-rc.5 #113 restored IE11 compatibility by adding the ES5 files `pdf-es5.js`, `pdf-worker-es5.js`, and `viewer-es5.js`. #115 now `[mobileFriendlyZoom]` also works on Firefox.
- 1.0.0-rc.6 #116 now text selection works when `[handTool]="false"` and `[showHandToolButton]="false"`
- 1.0.0-rc.7 #118 corrected the width and the position of the secondary toolbar (which was broken by fixing #115 in 1.0.0-rc.5). Tested with Firefox, Chrome, and Safari on OSX. IE11 compatibility is yet to be tested, it may or may not be broken.
- 1.0.0-rc.8 #118 tested with Edge and IE11. Removed the temporary IE11 hacks. Fixed a bug with `mobileFriendlyZoom="1.7"` (using floating point numbers instead of percentages resulted in layout glitches).
- 1.0.0-rc.9 #117 added the SVG images to the assets folder; introduced `imageResourcesPath` to allow for even more flexibility
- 1.0.0 minor formatting improvements in the README file
- 1.0.1 #124 made the CSS selector of the progress bar more specific
- 1.0.2 #120 made `[page]` more reliable; sometimes the initial setting was ignored when the page loads slow
- 1.1.0 #125 added `(currentZoomFactor)`; `(zoomChanged)` now also fires when the user selects "auto"
- 1.1.1 #126 up/down keypress shouldn't move the focus away from the current input field.
- 1.2.0 #127 add an option for setting the print resolution; #126 bugfix (forgotten `this` keyword); #129 added `(afterPrint)` and `(beforePrint)`
- 1.3.0 #130 add the events `pdfLoaded` and `pdfLoadingFailed`. Thanks a lot to Taras Mogilyak for providing this pull request!
- 1.3.1 #135 `[base64Src]` now redraws the PDF file when the input has changed; #126 up/down keypress shouldn't move the focus away from the current input field (didn't work in all cases);
- 1.4.0 #134 implemented `[(rotation)]`; #133 implement (src)
- 1.5.0 #136 fixed the configuration so it's possible to use the service worker thread; #132 added `(handTool)`; #131 added `[(sidebarVisible)]`
- 1.5.1 #136 made the `defaultOptions` accessible to IE11 users can configure the worker thread URL; fixed the error message "Invalid pages rotation angle."
- 1.5.2 #142 now the PDF viewer can be used in a form
- 1.5.3 #148 override any custom settings of `overflow-y` on `<html>` and `<body>` when printing (because `overflow-y: hidden` used to clip the print output); preliminary fix of #147
- 1.6.0-rc.0 continued fixing #147: modified behaviour of (page); make a difference between [(page)] and  [(pageLabel)]; 
