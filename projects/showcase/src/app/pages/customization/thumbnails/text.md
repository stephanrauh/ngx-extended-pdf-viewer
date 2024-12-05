You can customize the thumbnails. To do so you need to define something that looks like an Angular template, but isn't an Angular template. It's not part of the Angular interpolation and lifecycle, so there are several restrictions. This demo shows over to circumvent them.

If you want to use CSS classes, set `encapsulation: ViewEncapsulation.None`.

In the HTML definition, you can use these variable PAGE_NUMBER.

If you need more fine-grained control, modify the thumbnail in an event listener of `(thumbnailDrawn)`. The demo uses this option to color the thumbnails differently and to add the diagonal text.

## Call Angular Code

If you want to call Angular code from the template, implement `(thumbnailDrawn)` and use it to register the event listener. If you're not using ngZone, you need to call `ChangeDetectorRef.detectChanges()` or `ChangeDetectorRef.markForCheck()`.

The demo set the initial state of the radio buttons in `(thumbnailDrawn)`. It also adds an event listener to rotate the pages on double-click.


## HTML

### PDF Viewer

```html
<ngx-extended-pdf-viewer
    [src]="'/assets/pdfs/stluciadance.com.pdf'"
    [customThumbnail]="radiobuttonThumbnail"
    (pageChange)="onPageChange($event)"
    (thumbnailDrawn)="onThumbnailDrawn($event)"
    [sidebarVisible]="true"
    [activeSidebarView]="1">
</ngx-extended-pdf-viewer>
```

### Thumbnail

```html
<ng-template #radiobuttonThumbnail>
  <a class="pdf-viewer-template">
    <div class="thumbnail" data-page-number="PAGE_NUMBER" style="border: none">
      <input id="thumbnail-cbx-PAGE_NUMBER" data-page-number="PAGE_NUMBER" class="thumbnail-radiobutton" type="radio" style="top: 100px; right: 25px; position: relative; transform: scale(1.5)" />
      <div class="thumbnail-text"></div>
      <div class="image-container" style="width: var(--thumbnail-width); height: var(--thumbnail-height)">
        <img class="thumbnailImage" />
      </div>
      <div style="margin-top: -30px;margin-left: auto;margin-right: auto;text-align: center;width: 25px;height: 25px;border-radius: 50%;background-color: blue;
          color: white;line-height: 25px;">
        #PAGE_NUMBER
      </div>
    </div>
  </a>
</ng-template>
```

## TypeScript

### Thumbnail Drawn

```typescript
public onThumbnailDrawn(thumbnailEvent: PdfThumbnailDrawnEvent): void {
  const thumbnail = thumbnailEvent.thumbnail;

  if (page === this.PDFViewerApplication.page) {
    const radiobutton = thumbnail.querySelector('input.thumbnail-radiobutton');
    if (radiobutton instanceof HTMLInputElement) {
      radiobutton.checked = true;
    }
  }

  const overlay = thumbnail.querySelector('.image-container') as HTMLElement;
  let type: string;
  if (page <= 2) {
    overlay.style.backgroundColor = '#0000FF40';
    type = 'title page';
  } else if (page === 3 || page === 4) {
    overlay.style.backgroundColor = '#00FF0040';
    type = 'table of contents';
  } else {
    overlay.style.backgroundColor = '#FF000040';
    type = 'ready for review';
  }
  const textNode = thumbnail.querySelector('.thumbnail-text') as HTMLDivElement;
  if (textNode) {
    textNode.innerText = type;
  }
}
```

#### Calling Angular Code

```typescript
@Component({
standalone: false, 
  selector: 'app-custom-thumbnails',
  templateUrl: './custom-thumbnails.component.html',
  styleUrls: ['./custom-thumbnails.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class CustomThumbnailsComponent implements OnInit, OnDestroy {
  constructor() {}

  public onThumbnailDrawn(thumbnailEvent: PdfThumbnailDrawnEvent): void {
    const overlay = thumbnail.querySelector('.image-container') as HTMLElement;
     overlay.ondblclick = () => {
      this.rotation = this.rotation ? 0 : 180;
    };
  }

}
```
