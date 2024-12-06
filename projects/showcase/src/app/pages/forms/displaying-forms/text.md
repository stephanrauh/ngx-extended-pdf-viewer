If you're using the default options, you don't have to do anything to activate the feature. If you're using custom options, make sure to activate the setting `renderInteractiveForms: true`. 

**Note**: Starting with pdf.js 2.11, the parameter has been renamed to renderForms.

## HTML

```html
<ngx-extended-pdf-viewer
  [src]="'/assets/pdfs/OoPdfFormExample.pdf'"
  [height]="'90vh'"
  [(formData)]="formData"
>
</ngx-extended-pdf-viewer>
```

## TypeScript

### Using single properties

```typescript
export class FormsComponent {
  firstName = 'Jane';
  lastName = 'Doe';
  country = 'Spain';
  jobExperience = '6';
  typeScript = true;

  public get formData(): FormDataType {
    return {
      firstName: this.firstName,
      lastName: this.lastName,
      yearsOfExperience: this.jobExperience,
      typeScript: this.typeScript,
      country: this.country
    };
  }

  public set formData(data: FormDataType) {
    this.firstName = data.firstName as string;
    this.lastName = data.lastName as string;
    this.jobExperience = data.yearsOfExperience as string;
    this.country = data.country as string;
    this.typeScript = data.typeScript === 'true' || data.typeScript === true;
  }
}
```

### Using object

**Note**: If you are using checkboxes in your form, that do **not** map into a boolean value, it is better to use the getter/setter pattern. You can find more details under the [Checkboxes and Radiobuttons Page](./forms/checkboxes-and-radiobuttons)

```typescript
export class FormsComponent {

  formData: FormDataType = {
    firstName: 'Jane',
    lastName: 'Doe',
    country: 'Spain',
    jobExperience: '6',
    typeScript: true,
  }
}
```
