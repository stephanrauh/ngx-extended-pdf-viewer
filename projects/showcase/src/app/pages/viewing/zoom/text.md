The attribute `[(zoom)]` controls the zoom level of the PDF document. If you're using two-way binding, the variable is updated
when the user zooms in or out.

## Huge Zoom Levels

If the resolution of the PDF is very high, the PDF viewer calculates the maximum canvas size. If the canvas size exceeds the maximum canvas size, `ngx-extended-pdf-viewer` reduces the resolution and activates CSS scaling. On most devices and with most PDF documents, this probably never happens.

You can trade performance for blurriness by limiting the maximum canvas size by setting `pdfDefaultOptions.maxCanvasPixels` in the constructor.

Here's a [list of the maximum canvas sizes](https://www.npmjs.com/package/canvas-size#test-results) on many browsers and devices.

If you exceed this setting, or if the necessary canvas size is larger than `pdfDefaultOptions.maxCanvasPixels` defines, `ngx-extended-pdf-viewer` limits the canvas size and activates CSS scaling. So you can get higher zoom levels, but the text may be blurry.

## HTML

```html
<ngx-extended-pdf-viewer
  [src]="'/assets/pdfs/BootsFaces_Deep_Dive_1.0.pdf'"
  (currentZoomFactor)="updateZoomFactor($event)"
  [height]="'90vh'"
  [(zoom)]="zoomSetting"
  [minZoom]="minZoom" [maxZoom]="maxZoom"
  [zoomLevels]="zoomLevels"
  >
</ngx-extended-pdf-viewer>
```

## TypeScript

```typescript
@Component({
standalone: false,  ... })
export class ZoomComponent {
  public isMobile = 'ontouchstart' in document.documentElement;
  public minZoom = 0.33;
  public maxZoom = 3;
  public zoomLevels = ['auto', 'page-actual', 'page-fit', 'page-width', 0.2, 0.25, 0.33, 0.5, 0.75, 1, 1.25, 1.5, 2, 2.5, 3, 3.5, 4];
  private _zoomSetting: number | string | undefined = 'page-width';
  private currentZoomFactor: number;

  public get zoomSetting() {
    return String(this._zoomSetting);
  }
  public set zoomSetting(zoom: string) {
    if (isNaN(Number(zoom))) {
      this._zoomSetting = zoom;
    } else {
      this._zoomSetting = zoom + '%';
    }
  }
  public updateZoomFactor(zoom: number): void {
    this.currentZoomFactor = zoom;
  }
}
```
