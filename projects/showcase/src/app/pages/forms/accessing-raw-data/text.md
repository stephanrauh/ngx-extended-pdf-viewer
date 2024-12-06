You can access low-level form data using `NgxExtendedPdfViewerService.getFormData()`.

You can use this demo to find out the names of the fields in the PDF file.

**Note**: The API is subject to change.

Also note that radiobuttons (and checkboxes which are used as radiobuttons) have a very peculiar representation. This is a low-level API, so it displays all the internal complexity.

## TypeScript

```typescript
export class FormsComponent {
  
  rawFormData: any[] = [];
  
  constructor(private ngxService: NgxExtendedPdfViewerService) {}
  
  async readRawFormDescription(): Promise<void> {
    const raw = await this.ngxService.getFormData(true);
    this.rawFormData = raw.map((annotation: any) => ({
        alternativeText: annotation.fieldAnnotation.alternativeText,
        fieldName: annotation.fieldAnnotation.fieldName,
        fieldType: annotation.fieldAnnotation.fieldType,
        fieldValue: annotation.fieldAnnotation.fieldValue,
        value: annotation.fieldAnnotation.value,
        id: annotation.fieldAnnotation.id,
        maxLen: annotation.fieldAnnotation.maxLen,
        rect: annotation.fieldAnnotation.rect
      }));
  }
}
```
