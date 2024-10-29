## Keycloak

To display the PDF file, you have to pass the attribute `authorization` like so:

```html
<ngx-extended-pdf-viewer
        [src]="'http://localhost:8080/api/documents/testpdf'"
        [authorization]="bearerToken"
>
</ngx-extended-pdf-viewer>
```

You must retrieve the bearer token in the TypeScript code. This might look like so:

```typescript
@Component(...)
export class NgxExtendedPdfTestComponent implements OnInit {
  public bearerToken: string | undefined = undefined;

  constructor(private keycloakService: KeycloakService) {}

  ngOnInit(): void {
    this.bearerToken = 'Bearer ' + this.keycloakService.getToken();
  }
}
```

Note that you have to add the prefix `"Bearer "` yourself. That's necessary because other auth servers don't require the prefix.

## Example project

[Marcel Karras](https://github.com/MKITConsulting) kindly provided a demo project: [Link to demo project](https://github.com/stephanrauh/ngx-extended-pdf-viewer-issues/tree/main/oauth2-ngx-extended-pdf-viewer-test).

To run it, just follow the instructions of the readme file.

## Other auth providers

HMAC *should* work similarly, but it doesn't require the prefix `"Bearer "`. Just pass the access token to `authorization`.

If you need more flexibility, you can

- use the attribute `httpHeaders` to pass an arbitrary array of http headers
- set `[authorization]="true"`. In this case, the authorization header is not set. However, the flag `withCredentials` of the XMLHttpRequest is set to true. If pdf.js uses the modern fetch API instead, `withCredentials` activates the option `credentials: 'include'`

### Links for more details

- [Documentation on XMLHttpRequests with credentials](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/withCredentials)
- [Documentation on Fetch API - sending a request with credentials](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch#sending_a_request_with_credentials_included)



