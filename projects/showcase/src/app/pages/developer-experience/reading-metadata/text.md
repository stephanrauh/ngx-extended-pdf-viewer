Once the PDF file has been loaded, you can extract quite a some metadata from it. You can get these infos after receiving the `(pagesLoaded)` event.

## HTML

```html
<ngx-extended-pdf-viewer 
  src="/assets/pdfs/The Public Domain - Enclosing the Commons of the Mind.pdf" 
  [height]="'90vh'" 
  (pagesLoaded)="onPagesLoaded()">
</ngx-extended-pdf-viewer>
```

## TypeScript

```typescript
@Component({
standalone: false, ...})
export class FileInfoComponent {
  private notificationService = inject(PDFNotificationService);
  private PDFViewerApplication = computed(() => this.notificationService.onPDFJSInitSignal());
  
  fileInfo: PdfDocumentInfo;

  async onPagesLoaded() {
    if (this.PDFViewerApplication()) {
      const propertiesExtractor = new PdfDocumentPropertiesExtractor();
      this.fileInfo = await propertiesExtractor.getDocumentProperties(this.PDFViewerApplication());
    }
  }
}
```

**Note**: At the moment the return type of `getDocumentProperties` is any. Behind the scenes it still builds an object of type `PdfDocumentInfo`.

**Note**: If you expect to frequently read out the document properties, you can also instantiate the `PdfDocumentPropertiesExtractor` once and reuse it.
