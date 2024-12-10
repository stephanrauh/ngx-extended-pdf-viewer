The PDF viewer supports Content Security Policy (CSP) by default. However, if you don't need CSP, the PDF viewer can load the PDF file faster if you disable it. To be honest, at the moment the difference is only a single request, but if the idea carries fruit, maybe there's more to come.

## HTML

```html
<ngx-extended-pdf-viewer
    [src]="'./assets/pdfs/2404.00465v1.pdf'"
    [useInlineScripts]="false">
</ngx-extended-pdf-viewer>
```
