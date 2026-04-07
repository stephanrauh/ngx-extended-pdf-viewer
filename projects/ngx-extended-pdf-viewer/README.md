# ngx-extended-pdf-viewer

Welcome to `ngx-extended-pdf-viewer` – a powerful, full-featured PDF viewer for Angular applications. Whether you're building enterprise tools or internal utilities, this library gives you the control and customization options you need, all while preserving a native-like viewing experience.

Built on Mozilla’s pdf.js and extended with dozens of enhancements, it's ideal for serious applications that demand more than just basic PDF display.

[![npm weekly downloads](https://img.shields.io/npm/dw/ngx-extended-pdf-viewer.svg)](https://www.npmjs.com/package/ngx-extended-pdf-viewer)
[![npm monthly downloads](https://img.shields.io/npm/dm/ngx-extended-pdf-viewer.svg?style=flat)](https://www.npmjs.com/package/ngx-extended-pdf-viewer)
[![npm all-time downloads](https://img.shields.io/npm/dt/ngx-extended-pdf-viewer.svg)](https://www.npmjs.com/package/ngx-extended-pdf-viewer)
[![showcase](https://img.shields.io/badge/showcase-pdfviewer.net-blue)](https://pdfviewer.net)
[![version](https://badge.fury.io/js/ngx-extended-pdf-viewer.svg)](https://badge.fury.io/js/ngx-extended-pdf-viewer)
[![license](https://img.shields.io/badge/License-Apache%202.0-brightgreen.svg)](https://github.com/stephanrauh/ngx-extended-pdf-viewer/blob/main/projects/ngx-extended-pdf-viewer/LICENSE)

---

## 🚀 Getting Started

### Prerequisites

⚠️ **Version 26 requires Angular 19, 20, or 21.** If you're using Angular 17 or 18, please continue using version 25.6.4.

**Why this breaking change?** There are many reasons: Version 26 supports zone-less Angular and migrates to signals. And Angular 18 exited its Long-Term Support (LTS) phase, and security vulnerability CVE-2025-66035 will not be fixed in Angular 17 or 18. Updating to Angular 19 ensures your application continues to receive critical security patches.

In general, I aim to support the last four Angular versions (roughly two years of updates), but sometimes security requirements force me to raise the minimum version sooner.

**Is there a migration schematic?** No - because migrating to ngx-extended-pdf-viewer shouldn't be a big deal. The library uses signals internally, but that hardly ever shows in your application, unless you're using `@ViewChild` to access properties of ngx-extended-pdf-viewer. Even then, solving the error messages should be easy. Adopting zone-less Angular was also surprisingly easy, at least in my showcase. I hope you'll experience a similarly smooth transition!

✅ **Angular 21+ Zoneless Support**

**ngx-extended-pdf-viewer 26 now fully supports Angular 21+ zoneless change detection!** The library works seamlessly in both zone.js and zoneless applications with zero configuration required.

**Using Zoneless (Default in Angular 21+):**
Simply use the library as normal - it will automatically detect zoneless mode and trigger change detection appropriately. You'll have to use `cdr.markForCheck()` every once in a while, but I assume you're already familiar with that pattern.

**Using Zone.js (Optional):**
If you prefer to use zone.js in your Angular 21+ application, add this to your `app.config.ts`:

```typescript
import { provideZoneChangeDetection } from '@angular/core';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    // ... other providers
  ],
};
```

Both modes are fully supported with the same API and features. See the [changelog](./changelog.md) for details on the zoneless implementation.

### Installation

Install via npm:

```bash
npm add ngx-extended-pdf-viewer
```

**Peer dependencies:**

| Package           | Version            |
| ----------------- | ------------------ |
| `@angular/core`   | `>=19.0.0 <22.0.0` |
| `@angular/common` | `>=19.0.0 <22.0.0` |

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

**For standalone components (Angular 19+):**

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

Version `20.0.2` fixes a critical security vulnerability (CVE-2024-4367). Update to this version or newer to stay safe from exploits via malicious PDF files.

Thanks to GitHub users ScratchPDX and Deepak Shakya for reporting the issue promptly.

---

## 🧩 Core Features

- 🎨 **Customizable toolbar and UI** - Hide/show any button, customize layout
- 🔍 **Advanced search capabilities** - Find text, highlight all, multiple search terms, regex support
- 📝 **Comprehensive form support** - Standard and XFA forms with two-way data binding
- ✏️ **PDF annotation and editing** - Text, images, ink drawings, highlights, stamps, signatures
- 🔄 **Page reordering** - Drag and drop pages via thumbnails (v24.2+)
- 📊 **Multiple viewing modes** - Single page, book mode, infinite scroll, side-by-side
- 🎯 **Zoom control** - Programmatic zoom, fit-to-width/height, custom levels, pinch zoom
- 🗂️ **Rich sidebar** - Thumbnails, document outline, attachments, layers
- 🌍 **Internationalization** - Built-in support for dozens of languages
- 📱 **Mobile optimization** - Touch gestures, responsive design, mobile-friendly zoom
- 🖱️ **Drag-and-drop support** - Load PDFs by dropping files onto the viewer
- 🖥️ **Fullscreen mode** - Immersive viewing experience
- ♿ **Accessibility** - Keyboard navigation, screen reader support, focus indicators. Always a work in progress, never good enough, but a priority of mine!
- 🖼️ **High-resolution rendering** - Dynamically detects your browser's capabilities to unlock high zoom factors and crisp rendering of fine-grained PDF files
- 🎛️ **Advanced JavaScript API** - Popup positioning, custom find controllers, annotation events
- 🚀 **Performance optimized** - Canvas size detection, memory leak prevention, efficient rendering
- 🔗 **Direct pdf.js API access** - Full TypeScript support for low-level operations
- 🔒 **Security features** - CSP compatibility, XSS protection

Regarding security: I'm not perfect - it's always a best-effort approach without guarantees. I'm 100% committed, but I need your help, and even so, in the long run, errors are inevitable. The art is to close vulnerabilities before a hacker can exploit them - and that's a joint effort. Together, we'll manage. Don't hesitate to report bugs and vulnerabilities as soon as possible!

<sub>See the full list of [features on the showcase site](https://pdfviewer.net).</sub>

---

## 📦 Version Highlights

### Version 27

Version 27 updates the bleeding-edge version of pdf.js to 5.6.205 and introduces page management features.

**New for end users:**

- **Page management** (experimental): Users can select pages in the sidebar and copy, cut, delete, or export them as a new PDF. Undo/redo is supported. Enable with `[enableSplitMerge]="true"` or `pdfDefaultOptions.enableSplitMerge = true`.
- **Drag-and-drop page reordering**: Reorder pages by dragging thumbnails in the sidebar. Supports multi-select, paste, and undo. Enable with `[enablePageReordering]="true"` or `pdfDefaultOptions.enablePageReordering = true`.
- **Resizable sidebar**: The sidebar can now be resized by dragging its edge.
- **Right-click to save images**: Users can right-click images in PDF documents to save them. Enable with `pdfDefaultOptions.imagesRightClickMinSize = 16`.
- **Hardware acceleration on by default**: Rendering now uses hardware acceleration out of the box for smoother scrolling and zoom.
- **Faster rendering**: WebGPU mesh shading improves rendering performance on supported hardware.
- **Better PDF support**: Improved decoding of JBIG2, CCITTFax (fax-format), and Brotli-compressed content.
- **Long button labels truncated**: Toolbar buttons with long translations (e.g., German, Dutch, Greek) now show an ellipsis instead of overflowing.

**New for developers:**

- New component inputs: `[enableSplitMerge]` and `[enablePageReordering]` — these are read at initialization time only. Changing them after the viewer has loaded requires destroying and recreating the component.
- New `pdfDefaultOptions`: `enableSplitMerge`, `enableWebGPU`, `imagesRightClickMinSize`, `enableNewBadge`.
- Book mode now toggles off when you click the button again.
- Infinite scroll mode now properly exits when switching to another view mode programmatically.

**Bug fixes:**

- Fixed book mode toggle (can now exit by clicking again)
- Fixed infinite scroll mode not properly exiting when switching modes
- Fixed custom print dialog progress bar (was hardcoded instead of bound to actual progress)
- Fixed ink editor events not firing in the editor events demo
- Fixed dark mode: form checkboxes in XFA documents are now visible
- Fixed `blob:` and `capacitor:` URL support for loading PDFs (broken after upstream URL validation change)
- Fixed zoom two-way binding feedback loop when typing numeric values

#### ❗ Breaking changes:

- **Custom thumbnail CSS**: If you have custom CSS targeting `.thumbnailImage` in the sidebar, update it to target `.thumbnailImageContainer img` or `.thumbnailImageContainer`. The sidebar thumbnail DOM structure changed from `img.thumbnailImage` to `div.thumbnailImageContainer > img`.
- **Legacy thumbnail CSS removed**: `.thumbnailSelectionRing` and `.thumbnail.selected` styles have been removed. Modern pdf.js uses box-shadow for selection styling.
- **Sidebar DOM structure**: The sidebar now includes `#viewsManagerHeader` and `#viewsManagerStatus` elements. Custom sidebar implementations that manipulate the sidebar DOM may need adjustment.
- **`enableHWA` default changed**: `pdfDefaultOptions.enableHWA` now defaults to `true`. If you experience rendering issues on older hardware, set it to `false`.

### Version 26

**Breaking Change: Angular 19+ Required**

Version 26 updates to Angular 19 to address security concerns (and to support both signals and zone-less Angular). Angular 18 exited its LTS phase, and [CVE-2025-66035](https://nvd.nist.gov/vuln/detail/CVE-2025-66035) will not be fixed in Angular 17 or 18.

**Migration:**

- If using Angular 17 or 18, stay on version 25.6.4 or earlier
- To update your application to Angular 19: `ng update @angular/core@19 @angular/cli@19`

This version migrates to signals, allows for zone-less Angular, and updates to pdf.js 5.4.530. The latter is a major internal refactoring. I assume it's not the last major refactoring, so brace yourself for more breaking changes. There's hope: the breaking changes are about the internal DOM structure of the viewer. As long as you don't manipulate that, you're safe. Otherwise, brace yourself for CSS changes. Version 26 is hit by such changes. In particular, the sidebar and the thumbnails are affected.

**New features:**

- **Comment editor** (preview): Enable it with `pdfDefaultOptions.enableComment = true;` and `[showCommentEditor]="true"`. The base project, pdf.js, didn't activate it yet, so please consider it a preview. Right now, it works, but it's possible Mozilla's going to implement breaking changes over the next few months.
- **RTL reading direction**: New `[readingDirection]` input (`'auto'` | `'ltr'` | `'rtl'`). In RTL mode, spread pages display right-to-left, arrow key navigation is reversed, and horizontal/wrapped scroll modes display pages right-to-left.
- **Drawing events**: `drawingStarted` and `drawingStopped` annotation editor events fire when the user starts and stops actively drawing (ink/pencil) or highlighting.
- **Link annotation events**: `(linkAnnotationsAdded)` event fires after auto-detected links are injected into the annotation layer.
- **Lazy rendering in infinite-scroll mode**: Only visible pages are rendered, with on-demand rendering as the user scrolls. Previously, all pages were rendered upfront, causing severe performance issues with large documents.
- **Improved pinch zoom:** Version 26 brings back pinch zoom. In the previous version, it was mostly broken, especially on iOS. I'm told it still worked on Android, and my fix made it worse - but I'm also told it's acceptable. Be that as it may, it's not as good as it ought to be. I'm still working on it. Stay tuned.
- **Layout improvements:** I've fixed several layout glitches in the toolbar that have been annoying me for a long time.

**Stability improvements:**

- Fixed intermittent blank first page caused by pdf.js detaching the ArrayBuffer
- Fixed listener leaks on component destroy (AbortController-based cleanup)
- Fixed pinch-zoom drift in both normal and infinite-scroll modes
- Fixed page navigation in infinite-scroll mode (page number input, next/prev buttons)
- Fixed unsmooth page scrolling caused by the signals migration
- Fixed table of contents navigation in book mode
- Fixed Firefox print preview showing grey placeholders
- Only one popover can be open at a time

### Version 25

#### ❗ License change notice (and its reversal)

For a short time, the license had changed from Apache 2.0 to Apache 2.0 with Commons Clause, which allows free use, modification, and distribution while preventing commercial sale or paid services without permission.

But as it turned out, that license was more restrictive than I wanted it to be. So now the library is back to Apache 2.0.

#### ❗ Breaking changes:

- Version 25.5.0: If you omit the attribute `[page]` or `[zoom]` and the PDF viewer opens a PDF document for the second time, the PDF opens on the same page and with the same zoom setting it had before. Before version 25.5.0, the PDF would always open at page 1 and with `zoom = pdfDefaultOptions.defaultZoomValue` (which usually is `'auto'`). I think that's a mildly breaking change, so I raised the version number to 25.5.0.
- The default background color of PDF files has changed from `#E8E8EB` to `#FFFFFF`.
- Embedded JavaScript is now an opt-in feature. It's no longer enabled by default. You can enable it with three feature toggles:
  - `pdfDefaultOptions.enableScripting` - main toggle. Set it to true to allow execution of embedded JavaScript.
  - `pdfDefaultOptions.enableOpenActionJavaScript` - allows JavaScript that runs when opening a PDF file. Requires `pdfDefaultOptions.enableScripting = true`.
  - `pdfDefaultOptions.enableCatalogAAJavaScript` - allows JavaScript that runs when printing, saving, or closing a PDF file. Requires `pdfDefaultOptions.enableScripting = true`.

Security note: Embedded JavaScript in PDFs runs inside a sandboxed JavaScript interpreter (written in C and transpiled to JavaScript) and does not use functions like eval(). These measures reduce - but do not eliminate - potential security risks. For that reason, all related options are disabled by default, and enabling them is at your own risk. While these features can be useful, be aware that no software can guarantee complete protection against malicious content.
Read more about the [JavaScript sandbox here](https://attackanddefense.dev/firefox-internals/2021/10/14/implementing-form-filling-and-accessibility-in-the-firefox-pdf-viewer.html).

### Version 24

- Version 24.3.0 adds a dark mode. Thanks to Megan Truso for providing the pull request!
- Version 24.2.0 and above:
  - **Showcase Application Modernization**: The showcase application has been converted to standalone components, demonstrating modern Angular patterns and best practices for integration.
  - **Page Reordering Feature**: New `enablePageReordering` option allows users to reorder PDF pages by dragging thumbnails. Enable it with `pdfDefaultOptions.enablePageReordering = true;`.
  - **Translations of ngx-extended-pdf-viewer extensions**: I had my AI translate the labels of the buttons to 20 European languages. That's an experiment. If it works well, I'll add translations for all 112 languages supported by pdf.js. But let's start small - I don't speak non-European languages, which means I can't verify the AI generated the correct translations!

- Version 24.1.0 and above: Improved accessibility by showing a hover effect when the mouse is over a button and by adding a blue ring to the active element, thus restoring the implementation we used to have a long time ago. Thanks to Megan for contributing this pull request!

Version 24.0.0:

- Upgraded to `pdf.js 5.3`
- Minor breaking change: Every Acroform field with the same name is now updated by the two-way binding `[(formData)]`. In earlier versions, only the first field was changed. Kudos to Sebastien Fauvart for submitting this pull request!
- There's a new "signature editor". Disabled by default, you can opt in with `pdfDefaultOptions.enableSignatureEditor = true;`. Caveat: these signatures are not cryptographic PDF signatures. They're merely "stamp annotations".

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

## 🧪 Troubleshooting: try the Showcase Locally

If you're stuck on a feature, try cloning the showcase repository. It’s a clean and working example, and comparing it to your app often helps locate the issue. And if the showcase doesn’t work - you can blame me!

```bash
git clone https://github.com/stephanrauh/extended-pdf-viewer-showcase.git
cd extended-pdf-viewer-showcase
npm install
npm start
```

👉 [Open a ticket here](https://github.com/stephanrauh/ngx-extended-pdf-viewer/issues) if something’s broken.

---

## 🐞 Bug Reports & Feature Requests

We want to hear from you!

👉 File issues here: [GitHub Bug Tracker](https://github.com/stephanrauh/ngx-extended-pdf-viewer/issues)

If possible, include a code snippet or reproduction. Better yet - send a pull request!

---

## 🕰️ Need a Fix for an Older Version?

I understand, but... realistically, I can’t maintain old versions in my spare time. The architecture allows for it, but I simply don’t have the bandwidth - unless something critical breaks.

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

Just keep it respectful - the ngx-extended-pdf-viewer community is a friendly place, and I want to keep it that way!

---

## 📜 License & Acknowledgments

- Apache 2.0 License.
- Based on Mozilla’s [pdf.js](https://github.com/mozilla/pdf.js) (also published under a friendly Apache 2.0 license)
- Icons from [MaterialDesignIcons.com](https://materialdesignicons.com/) and Google
- Thanks to all users, contributors, and bug reporters! You rock! Just counting the people contributing pull requests - that's already [several dozen developers](https://github.com/stephanrauh/ngx-extended-pdf-viewer/graphs/contributors)!

---
