To display multiple PDF files on the same page, you need to put them in an iFrame.

In the long run, I plan to fix this, so you can put two instances of ngx-extended-pdf-viewer side-by-side without using an iFrame. Unfortunately, this requires a lot of changes to the library, so it'll take a while. The good news is the base library, pdf.js, already allows it.

The work-around looks like so:

<ul>
<li>You define an URL in the router that shows the PDF viewer (and nothing else). In the example below, the URL renders the <code>iFrameComponent</code>.</li>
<li>Instead of adding the instances of <code><ngx-extended-pdf-viewer></code> to your HTML template, add an iFrame pointing to this special URL.</li>
</ul>

## IFrame Component

### HTML

```html
<ngx-extended-pdf-viewer [src]="url" [zoom]="'auto'"> </ngx-extended-pdf-viewer>
```

### TypeScript

```typescript
@Component({
  standalone: false,
  selector: 'app-iframe',
  templateUrl: './iframe.component.html',
  styleUrls: ['./iframe.component.css'],
})
export class IFrameComponent {
  public url: string;
  constructor() {
    if (location.pathname.endsWith('cdk')) {
      this.url = '/assets/pdfs/CDK.pdf';
    } else {
      this.url = '/assets/pdfs/GraalVM.pdf';
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
