## Disabling JavaScript

pdf.js ships with a JavaScript engine. There's little security risk because they're executing JavaScript in a sandbox. Even so, you can deactivate scripting altogether.

If you want to deactivate the JavaScript engine, keep two things in mind:

- You must disable JavaScript before loading the pdf.js engine. Usually initializing pdfDefaultOptions.enableScripting = false; in the constructor of your component is early enough (unless you've already opened a PDF document before).
- If your PDF file contains a script to print the file immediately after opening it, it's still printed. The only difference is it's not printed using the JavaScript engine, so any option your JavaScript code may pass is lost.

### HTML

```html
<ngx-extended-pdf-viewer
  [src]="'/assets/pdfs/160F-2019.pdf'"
  [height]="'auto'"
>
</ngx-extended-pdf-viewer>
```

### TypeScript

```typescript
@Component({ ... })
export class ContextmenuComponent {
  constructor() {
    pdfDefaultOptions.enableScripting = false;
  }
}
```
