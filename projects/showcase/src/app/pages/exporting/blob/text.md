You can export the PDF as a Blob, including filled fields and drawings, texts, images, and highlights added by the user.

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

  public blob: Blob | undefined;
  
  public async export(): Promise<void> {
    this.selectedTabIndex = 2;
    this.blob = await this.pdfViewerService.getCurrentDocumentAsBlob();
  }
}
```
