
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

