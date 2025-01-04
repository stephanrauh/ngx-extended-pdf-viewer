You can extract text from the PDF file that's currently displayed.

You can get the text either as plain text or as text with metadata. The second option, `NgxExtendedPdfViewerService::getPageAsLines`, returns an array that tries to split the text into lines, along with the coordinates of the line and a flag indicating whether the line is written left-to-right or right-to-left.

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

public extractedText: string | undefined;

public extractedLines: Array<string> = [];

constructor(private pdfViewerService: NgxExtendedPdfViewerService) {}

public async exportAsText(): Promise<void> {
  this.selectedTabIndex = 3;
  this.extractedLines = [];
  this.extractedText = await this.pdfViewerService.getPageAsText(1);
}

public async exportAsLines(): Promise<void> {
  const lines = await this.pdfViewerService.getPageAsLines(1);
  this.extractedText = undefined;
  this.extractedLines = lines.map(line => line.text);
  console.log(lines);
}
```
