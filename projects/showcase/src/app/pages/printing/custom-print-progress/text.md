Using the `progress` event of the `ngx-extended-pdf-viewer` allows you to display your own progress or other ways of user feedback.

## HTML

```html
<ngx-extended-pdf-viewer
  [src]="'/assets/pdfs/A%20COOL%20KID%20LIKE%20ME.pdf'"
  zoom="50%"
  [showToolbar]="false"
  (beforePrint)="onBeforePrint()"
  (afterPrint)="onAfterPrint()"
  (progress)="onProgress($event)">
</ngx-extended-pdf-viewer>
@if (showProgress) {
<div style="padding-bottom:10px; padding-top:10px">
  <div>Processing page {{ currentPageRendered }} of {{ totalPages }}</div>
</div>
}
```

## TypeScript

```typescript
@Component({
standalone: false,...})
export class CustomPrintDialogComponent {
  public printPercentage = 0;
  public totalPages = 0;
  public currentPageRendered = 0;
  public showProgress = false;
  public hideBuiltInProgress = true;

  constructor(private pdfService: NgxExtendedPdfViewerService) {  }

  public onBeforePrint() {
    if (this.hideBuiltInProgress) {
      const node = document.querySelector('.pdf-wrapper #printServiceDialog') as Element;
      node.setAttribute('style', 'display:none!important');
    }
    this.showProgress = true;
  }

  public onAfterPrint() {
    const node = document.querySelector('.pdf-wrapper #printServiceDialog') as Element;
    node.removeAttribute('style');
    this.showProgress = false;
  }

  public onProgress(event: ProgressBarEvent): void {
    if (this.showProgress) {
      this.totalPages = event.total;
      this.printPercentage = event.percent;
      this.currentPageRendered = event.page ?? 0;
    }
  }
}
```
