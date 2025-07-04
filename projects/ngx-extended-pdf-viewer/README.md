# ngx-extended-pdf-viewer

Welcome to `ngx-extended-pdf-viewer` – a powerful, full-featured PDF viewer for Angular applications. Whether you're building enterprise tools or internal utilities, this library gives you the control and customization options you need, all while preserving a native-like viewing experience.

Built on Mozilla’s pdf.js and extended with dozens of enhancements, it's ideal for serious applications that demand more than just basic PDF display.

[![npm](https://img.shields.io/npm/dm/ngx-extended-pdf-viewer.svg?style=flat)](https://www.npmjs.com/package/ngx-extended-pdf-viewer)
[![showcase](https://img.shields.io/badge/showcase-pdfviewer.net-blue)](https://pdfviewer.net)
[![version](https://badge.fury.io/js/ngx-extended-pdf-viewer.svg)](https://badge.fury.io/js/ngx-extended-pdf-viewer)
[![license](https://img.shields.io/badge/License-Apache%202.0-brightgreen.svg)](https://opensource.org/licenses/Apache-2.0)

---

## 🚀 Getting Started

### 0. Prerequisites

The library requires Angular 17+. Older versions are not supported.

In general, I aim to support the last four Angular versions (roughly two years of updates), but this may not always be feasible. For example, the upcoming version 25 might raise the minimum required Angular version significantly: I plan to support modern Angular (and I know many of you are waiting for that). You can't have an omelette without breaking an egg.

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

In your module or standalone component:

```ts
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';

@NgModule({
  imports: [NgxExtendedPdfViewerModule],
})
export class AppModule {}
```

> 🧭 For hands-on examples and step-by-step guides, visit the [showcase](https://pdfviewer.net) and the [getting started page](https://pdfviewer.net/extended-pdf-viewer/getting-started).

---

## 🔐 Security Notice

Version `20.0.2` fixes a critical security vulnerability (CVE-2024-4367). Update to this version or newer to stay safe from exploits via malicious PDF files.

Thanks to GitHub users ScratchPDX and Deepak Shakya for reporting the issue promptly.

---

## 📣 Roadmap Highlights

### Upcoming in Version 25

- Migration to Angular Signals
- Support for standalone components
- Removal of `zone.js` (maybe)
- Migration schematics planned (but not promised)

Expect some breaking changes — but better performance and modern Angular support await!

---

## 🧩 Core Features

- Customizable toolbar and UI
- Programmatic access (searching, scrolling, printing, layer toggling)
- Support for both standard and XFA forms
- Basic PDF editing (text, images, ink, highlights)
- Multiple scroll modes and zoom control
- Sidebar with thumbnails, outlines, and attachments
- Built-in internationalization (dozens of languages)
- Drag-and-drop support
- Fullscreen and book mode
- Responsive layout and mobile optimization
- Direct access to pdf.js core API with TypeScript types

<sub>See the full list of [features on the showcase site](https://pdfviewer.net).</sub>

---

## 📦 Version Highlights

### Version 24 (alpha)

- Upgraded to `pdf.js 5.3`
- Annotation editor events were temporarily removed (but now they're back, starting with version 24.0.0-alpha.1)
- Ongoing alpha/beta phase. You can help me by testing the alpha version and giving feedback!

### Version 23 (current stable)

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

- Apache 2.0 License
- Based on Mozilla’s [pdf.js](https://github.com/mozilla/pdf.js) (also published under a friendly Apache 2.0 license)
- Icons from [MaterialDesignIcons.com](https://materialdesignicons.com/) and Google
- Thanks to all users, contributors, and bug reporters! You rock! Just counting the people contributing pull requests - that's already [several dozen developers:](https://github.com/stephanrauh/ngx-extended-pdf-viewer/graphs/contributors)

---

## 🧓 Internet Explorer 11 Support

Still using IE11 in 2025? You're braver than most.

I hate to admit it - but I've dropped support years ago. The last known compatible version is 5.3. Use it at your own risk — no updates, no fixes, no guarantees.

---
