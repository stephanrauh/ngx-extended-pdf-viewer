You can print the PDF file by calling `NgxExtendedPdfViewerService.print()`. The (optional) parameter defines the print range. Limiting the print range is useful for very large documents that'd crash your browser - such as trying to print documents containing several hundred pages with Internet Explorer 11.

## TypeScript

```typescript
@Component({
standalone: false,  ... })
export class PrintRangeComponent {
  constructor(private printService: NgxExtendedPdfViewerService) {}

  public print(): void {
    const range: PDFPrintRange = {
      from: 1,
      to: 10,
      excluded: [2, 4, 6, 8],
    };
    this.printService.print(range);
  }
}
```

## Setting Print Range

Calling `NgxExtendedPdfViewerService.setPrintRange()` limits the print range of the print button and `CTRL+P`. This also includes the programmatic API `print()` if the parameter is omitted.

To prevent nasty surprises, implement an `ngDestroy()` callback and use it to call `NgxExtendedPdfViewerService.removePrintRange()`.

### TypeScript

```typescript
@Component({
standalone: false,  ... })
export class PrintRangeComponent {
  constructor(private printService: NgxExtendedPdfViewerService) {}

  public setPrintRange(): void {
    const range: PDFPrintRange = {
      from: 1,
      to: 10,
      excluded: [2, 4, 6, 8],
    };
    this.printService.setPrintRange(range);
  }
}
```

## Override Browser Print

Setting the attribute `replaceBrowserPrint` allows you to replace the browser default print functionality by printing the PDF file. No matter what your web page looks like, if `replaceBrowserPrint` is true, both the keys `CTRL+P` and the print menu of the browser print the PDF file. If you set `replaceBrowserPrint="false"`, both `CTRL+P` and the print menu print the web page.

**Note**: Starting with version 16.0.0, the `replaceBrowserPrint` is active by default.

### HTML
```html
<ngx-extended-pdf-viewer
  [src]="'/assets/pdfs/BootsFaces_Deep_Dive_1.0.pdf'"
  zoom="50%"
  [replaceBrowserPrint]="true">
</ngx-extended-pdf-viewer>
```

## Auto Rotation

By default, the PDF viewer rotates landscape pages when printing. You can switch this off by setting `enablePrintAutoRotate` to `false`. This is useful if you want to print a PDF file with a mix of portrait and landscape pages, and you want to keep the orientation of the pages as they are in the PDF file.

### HTML

```html
<ngx-extended-pdf-viewer
  [src]="src"
  [enablePrintAutoRotate]="false">
</ngx-extended-pdf-viewer>
```

## Print Resolution

The attribute `printResolution` specifies the print resolution, with a default value of 150 dpi. If the specified resolution exceeds the browser's capabilities, it is adjusted downward, including a 5% margin for safety.

### HTML

```html
<ngx-extended-pdf-viewer
  [src]="'/assets/pdfs/BootsFaces_Deep_Dive_1.0.pdf'"
  [printResolution]="300">
</ngx-extended-pdf-viewer>
```
