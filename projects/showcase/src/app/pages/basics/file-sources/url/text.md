To display a PDF from an url just pass it to the `[source]` attribute.

### Html

```html
<ngx-extended-pdf-viewer 
    [(src)]="src"
    [height]="'90vh'">
</ngx-extended-pdf-viewer>
```

### Typescript
```ts
@Component({ ... })
export class FileSourcesComponent {
  public src = 'assets/pdfs/pdf-sample.pdf';
  public url = new URL('http://pdfviewer.net/assets/pdfs/GraalVM.pdf');
}
```
