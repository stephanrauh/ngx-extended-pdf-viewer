A few options allow you to influence the way the PDF file is rendered. You can explore those options in the demo.

## HTML

```html
<ngx-extended-pdf-viewer
    [src]="'/assets/pdfs/codpaste-teachingpack.pdf'"
    [showBorders]="showBorders"
    [(scrollMode)]="scrollMode"
    [(pageViewMode)]="pageViewMode"
    [(spread)]="spread"
    zoom="30%"
    [showVerticalScrollButton]="'always-visible'"
    [showHorizontalScrollButton]="'always-visible'"
    [showWrappedScrollButton]="'always-visible'"
    [showSpreadButton]="'always-visible'"
    [showInfiniteScrollButton]="'always-visible'"
    [showBookModeButton]="'always-visible'"
    [showSinglePageModeButton]="'always-visible'">
</ngx-extended-pdf-viewer>
```

## TypeScript

```typescript
@Component({ ... })
export class DisplayOptionsComponent {
  public showBorders = false;

  public scrollMode = ScrollModeType.horizontal;

  public pageViewMode: PageViewModeType = 'multiple';

  public spread: 'off' | 'odd' | 'even' = 'off';
}
```

## Single Page Mode 

The PDF viewer supports the single-page mode. In this mode, you can scroll from page to page. Instead, you can only navigate to a new page by setting the page number or clicking a chapter in the sidebar.

## Book

The book mode displays the PDF file like a book and renders a nice page-turn effect.

Book mode suffers from a couple of limitations:

- You can't zoom
- Presentation mode doesn't work
- If the available space of the viewer isn't wide enough, weird effects happen

## Infinite Scroll

This option allows you to display the PDF file without scrollbar.
