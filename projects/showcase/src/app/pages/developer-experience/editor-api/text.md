ngx-extended-pdf-viewer provides access to some additional apis-

## Settings

You can set some of the properties of the editors. The example below sets all possible values in the constructor of the component. Of course, you can get those values from the user or some other place too. The comments show what kind of value is valid for the property.

### TypeScript

```typescript
@Component({
standalone: false,  ... })
export class EditorApiComponent {
  
  constructor(private pdfViewerService: NgxExtendedPdfViewerService) {
    
    // Number between 1 and 100
    this.pdfViewerService.editorFontSize = 12;
    
    // Hex Color
    this.pdfViewerService.editorFontColor = '#000000';

    // Hex Color
    this.pdfViewerService.editorInkColor = '#000000';
    
    // Number between 0 and 100
    this.pdfViewerService.editorInkOpacity = 80;
    
    // Number between 1 and 20 
    this.pdfViewerService.editorInkThickness = 10;

    // Hex Color
    this.pdfViewerService.editorHighlightColor = '#de3535';

    // Hex Color
    this.pdfViewerService.editorHighlightDefaultColor = '#de3535';
    
    // Boolean
    this.pdfViewerService.editorHighlightShowAll = true;
    
    // Number between 1 and 24
    this.pdfViewerService.editorHighlightThickness = 10;
  }
}
```

## High Level API

### Adding Images

Adding images to a PDF file is a popular feature. While this is not possible with this library - it is a viewer, not an editor - you can do something similar. You add an an image to the annotation layer. In most cases, you won't see the difference.

#### TypeScript

```typescript
@Component({
standalone: false,  ... })
export class EditorApiComponent {

  constructor(private pdfService: NgxExtendedPdfViewerService) {}

  public async addImage(): Promise<void> {
    const { left, bottom, right, top, rotation } = parameters;
    await this.pdfService.addImageToAnnotationLayer({
      urlOrDataUrl: 'assets/images/ChatGPT-PDF-Viewer-Logo.jpg',
      page: 11,       // optional parameter
      left: 0,        // default value: 0
      bottom: '0%',   // default value: 0
      right: '100%',  // default value: 100%
      top: '100%',    // default value: 100%
      rotation: 270   // default value: 0
    });
  }
}
```

#### Coordinates

The parameters `left`, `bottom`, `right`, and `top` can be:

- percentages (e.g. `left: '50%'`)
- pixels (e.g. `left: '100px'`)
- PDF coordinates (e.g. `left: 100`)

If you omit a coordinate, it's put at the logical origin:

- omitting left amounts to left: 0
- omitting bottom amounts to bottom: 0
- omitting right amounts to right: "100%"
- omitting top amounts to top: "100%"

**Caveat**: In Chrome, the calculation of the bottom coordinate appears to be off by a few pixels. This discrepancy seems to stem from a bug in the PDF rendering engine, resulting in a canvas that is larger than expected (at least in my demo documents). This issue does not occur in Firefox.


### Large Files

The PDF viewer renders pages lazily. If they aren't going to be used soon, the page is not rendered. If you've got a large file, a major part of the pages are just placeholders.

This, in turn, means you can't add an annotation. If you want to add annotations to large files reliably, catch the event `(annotationLayerRendered)` and add the annotations in the event handler. Note that this event is triggered for every page individually. The event handler should add the annotations that belong to this particular page, but not to other pages.


## Low Level

### Adding and exporting text, drawing, images and highlights

You can add texts and drawings programmatically. However, the PDF viewer doesn't support adding highlights programmatically. As for images, that's supported, but using the high-level API (see [Adding Images](#adding-images)).

**Breaking change between pdf.js 3.5 and 3.9**: The coordinates of the serialized drawings have changed. Please keep in mind that this is an internal API of pdf.js, so it's subject to change without notice.

You can export text, drawings, images, and highlight you've added to a PDF file. For more details on exporting text and images refer to the Exporting Section.

- [Export Text](./exporting/text)
- [Export Image](./exporting/image)


#### TypeScript

```typescript
@Component({
standalone: false,  ... })
export class EditorApiComponent {

  constructor(private pdfService: NgxExtendedPdfViewerService) {}

  public addTextEditor(): void {
    const textEditorAnnotation: FreeTextEditorAnnotation = {
      annotationType: 3,
      color: [Math.floor(Math.random() * 255), Math.floor(Math.random() * 255), Math.floor(Math.random() * 255)],
      fontSize: Math.random() * 10 + 20,
      value: 'Hello world!',
      pageIndex: 0,
      rect: [
        50, // height?
        Math.random() * 500 + 350, // y
        Math.random() * 400, // x
        100, // width?
      ],
      rotation: 0,
    };
    this.pdfService.addEditorAnnotation(textEditorAnnotation);
  }

  public async addDrawing(): Promise<void> {
    const x = 400*Math.random();
    const y = 350+500*Math.random();
    const drawing: InkEditorAnnotation = {
      annotationType: 15,
      color: [Math.floor(Math.random() * 255), Math.floor(Math.random() * 255), Math.floor(Math.random() * 255)],
      thickness: Math.random()*10,
      opacity: 1,
      paths: [
        {
          bezier: [x+0.5, y, x+0.5, y+44, x+44, y+66, x+88, y+44],
          points: [x+0.5, y, x+0.5, y+44],
        },
      ],
      pageIndex: 0,
      rect: [x, y, x+100, y+66],
      rotation: 0,
    };
    await this.pdfService.addEditorAnnotation(drawing);
  }

  public exportAnnotations(): void {
    this.selectedTabIndex = 4;
    this.rawAnnotations = this.pdfService.getSerializedAnnotations();
  }
}
```

### Removing Editor

Both forms and editor annotations are PDF annotation, so it might happen the APIs get in the way of each other. Until version 19.6.6, removing an editor would also remove the form fields. This has been fixed in version 19.6.7.

```typescript
@Component({
standalone: false,  ... })
export class EditorApiComponent {

  constructor(private pdfService: NgxExtendedPdfViewerService) {}

  public removeEditors(): void {
    this.pdfService.removeEditorAnnotations();
  }

  public removeTextEditors(): void {
    const filter = (serial: any) =>
      serial?.annotationType === 3 &&
      serial?.pageIndex === 0;
    this.pdfService.removeEditorAnnotations(filter);
  }

  public removeDrawingEditors(): void {
    const filter = (serial: any) => serial.annotationType === 15;
    this.pdfService.removeEditorAnnotations(filter);
  }
}
```
