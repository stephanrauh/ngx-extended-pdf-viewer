## Types of layers

The PDF viewer always renders the PDF file as a canvas. Often, it also generates additional layers on top of the canvas. 

Those layers are
- [Text Layer](#text-layer)
- [Annotation Layer](#annotation-layer)
- [PDF Layers](#pdf-layers)

You don't have to think much about these layers most of the time. However, these layers are HTML divs, and you can manipulate them.

## Text Layer

The text layer is an optional, invisible layer above the PDF document, which is rendered as an image. You need it to

- mark and copy texts
- find texts
- and, to a limited extend and far from being perfect, to modify how texts are displayed.
- 
By default, the text layer is switched off in order to render the document faster. The drawback is that both the find menu and the select tool are disabled until you activate the text layer.

## Annotation Layer

Interactive forms are part of this layer.

This example uses the event listener `(annotationLayerRendered)` to fix a layout error in the document itself. The author has added a copyright box on page ii. By default, the box is too large, so the box is clipped. That looks attractive, too, but this demo reduces the size of the box to make it fit into the box without clipping it. As a side effect, the underlying link to a popular book vendor becomes visible.

**Caveat**: the `(annotationLayerRendered)` trick does not work in the thumbnail view.

### HTML

```html
<ngx-extended-pdf-viewer
  [src]="'./assets/pdfs/The Public Domain - Enclosing the Commons of the Mind.pdf'"
  (annotationLayerRendered)="onAnnotationLayerRendered($event)"
  [zoom]="'auto'">
</ngx-extended-pdf-viewer>
```

### TypeScript

```typescript
public onAnnotationLayerRendered(event: AnnotationLayerRenderedEvent): void {
  const copyrightHint = event.source.div.querySelector('.freeTextAnnotation');
  if (copyrightHint && copyrightHint instanceof HTMLElement) {
    copyrightHint.style.left="20%";
    const canvas = copyrightHint.querySelector("canvas");
    if (canvas) {
        canvas.style.width="75%";
        canvas.style.height="75%";
        canvas.style.top="20px";
        canvas.style.left="10%";
    }
  }
}
```

## PDF Layers

`ngx-extended-pdf-viewer` supports layered PDF files. You can hide and show each layer in the new "layers" tab of the sidebar. This also works for hidden layers.

The editors of this PDF viewer use another layer to store you drawings and free-text.

`ngxExtendedPdfViewerService` offers two methods allowing you to control the layers programmatically:
- `listLayers()` yields a list of the layers. Don't call it too early. A good point in time is the event `(pagesLoaded)`.
- `toggleLayer(id)` toggles a layer. You need to pass the ID of the layer. The ID, in turn, is part of the result of `listLayers()`.

Note there's not two-way binding. The PDF viewer doesn't fire an event if the user toggles the layers in the PDF file. However, you can register a callback to a low-level API like so:

```ts
PDFViewerApplication.eventBus.on('optionalcontentconfig', callback)
```

### HTML

```html
<ngx-extended-pdf-viewer
    [src]="'/assets/pdfs/themes_de_la_Science-fiction.pdf'"
    [height]="'90vh'">
</ngx-extended-pdf-viewer>
```

### TypeScript

```typescript
export class LayersComponent {

  constructor(private pdfService: NgxExtendedPdfViewerService) {}

  public async listLayers(): Promise<void> {
    const l = await this.pdfService.listLayers();
    if (l) {
      this.layers = l;
    }
  }

  public async toggle(layerId: string): Promise<void> {
    await this.pdfService.toggleLayer(layerId);
    await this.listLayers();
  }
}
```
