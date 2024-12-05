## Double Click

The double-tap (or double-click) gesture enlarges the PDF file. By default, the target zoom is `page-width`. You can define a different target zoom by setting `pdfDefaultOptions.doubleTapZoomFactor`. In this demo, that's 125%.

There are three additional settings:

- `pdfDefaultOptions.doubleTapZoomsInHandMode`: Activates the double-tap gesture when the hand mode is active. True by default.
- `pdfDefaultOptions.doubleTapZoomsInTextSelectionMode`: Activates the double-tap gesture when the select mode is active. False by default.
- `pdfDefaultOptions.doubleTapResetsZoomOnSecondDoubleTap`: Allows you to reset the zoom on a second double-tap. False by default (but true in this demo).

## HTML

```html
<ngx-extended-pdf-viewer
  [src]="'/assets/pdfs/demo.pdf'"
  [minZoom]="0.5"
  [maxZoom]="1.5"
>
</ngx-extended-pdf-viewer>
```

## TypeScript

```typescript
import { pdfDefaultOptions } from 'ngx-extended-pdf-viewer';
@Component({
standalone: false,  ... })
export class MobileComponent {

  public zoomLevels = ['auto', 'page-actual', 'page-fit', 'page-width',
                       0.5, 0.67, 0.75, 0.82, 0.9, 1, 1.1, 1.15, 
                       1.25, 1.5];
  
  constructor() {
    pdfDefaultOptions.doubleTapZoomFactor = "125%";
  }                       
}
```
