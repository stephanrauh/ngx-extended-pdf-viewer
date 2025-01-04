### How to report issues and bugs

If there's any compatibility issue with an older version of Angular, please tell me on my [bugtracker](https://github.com/stephanrauh/ngx-extended-pdf-viewer/issues).

Talking about bugs and feature requests: I also listen to StackOverflow, but it may take some time until I pick up bug reports from StackOverflow.

## Modals
Putting an `<ngx-extended-pdf-viewer>` into a modal often causes timing problems. If the modal doesn't initialize the PDF viewer,
add a short timeout. The idea is to show the PDF viewer with a short delay, so the modal has enough time to render.

If the PDF viewer prints exceptions in the console log when closing the modal, you may want to call `ngOnDestroy()`
manually. <a href="/modal">The demo on modals</a> demonstrates this approach.

## Promise.allSettled is not a function

Please update the library `zone.js` to a current version. At the time of writing, that's 0.10.3. For some reason, the default setup of Angular locks `zone.js` to an old version. In most cases, the update shouldn't cause problems.

## Running Angular in a context path or using a non-standard assets folder
The CMap files and the JavaScript files <code>pdf.min.js</code>, <code>viewer.min.js</code>, and <code>pdf.worker.min.js</code> are expected to be in the assets folder of your application.
Sometimes the path resolution fails. In this case, you'll need to set the default option <code>assetsFolder</code> to the appropriate value.
Maybe you'll even have to modify the derived options <code>workerSrc</code> and <code>cMapUrl</code>.

Another workaround is to load the files <code>pdf.min.js</code> and <code>viewer.min.js</code> yourself. You just have to make sure that the files are loaded before ngx-extended-pdf-viewer is initialized. The drawback of this approach is that there's no automatic browser switch. ngx-extended-pdf-viewer detects the capabilities the user's browsers and selects either the slow-but-safe ECMAScript 5 version, or the faster default version that only runs on modern browsers.

In any case, you should not load the file <code>pdf.worker.min.js</code> yourself. Technically, that's possible, and the approach works well for small PDF files. But it ruins the performance of the PDF viewer. One of our <a href="https://www.obwb.ca/library/okanagan-basin-waterscape-poster/">test PDF files (75 MB!)</a> shows almost immediately in the default configuration, but takes several minutes when your loading <code>pdf.worker.min.js</code> yourself. (The technical explanation is that loading the pdf worker file yourself disables the service worker).

## I can't find the find button

First of all, I have to apologize: For some reason, I've never managed to make the  intuitive. I hope I'll manage one day or another!

The PDF viewer uses two layers of information. The first layer is what you see. That's simply an image. The second layer is the text layer. You need it to select text, and without the text layer you can't find anything. The "find" function can only cope with text, not with images.

To activate the "find" button you need a PDF file that contains text. A surprising number of PDF files are just images. If you've got such a PDF file, there's no find button. The PDF viewer doesn't include an OCR reader.

Second, you have to activate the attribute `textlayer`:

```html
<ngx-extended-pdf-viewer
     [textLayer]="true"  <!-- necessary to activate the find button and the select tool -->
     [showHandToolButton]="true" <!-- displays the "select tool" and the "hand tool" buttons -->
     [src]="'/assets/pdfs/blind-text-collection.pdf'"
     [height]="'90vh'">
  </ngx-extended-pdf-viewer>
```

## I can't select text

That's mostly the same as the trouble with the find button. Activate the text layer, set `[showHandToolButton]="true"`, use a PDF file containing text, and you're good to go. That's an annoyingly long list of conditions. Sorry for that!

## When I select or find text, the selection is slightly off

The text layer doesn't match the real positions of the text. It's a good approximation, but it's not perfect. More often than not, the selection is half a character off, sometimes even more. There's nothing you can do about it - except offering your help at the base project, <a target="#" href="https://github.com/mozilla/pdf.js">pdf.js</a>. The project support almost every language and every font of the world, so it's hard to get it right.

## Why is the text layer deactivated by default?

The PDF viewer is a lot faster if it doesn't have to render the text layer. That's why you have to activate the text layer manually.

## Problems with Internet Explorer 11
The library is intended to be used with IE11 - but every once in a while, a new incompatibility pops up. Bear with me. I don't use Windows to develop the library, so testing IE11 isn't that easy.

The latest error I've seen is caused by another library, zone.js. Version 0.11.1 of zone.js is incompatible with IE11. If I've got it correctly, this will be fixed with version 0.11.2. What I can tell for sure is downgrading to version 0.10.3 fixes the bug. More details <a target="#" href="https://github.com/angular/angular/issues/38561">in the GitHub ticket</a>.

## iOS emulators; iOS 13 with ngx-extended-pdf-viewer 8.x

The base library, pdf.js, has begun to use advanced features of JavaScript with version 2.7. That corresponds with version 8.0 of ngx-extended-pdf-viewer. That's ok because pdf.js is the PDF viewer of Firefox - nothing less and nothing more - but it's a challenge for third-party library like ngx-extended-pdf-viewer. The solution is to use the ES5 version of pdf.js. ngx-extended-pdf-viewer tries to detect the features of your browser and to load the appropriate version of pdf.js.

There's a catch: starting with version 8.1.2, ngx-extended-pdf-viewer uses an algorithm that works fine on actual iPhones and iPads running on iOS 13.x, but if you're running the application in an emulator, it may report an unrecoverable error. Such as <a href="https://github.com/stephanrauh/ngx-extended-pdf-viewer/issues/657#issuecomment-783555261">this error report shows</a>. If you run into such an error, test the code on a real device. Chances are it turns out to be a false positive.

Oh, and if you've got a better idea how to check compatibility, don't hesitate to <a href="https://github.com/stephanrauh/ngx-extended-pdf-viewer/issues">open a bug report</a>!

## No PDF file shown - error message "offsetParent not set - cannot scroll" in the console

This error means that the PDF viewer is invisible at load time. For example, that happens frequently with modal windows. If there's a fade-in animation, there's a small time frame when the PDF viewer is still invisible. In this case, you need to add a small delay before initializing it.

Two solutions are sketched in the <a href="https://github.com/stephanrauh/ngx-extended-pdf-viewer/issues/489#issuecomment-703838087">GitHub issues</a>:

```typescript
openModal(modaltemplate: any): void {
  modaltemplate.show();
  setTimeout(() => this.stringSource = this.url, 50); // <<< added delay
}
```

If you're using Bootstrap, you can also use the event `(onshown)` like so:

```html
<div bsModal #pdfModal="bs-modal" class="modal" 
     (onShown)="onModalShown($event)">
```

## Trouble with printing (aka: compatibility to Bootstrap and other CSS frameworks)
Problems with printing are almost always problems of your CSS code. That doesn't necessarily mean you've done anything wrong.
Most people run into this kind of trouble when using a CSS framework that hasn't been written with ngx-extended-pdf-viewer in mind.
That, in turn, is probably true for every CSS framework out there. The core library assumes there's no CSS framework at all.
It's the PDF viewer of Firefox, so that's a reasonable assumption.


If you wonder how CSS and printing are related: the thing is that the PDF viewer doesn't really print anything. It just hides the entire page using CSS and adds high-resolution images to the HTML document. After that, the PDF viewer simply calls the print function of your browser. Basically, it's printing the entire HTML page, including your Angular application. If everything works as intended, you don't notice because your Angular application is hidden.

However, your custom CSS is still active. For example, if it reduces the font size, you end up with scaled-down pages in print.

ngx-extended-pdf-viewer covers several popular CSS frameworks (such as BootsFaces and Material Design), but it's still possible there's a conflict I haven't seen yet. If so, checking the `display` and `overflow` properties is a good starting point. Often adding this CSS snippet solves the problem:

```css
@media print {
  #printContainer > div {
    display: inline;
    overflow-y: visible;
  }
}
```
## Empty pages when printing

If you find empty pages in your print, often adding these CSS rules to your global `styles.scss` helps:

```css
@media print {
  #printContainer > .printedPage {
    width: 99%;
  }
}
```

## Hunting down other printing issues

You can debug print issues yourself. I've written detailed instructions here: <a href="https://github.com/stephanrauh/ngx-extended-pdf-viewer/issues/1431#issuecomment-1162091452">https://github.com/stephanrauh/ngx-extended-pdf-viewer/issues/1431#issuecomment-1162091452</a>. When starting the
debugging session, you'll probably want to compare the CSS rules of your project with the reference project. You can either use the Angular schmetics
to create a fresh project within a few minutes (see <a href="https://pdfviewer.net/extended-pdf-viewer/getting-started">https://pdfviewer.net/extended-pdf-viewer/getting-started</a>), or you can use the <a href="https://mozilla.github.io/pdf.js/web/viewer.html">showcase of Mozilla's project</a>.


### Possibly outdated hint: printing with Bootstrap

As far as I remember, I've managed to solve this bug for you. But if you're using an older version of ngx-extended-pdf-viewer, the bug might still hit you. Bootstrap interferes with the printing algorithm of `pdf.js`. Guard it with a media query to avoid unwanted effects, such as scaling the print to 65%. For example, if you're using SCSS and Bootstrap 4, remove the import of Bootstrap.min.css from the Angular.json file. Instead, import it by including Bootstrap by adding this line to the global `styles.scss` file:

```css
@media screen {
  @import '../node_modules/bootstrap/scss/bootstrap';
}
```
Caveat: this trick only works with the SCSS version of both `styles.scss` and `bootstrap.scss`. It doesn't work with simple CSS. If you're using pure CSS, you can use the solution suggested by <a href="https://github.com/stephanrauh/ngx-extended-pdf-viewer/issues/48#issuecomment-596629621" target="#">Austin Walker</a>:

```css
@media print {
  body {
    min-width: auto !important;
  }
}
```

### Dig deeper

If you need more information, have a look at these issues:
* https://github.com/stephanrauh/ngx-extended-pdf-viewer/issues/148
* https://github.com/stephanrauh/ngx-extended-pdf-viewer/issues/175
* https://github.com/stephanrauh/ngx-extended-pdf-viewer/issues/143 


## Localization

If the PDF viewer doesn't show in your native language (or the language you're configured with the `[language]` attribute), please check the network tab and the settings in the Angular.json file. You must copy the  folder `node_modules/ngx-extended-pdf-viewer/assets/locale` recursively to the folder `assets/locale`. If you only want to support a few language, you can reduce the size of the installation by omitting the other language files. However, that doesn't improve performance.

## Multiple PDF viewers on the same page (e.g. tabs)

Unfortunately, you can't use multiple instances of `<ngx-extended-pdf-viewer>` on the same page. You're restricted to a single PDF viewer. This also applies to hidden PDF viewers. If you're using tabs containing PDF files, make sure you hide the PDF viewer before showing the next tab. You'll also need a short delay before showing the new PDF viewer. It takes some time to remove every object from memory.
## Other hints collected over time

| Error message or description                                            | Solution                                                                                                                                                                                                                                                                                                                                   |
|-------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| sticky toolbar (when scrolling, the pdf file appears above the toolbar) | This happens if you're using the z-index to position the `<ngx-extended-pdf-viewer>`. If you can't avoid to do so, add the global CSS rule `.body .toolbar { z-index: 0; }`. The PDF viewer works without the z-index of the toolbar. The only difference is that the shadow of the toolbar is hidden by the PDF document.                 |
| Print also includes UI elements                                         | Usually, the entire screen is hidden automatically, but sometimes this fails, especially with widgets that are dynamically added, such as error messages, progress bars, and block UI overlays. Use media queries to hide the unwanted UI elements. For example, use something like `@media print { #modal-error-dialog: display none; }`. |

# Hint referring to old versions of ngx-extended-pdf-viewer

Using the PDF viewer has become a lot simpler over time. However, if you're using a pre 2.0 version, or if you've got a non-standard configuration, these hints may be useful to you.

## Loading the JS file in the wrong order

Have a look at [this discussion](https://github.com/stephanrauh/ngx-extended-pdf-viewer/issues/20). Several developers observed it's a good idea to load the three pdf.js files before any other additional JavaScript file. Plus, they use each other, so they need to be defined in this order:

```json
"scripts": [
  "node_modules/ngx-extended-pdf-viewer/assets/pdf.js",
  "node_modules/ngx-extended-pdf-viewer/assets/viewer.js",
  (put any additional JavaScript file here)
]
```

There's a third file - `node_modules/ngx-extended-pdf-viewer/assets/pdf.worker.js`. Earlier versions of these instructions told you to put add it in the `scripts` section, too, but that's wrong, as you'll see in the next paragraph.


## Fake worker
If you see the message "Setting up fake worker", everything works fine, except you're wasting performance. To avoid that, make sure that the file `pdf.worker.js` (or `pdf.worker-es5.js` for developers supporting IE11) is *not* part of the `scripts` section of the `angular.json`.

Instead, put the pdf.worker.js file into the assets folder. The path can be configured in the global constant `defaultOptions.workerSrc` (which, in turn, is defined in the file `default-options.ts`). By default, it's './assets/pdf.worker.js'. In other words, you need to add these lines to the `angular.json`:

```json
"assets": [
   ...,
   {
      "glob": "pdf.worker.js", // or "pdf.worker-es5.js" to support IE11
      "input": "node_modules/ngx-extended-pdf-viewer/assets",
      "output": "/assets/"
   }
```

If you need IE11 support, you also need to configure the URL of the worker file:

```typescript
import { defaultOptions } from 'ngx-extended-pdf-viewer';

@Component(...)
export class PdfDisplayComponent {
constructor() {
    defaultOptions.workerSrc = './assets/pdf.worker-es5.js';
  }
```

If everything works, the file is lazy-loaded when the PDF viewer opens, and you're rewarded with a non-blocking PDF viewer, even if your PDF file is huge.

## set delayFirstView="1000" (deprecated)

This workaround was needed in the early version of ngx-extended-pdf-viewer, before I understood how to initialize the library correctly. However, it may come in handy every once in a while. Sometimes the initialization of the pdf viewer takes some time, so the PDF file is opened too early. As a work-around, you can add a delay. Setting it to one second is usually a good compromise:

```html
<ngx-extended-pdf-viewer src="..." [delayFirstView]="1000"></ngx-extended-pdf-viewer>
```

## "Failed to load module script: Expected a JavaScript module script but the server responds with a MIME type of "text/plain"

Update your server configuration. Many servers don't recognize `*.mjs` files as JavaScript. To fix this, you have to configure the server so it sends the file with the proper MIME type (`text/javascript`). You also have to configure the new i18n files. They've got the file ending `.ftl` and need the MIME type `text/plain`.

For example, IIS requires this configuration:

```xml
<?xml version="1.0" encoding="utf-8"?>
<configuration>

  <system.webServer>
  <staticContent>
    <mimeMap fileExtension=".mjs" mimeType="text/javascript" />
    <mimeMap fileExtension=".ftl" mimeType="text/plain" />
  </staticContent>
  </system.webServer>

</configuration>
```

nginx requires this configuration:

```nginx
location / {
    ...

    location ~* \.mjs$ {
                # target only *.mjs files
                # now we can safely override types since we are only
                # targeting a single file extension.
                types {
                    text/javascript mjs;
                }
            }
  }
```

AWS amplify requires this configuration in the `amplify.yaml` file:

```yaml
customHeaders:
  - pattern: '*.mjs'
    headers:
      - key: 'Content-Type'
        value: 'application/javascript'
```
