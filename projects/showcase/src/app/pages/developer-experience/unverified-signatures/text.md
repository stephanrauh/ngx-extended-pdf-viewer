**Using this feature is dangerous!**

PDF forms can bear a digital signature. Such a signature confirms that the PDF that it's been created by the author (and not someone else).

However, ngx-extended-pdf-viewer **does not verify the validity** of the signature. The signature is displayed without any hint it's faulty. So use this feature carefully! Do not show the signature unless you're 100% sure it's valid. Otherwise, users may draw wrong conclusions.

To activate signatures, you must set the attribute `showUnverifiedSignatures`.

## HTML

```html
 <ngx-extended-pdf-viewer
    [src]="'/assets/pdfs/unverified-signature.pdf'"
    [height]="'90vh'"
    [showUnverifiedSignatures]="true">
  </ngx-extended-pdf-viewer>
```
