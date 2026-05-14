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

## What's new in 27.5

Version `27.5.0-alpha.0` syncs the **bleeding-edge** bundle with Mozilla pdf.js up to **v5.7.284** (≈290 upstream commits past v5.6.205). The **stable** bundle is still at v5.6.205. Once stable is also bumped to v5.7.284, the alpha graduates to `27.5.0`.

New UI elements introduced by this sync are gated behind `pdfDefaultOptions.isBleedingEdge()`, so users on the stable branch see no behavior changes.

### Highlights

| Area | Change |
|------|--------|
| **New UI** | Merge-PDF UI (Mozilla bug 2028071) — drag-and-drop another PDF into the thumbnail panel; attachments are preserved; the user is prompted before saving |
| **New UI** | Ink editor: opacity slider replaced with a single alpha-enabled color input |
| **Rendering** | Function-based shadings (Mozilla bug 1254066) |
| **Editor** | Free-highlighting now works on top of image placeholders (Mozilla bug 2034980) |
| **Performance** | Fewer intermediate canvases; GPU mesh path only triggers for >16 triangles; heavy DataView/TypedArray refactor across font code (CFF, TrueType, JBIG2, JPEG) |
| **Bug fixes** | Merging PDFs with conflicting `AcroForm /DR`; merging after page deletion; comb fields with RTL text and alignment; thumbnail navigation under screen readers; user/password stripped from URLs (bug 2025109); SMask compositing, radial gradients, tiling patterns and blending |

### Potentially breaking (`api-minor` upstream)

These rarely surface to library consumers, but flagging in case you use the low-level pdf.js API directly:

- `PDFDataRangeTransport` now uses a single internal listener.
- `PostScriptCompiler` / `PostScriptEvaluator` removed; PostScript is parsed via a new Wasm compiler with a JS fallback.
- CCITT and JBig2 fallback decoders replaced with a JS port of PDFium's.
- pdf.js itself now requires **Node ≥22** to *build* — but the **published bundle still targets browsers down to iOS 14**, so end-user Angular apps building on Node 20 are unaffected.

### Versioning note

Following our existing convention, a pdf.js upstream sync without library API changes ships as a `.5` minor bump (`27.5.0`) rather than a major (`28.0.0`). The current pre-release (`27.5.0-alpha.0`) reflects that only the bleeding-edge bundle has been updated; the alpha graduates to `27.5.0` once the stable bundle is also synced to v5.7.284. The two `api-minor` items above are very unlikely to affect typical consumers — see the changelog if you build directly against pdf.js's low-level API.

## Build or update the library from scratch

See the [how-to-build walkthrough](projects/ngx-extended-pdf-viewer/how-to-build.md).
