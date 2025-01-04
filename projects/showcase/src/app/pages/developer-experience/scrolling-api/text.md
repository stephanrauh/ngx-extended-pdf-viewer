The recommended approaches to scrolling are using `[page]` and `[namedDest]` (see [Navigation API Page](./developer-experience/navigation-api)). If you want to scroll within a page, there's a third option. `NgxExtendedPdfViewerService` offers a programmatic API:

- `scrollPageIntoView(42)` is equivalent to [page]="42".
- `scrollPageIntoView(42, {top: '100%'})` scrolls to the bottom of page 42.
- `scrollPageIntoView(42, {top: '50%'})` scrolls to the middle of page 42.
- `scrollPageIntoView(42, {top: 500 })` scrolls to page 42, and then 500 pixels down.
- `scrollPageIntoView(42, {left: '100%' })` scrolls to the right hand side of the page.

Note that numerical values refer to pixels, so which part of the page become visible depends on the zoom level. Better use percentages.

## HTML

```html
<ngx-extended-pdf-viewer
  [src]="'./assets/pdfs/The Public Domain - Enclosing the Commons of the Mind.pdf'"
  [zoom]="zoom"
  [height]="'auto'">
</ngx-extended-pdf-viewer>
```

## TypeScript

```typescript
@Component({
standalone: false,  ... })
export class ScrollingComponent {
  constructor(private pdfService: NgxExtendedPdfViewerService) { }

  public scroll(pageNumber: number, top: number | string): void {
    this.pdfService.scrollPageIntoView(pageNumber, {top});
  }
}
```

## Edge Cases

The `left` parameter can be confusing, especially if your PDF document features bot landscape and portrait pages. In theory, the `left` parameter causes the page to scroll to the left by a given percentage. However, that's not always possible, because the horizontal scrollbar doesn't allow for arbitrary scrolling. In particular, 100% would indicate the page scrolls out of the visible area, but the scrollbar doesn't allow that.
