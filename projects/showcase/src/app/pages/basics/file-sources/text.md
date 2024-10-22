## URL

The `src` attribute allows you to specify the source url of the document, a [BLOB](#blobs) or a UInt8Array. 

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

## BLOBs

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

## Base64

The `base64Src` attribute allows you to specify a document, that was encoded as a base64 string. This can be useful, for cases where you get a file via an API call.

**Caveat**: I've seen developers populating both `[src]` and `[base64src]`. Please avoid doing so. There's no way to predict which of the two attributes is actually used.

```html
<ngx-extended-pdf-viewer
    [base64Src]="base64"
    [height]="'90vh'">
</ngx-extended-pdf-viewer>
```

### Typescript
```ts
@Component({ ... })
export class FileSourcesComponent {
  public base64 = new Subject<string>();

  constructor(private httpClient: HttpClient) {}

  public ngOnInit(): void {
    this.httpClient.get<string>(
      '/assets/pdfs/Bootstrap-vs-Material-Design-vs-Prime-vs-Tailwind.base64.txt',
      { responseType: 'text' as 'json' })
      .pipe(
        tap((base64) => this.base64 = base64),
      ).subscribe();
  }
}
```

## Tips

When loading a document from an API as a BLOB, Base64 String or a UInt8Array, consider using a resolver. This allows you to do the API call before actually showing the viewer.

Checkout the [Angular Documentation on ResolveFn](https://angular.dev/api/router/ResolveFn?tab=api) to learn more about how to set this up.
