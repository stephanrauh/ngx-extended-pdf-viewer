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

## Version 22: improved search UI and update to pdf.js 4.7

Version 22 updates to my fork of pdf.js 4.7. You can also opt in for my fork of pdf.js 4.10.38. I'm calling it the "bleeding edge" branch, so you know that while you're invited to test it, it may be broken. Luckily, it isn't, most of the time.

_Breaking changes_:

- `NgxExtendedPdfViewerService.addEditorAnnotation` is now asynchronous
- several buttons have new ids
- Since version 22.3.0 the initialization of the viewer is delayed until it's in a visible container. This means it might never initialize if it's in a tab or modal the user never opens. This optimizes resource usage, but if you're relying on the precise timing or even on the internal implementation of the viewer, this might be a breaking change. However, that's an unlikely corner case.

## Please avoid version 21.4.5 and 21.4.6

These versions were meant to be alpha versions, but I forgot to update the version number, and now I can't delete the offending version from npm. The update to pdf.js 4.7 didn't go as smoothless as I hoped, so these versions suffer from a few bugs. The good news is that most users probably won't notice. However, several buttons have
new ids, so their functionality is lost in these two version. Better stick to version 21.4.4.

## Version 21: an optimized viewer

Version 21 is a major refactoring. The new version reduces the memory footprint and start-up times. I consider it a major progress: now the architecture is significantly cleaner. It's still work in progress, but you should notice the difference.

If you're using Content Security Policy (CSP), you might want to follow [issue 2362](https://github.com/stephanrauh/ngx-extended-pdf-viewer/issues/2362). Earlier versions of the viewer offered a makeshift support of CSP. I hope to come up with a much cleaner solution soon.

Let's have a look at the changes in more detail. Version 21

- updates to pdf.js 4.5 (and starting with version 21.4.0, pdf.js 4.6)
- gets rid of RxJS
- stops polluting the global namespace
- reduces the memory leaks (that's partially finished, but you should notice an improvement)
- reduces the number of requests loading JavaScript files
- moves the code loading the huge JavaScript files to a service (so the viewer can reuse the JavaScript files instead of reloading them)
- improves (and fixes) the responsive design of the toolbar (since version 21.1.0)
- and it fixes quite a few bugs.

Version 21 contains several breaking changes. The good news is that I assume the vast majority of developers won't even notice. These breaking changes are:

- `window.PDFViewerApplication` is now undefined. Earlier versions of the viewer stored many attributes, objects, and functions in the global namespace (i.e. `globalThis` or `window`). Many of these attributes have already migrated to `PDFScriptLoaderService.PDFViewerApplication`. If you need the `PDFViewerApplication`, you can get it from the `PdfNoticationService`.
- The API for custom thumbnails has slightly changed. Now it doesn't require you to add functions to the `window` object.
- The RxJS subjects `recalculateSize$` and `onPDFJSInit` are gone. You can use ``onPDFJSInitSignal` to replace `onPDFJSInit`. I suspect nobody uses `recalculateSize$`, so I didn't implement a replacement yet.
- Version 21.1.0 improves the responsive design of the toolbar and updated the breakpoint, which had sort of broken after introducing the four editor buttons. This means you might see more buttons, and it moves the zoom dropdown to the left. If you don't want to see the extra buttons, you can hide them via the `[showXXX]` attributes.

## What's new in version 20.5.x?

Basically, version 20.5.0 updates to pdf.js 4.3 and solves some memory leak issues. However, that turned out to be a major task, involving a major rewrite of the initialization of the library.

Breaking changes:

- Compatibility with CSP (Content Security Policy) has - temporarily - become worse. I had to modify the way the JavaScript files are loaded, and I didn't find out yet how to make the new algorithm aware of CSP.
- Absolute paths in `pdfDefaultOptions.assetsFolder` are temporarily broken. I've fixed this in version 21.0.0-alpha.2, but more likely than not I won't be able to publish the bugfix in a 20.5.x version.
- I've modified the way the application initializes. It's unlikely you notice this, but if you rely on `window.PDFViewerApplication` to be available early, you might see errors. Starting with version 20.5.0, the recommended approach is to listen to the signal `PDFNotificationService.onPDFJSInitSignal()`. When the viewer is initialized, the signal fires and sends the references to `PDFViewerApplication` and a few other resources. After receiving this signal, you can safely use the `PDFViewerApplication` sent by the signal. When the viewer is destroy, the signal fires again, this time sending `undefined` to indicate you must stop using `PDFViewerApplication`. The next time the viewer initializes, the signal fires again, this time passing the reference to the new instance of `PDFViewerApplication`.
- The +/- zoom buttons now have a different id. I've renamed them after observing these buttons always triggered two events, on triggered by pdf.js, the other by ngx-extended-pdf-viewer. If you rely on the id for some reason, that might be a breaking change.
- If you want to use `ngxConsoleFilter`, now you have to register it later. You can safely register the method when `PDFNotificationService.onPDFJSInit` is fired. However, this event is subject to change, too - if everything goes according to plan, version 21 is going to replace this `Observable` by a `Signal`.

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
