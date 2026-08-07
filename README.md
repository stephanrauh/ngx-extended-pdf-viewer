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

## Welcome to ngx-extended-pdf-viewer!

[![Join the chat at https://gitter.im/ngx-extended-pdf-viewer/community](https://badges.gitter.im/ngx-extended-pdf-viewer/community.svg)](https://gitter.im/ngx-extended-pdf-viewer/community?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

Bringing Mozilla's pdf.js to the Angular world. That's not only the core PDF viewer, but also the UI.

[Follow this link](https://pdfviewer.net) to see the showcase and the setup instructions.

## Showcase and manual

There's a showcase at <a href="https://pdfviewer.net">https://pdfviewer.net</a>. Check this page for live demos, source code examples, and a handbook.

## What's new in 30 (release candidate)

Version `30.0.0-rc.0` stops the viewer from modifying the page it lives on.

Until now the viewer wrote to your application's `<html>` tag: the reading direction of the UI language (so an Arabic PDF flipped your *entire* application to right-to-left, and left it that way after the viewer was destroyed - see [#3253](https://github.com/stephanrauh/ngx-extended-pdf-viewer/issues/3253)), plus its layout variables `--viewer-container-height`, `--viewsManager-width` and `color-scheme`. All of that now goes to the viewer's own `.html` and `.body` elements, which wrap the viewer inside your page.

### Breaking change

Nothing changes for you unless you style the viewer from the outside or replace its template:

- **CSS overrides keyed on `<html>`.** Selectors like `html[dir='rtl'] ngx-extended-pdf-viewer .toolbarButton` no longer match. Use the viewer's own wrapper instead: `ngx-extended-pdf-viewer .body[dir='rtl'] .toolbarButton`.
- **Code reading the layout variables from `<html>`.** `--viewer-container-height`, `--viewsManager-width` and `color-scheme` now live on the viewer's `.html` element. Reading them from `document.documentElement` returns nothing.
- **Custom templates.** If you pass your own template via `[customPdfViewer]`, keep the `.html` and `.body` wrapper elements around `#outerContainer` - the viewer uses them to scope its styles.

### Angular versions

Versions 26 through 30 require Angular 19, 20, 21 or 22. On Angular 17 or 18, stay on version 25.6.4.

## What's new in 29

Version `29.0.0` ships **pdf.js 6.1** in both the stable and the bleeding-edge bundle, and adds an API for building a document out of several files.

### Highlights

| Area | Change |
|------|--------|
| **Engine** | pdf.js 6.1 is the default engine — you no longer need `pdfDefaultOptions.assetsFolder = 'bleeding-edge'` for its features |
| **New API** | `mergeDocument()`, `deletePages()` and `extractPages()` build a document out of several PDFs or images, at any position — including before the first page |
| **New input** | `[supportsDownloading]="false"` hides the download and save buttons *and* switches the download manager off — a stronger lock than `[showDownloadButton]="false"` |
| **Rendering** | RichMedia and Screen annotations with embedded audio or video render |
| **Supply chain** | The package ships `sbom.json` (CycloneDX), `vex.json` and `pdfjs-provenance.json`, so your dependency scanner can finally see the bundled pdf.js |
| **Security** | The bundled engine is patched against [CVE-2026-16633](https://github.com/mozilla/pdf.js/security/advisories/GHSA-hq66-cqwq-w95j) (high) |
| **Bug fixes** | CMaps and standard fonts load again; book mode turns pages without `[showPageFlipButton]`; the findbar's `showFind…` options take effect; the library compiles with `exactOptionalPropertyTypes` |

### Breaking change

The `annotationEditorEvent` carrying the text of a free-text annotation now has `type: 'textChanged'` instead of `type: 'commit'`. Two events used to arrive as `commit` — one from the base editor, one from the free-text editor — and you couldn't tell them apart. `commit` now consistently means "an annotation was committed". **If you listen for `commit` to read the entered text, switch to `textChanged`.**

The full list of changes is in the [changelog](projects/ngx-extended-pdf-viewer/changelog.md).

## Build or update the library from scratch

See the [how-to-build walkthrough](projects/ngx-extended-pdf-viewer/how-to-build.md).
