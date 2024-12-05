To display multiple PDF files on the same page, you need to put them in an iFrame. This is because pdf.js pollutes the global namespace, and although the Mozilla team are working on it, that's something that's not easy to fix.

The work-around uses a common component, the IFrameComponent. The Angular router maps this component to a path, and the iFrame uses this path to display the PDF file.


## IFrame Component

### HTML

```html
<ngx-extended-pdf-viewer
  [src]="url"
  [zoom]="'auto'">
</ngx-extended-pdf-viewer>
```

### TypeScript

```typescript
@Component({
standalone: false, 
  selector: 'app-iframe',
  templateUrl: './iframe.component.html',
  styleUrls: ['./iframe.component.css']
})
export class IFrameComponent {
  public url: string;
  constructor() {
    if (location.pathname.endsWith("cdk")) {
        this.url="/assets/pdfs/CDK.pdf";
    } else {
      this.url="/assets/pdfs/GraalVM.pdf";
    }
  }
}
```

### Using the IFrame Component

```html
<div style="width: 100%">
  <iframe id="embedded" src="/extended-pdf-viewer/iframe/cdk" style="height: 100vh; width: 47%"></iframe>
  <iframe id="embedded" src="/extended-pdf-viewer/iframe/graalvm" style="height: 100vh; width: 47%; float: right"></iframe>
</div>
```
