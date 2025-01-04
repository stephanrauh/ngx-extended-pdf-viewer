You can export the PDF file as an image. Note that the text of the PDF usually scales smoothlessly; you can print it with high resolution. However, the images embedded in the PDF file usually don't scale as gracefully.

## HTML

```html
<ngx-extended-pdf-viewer
    [src]="'/assets/pdfs/blind-text-collection.pdf'"
    [textLayer]="true" <!-- enable the find button -->
    [showHandToolButton]="true" <!-- enable text selection -->
    [height]="'90vh'"> <!-- by default, most CSS frameworks set the height to 0 -->
</ngx-extended-pdf-viewer>
```

## TypeScript

```typescript
constructor(private pdfViewerService: NgxExtendedPdfViewerService) {}

public exportAsImage(): void {
  const scale = {width: this.width}; 
  // or: scale = {height: this.height};
  // or: scale = {scale: this.scale};
  this.pdfViewerService.getPageAsImage(1, scale, (dataURL) =>
    this.showImage(dataURL)
  );
}

private showImage(dataURL: any): void {
  this.imageDataURL = dataURL;
  this.getImageDimensions(dataURL);
}

private getImageDimensions(dataURL: string): void {
  const i = new Image();
  i.onload = () => {
    this.widthDisplay = i.width;
    this.heightDisplay = i.height;
  };
  i.src = dataURL;
}
```
