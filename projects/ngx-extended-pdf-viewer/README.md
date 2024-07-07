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
  <a href="https://openbase.io/js/ngx-extended-pdf-viewer?utm_source=embedded&utm_medium=badge&utm_campaign=rate-badge"><img src="https://badges.openbase.io/js/rating/ngx-extended-pdf-viewer.svg"></a>
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

## Security

Version 20.0.2 is a security fix. It solves CVE-2024-4367. I strongly recommend updating to the latest version of ngx-extended-pdf-viewer as soon as possible, or to version 20.0.2 as a minimum. Older versions contain a bug allowing malicious PDF files to run arbitrary code. Kudos go to GitHub users ScratchPDX and Deepak Shakya to tell me about it, so I could provide a hotfix during my vacations.

## Version 21 alpha versions: Sneak preview to an optimized viewer

If everything goes according to the plan - which is not 100% guaranteed - version 21 is going to be a major refactoring. To my surprise, the first step went remarkably
smooth, so I've decided to publish the current state of the art as an alpha version. It's a very early look into the workshop, so don't use it in production. As always, the goal of the alpha version is to give you the opportunity to run some test and to give me feedback whether you like the changes.

The goal of version 21 is to

- get rid of RxJS
- to stop polluting the global namespace (that's partially finished)
- to get rid of the memory leaks
- and it's going to move the code loading the huge JavaScript files to a service. So the viewer doesn't have to reload the JavaScript files every time you destroy the viewer and open a new one. It seems many people do that, so this is going to improve performance considerably. This goal is already fulfilled, although I doubt it's free of errors yet.

Version 21 contains several breaking changes. The good news is that I assume the vast majority of developers won't even notice. These breaking changes are:

- The RxJS subjects `recalculateSize$` and `onPDFJSInit` are gone. You can use ``onPDFJSInitSignal` to replace `onPDFJSInit`. I suspect nobody uses `recalculateSize$`, so I didn't implement a replacement yet.
- The attributes `[minifiedJSLibraries]` and `[forceUsingLegacyES5]` have moved from the component to the new `PDFScriptLoaderService`. That, in turn, makes it difficult to set them. I haven't decided yet how to proceed. Chances are I'm going to move them to the `pdfDefaultOptions`.
- Compatibility with CSP (Content Security Policy) has - temporarily - become worse. After finishing my refactoring, I intend to fix this.
- Earlier versions of the viewer stored many attributes, objects, and functions in the global namespace (i.e. `globalThis` or `window`). Many of these attributes have already migrated to `PDFScriptLoaderService.PDFViewerApplication`.

## What's new in version 20.5.0?

Basically, version 20.5.0 updates to pdf.js 4.3 and solves some memory leak issues. However, that turned out to be a major task, involving a major rewrite of the initialization of the library.

Breaking changes:

- Compatibility with CSP (Content Security Policy) has - temporarily - become worse. I had to modify the way the JavaScript files are loaded, and I didn't find out yet how to make the new algorithm aware of CSP.
- Absolute paths in `pdfDefaultOptions.assetsFolder` are temporarily broken. I've fixed this in version 21.0.0-alpha.2, but more likely than not I won't be able to publish the bugfix in a 20.5.x version.
- I've modified the way the application initializes. It's unlikely you notice this, but if you rely on `window.PDFViewerApplication` to be available early, you might see errors. Starting with version 20.5.0, the recommended approach is to listen to the signal `PDFNotificationService.onPDFJSInitSignal()`. When the viewer is initialized, the signal fires and sends the references to `PDFViewerApplication` and a few other resources. After receiving this signal, you can safely use the `PDFViewerApplication` sent by the signal. When the viewer is destroy, the signal fires again, this time sending `undefined` to indicate you must stop using `PDFViewerApplication`. The next time the viewer initializes, the signal fires again, this time passing the reference to the new instance of `PDFViewerApplication`.
- The +/- zoom buttons now have a different id. I've renamed them after observing these buttons always triggered two events, on triggered by pdf.js, the other by ngx-extended-pdf-viewer. If you rely on the id for some reason, that might be a breaking change.
- If you want to use `ngxConsoleFilter`, now you have to register it later. You can safely register the method when `PDFNotificationService.onPDFJSInit` is fired. However, this event is subject to change, too - if everything goes according to plan, version 21 is going to replace this `Observable` by a `Signal`.

## What's new in version 20?

Version 20.2.0 fixes a few bugs in PDF files with forms. Now checkboxes always show the value stored in the PDF files (unless overwritten by `(formDataChange)´), and text fields always show the value sent by `[formData]` even if there's a pre-formatted value in the PDF file. The bug fix might break your application if you rely on the error. I don't consider this a breaking change, but even so, I've increase the minor version number to make you aware of potential problems.

Version 20 contains a couple of minor bugfixes that might break your application. It's not likely, but I decided to play it safe and to increase the major version number. The new version

- updates to pdf.js 4.1. The bleeding-edge is a sneak preview of version 4.3, containing the latests (and possibly buggy) additions from pdf.js.
- I've improved CSS encapsulation. Recently, I'd added a couple of CSS files and forgot to wrap these file into the `ngx-extended-pdf-viewer`. If you've modified some of my CSS rules, you may want to add the `.ngx-extended-pdf-viewer` class to the CSS selector. If you haven't done so yet, your CSS rule is probably broken.
- I've fixed bugs with checkboxes and radiobuttons in forms. This might break your application if it relies on the bugs.
- I've removed the minified ES5 build. I suspect nowadays very few people are using the ES5 build, so let's reduce the size of this package.

## What's new in Version 19?

Version 19 updates to pdf.js 4.0, and that means breaking changes. I hope most of you won't even notice it, but under the hood, there's a lot of change. So I decided to do a bold step and update ngx-extended-pdf-viewer to Angular 17.

Version 19.5 also brings improved support for CSP (content security policy). Now the PDF viewer works with this CSP configuration:

```
Content-Security-Policy: base-uri 'self'; default-src mydomain.com 'nonce-{{nonce}}'
```

My promise of backward compatibility to roughly 3-4 version still holds, so I'm going to maintain version 18 for a while. I also hope that version 19 is compatible to Angular 14, 15, and 16, but at the moment, it's too early to promise anything.

In a nutshell:

- You're using Angular 16? Give ngx-extended-pdf-viewer 19 a try. My preliminary compatibility test indicates it's compatible. If it isn't, please tell me about it.
- You're using Angular 15 or below? Stick to ngx-extended-pdf-viewer@18. But brace yourself for an update. Supporting two version simultaneously is painful to me, so I won't do this forever.
- You've invested in the old i18n API, or you can't update because of a breaking change? Please tell me about your issue (for example, at https://github.com/stephanrauh/ngx-extended-pdf-viewer/discussions/1976).
- You're using Angular 17 and can afford to start fresh? Go for version 19, including the alpha versions!

Breaking change of version 19.3.0:
Danny Tram kindly added a bugfix to the method `NgxExtendedPdfViewerService.hasPageBeenRendered()`. Strictly speaking it's a breaking change because previously the method did the exact opposite of what the name indicates. However, it's still a bug fix, so I've decided to increase the minor version number only.

Breaking changes of version 19:

- The attribute `useBrowserLocale` and the inlined translations are gone.
- Many translation keys have changed. If you're using custom translations, you'll need to update them and to migrate to the FTL format.

### What's the difference between the stable and the bleeding-edge version of pdf.js?

The bleeding edge branch is the latest developer version of pdf.js (usually one to three weeks behind). In theory, this means it might be buggy, but the pdf.js teams manage to deliver a remarkable high quality. Most of the bugs of the bleeding-edge version are my bugs, usually caused by merging, and that's also the reason why I maintain this branch. It helps me to spot bugs early. I'm always happy when people use the bleeding-edge branch and report errors, as long as you keep in mind it's not intended to be used in production.

## What's new in Version 18?

As mentioned above, I'll maintain version 18 for a short while because version 19 requires Angular 17 or above. If you're using Angular 12-15, stick to ngx-extended-pdf-viewer 18, and if you're using Angular 16, my preliminary tests indicate you can use either version of ngx-extended-pdf-viewer.

Version 18 ships with quite a few improvements:

- It updates the find API,
- brings toolbar customization and responsive design to another level,
- gives you the option to add many buttons to the toolbar that used to hide in the secondary menu,
- adds more flexibility with for `[pageViewMode]`, `[scrollMode]`, and `[spreadMode]`,
- and updates to pdf.js 3.10 in the stable branch and to pdf.js 3.11 in the bleeding-edge branch.
- The bleeding-edge branch, in turn, gives you a sneak preview of the new "stamp" editor, which allows you to add images to PDF files.

A slightly modified layout is a side-effect of the improvements of the toolbar and the secondary menu. Most people won't notice, but if you're using screenshot tests, expect them to break.

The updated find API brings a couple of breaking changes. I removed the fuzzy search, the multiple words-search, and the current page / page range search. "Ignore accent" now is "match diacritics." When you migrate your code, you'll have to invert your boolean logic because "ignore accents" is the opposite of "match diacritics". Along the way, I noticed that the find API didn't work as expected. I fixed several bugs and added more fields to the events. If you rely on the old events, brace yourself for (minor) breaking changes. Plus, I've renamed, moved, and even removed a couple of classes to make the
new file structure match the simplified find bar.

The breaking changes became nessary because maintaining the library became more time-consuming with each version of pdf.js. Even worse,
the pdf.js team worked heavily on the find algorithm, but I wasn't able to merge their improvements during the last one or two years. So I had to reduce the differences between the libraries. In other words, I pruned ngx-extended-pdf-viewer. I'm positive I've finished pruning, so in the future, there will be fewer breaking changes. Please apologize for the inconvenience!

If you need the old extended find bar, please stick to version 17. I've split off a separate branch, so I can maintain version 17 in parallel for a while.

A small breaking change affects single-page mode. I've removed a CSS rule that pushed the page to the left. If you don't like the page to be centered, you can add the CSS rules in your global `style.css`:

```CSS
.pdfViewer.singlePageView .page {
  margin: 0;
}
```

### Note on version 18.1.0

I've changed the ids of the "next" and "previous" buttons, both in the primary toolbar and the secondary menu. Plus, I've fixed a bug that prevented the pagination buttons to show in the secondary menu. Strictly speaking, this is a breaking change, but it's so small I decided to call it minor version update.

### Known bugs

To my surprise, form support is broken in version 18.0.0-18.0.3. That's a high-priority ticket, so it should be history soon. Nonethless, it shows that version 18 does add several new (and unexpected) bugs. Have a look at the bug tracker before updating.

### Note on breaking changes

The last two versions brought a lot of breaking changes, some of them very annoying to users relying on them. I'm sorry about that. I had to prune the library because progress of the base library has shyrocketed. It became next to impossible to keep up with the pace. The good news is now I'm confident I can keep up with the pace of the base library now. I don't expect new major breaking changes any time soon. Minor breaking changes - in particular, changes related to CSS - are always possible, but I'll try hard to avoid them.

## Full changelog

There's also a detailed <a href="https://github.com/stephanrauh/ngx-extended-pdf-viewer/tree/main/projects/ngx-extended-pdf-viewer/changelog.md">changelog</a>.

## Showcase and manual

There's a showcase at <a href="https://pdfviewer.net">https://pdfviewer.net</a>. Check this page for live demos, source code examples, and a handbook.

## Contributors welcome!

Would you like to participate in a popular open source-project? It's easy: just open a ticket so we can discuss the change, create a fork, and send me a pull request. Contributions to the showcase are as welcome as contributions to the core library.

## Features

- programmatic API for many features, such as searching
- Editor: add text, images, or free-style drawings to your PDF file.
- Printing
- Drag and drop PDF files to the viewer
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

Not to mention the ability to display PDF files, running on a customized version of Mozilla's pdf.js 4.0.269, released in late November 2023.

## Alternatives

Even I have to admit my pet project doesn't match every requirement. There are several alternatives out there. Feel free to expand the description to learn what other developers have in store for you:

<details>
  <summary><b>Expand to learn more about the other options to display PDF files in Angular</b></summary>
  If you only need the base functionality, I'll happily pass you to <a href="https://github.com/vadimdez/ng2-pdf-viewer/" target="#">the project of Vadym Yatsyuk</a>. Vadym does a great job delivering a no-nonsense PDF viewer. However, if you need something that can easily pass as the native viewer on a gloomy day, ngx-extended-pdf-viewer is your friend.

There's also a direct counterpart to my library: <a href="https://www.npmjs.com/package/ng2-pdfjs-viewer" target="#">ng2-pdfjs-viewer</a>. As far as I can see, it's also a good library. As of May 2021, it's running on PDF.js 2.2.171. It wraps the PDF viewer in an iFrame. That's a more reliable approach, but it also offers fewer options. The list of attributes is shorter, and the PDF viewer can't emit events to your application. If you're not happy with my library, check out ng2-pdfjs-viewer. It's a good library, too. Its unique selling point is displaying multiple PDF files simultaneously on the same page.

You might also try to use the native PDF viewer of your browser. That's a valid approach. It's even the preferred approach. However, `ngx-extended-pdf-viewer` gives you a wide range of options that aren't available using the native API.

</details>

## How to use the library

As a rule of thumb, I recommend cloning the [showcase project from GitHub](https://github.com/stephanrauh/extended-pdf-viewer-showcase) before doing anything else. It's a standard Angular CLI application, so you'll get it up and running in less than ten minutes. It's a good starting point to do your experiments. Maybe even more important: you'll learn whether the library works on your machine. (Of course, it does, but it's always good to double-check!)

Currently, the minimum required version is Angular 12. The idea is to support the four most current versions of Angular, which gives you roughly two years to update. However, supporting so many versions isn't always possible.

1. run `npm add ngx-extended-pdf-viewer` and accept all the defaults
2. There's an example component, but it isn't yet part of your application. You can either add the example component to your application or copy the relevant line to your HTML template:

```html
<ngx-extended-pdf-viewer [src]="'assets/example.pdf'"></ngx-extended-pdf-viewer>
```

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
