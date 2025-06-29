# ngx-extended-pdf-viewer

<p>
  <a href="https://www.npmjs.com/package/ngx-extended-pdf-viewer">
    <img src="https://img.shields.io/npm/dm/ngx-extended-pdf-viewer.svg?style=flat" alt="downloads">
  </a>
  <a href="https://pdfviewer.net">
    <img src="https://img.shields.io/badge/showcase-pdfviewer.net-blue">
  </a>
  <a href="https://badge.fury.io/js/ngx-extended-pdf-viewer">
    <img src="https://badge.fury.io/js/ngx-extended-pdf-viewer.svg" alt="npm version">
  </a>
  <a href="https://opensource.org/licenses/Apache-2.0"><img src="https://img.shields.io/badge/License-Apache%202.0-brightgreen.svg"></a>
  <a href="https://sonarcloud.io/summary/new_code?id=stephanrauh_ngx-extended-pdf-viewer"><img src="https://sonarcloud.io/api/project_badges/measure?project=stephanrauh_ngx-extended-pdf-viewer&metric=alert_status"></a>
  <a href="https://unpkg.com/browse/ngx-extended-pdf-viewer/">
    <img src="https://img.shields.io/badge/cdn-unpkg.com-orange">
  </a>
  <a href="https://www.beyondjava.net">
    <img src="https://img.shields.io/badge/blog-beyondjava.net-blue">
  </a>
 </p>

## Bringing PDF to the Angular world

This library provides an embeddable PDF viewer component. It's different from other approaches like [ng2-pdf-viewer](https://vadimdez.github.io/ng2-pdf-viewer/) in that it shows the full suite of UI widgets. In other words, it strongly resembles the PDF viewer of your browser:

<img src="https://github.com/stephanrauh/ngx-extended-pdf-viewer/blob/main/projects/ngx-extended-pdf-viewer/example.png?raw=true">

## Getting it up and running

1. run `npm add ngx-extended-pdf-viewer` and accept all the defaults
2. There's an example component, but it isn't yet part of your application. You can either add the example component to your application or copy the relevant line to your HTML template:

```html
<ngx-extended-pdf-viewer [src]="'assets/example.pdf'"></ngx-extended-pdf-viewer>
```

## Security

Version 20.0.2 is a security fix. It solves CVE-2024-4367. I strongly recommend updating to the latest version of ngx-extended-pdf-viewer as soon as possible, or to version 20.0.2 as a minimum. Older versions contain a bug allowing malicious PDF files to run arbitrary code. Kudos go to GitHub users ScratchPDX and Deepak Shakya to tell me about it, so I could provide a hotfix during my vacations.

## Announcement: Version 25 migrates to signals (and probably more)

This is an early announcement. I want to update ngx-extended-pdf-viewer to support modern Angular. In particular, that's stand-alone components, getting rid of zone.js, and signals. Version 25 is a round version number, so chance are you expect more breaking changes than usual. As always, I'll try to minimize the migration pain, but I'm not sure I'll succeed. I intend to implement a migration schematics to reduce the annoyance, but let's be honest: it's next to impossible to provide a painless migration. On the other hand, I'm pretty sure you'll love it after the migration.

## Version 24

This version migrates to pdf.js 5.3. That's a major jump, including breaking changes and new features. At the time of writing, I'm surprise the update is mostly smoothly, with one exception: my annotation editor events are gone. It'll take a while to bring them back. Plus, I can't guarantee 100% compatibility, simply because I don't know yet what's changed in the based library.

In other words, more likely than not, there'll be an extended time of alpha and beta versions. Please apologize the inconvience!

## Version 23

Version 23 updates to pdf.js 4.10 and contains several bug fixes, some of which are breaking changes. There's only two new features:

- Version 23.1.0 starts positioning the popup dialogs with JavaScript. This works with custom toolbars, right-to-left languages, and `[mobileFriendlyZoom]`. If this calculation does not work in your project, you can switch it off with `pdfDefaultOptions.positionPopupDialogsWithJavaScript=false`. In that case, you're back to the old (slightly broken) calculation, and you can position the popup with CSS.
- The attribute `[forceFullReloadOfJavaScriptCode]="true"` forces the PDF viewer to re-execute the JavaScript libraries if it has to load them again. That should be the default, but since version 21 the PDF viewer uses JavaScript module files (\*.mjs), and the browser considers these files singleton. If you display a PDF file, navigate to another page without PDF, and see a blank page when navigating back, activate the new flag. By default it's set to `false` because I want to play it safe, but more likely than not, the default is going to be `true` soon.

Breaking changes:

- Version 23.0 to 23.2 lost the ink editor events. They're back with version 23.3.0, but the parameter list is slightly different than before. In particular, the `bezierPathChanged` event now doesn't contain the coordinates of the drawing.
- I've reduced the default maximum resolution of the canvas files. As it turned out, going to the limit caused many Android and iOS devices to crash. Now the algorithm is much more careful when calculating the maximum resolution. If you know what you're doing and want to go to the limit, you can still do that: just set `pdfDefaultOptions.maxCanvasPixels = -1`.
- Adding ink editor drawings programmatically is no longer supported. More to the point, it should work if you pass the correct parameters, but the API has changed, and I haven't been able to figure out which parameters need to be passed.
- I've added a selector to the CSS rules of the dialogs. That should improve compatibility to CSS frameworks and to your custom CSS. However, if you're using CSS to modify the dialogs of ngx-extended-pdf-viewer, this might be a breaking change. If you run into this problem, add a ".html" selector. The original selector was `ngx-extended-pdf-viewer .dialog`, and the new selector is `ngx-extended-pdf-viewer .html .dialog`.

## Please avoid version 21.4.5 and 21.4.6

These versions were meant to be alpha versions, but I forgot to update the version number, and now I can't delete the offending version from npm. The update to pdf.js 4.7 didn't go as smoothless as I hoped, so these versions suffer from a few bugs. The good news is that most users probably won't notice. However, several buttons have
new ids, so their functionality is lost in these two version. Better stick to version 21.4.4.

## Full changelog

There's also a detailed <a href="https://github.com/stephanrauh/ngx-extended-pdf-viewer/tree/main/projects/ngx-extended-pdf-viewer/changelog.md">changelog</a>.

## Showcase and manual

There's a showcase at <a href="https://pdfviewer.net">https://pdfviewer.net</a>. Check this page for live demos, source code examples, and a handbook.

## Contributors welcome!

Would you like to participate in a popular open source-project? It's easy: just open a ticket so we can discuss the change, create a fork, and send me a pull request. Contributions to the showcase are as welcome as contributions to the core library.

## Features

- programmatic API for many features, such as searching
- resizable toolbars to support small mobile devices or working places where users wear gloves
- Editor: add text, images, highlights, or free-style drawings to your PDF file.
- Printing
- Dragging and dropping PDF files to the viewer
- Support for forms, including two-way binding
- XFA forms are also supported (with a few limitations)
- (Limited) support for signatures (lacking verification of the signature, so use at your own risk!)
- Sidebar with thumbnails, outlines, and attachments (each of them is both optional and customizable)
- Rotating pages
- Download (including form data) and upload
- Zoom (with optional two-way binding to an attribute)
- Full-screen mode
- Book mode with animated page-turn animations
- Single page mode (supporting giant PDF documents of 30000+ pages)
- Infinite scrolling
- Plus several other approaches to scrolling (vertical, horizontal, "wrapped" scrolling)
- A wide range of event listeners
- Internationalization (providing translations to several dozen languages)
- Direct access to the core API of pdf.js (including TypeScript definition files)
- The ability to hide every button, menu item, and the context menu
- Responsive design that even includes your custom toolbars
- Color theming

Not to mention the ability to display PDF files, running on a customized version of Mozilla's pdf.js 4.6, released in September 2024.

## Alternatives

Even I have to admit my pet project doesn't match every requirement. There are several alternatives out there. Feel free to expand the description to learn what other developers have in store for you:

<details>
  <summary><b>Expand to learn more about the other options to display PDF files in Angular</b></summary>
  If you only need the base functionality, I'll happily pass you to <a href="https://github.com/vadimdez/ng2-pdf-viewer/" target="#">the project of Vadym Yatsyuk</a>. Vadym does a great job delivering a no-nonsense PDF viewer. However, if you need something that can easily pass as the native viewer on a gloomy day, ngx-extended-pdf-viewer is your friend.

There's also a direct counterpart to my library: <a href="https://www.npmjs.com/package/ng2-pdfjs-viewer" target="#">ng2-pdfjs-viewer</a>. As far as I can see, it's also a good library. As of Augst 2024, it's running on PDF.js 2.2.171. It wraps the PDF viewer in an iFrame. That's a more reliable approach, but it also offers fewer options. The list of attributes is shorter, and the PDF viewer can't emit events to your application. If you're not happy with my library, check out ng2-pdfjs-viewer. It's a good library, too. Its unique selling point is displaying multiple PDF files simultaneously on the same page.

You might also try to use the native PDF viewer of your browser. That's a valid approach. It's even the preferred approach. However, `ngx-extended-pdf-viewer` gives you a wide range of options that aren't available using the native API.

</details>

## Running the showcase locally

As a rule of thumb, I recommend cloning the [showcase project from GitHub](https://github.com/stephanrauh/extended-pdf-viewer-showcase) to get familiar with the library. It's a standard Angular CLI application, so you'll get it up and running in less than ten minutes. It's a good starting point to do your experiments. Maybe even more important: you'll learn whether the library works on your machine. (Of course, it does, but it's always good to double-check!)

Currently, the minimum required version is Angular 16. The idea is to support the four most current versions of Angular, which gives you roughly two years to update. However, supporting so many versions isn't always possible.

If you're running a non-standard configuration, have a look at <a href="https://pdfviewer.net/extended-pdf-viewer/getting-started">the getting-started page"</a> of the showcase.

## Configuration, options, and events

See [the attribute list on the showcase](https://pdfviewer.net/attributes) and the [list of default options page](https://pdfviewer.net/extended-pdf-viewer/default-options). The lists have become too long to put them here: 87 `@Input()` attributes, 25 event emitters, and 50 default options, give or take a few.

Missing a configuration option? File an issue on the [project bug tracker](https://github.com/stephanrauh/ExploringAngular/tree/main/embedding-pdf). If your request makes sense to me and if I can implement it in my (limited) leisure time, I'll add it. BTW, you can speed up the process by providing a code snippet telling me how to implement the feature or by submitting a pull request.

## Searching programmatically

The service `NgxExtendedPdfViewerService` offers a programmatic API for searching, printing, dealing with layers, and scrolling within the page.

## Troubleshooting

See https://github.com/stephanrauh/ngx-extended-pdf-viewer/tree/main/projects/ngx-extended-pdf-viewer/troubleshooting.md

## Feedback, pull requests, and bug reports

Pull requests and bug reports are welcome. Please send them to the bug tracker of
the project page: https://github.com/stephanrauh/ngx-extended-pdf-viewer/issues

## Building the library from scratch (and updating to the latest version of Mozilla's pdf.js)

Have a look at [this walkthrough](https://github.com/stephanrauh/ngx-extended-pdf-viewer/blob/main/projects/ngx-extended-pdf-viewer/how-to-build.md).

## License and Kudos

The license of the `ngx-extended-pdf-viewer` is the Apache V2 license.

The library is based on https://github.com/mozilla/pdf.js, which has been published under an Apache V2 license.

Some of the default icons have been published under a <a href="http://scripts.sil.org/cms/scripts/page.php?item_id=OFL_web" target="#">SIL Open Font License 1.1</a> license at <a href="https://materialdesignicons.com/" target="#">Material Design Icons</a>. The other icons have either been published under an <a href="https://github.com/google/material-design-icons/blob/main/LICENSE" target="#">Apache V2 license</a> by Google or by the pdf.js team at Mozilla.

Thanks to the awesome pdf.js team and all the users who've reported bugs and even sent me pull requests!

## Internet Explorer 11 is no longer supported

Reluctantly, I have to drop support for Internet Explorer 11. The base library, Mozilla's pdf.js, now generates binaries no longer compatible with Internet Explorer 11, and it seems there's no easy fix. That's a pity because IE11 support was the original use-case of the library and because I frequently get messages from developers who need IE11 support. The last version known to be compatible is 5.3. Version 7.3.2 should be compatible, too, but a user reported crashes.

## Changelog

See https://github.com/stephanrauh/ngx-extended-pdf-viewer/tree/main/projects/ngx-extended-pdf-viewer/changelog.md
