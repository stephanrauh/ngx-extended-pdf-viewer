You can download the PDF file as a BLOB. The user can fill the PDF form, and you can download the file containing the user's input.

## TypeScript

```typescript
export class FormsComponent {
  public downloaded: string | undefined;

  constructor(private ngxService: NgxExtendedPdfViewerService) {}

  public async downloadAsBlob(): Promise<void> {
    const blob = await this.ngxService.getCurrentDocumentAsBlob();
    if (blob) {
      this.downloaded = 'The BLOB contains ' + blob.size + ' byte.';
    } else {
      this.downloaded = 'download failed';
    }
  }
}
```
