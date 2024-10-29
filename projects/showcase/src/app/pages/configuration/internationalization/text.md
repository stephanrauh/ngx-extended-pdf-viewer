## Using a specific language
`ngx-extended-pdf-viewer` ships with translation for more than 100 languages and dialects. When you copy the `node_modules/ngx-extended-pdf-viewer/assets/locale` folder to the `assets/locale` folder of your application, you can select your language by setting the `language` attribute. If you omit this attribute, the default locale of the browser is used.

**Note**: The `language` attribute is only read when the component is drawn initially. Switching a language at runtime requires hiding the viewer shortly or reloading it.

### HTML

```html
<ngx-extended-pdf-viewer
  [src]="'/assets/pdfs/BootsFaces_Deep_Dive_1.0.pdf'"
  backgroundColor="#ffffff"
  [language]="language"
  textLayer="true">
</ngx-extended-pdf-viewer>
```

### TypeScript

```typescript
@Component({ ... })
export class I18nComponent {
  public hidePdfViewer = false;

  private _language = 'es-ES';

  public get language(): string {
    return this._language;
  }

  public set language(language: string) {
    this._language = language;
    this.hidePdfViewer = true;
    // the timeout gives the PDF viewer time
    // to free memory
    setTimeout(() => {
      this.hidePdfViewer = false;
    }, 1000);
  }
}
```


## Custom Translations

To use custom translations, copy the viewer.ftl file you want to modify from the `node_module/ngx-extended-pdf-viewer` folder into your project. Then modify it and add a rule to your `angular.json` ensuring the original file is overwritten each time your compile your application.

**Caveat**: Every once in a while, the team at Mozilla or - less frequently - I add a translation. When you modify the default translation, please check the new changes with each major version of pdf.js.


### angular.json

```json
...
"assets": [
  "src/server.js",
  "src/.htaccess",
  "src/favicon.ico",
  "src/assets",
  {
    "glob": "**/*",
    "input": "node_modules/ngx-extended-pdf-viewer/assets",
    "output": "/assets/"
  },
  // new rule follows here:
  {
    "glob": "**/*",
    "input": "src/assets/i18n",
    "output": "/assets/locale/"
  },
...
```

### viewer.ftl

```
...
pdfjs-page-scale-actual = Taille réelle
# Variables:
#   $scale (Number) - percent value for page scale
# Here's the change:
pdfjs-page-scale-percent = { $scale } per cent
...
```


