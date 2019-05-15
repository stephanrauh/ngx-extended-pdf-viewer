# ngx-extended-pdf-viewer

<p>
  <a href="https://www.npmjs.com/package/ngx-extended-pdf-viewer">
    <img src="https://img.shields.io/npm/dm/ngx-extended-pdf-viewer.svg?style=flat" alt="downloads">
  </a>
  <a href="https://badge.fury.io/js/ngx-extended-pdf-viewer">
    <img src="https://badge.fury.io/js/ngx-extended-pdf-viewer.svg" alt="npm version">
  </a>
</p>

This library provides an embeddable
PDF viewer component. It's different from other approaches like [ng2-pdf-viewer](https://vadimdez.github.io/ng2-pdf-viewer/) in that it shows the full suite of UI widgets. In other words, it looks exactly like the PDF viewer of your browser:

<img src="https://beyondjava.net/blog/images/ngx-extended-pdf-viewer/example-screenshot.png">

## Features

- Searching
- Printing
- Sidebar with thumbails, outlines, and attachments
- Rotating
- Download and upload
- Zoom
- Full-screen mode
- various selection tools
- standard display or even / odd spreads (like a book)
- various approaches to scrolling (vertical, horizontal, "wrapped" scrolling)
- Internationalization (providing translations to several dozen languages)
- plus the ability to deactivate each of these features.

Not to mention the ability to display PDF files, running on Mozilla's pdf.js 2.1.266.

## Alternatives

If you only need the base functionality, I'll happily pass you to [the project of Vadym Yatsyuk](https://github.com/vadimdez/ng2-pdf-viewer/). Vadym does a great job delivering a no-nonsense PDF viewer. However, if you need something that can easily pass as the native viewer on a gloomy day, ngx-extended-pdf-viewer is your friend.

There's also a direct competitor to my library: <a href="https://www.npmjs.com/package/ng2-pdfjs-viewer" target="#">ng2-pdfjs-viewer</a>. As far as I can see, it's also a good library. The disadvantages are that it hasn't been updated since Summer 2018 (as of March 17, 2019). ngx-extended-pdf-viewer currently uses pdf.js 2.1.266, while ng2-pdfjs-viewer is two releases back (2.0.428). ngx-extended-pdf-viewer also has much more options.

## State of the art

I'm using the library in a real-world project on a daily basis. I'm positive it's good enough to use it in production. Actually, that's what I'm doing since a couple of months. Even so: use at own risk. I consider the library a professional-grade leisure time project. I'll answer your bug tickets as soon as possible, but there's nothing in the way of warranties.

The library has been developed with Angular 6. Recently, I've updated it to Angular 7, but I've never tested it with earlier versions of Angular. So I've configure npm to complain complain if you're using
an older version of Angular (i.e. Angular 2-5). In theory, ngx-extended-pdf-viewer should be compatible with
every Angular version since 2.0, but I don't support this actively. If you're using such a configuration, please share your experience with me, so the greater Angular community benefits from your success (or failure) story. Thanks in advance!

## Known bugs

Mozilla's PDF viewer suffers from several memory leaks. Currently, ngx-extended-pdf-viewer inherits these leaks (or I didn't find out yet how to remove the viewer from memory properly). If you know how to solve the bug, please leave a message at [the corresponding issue on GitHub](https://github.com/stephanrauh/ngx-extended-pdf-viewer/issues/12). Any help is appreciated!

There's also a layout glitch that seems to be intentional: you may need to set the font size of the input field containing the page number explicitely. By default, it's a lot larger than the rest of the text of the toolbar in some applications.

Under certain circumstances, the progress bar doesn't vanish after loading the document. This results in a 4 pixel high black bar below the toolbar.

## Unknown bugs

If you run into problems using &lt;ngx-extended-pdf-viewer&gt;, please open an issue on the [project bug tracker](https://github.com/stephanrauh/ExploringAngular/tree/master/embedding-pdf).

## Compatibility to Bootstrap (and other CSS frameworks)

Bootstrap interferes with the printing algorithm of pdf.js. Guard it with a media query to avoid unwanted effects, such as scaling the print to 65%. For example, if you're using SCSS and Bootstrap 4, remove the import of Bootstrap.min.css from the Angular.json file. Instead, import it by including Bootstrap by adding this line to the global `styles.scss` file:

```css
@media screen {
  @import '../node_modules/bootstrap/scss/bootstrap';
}
```

## Internet Explorer 11 (and old versions of the "evergreen browsers")

ngx-extended-pdf-viewer is compatible to Internet Explorer 11. Just don't forget to activate your polyfills. Or - even better - use the clever approach of the Angular CLI 7.3+ to import the polyfills automatically if and only if they are needed (see [my article on Angular 7.3 polyfills](https://beyondjava.net/what-happened-to-the-polyfills). Otherwise, you'll end up with an error message like this:

```
SCRIPT438: Object doesn't support property or method `fill`
```

## Beware of timing problems!

The PDF viewer is very prone to timing problems:

- Hiding and re-displaying a PDF quickly (or vice versa) results in errors. This is because the bulk of pdf.js works asynchronously. It takes some time to initialize the widget. If it's destroyed while still being initialized, you run into problems. The same happens if it's initialized while an earliers instand is still being destroyed.
- Putting PDFs in tab frequently causes this problem. Switching between tabs often means that the content of one of the tabs is hidden. At the same time, the content of the new tab is shown. I've observed this when using @angular/material. The solution is to hide the first tab and to show the new tab after a timeout, as demonstrated in [the demo project](https://github.com/stephanrauh/ngx-extended-pdf-viewer/tree/master/src/app).

```html
<mat-tab-group (selectedTabChange)="activateTab($event.index)">
  <mat-tab label="BootsFAces Deep-Dive PDF">
    <ng-template matTabContent>
      <ngx-extended-pdf-viewer *ngIf="visible[0]" [src]="'assets/pdfs/BootsFaces_Deep_Dive_1.0.pdf'">
      </ngx-extended-pdf-viewer>
    </ng-template>
  </mat-tab>
  <mat-tab label="Codpaste PDF">
    <ng-template matTabContent>
      <ngx-extended-pdf-viewer *ngIf="visible[1]" [src]="'assets/pdfs/codpaste-teachingpack.pdf'">
      </ngx-extended-pdf-viewer>
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
(The precise numbers may differ between versions. The base library, PDF.js, tends to grow with each version).

## How to use the library

There's a minimalistic demo project at https://github.com/stephanrauh/ExploringAngular/tree/master/embedding-pdf. A slightly more advanced demo project is hosted [in the repository of the library](https://github.com/stephanrauh/ngx-extended-pdf-viewer/tree/master/src/app).

1.  Install the library with npm i ngx-extended-pdf-viewer --save
2.  Open the file "angular.json" (or ".angular-cli.json" if you're using an older version of Angular)
    and add these three JavaScript files to the "scripts" section:

            "scripts": [
              "node_modules/ngx-extended-pdf-viewer/assets/pdf.js",
              "node_modules/ngx-extended-pdf-viewer/assets/pdf.worker.js",
              "node_modules/ngx-extended-pdf-viewer/assets/viewer.js"
            ]

3.  Add the translations to the assets by adding them to the "assets" section in the angular.json:

            "assets": [
              "src/favicon.ico",
              "src/assets",
              {
                "glob": "**/*",
                "input": "node_modules/ngx-extended-pdf-viewer/assets/locale",
                "output": "/assets/locale/"
              }
            ]

    If you need only one language, you can reduce the list to 'locale.properties' and your language folder.

    _Hint:_ There are two ways to define the language files needed for the labels of the buttons and screen elements of the PDF viewer. The second method is described below in the "internationalization" section.

4.  Add "NgxExtendedPdfViewerModule" to the import section of your module file. If your IDE doesn't find
    the import automatically, here it is:

            import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';

5.  Now you can display the PDF file like so:

```html
<ngx-extended-pdf-viewer [src]="'assets/example.pdf'" useBrowserLocale="true"> </ngx-extended-pdf-viewer>
```

6. If you want to display a PDF file you've downloaded from a server, you probably have a `Blob` instead of an URL. Since version 0.9.21, you can pass this Blob directly to the `src` attribute. Until 0.9.20, you can use `URL.createObjectURL()` to convert this `Blob` into something the PDF viewer can display:

```html
<ngx-extended-pdf-viewer [src]="currentPdf"></ngx-extended-pdf-viewer>
```

```typescript
public currentPdf: DOMString = null;

set src(input: Blob) {
  this.currentPdf = URL.createObjectURL(input);
}
```

## Configuration

Do you miss a configuration option? File an issue on the [project bug tracker](https://github.com/stephanrauh/ExploringAngular/tree/master/embedding-pdf). If the base library [pdf.js] supports the requested option, I'll probably add it. BTW, you can speed up the process by providing a code snippet telling me how to implement the feature.

_Legend:_

- [(attribute)] attribute with two-way-binding
- [attribute] PDF-viewer reacts when the attribute changes
- attribute attribute is used at load time only (subsequent changes are ignored)

| _Attribute_                  | _mandatory?_ |       _default value_       |                                                                                                                                                                                                                                                                                                                                            _description_                                                                                                                                                                                                                                                                                                                                             |
| ---------------------------- | :----------: | :-------------------------: | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| [src]                        |      no      |                             |                                                                                                                                                                                                                                                                                       If src is a string: defines the URL of the PDF file to display. src may also be a Blob, a Uint8Array or an ArrayBuffer.                                                                                                                                                                                                                                                                                        |
| [base64Src]                  |      no      |                             |                                                                                                                                                                                                                                                                                                                                accepts a PDF file as base64 encoding                                                                                                                                                                                                                                                                                                                                 |
| [backgroundColor]            |      no      |              ?              |                                                                                                                                                                                                                                                                                                                                           background color                                                                                                                                                                                                                                                                                                                                           |
| [height]                     |      no      | 100% or max available space |                                                                                                                                             define the height of the PDF window. By default, it's 100%. On most web pages, this results in a height of 0 pixels. In this case, the height is set to fill all the available space. More precisely, the all the space to the bottom of the window. If that's less then 100 pixel, the height is set to 100 pixel. Note that this is just an initial setting. It doesn't change when the window is resized.                                                                                                                                             |
| useBrowserLocale             |      no      |            false            |                                                                                                                                                                                                                                                                             if true, the PDF viewer assumes the locale files are in the assets folder. If false, you are responsible for providing the translated texts.                                                                                                                                                                                                                                                                             |
| delayFirstView               |      no      |              0              |                                                                                                                                                                  Number of milliseconds to wait between initializing the PDF viewer and loading the PDF file. Most users can let this parameter safely at it's default value of zero. Set this to 1000 or higher if you run into timing problems (typically caused by loading the locale files after the PDF files, so they are not available when the PDF viewer is initialized).                                                                                                                                                                   |
| [showSidebarButton]          |      no      |            true             |                                                                                                                                                                                                                                                                                                                            Show or hide the button to toggle the sidebar                                                                                                                                                                                                                                                                                                                             |
| [mobileFriendlyZoom]         |      no      |            100%             |                                                                                                                                                                                                                                                                                This attributes allows you to increase the size of the UI elements so you can use them on small mobile devices. Must be a percentage.                                                                                                                                                                                                                                                                                 |
| showSidebarOnLoad            |      no      |          undefined          |                                                                                                                                                                                                     If this flag is set to "false", the sidebar is hidden until the user clicks the "show sidebar" button. If this flag is set to "true", the sidebar is shown (unless [showSidebarButton]="false"). If the flag is undefined, the setting used when the PDF file was shown previously is used.                                                                                                                                                                                                      |
| [showFindButton]             |      no      |            true             |                                                                                                                                                                                                                                                                                                                                    Show or hide the "find" button                                                                                                                                                                                                                                                                                                                                    |
| [showPagingButtons]          |      no      |            true             |                                                                                                                                                                                                                                                                                            Show or hide the buttons to navigate between pages and the input field to navigate to a particular input field                                                                                                                                                                                                                                                                                            |
| [showZoomButtons]            |      no      |            true             |                                                                                                                                                                                                                                                                                                                                    Show or hide the "zoom" button                                                                                                                                                                                                                                                                                                                                    |
| [showPresentationModeButton] |      no      |            true             |                                                                                                                                                                                                                                                                                                                                Show or hide the "full screen" button                                                                                                                                                                                                                                                                                                                                 |
| [showOpenFileButton]         |      no      |            true             |                                                                                                                                                                                                                                                                                                                                 Show or hide the "open file" button                                                                                                                                                                                                                                                                                                                                  |
| [showPrintButton]            |      no      |            true             |                                                                                                                                                                                                                                                                                                                                   Show or hide the "print" button                                                                                                                                                                                                                                                                                                                                    |
| [showDownloadButton]         |      no      |            true             |                                                                                                                                                                                                                                                                                                                        Show or hide the "download" button (aka "save" button)                                                                                                                                                                                                                                                                                                                        |
| [showBookmarkButton]         |      no      |            true             |                                                                                                                                                                                                                                                                                                                                  Show or hide the "bookmark" button                                                                                                                                                                                                                                                                                                                                  |
| [showSecondaryToolbarButton] |      no      |            true             |                                                                                                                                                                                                                                                                                                    Show or hide the secondary toolbar (the menu hiding behind the arrows at the right-hand side)                                                                                                                                                                                                                                                                                                     |
| [showRotateButton]           |      no      |            true             |                                                                                                                                                                                                                                                                                                                    Show or hide the "rotate" menu items in the secondary toolbar                                                                                                                                                                                                                                                                                                                     |
| [showSelectToolButton]       |      no      |            true             |                                                                                                                                                                                                                                                                                                                  Show or hide the "select text" menu item in the secondary toolbar                                                                                                                                                                                                                                                                                                                   |
| [showHandToolButton]         |      no      |            true             |                                                                                                                                                                                                                                                                                Show or hide the "hand tool" menu item in the secondary toolbar. (The hand tool allows you to move the page by clicking and dragging)                                                                                                                                                                                                                                                                                 |
| [showScrollingButton]        |      no      |            true             |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| [showSpreadButton]           |      no      |            true             |                                                                                                                                                                                                                                                                                                                    Show or hide the "spread" menu items in the secondary toolbar                                                                                                                                                                                                                                                                                                                     |
| [showPropertiesButton]       |      no      |            true             |                                                                                                                                                                                                                                                                                                            Show or hide the "show document properties" menu item in the secondary toolbar                                                                                                                                                                                                                                                                                                            |
| [handTool]                   |      no      |            false            |                                                                                                                                                                                                                                                                         setting this flag to true, activates the "hand tools" to scroll the PDF file by dragging. Setting this to false aktivate the "text selection" tool.                                                                                                                                                                                                                                                                          |
| [filenameForDownload]        |      no      |        document.pdf         |                                                                                                                                                                                                                                                                                                               Allows the user to define the name of the file after clicking "download"                                                                                                                                                                                                                                                                                                               |
| [(page)]                     |      no      |          undefined          |                                                                                                                                                                                                                         two-way binding attribute to determine the page to display; more precisely: [page]="25" makes the PDF viewer show page 25 (at any time - even after load time); (page)="attribute" updates the attribute each time the user scrolls to another page                                                                                                                                                                                                                          |
| spread                       |      no      |             off             |                                                                                                                                                                                                                          determines if you're seeing one page or two pages at once (like a paper book). 'off' means there's only one page. 'odd' is the traditional book-like view, with two pages side-by-side. 'even' is similar, only the first page is displayed alone.                                                                                                                                                                                                                          |
| [(zoom)] (two-way binding)   |      no      |          undefined          | [zoom]="undefined" (default value): use the zoom level configured previously by the user, or "auto" if no configuration was found. If not undefined: Set the zoom level of the page, no matter which zoom level was previously configured. Legal values are [zoom]="'auto'", ="'page-actual'", ="'page_fit'", ="'page-width'", or ="50" (or any other percentage). Numbers are always considered percentages; the trailing "%" character is optional. This attribute supports two-way binding. [(zoom)]="zoomAttribute" updates the variable `zoomAttribute` each time the user changes the zoom setting. This is useful to use the same zoom accross multiple PDF viewer instances or PDF document. |

## Internationalization

### Slow default way

If you add the translation files to your project as described above in step 3, the PDF viewer uses the browser language setting to determine which language to load. First, it loads the `locale.properties`, scans it for the desired language files, and loads the language file from the corresponding folder. That's two additional (and even consecutive) HTTP calls. That's slow, and it may even lead to errors if the network is already congested loading other resource files.

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
(As of version 0.3.0 - 0.9.5, there's only the German translation - other languages are following soon).

_Hint_: Sometimes you need to copy the HTML snippet into the index.html at the root folder of the Angular project. The bottom line is that the HTML snippet is already part of the DOM when the PDF viewer is initialized. Cluttering the root index file with the translations is an ugly and inflexible hack, but it works.

If you're using the "inline" approach, don't set `useBrowserLocale` (or set it explicitely to false).

## Troubleshooting

| Error message or description                                            |                                                                                                                                                                                                                               Solution                                                                                                                                                                                                                               |
| ----------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| "TypeError: Cannot read property 'setPagesCount' of null"               | The language files couldn't be loaded. If you're following the default approach, `useBrowserLocale="true"`. In any case, check whether the language files are part of your project and if they are loaded from the correct path. Note that there's no default translation. You have to load a language file for any language, including English. In rare cases the language files are loaded, just not in time. In this case increase the value of `delayFirstView`. |
| The browser locale is ignored.                                          |                                                                                                            The HTML snippets in the folder `node_modules/ngx-extended-pdf-viewer/assets/inline-locale-files` contain exactly one language. If you want to support multiple language, you have to add the additional languages to the Json data structure.                                                                                                            |
| sticky toolbar (when scrolling, the pdf file appears above the toolbar) |                                                                      This happens if you're using the z-index to position the `<ngx-extended-pdf-viewer>`. If you can't avoid to do so, add the global CSS rule `.body .toolbar { z-index: 0; }`. The PDF viewer works without the z-index of the toolbar. The only difference is that the shadow of the toolbar is hidden by the PDF document.                                                                      |
| Print also includes UI elements                                         |                                                              Usually, the entire screen is hidden automatically, but sometimes this fails, especially with widgets that are dynamically added, such as error messages, progress bars, and block UI overlays. Use media queries to hide the unwanted UI elements. For example, use something like `@media print { #modal-error-dialog: display none; }`.                                                              |

## Feedback, pull requests and bug reports

Pull requests and bug reports are welcome. Please send them to the bug tracker of
the project page: https://github.com/stephanrauh/ExploringAngular/tree/master/embedding-pdf

## Building the library from scratch (and updating to the latest version of Mozilla's pdf.js)

Have a look at https://github.com/stephanrauh/ngx-extended-pdf-viewer/blob/master/README.md. That's a very long list of steps, but that shouldn't stop you. I've tried to jot down every single action as meticulously as possible. So chances are you can update the library to a newer version of Mozilla's pdf.js but just following all these steps. If you do, please consider going the extra mile and submitting a pull request to this project.

## License and Kudos

The library is based on https://github.com/mozilla/pdf.js, which has been published under an Apache V2 license.

Hence the licence of the ngx-extended-pdf-viewer is the Apache V2 license, too.

## Changelog

| Version    |                                                                                                                                                                                                                                Features                                                                                                                                                                                                                                 |
| ---------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| till 0.1.3 |                                                                                                                                                                                     initial version based on the embeddable PDF-Viewer https://github.com/legalthings/pdf.js-viewer                                                                                                                                                                                     |
| 0.2.0      |                                                                                                                                                                                      use Mozilla's pdf.js (https://github.com/mozilla/pdf.js) directly. Update to pdf.js 2.0.641.                                                                                                                                                                                       |
| 0.2.1      |                                                                                                                                                                                                                             minor bugfixes                                                                                                                                                                                                                              |
| 0.2.2      |                                                                                                                                                                                                Make the library compatible to the --prod build; improve the CSS locality                                                                                                                                                                                                |
| 0.3.0      |                                                                                                                                                                                       Solved the timing issue; added options for internationalization; improved the docuemtation                                                                                                                                                                                        |
| 0.3.1      |                                                                                                                                                                                                                        improved the docuemtation                                                                                                                                                                                                                        |
| 0.3.2      |                                                                                                        stop registering event listeners multiple times if the component is used multiple times; tentative bugfix that occurred when switching from a file with few thumbnails (i.e. pages) to another instance of the viewer showing a file with many thumbnails                                                                                                        |
| 0.3.3      |                                                                                                                                                                           removed debug code and solved the bug causing crashing when switching to a new instance of <ngx-extended-pdf-viewe>                                                                                                                                                                           |
| 0.3.4      |                                                                                                                                                                                                                           removed debug code                                                                                                                                                                                                                            |
| 0.9.0      |                                                                                                                                                                                                             added options to hide every button from the UI                                                                                                                                                                                                              |
| 0.9.1      |                                                                                                                                                                                                              tried to add a screenshot to the readme file                                                                                                                                                                                                               |
| 0.9.2      |                                                                                                                                                                                                             managed to add a screenshot to the readme file                                                                                                                                                                                                              |
| 0.9.3      |                                                                                                                                                                                                                           removed debug code                                                                                                                                                                                                                            |
| 0.9.4      |                                                                                                                                                                                                                       improved the documentation                                                                                                                                                                                                                        |
| 0.9.5      |                                                                                                                                                                                     recompiled with Angular 7 and updated the peer dependencies, allowing for both Angular 6 and 7                                                                                                                                                                                      |
| 0.9.6      |                                                                   updated to pdf.js 2.0.943; added more language files; fixed a bug preventing loading the language defined in a script tag for many language; repaired the parameter [showSidebarButton]; fixed broken i18n on OSX Chrome 70 by adding several translations for languages without region specifier (such as "es" instead of "es-ES")                                                                   |
| 0.9.7      |                                                                                                                                                                     fixed the CSS file (font size and margins accidentially spilled to the surrounding page); corrected the link to the bug tracker                                                                                                                                                                     |
| 0.9.8      | make the option [showSidebarOnLoad] configurable; plus, don't load a sidebar if [showSidebarButton]="false". Kudos go to GitHub user AlexandrosG. Stop the PDF viewer from crashing if the page is left before the PDF is rendered (issue #9). Kudos go to GitHub user Max Dertcaf. Prevent auto-completion in the search input field because it sometimes shows user names and email addresses (#8). Kudos go to Paul Kocher. Also added the optional property [zoom]. |
| 0.9.9      |                                                                                                                added the attribute [mobileZoom]; repaired the paginator buttons after hiding and re-displaying the PDF viewer; reduced the memory leaks of the pdf.js viewer (work in progress); documented how to use ngx-extended-pdf-viewer with tabs                                                                                                                |
| 0.9.10     |                                                                                                                                             adjust the position of the document and the thumbails after increasing the size of the toolbar via [mobileZoom]="200%"; implemented the two-way-binding of the [zoom] attribute                                                                                                                                             |
| 0.9.11     |                                                                                                                                                                             Now the [zoom] attribute is also respected when a new document is loaded in the same instance of the PDF viewer                                                                                                                                                                             |
| 0.9.12     |                                                                                                                                                         fixed the IE11 compatibility of [mobileFriendlyZoom] (dirty hack / temporary solution); correct positioning of the findbar when the sidebar is disabled                                                                                                                                                         |
| 0.9.13     |                                                                                                                           Added some documentation about how to use a `Blob` (e.g. a PDF file downloaded from the server); fixed #21 (progress bar wouldn't hide on any instance of `<ngx-extended-pdf-viewer>`except for the fist instance)                                                                                                                            |
| 0.9.14     |                                                                                                                                                                                                               #24 fixed the IE11 compatibility of [zoom]                                                                                                                                                                                                                |
| 0.9.15     |                                                                                                 #27 removed the "j" hidden in the HTML code; updated to PDF.js 2.1.266; # fixed a few bugs in the library README.md and mentioned it in the README.md of the root project; #37 mentioned the memory footprint; #39 updated / corrected the "how to build" instructions                                                                                                  |
| 0.9.16     |                                                                                                                                                                                                                 #45 allow percentage for height option                                                                                                                                                                                                                  |
| 0.9.17     |                                                                                                                                  #40 added an option for the hand tools; #48 improved the documentation concerning Bootstrap; the [zoom] attribute now reacts to changes after loading the PDF viewer (previously: only at load time)                                                                                                                                   |
| 0.9.18     |                                                                                                                                                                 #49 documented IE11 compatibility with polyfills; #25 implemented the two-way binding attribute [(page)] to select the page to display                                                                                                                                                                  |
| 0.9.19     |                                                                                                      #35 add an option to override the default file name after clicking the "download" button; #34 implemented (pagesLoaded); fixed the [page] attribute which always showed page 13 on startup; reduced the timeout to set the initial [page]; removed debug code                                                                                                      |
| 0.9.20     |                                                                                                                                 #55 if the setting "height=100%" results in a container with 0 pixels height, the PDF viewer automatically resizes to fill all available space.; #38 initial support for [(spread)] (work in progress!)                                                                                                                                 |
| 0.9.21     |                                                                                                                                    #56 made the [src] attribute more flexible. Now it also accepts Blobs, Uint8Arrays, and ArrayBuffers. Also added a new attribute, [base64Src], to display PDFs encoded as base64 encoded strings                                                                                                                                     |
| 0.9.22     |                                                                                                      #29 [backgroundColor] can now be set to "white" or "#ffffff". Until 0.9.21, pdf.js always converted white to off-white. I'm still trying to understand what's going on, so there might be side-effect. However, my tests didn't reveal such side-effects yet.                                                                                                      |
