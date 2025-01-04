You can theme the PDF viewer and - to a limited extent - also how forms are displayed in a PDF files. However, most PDF documents define how the form is displayed. ngx-extended-pdf-viewer does not overwrite the CSS rules defined by the PDF author.

`ngx-extended-pdf-viewer` ships with a light theme and a dark theme. Plus, you can define a custom theme.

Note that there's no theming for forms. Theming only changes the appearance of the PDF viewer. It does not change the way PDF files are rendered.

## HTML

```html
<ngx-extended-pdf-viewer
  [src]="src"
  [theme]="theme"
  [backgroundColor]="backgroundColor">
</ngx-extended-pdf-viewer>
```

## TypeScript

```typescript
export class FormsComponent {
  theme = 'light';
}
```
