Rendering a PDF page takes some time. When you browse quickly through the pages of a complex document, you'll frequently see the loading indicator instead of the page. That's an unpleasant experience, so the PDF viewer renders one or two pages in advance.

While that's a good compromise between energy consumption and user experience in most cases, some users reported they need more flexibility. ngx-extended-pdf-viewer allows you to define a custom pre-rendering strategy. You can use it to render more pages below the current page in advance, but you can also use it to render pages above the currently visible page. The latter is useful to allow quick backward scrolling after jumping to a new chapter or jumping to a new page by entering the page number.

Note that rendering too many pages in advance may have the opposite effect. Keeping your CPU busy results in a slow UI and a bad user experience.

### Example Algorithm

The algorithm below increases the number of pre-rendered pages to two pages backward and up to five pages in advance.

#### HTML

```html
 <ngx-extended-pdf-viewer
    [src]="'./assets/pdfs/The Public Domain - Enclosing the Commons of the Mind.pdf'"
    [zoom]="'page-width'"
    [height]="'auto'"
    [(page)]="page"
    [(pageLabel)]="pageLabel"
    [textLayer]="true"
    (pageRendered)="onPageRendered()">
</ngx-extended-pdf-viewer>
```

#### TypeScript

```typescript
 @Component({ ... })
export class PrerenderingComponent {
  public spreadMode: 'off' | 'even' | 'odd' = 'off';

  constructor(private pdfViewerService: NgxExtendedPdfViewerService) {
    pdfDefaultOptions.ignoreDestinationZoom = true;
  }

  public onPageRendered(): void {
    if (!this.pdfViewerService.isRenderQueueEmpty()) {
      // try again later when the pages requested by the pdf.js core or the user have been rendered
      setTimeout(() => this.onPageRendered(), 100);
    }

    const pagesBefore = this.spreadMode === 'off' ? 2 : 2;
    const pagesAfter = this.spreadMode === 'off' ? 2 : 5;
    let startPage = Math.max(this.page - pagesBefore, 1);
    let endPage = Math.min(this.page  + pagesAfter, this.pdfViewerService.numberOfPages());

    const renderedPages = this.pdfViewerService.currentlyRenderedPages();

    for (let page = startPage; page <= endPage; page++) {
      const pageIndex = page - 1;
      if (!this.pdfViewerService.hasPageBeenRendered(pageIndex)) {
          this.pdfViewerService.addPageToRenderQueue(pageIndex);
          break; // break because you can request only one page at a time
      }
    }
  }
}
```

## Buffer for rendered pages

If you're running on tight memory constraints, you can reduce the size of the number of pre-rendered pages. By default, `ngx-extended-pdf-viewer` keeps up to 50 pages in memory. To reduce or increase this setting, set `pdfDefaultOptions.defaultCacheSize` to a different number.
