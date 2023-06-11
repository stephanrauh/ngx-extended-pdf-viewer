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

## Breaking changes ahead! What's new in Version 17?

Version 17 ships with a revamped form support. Along the way, I've polished some rough edges, which is a breaking change if you rely on the old (and incorrect) behavior. In particular, checkboxes now send the value defined by the author of the PDF file. For instance, if the author defined the checkbox to have the values "Y" and "N", now `(formData)` emits these values. Until version 16, it emitted a boolean value. Another improvement (or breaking change, depending on your application) is that `[formData]` now is used to initialize the fields of the PDF file. Earlier versions forced you to use a delayed initialization with a timeout. Version 17 allows you to drop this cumbersome workaround.

Book mode is back again. It was broken in version 16.

When you add a text or a drawing to the PDF file using the new editor functions, these additions now show in the download and in print.

Plus, version 17 removes a couple of features. The growing popularity of the library and the rapid evolution of the base library pdf.js result in a flood of issues and hard-to-solve merge conflicts. To solve that problem, I'll remove some of the features that proved to cause too much works.

In particular, I've removed the custom PDF backgrounds. The pdf.js team have worked a lot on the code I'd modified to implement the custom backgrounds. I didn't manage to resolve the merge conflict, nor do I have enough spare time to re-implement the feature, so I decided to drop it.

Other features I've dropped are `[formTheme]` and `[wheelAction]`. Both of them ceased to work some time ago without anybody complaining.

If you need one of these features - well, this is an open-source library. Contributors are welcome. It's just that I have to prune the library as long as I'm the only contributor.

The base library is now pdf.js 3.5 in the stable branch and pdf.js 3.7 in the "bleeding edge" branch.

## Full changelog

There's also a detailed <a href="https://github.com/stephanrauh/ngx-extended-pdf-viewer/tree/main/projects/ngx-extended-pdf-viewer/changelog.md">changelog</a>.

## Announcement: version 18 is going to drop the extended find bar

A feature I'm about to drop in version 18 is the extended find bar. The base library now ships most of the features I've added a couple of years ago, and their implementation is better. Just think of the wide range of languages and character sets pdf.js supports. To be honest, that's a merge conflict I didn't resolve since 14 month, so it's unlikely I'm ever going to solve it. So it's better to abandon my implementation in favor of their implementation. This means that fuzzy search, multiple search teams, and the distinction between phrase search and word search are gone.

## Showcase and manual

There's a showcase at <a href="https://pdfviewer.net">https://pdfviewer.net</a>. Check this page for live demos, source code examples, and a handbook.

## Contributors welcome!

Would you like to participate in a popular open source project? It's easy: just open a ticket so we can discuss the change, create a fork, and send me a pull request. Contributions to the showcase are as welcome as contributions to the core library itself.

## Features

- programmatic API for many features, such as searching
- Printing
- Support for forms, including two-way binding
- XFA forms are also supported (with a few limitations)
- (Limited) support for signatures (lacking verification of the signature, so use on your own risk!)
- Sidebar with thumbnails, outlines, and attachments (and each of them both optional and customizable)
- Rotating pages
- Download (including form data) and upload
- Zoom (with optional two-way binding to an attribute)
- Full-screen mode
- Various selection tools
- Standard display or even / odd spreads (like a book)
- Book mode with animated page turn animations
- Single page mode (supporting giant PDF documents of 30000+ pages)
- Infinite scrolling
- Plus several other approaches to scrolling (vertical, horizontal, "wrapped" scrolling)
- A wide range of event listeners
- Internationalization (providing translations to several dozen languages)
- Direct access to the core API of pdf.js (including TypeScript definition files)
- The ability to deactivate (i.e. hide) every button, menu item, and the context menu
- Color theming
- And customizing the toolbars, the side bar, and the menus according to your needs.

Not to mention the ability to display PDF files, running on a customized version of Mozilla's pdf.js 3.5, released in April 2023. If you're the daring one, you can also use the developer version 3.7. It's bleeding edge, so use it at own risk. Basically, the bleeding edge version helps me because I can add Mozilla's latest improvements in frequent, small increments. But every once in a while, it contains a feature you may need, so feel free to use it. I don't encourage using the "bleeding edge" branch in production, but most of the time, the quality is production-ready.

## Alternatives

Even I have to admit my pet project doesn't match every requirement. There are several alternatives out there. Feel free to expand the description to learn what other developers have in store for you:

<details>
  <summary><b>Expand to learn more about the other options to display PDF files in Angular</b></summary>
  If you only need the base functionality, I'll happily pass you to <a href="https://github.com/vadimdez/ng2-pdf-viewer/" target="#">the project of Vadym Yatsyuk</a>. Vadym does a great job delivering a no-nonsense PDF viewer. However, if you need something that can easily pass as the native viewer on a gloomy day, ngx-extended-pdf-viewer is your friend.

There's also a direct counterpart to my library: <a href="https://www.npmjs.com/package/ng2-pdfjs-viewer" target="#">ng2-pdfjs-viewer</a>. As far as I can see, it's also a good library. As of May 2021, it's running on PDF.js 2.2.171. It wraps the PDF viewer in an iFrame. That's a more reliable approach, but it also offers fewer options. The list of attributes is shorter, and the PDF viewer can't emit events to your application. If you're not happy with my library, check out ng2-pdfjs-viewer. It's a good library, too. Its unique selling point is displaying multiple PDF files simultaneously on the same page.

You might also try to use the native PDF viewer of your browser. That's a valid approach. It's even the preferred approach. However, `ngx-extended-pdf-viewer` gives you a wide range of options that aren't available using the native API.

</details>

## How to use the library

As a rule of thumb, I recommend cloning the [showcase project from GitHub](https://github.com/stephanrauh/extended-pdf-viewer-showcase) before doing anything else. It's a standard Angular CLI application, so you'll get it up and running in less than ten minutes. It's a good starting point to do your own experiments. Maybe even more important: you'll learn whether the library works on your machine. (Of course, it does, but it's always good to double-check!)

Currently, the minimum required version is Angular 12. The idea is to support the four most current versions of Angular, which gives you roughly two years to update. However, supporting so many version isn't always possible.

1. run `npm add ngx-extended-pdf-viewer` and accept all the defaults
2. Now there's an example component, but it isn't part of your application yet. You can either add the example component to your application or copy the relevant line to you HTML template:

```html
<ngx-extended-pdf-viewer [src]="'assets/example.pdf'" useBrowserLocale="true"></ngx-extended-pdf-viewer>
```

If you're running a non-standard configuration, have a look at <a href="https://pdfviewer.net/extended-pdf-viewer/getting-started">the getting-started page"</a> of the showcase.

## Configuration, options, and events

See [the attribute list on the showcase](https://pdfviewer.net/attributes) and the [list of default options page](https://pdfviewer.net/extended-pdf-viewer/default-options). The lists have become too long to put them here: 87 `@Input()` attributes, 25 event emitters, and 50 default options, give or take a few.

Missing a configuration option? File an issue on the [project bug tracker](https://github.com/stephanrauh/ExploringAngular/tree/main/embedding-pdf). If your request makes sense to me and if I can implement it in my (limited) leisure time, I'll add it. BTW, you can speed up the process by providing a code snippet telling me how to implement the feature or by submitting a pull request.

## Searching programmatically

The service `NgxExtendedPdfViewerService` offers you a programmatic API for searching, printing, dealing with layers, and scrolling within the page.

## Internationalization

<details>
  <summary><b>Expand to learn how to translate ngx-extended-pdf-viewer to 120+ languages</b></summary>

### Slow default way

If you add the translation files to your project as described above in step 3, the PDF viewer uses the browser language setting to determine which language to load. First, it loads the `locale.properties`, scans it for the desired language files, and loads the language file from the corresponding folder. That's two additional HTTP calls. That's slow, and it may even lead to errors if the network is already congested loading other resource files.

Don't forget to set the attribute `useBrowserLocale="true"` if you follow this approach.

### Slow way with custom translation files

If you want to use the slow way, but prefer to load the language files from a different URL, add a link to your application like so:

```html
<link rel="resource" type="application/l10n" href="https://www.example.com/locale/locale.properties" />
```

In this case, don't set `useBrowserLocale` (or set it explicitly to false).

### Inlining (aka embedding) the language files

Alternatively, you can provide the translations as a Json file. This Json file has to be part of an HTML page. That's especially useful if you need only one or two languages, because the are loaded a lot faster. To get familiar with this approach, embed the Json file in the `index.html` like so:

```html
<script type="application/l10n">
  {"default_locale":"de","locales":{"de": ... }}
</script>
```

The folder `node_modules/ngx-extended-pdf-viewer/assets/inline-locale-files` contains snippet files you can simply copy into your HTML page.

_Hint_: You can also add the language definition in another HTML file. The bottom line is that the HTML snippet is already part of the DOM when the PDF viewer is initialized. Cluttering the root index file with the translations is an ugly and inflexible hack, but it works.

If you're using the "inline" approach, don't set `useBrowserLocale` (or set it explicitly to `false`).

</details>

## Troubleshooting

See https://github.com/stephanrauh/ngx-extended-pdf-viewer/tree/main/projects/ngx-extended-pdf-viewer/troubleshooting.md

## Feedback, pull requests and bug reports

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

Reluctantly, I have to drop support for Internet Explorer 11. The base library, Mozilla's pdf.js, now generates binaries that are no longer compatible to Internet Explorer 11, and it seems there's no easy fix. That's a pity because IE11 support was the original use-case of the library and because I frequently get messages from developers who need IE11 support. The last version known to be compatible is 5.3. Version 7.3.2 should be compatible, too, but a user reported crashes.

## Changelog

See https://github.com/stephanrauh/ngx-extended-pdf-viewer/tree/main/projects/ngx-extended-pdf-viewer/changelog.md
