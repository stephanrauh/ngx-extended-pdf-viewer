The attribute `src` allows you to switch between different documents. There's also the attribute `[base64Src]` for base64 encoded documents.


## Html

```html
<ngx-extended-pdf-viewer 
    [(src)]="src"
    [height]="'90vh'">
</ngx-extended-pdf-viewer>
```

## Typescript
```ts
@Component({ ... })
export class MultipleDocumentsComponent {
  public src = 'assets/pdfs/pdf-sample.pdf';

  public url = new URL('http://pdfviewer.net/assets/pdfs/GraalVM.pdf');
}
```
