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
