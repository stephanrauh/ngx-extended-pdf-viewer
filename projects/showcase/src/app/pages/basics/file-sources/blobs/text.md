
To display a BLOB, just pass it to the src attribute.

You can also download the PDF file as a BLOB. For instance, the user can upload a file, and you can use the method `NgxExtendedPdfViewerService.getCurrentDocumentAsBlob()` to send the file to your server. Or the user can fill a form embedded in the PDF file, and you can download the file containing the user's input.

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
  public src: Blob;

  constructor(private http: HttpClient, private blobService: BlobService, private ngxService: NgxExtendedPdfViewerService) {
    this.usePreloadedFile();
  }

  public usePreloadedFile(): void {
    this.src = this.blobService.src;
  }

  public loadLargeFile(): void {
    this.http
      .get(
        '/assets/pdfs/The Public Domain - Enclosing the Commons of the Mind.pdf',
        { responseType: 'blob' }
      )
      .subscribe((res) => this.src = res);
  }

  public async downloadAsBlob(): Promise<void> {
    const blob = await this.ngxService.getCurrentDocumentAsBlob();
    // Handle download or additional logic
  }
}
```

### Troubleshooting

In rare cases, developers report they can't open the BLOB, but managed to open the same file as a Base64 file using the attribute `[base64src]`. You can use this code snippets to convert a BLOB to a Base64 file:

```ts
function blobToBase64(blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
        const dataUrl = reader.result as string;
        const base64 = dataUrl.split(',')[1];
        resolve(base64);
    };
    reader.readAsDataURL(blob);
  });
}
```
