The attribute `[namedDest]` allows you to navigate to a "named destination" of the PDF file.

## HTML

```html
<ngx-extended-pdf-viewer
  [src]="'./assets/pdfs/latex.pdf'"
  [(page)]="page"
  [nameddest]="namedDest"
  [height]="'auto'"
>
</ngx-extended-pdf-viewer>
```

## TypeScript

```typescript
@Component({
standalone: false,  ... })
export class NavigationComponent {
  public _namedDest: string | undefined;
  public page: number | undefined;

  public get namedDest() {
    return this._namedDest;
  }

  public set namedDest(dest: string | undefined) {
    // reset the attribute to force change detection:
    this._namedDest = undefined;
    setTimeout(() => (this._namedDest = dest));
  }
}
```
