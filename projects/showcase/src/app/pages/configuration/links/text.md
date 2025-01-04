## Description

There are several kinds of links:

- Internal links within the PDF files.
- External links on web server (usually with an https URL).
- Links to file on the local PC or the local network. The PDF viewer doesn't support such links.

By default, external links are opened in the same window. In other words, clicking the link amounts to leaving the Angular application. To prevent this, you have two options:

- Add the target when you're creating the PDF file. That's generally the best solution.
- Use the defaultOptions to override the default for externalLinkTarget.


### HTML

```html
<ngx-extended-pdf-viewer *ngIf="!hidden"
  [src]="'/assets/pdfs/blind-text-collection.pdf'"
  backgroundColor="#ffffff"
  [height]="'90vh'">
</ngx-extended-pdf-viewer>
```


### TypeScript

```typescript
import { pdfDefaultOptions } from 'ngx-extended-pdf-viewer/default-options';
import { LinkTarget } from 'ngx-extended-pdf-viewer';
...
ngOnInit(): void {
  pdfDefaultOptions.externalLinkTarget = LinkTarget.BLANK;
}
```


## Default Link Targets

The link target is only considered at render time. Changing it at runtime requires a reload of the PDF Viewer.

- LinkTarget.BLANK
  - opens a new window
- LinkTarget.SELF
  - opens in same window
- LinkTarget.PARENT
  - opens in same window
- LinkTarget.TOP
  - opens in same window
- LinkTarget.NONE
  - opens in same window


## Deactivating Links

You can manipulate links using the `pageRendered` event. Note you can't modify the appearance of the links. They are part of the PDF file, so they can't be displayed differently. But you can modify the invisible annotation layer.

### HTML

```html
<ngx-extended-pdf-viewer *ngIf="!hidden"
  [src]="'/assets/pdfs/blind-text-collection.pdf'"
  [height]="'90vh'"
  (pageRendered)="afterPageRendered($event)"
>
</ngx-extended-pdf-viewer>
```

### TypeScript
```typescript
export class LinksComponent {
 public afterPageRendered(pageRenderedEvent: PageRenderedEvent) {
    const pageView = pageRenderedEvent.source; /* as PdfPageView */
    const div = pageView.div as HTMLDivElement;
    div.querySelectorAll('a').forEach((a: HTMLAnchorElement) => {
      a.href = 'javascript: void(0)';
      a.target = '';
    });
  }
}
```
