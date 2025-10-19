# ngx-extended-pdf-viewer

Welcome to `ngx-extended-pdf-viewer` – a powerful, full-featured PDF viewer for Angular applications. Whether you're building enterprise tools or internal utilities, this library gives you the control and customization options you need, all while preserving a native-like viewing experience.

Built on Mozilla’s pdf.js and extended with dozens of enhancements, it's ideal for serious applications that demand more than just basic PDF display.

[![npm](https://img.shields.io/npm/dm/ngx-extended-pdf-viewer.svg?style=flat)](https://www.npmjs.com/package/ngx-extended-pdf-viewer)
[![showcase](https://img.shields.io/badge/showcase-pdfviewer.net-blue)](https://pdfviewer.net)
[![version](https://badge.fury.io/js/ngx-extended-pdf-viewer.svg)](https://badge.fury.io/js/ngx-extended-pdf-viewer)
[![license](https://img.shields.io/badge/License-Apache%202.0%20with%20Commons%20Clause-brightgreen.svg)](https://github.com/stephanrauh/ngx-extended-pdf-viewer/blob/main/projects/ngx-extended-pdf-viewer/LICENSE)

---

## 🚀 Getting Started

### 0. Prerequisites

The library requires Angular 17+. Older versions are not supported.

In general, I aim to support the last four Angular versions (roughly two years of updates), but this may not always be feasible. For example, the upcoming version 26 might raise the minimum required Angular version significantly: I plan to support modern Angular (and I know many of you are waiting for that). You can't have an omelette without breaking an egg.

### 1. Installation

Install via npm:

```bash
npm add ngx-extended-pdf-viewer
```

### 2. Usage in Your Angular Component

In your component HTML:

```html
<ngx-extended-pdf-viewer [src]="'assets/example.pdf'"></ngx-extended-pdf-viewer>
```

**For NgModule-based applications:**

```ts
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';

@NgModule({
  imports: [NgxExtendedPdfViewerModule],
})
export class AppModule {}
```

**For standalone components (Angular 17+):**

```ts
import { Component } from '@angular/core';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';

@Component({
  selector: 'app-pdf-viewer',
  standalone: true,
  imports: [NgxExtendedPdfViewerModule],
  template: `<ngx-extended-pdf-viewer [src]="'assets/example.pdf'"></ngx-extended-pdf-viewer>`,
})
export class PdfViewerComponent {}
```

**Or configure in main.ts for application-wide availability:**

```ts
import { bootstrapApplication } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(NgxExtendedPdfViewerModule),
    // other providers...
  ],
});
```

> 🧭 For hands-on examples and step-by-step guides, visit the [showcase](https://pdfviewer.net) and the [getting started page](https://pdfviewer.net/extended-pdf-viewer/getting-started).

---

## 🔐 Security Notice

Don't be bothered by the flood of alpha versions in 25.6.0. I know that's considered a warning signal of a Shai Hulud infection. However, in this particular case, it was the exact opposite: adding protection against Shai Hulud and migrating from traditional publishing to publishing as a trusted publisher with provenance didn't work immediately. It "burned" 20 version numbers until I finally found the correct configuration.

Version `20.0.2` fixes a critical security vulnerability (CVE-2024-4367). Update to this version or newer to stay safe from exploits via malicious PDF files.

Thanks to GitHub users ScratchPDX and Deepak Shakya for reporting the issue promptly.

---

## 📣 Roadmap Highlights

### Upcoming in Version 26

Originally, these features were announced for version 25. But an unexpected breaking changed forced me to add an intermediate major version.

- Migration to Angular Signals
- Support for standalone components
- Removal of `zone.js` (maybe)
- Migration schematics planned (but not promised)

Expect some breaking changes — but better performance and modern Angular support await!

---

## 🧩 Core Features

- 🎨 **Customizable toolbar and UI** - Hide/show any button, customize layout
- 🔍 **Advanced search capabilities** - Find text, highlight all, multiple search terms, regex support
- 📝 **Comprehensive form support** - Standard and XFA forms with two-way data binding
- ✏️ **PDF annotation and editing** - Text, images, ink drawings, highlights, stamps, signatures
- 🔄 **Page reordering** - Drag and drop pages via thumbnails (v24.2+)
- 📊 **Multiple viewing modes** - Single page, book mode, infinite scroll, side-by-side
- 🎯 **Precision zoom control** - Programmatic zoom, fit-to-width/height, custom levels
- 🗂️ **Rich sidebar** - Thumbnails, document outline, attachments, layers
- 🌍 **Internationalization** - Built-in support for dozens of languages
- 📱 **Mobile optimization** - Touch gestures, responsive design, mobile-friendly zoom
- 🖱️ **Drag-and-drop support** - Load PDFs by dropping files onto the viewer
- 🖥️ **Fullscreen mode** - Immersive viewing experience
- ♿ **Accessibility features** - Keyboard navigation, screen reader support, focus indicators
- 🎛️ **Advanced JavaScript API** - Popup positioning, custom find controllers, annotation events
- 🚀 **Performance optimized** - Canvas size detection, memory leak prevention, efficient rendering
- 🔗 **Direct pdf.js API access** - Full TypeScript support for low-level operations
- 🔒 **Security features** - CSP compatibility, XSS protection

Regarding security: I'm not perfect - it's always a best-effort approach without guarantees. I'm 100% committed, but I need your help, and even so, in the long run, errors are inevitable. The art is to close vulnerabilities before a hacker can exploit them - and that's a joint effort. Together, we'll manage. Don't hesitate to report bugs and vulnerabilities as soon as possible!

<sub>See the full list of [features on the showcase site](https://pdfviewer.net).</sub>

---

## 📦 Version Highlights

### Version 25

#### ❗ License change notice

The license has changed from Apache 2.0 to Apache 2.0 with Commons Clause, which allows free use, modification, and distribution while preventing commercial sale or paid services without permission. You can still use ngx-extended-pdf-viewer in your commercial or closed-source products, and you can distribute it with your software, provided you keep the copyright notice intact.
For the exact terms, please refer to the LICENSE file — that is the legally binding document.

#### ❗ Breaking changes:

- Version 25.5.0: if you omit the attribute `[page]` or `[zoom]` and if the PDF viewer opens a PDF document for the second time, the PDF opens on the same page and with the same zoom setting it had before. Before version 25.5.0, the PDF would always open at page 1 and with `zoom = pdfDefaultOptions.defaultZoomValue` (which usually is `'auto'`). I think that's a mildly breaking change, so I raised the version number to 25.5.0.
- The default background color of PDF files has changed from `#E8E8EB` to `#FFFFFF`.
- Embedded JavaScript is now an opt-in feature. It's no longer enabled by default. You can enable it with three feature toggles:
  - `pdfDefaultOptions.enableScripting` — main toggle. Set it to true to allow execution of embedded JavaScript.
  - `pdfDefaultOptions.enableOpenActionJavaScript` — allows JavaScript that runs when opening a PDF file. Requires `pdfDefaultOptions.enableScripting = true`.
  - `pdfDefaultOptions.enableCatalogAAJavaScript` — allows JavaScript that runs when printing, saving, or closing a PDF file. Requires `pdfDefaultOptions.enableScripting = true`.

Security note: Embedded JavaScript in PDFs runs inside a sandboxed JavaScript interpreter (written in C and transpiled to JavaScript) and does not use functions like eval(). These measures reduce — but do not eliminate — potential security risks. For that reason, all related options are disabled by default, and enabling them is at your own risk. While these features can be useful, be aware that no software can guarantee complete protection against malicious content.
Read more about the [JavaScript sandbox here](https://attackanddefense.dev/firefox-internals/2021/10/14/implementing-form-filling-and-accessibility-in-the-firefox-pdf-viewer.html).

### Version 24

- Version 24.3.0 adds a dark mode. Thanks to Megan Truso for providing the pull request!
- Version 24.2.0 and above:
  - **Showcase Application Modernization**: The showcase application has been converted to standalone components, demonstrating modern Angular patterns and best practices for integration.
  - **Page Reordering Feature**: New `enablePageReordering` option allows users to reorder PDF pages by dragging thumbnails. Enable it with `pdfDefaultOptions.enablePageReordering = true;`.
  - **Translations of ngx-extended-pdf-viewer extensions**: I had my AI translate the labels of the buttons to 20 European languages. That's an experiment. If it works well, I'll add translations for all 112 languages supported by pdf.js. But let's start small - I don't speak non-European languages, which means I can't verify the AI generates the correct translation!

- Version 24.1.0 and above: improved accessibility by showing a hover effect when the mouse is over a button and by adding a blue ring to the active element, thus restoring the implementation we used to have a long time ago. Thanks to Megan for contributing this pull request!

Version 24.0.0:

- Upgraded to `pdf.js 5.3`
- Minor breaking change: Every Acroform field with the same name is now updated by the two-way binding `[(formData)]`. In earlier versions, only the first field was changed. Kudos to Sebastien Fauvart for submitting this pull request!
- There's a new "signature editor". Disabled by default, you can opt in with `pdfDefaultOptions.enableSignatureEditor = true;`. Caveat: these signatures are not cryptographic PDF signatures. At the time of writing (July 07, 2025), they're merely "stamp annotations".

### Version 23

- Popup dialog positioning via JavaScript
- Option to force JavaScript code reload
- Improved mobile stability (reduced canvas resolution)
- Ink editor API updated (breaking change)
- Dialog CSS selectors adjusted for theming

❗ Version 23 includes a CSS bug where search highlights may render text invisible. To work around this, add the following to your global `styles.css`:

```css
ngx-extended-pdf-viewer .textLayer .highlight.selected {
  opacity: 0.25;
}
```

Remove this workaround after updating to 24.0.0+.

---

## 🧪 Try the Showcase Locally

If you're stuck on a feature, try cloning the showcase repository. It’s a clean and working example, and comparing it to your app often helps locate the issue. And if the showcase doesn’t work — you can blame me!

```bash
git clone https://github.com/stephanrauh/extended-pdf-viewer-showcase.git
cd extended-pdf-viewer-showcase
npm install
npm start
```

👉 [Open a ticket here](https://github.com/stephanrauh/ngx-extended-pdf-viewer/issues) if something’s broken.

---

## 🔧 Configuration & Events

- Full list of `[inputs]`, events, and CSS hooks:
  - 📘 [Attribute reference](https://pdfviewer.net/attributes)
  - 🧱 [Default options](https://pdfviewer.net/extended-pdf-viewer/default-options)

Use `NgxExtendedPdfViewerService` for:

- Starting/stopping search
- Scrolling to pages or coordinates
- Toggling layers
- Triggering print

---

## 🐞 Bug Reports & Feature Requests

We want to hear from you!

👉 File issues here: [GitHub Bug Tracker](https://github.com/stephanrauh/ngx-extended-pdf-viewer/issues)

If possible, include a code snippet or reproduction. Better yet — send a pull request!

---

## 🕰️ Need a Fix for an Older Version?

I understand, but... realistically, I can’t maintain old versions in my spare time. The architecture allows for it, but I simply don’t have the bandwidth — unless something critical breaks.

If you're desperate for a fix or a new feature, there’s one option: ask my employer. I work as an IT consultant, and they may be willing to sponsor time to work on ngx-extended-pdf-viewer during business hours.

---

## 💡 Alternatives

If this library doesn't fit your needs:

- [`ng2-pdf-viewer`](https://github.com/vadimdez/ng2-pdf-viewer): Minimal and lightweight
- [`ng2-pdfjs-viewer`](https://www.npmjs.com/package/ng2-pdfjs-viewer): iframe-based, supports multiple PDFs
- Native browser PDF viewer: Fast, but limited customization

---

## 🙌 Contributions Welcome

Your feedback matters!

- File a ticket to discuss your idea
- Submit a PR (core or showcase). [The how-to-build page](https://github.com/stephanrauh/ngx-extended-pdf-viewer/blob/main/projects/ngx-extended-pdf-viewer/how-to-build.md) has detailed instructions for you.
- Even complaints help improve the project!

Just keep it respectful — the ngx-extended-pdf-viewer community is a friendly place, and I want to keep it that way!

---

## 📜 License & Acknowledgments

- Apache 2.0 License with Common Clause, which allows free use, modification, and distribution while preventing commercial sale or
  paid services without permission.
- Based on Mozilla’s [pdf.js](https://github.com/mozilla/pdf.js) (also published under a friendly Apache 2.0 license)
- Icons from [MaterialDesignIcons.com](https://materialdesignicons.com/) and Google
- Thanks to all users, contributors, and bug reporters! You rock! Just counting the people contributing pull requests - that's already [several dozen developers:](https://github.com/stephanrauh/ngx-extended-pdf-viewer/graphs/contributors)

---

## 🧓 Internet Explorer 11 Support

Still using IE11 in 2025? You're braver than most.

I hate to admit it - but I've dropped support years ago. The last known compatible version is 5.3. Use it at your own risk — no updates, no fixes, no guarantees.

---
