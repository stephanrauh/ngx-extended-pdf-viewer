## Known bugs

Mozilla's PDF viewer suffers from several memory leaks. Currently, ngx-extended-pdf-viewer inherits these leaks (or I didn't find out yet how to remove the viewer from memory properly). If you know how to solve the bug, please leave a message at [the corresponding issue on GitHub](https://github.com/stephanrauh/ngx-extended-pdf-viewer/issues/12). Any help is appreciated!

There's also a layout glitch that seems to be intentional: you may need to set the font size of the input field containing the page number explicitly. By default, it's a lot larger than the rest of the text of the toolbar in some applications.

## Unknown bugs

If you run into problems using `&lt;ngx-extended-pdf-viewer&gt;`, please open an issue on the [project bug tracker](https://github.com/stephanrauh/ngx-extended-pdf-viewer/issues).

## Compatibility to Bootstrap (and other CSS frameworks)

Bootstrap interferes with the printing algorithm of `pdf.js`. Guard it with a media query to avoid unwanted effects, such as scaling the print to 65%. For example, if you're using SCSS and Bootstrap 4, remove the import of Bootstrap.min.css from the Angular.json file. Instead, import it by including Bootstrap by adding this line to the global `styles.scss` file:

```css
@media screen {
  @import '../node_modules/bootstrap/scss/bootstrap';
}
```

Caveat: this trick only works with the SCSS version of both `styles.scss` and `bootstrap.scss`. It doesn't work with simple CSS.

## Empty pages when printing (and printing bugs in general)

Problems with printing are almost always problems of your CSS code. That doesn't necessarily mean you've done anything wrong.
Most people run into this kind of trouble when using a CSS framework that hasn't been written with ngx-extended-pdf-viewer in mind.
That, in turn, is probably true for every CSS framework out there. The core library assumes there's no CSS framework at all.
It's the PDF viewer of Firefox, so that's a reasonable assumption.

If you find empty pages in your print, often adding these CSS rules to your global `styles.scss` helps:

```css
@media print {
  #printContainer > .printedPage {
    width: 99%;
  }
}
```

You can debug print issues yourself. I've written detailed instructions here: <a href="https://github.com/stephanrauh/ngx-extended-pdf-viewer/issues/1431#issuecomment-1162091452">https://github.com/stephanrauh/ngx-extended-pdf-viewer/issues/1431#issuecomment-1162091452</a>. When starting the
debugging session, you'll probably want to compare the CSS rules of your project with the reference project. You can either use the Angular schmetics
to create a fresh project within a few minutes (see <a href="https://pdfviewer.net/extended-pdf-viewer/getting-started">https://pdfviewer.net/extended-pdf-viewer/getting-started</a>), or you can use the <a href="https://mozilla.github.io/pdf.js/web/viewer.html">showcase of Mozilla's project</a>.

## Internet Explorer 11 (and old versions of the "evergreen browsers")

`ngx-extended-pdf-viewer` is _not_ compatible to Internet Explorer 11. Older versions of the other browsers may have problems with the JavaScript code. If that happens, the PDF viewer detects this and switches to good old ES5.

## There shall be only one viewer - or: beware of timing problems!

The PDF viewer is very prone to timing problems:

- Hiding and re-displaying a PDF quickly (or vice versa) results in errors. This is because the bulk of `pdf.js` works asynchronously. It takes some time to initialize the widget. If it's destroyed while still being initialized, you run into problems. The same happens if it's initialized while an earlier instance is still being destroyed.
- Putting PDFs in tab frequently causes this problem. Switching between tabs often means that the content of one of the tabs is hidden. At the same time, the content of the new tab is shown. I've observed this when using @angular/material. The solution is to hide the first tab and to show the new tab after a timeout, as demonstrated in [the demo project](https://github.com/stephanrauh/ngx-extended-pdf-viewer/tree/main/src/app).

```html
<mat-tab-group (selectedTabChange)="activateTab($event.index)">
  <mat-tab label="BootsFAces Deep-Dive PDF">
    <ng-template matTabContent>
      <ngx-extended-pdf-viewer *ngIf="visible[0]" [src]="'assets/pdfs/BootsFaces_Deep_Dive_1.0.pdf'"> </ngx-extended-pdf-viewer>
    </ng-template>
  </mat-tab>
  <mat-tab label="Codpaste PDF">
    <ng-template matTabContent>
      <ngx-extended-pdf-viewer *ngIf="visible[1]" [src]="'assets/pdfs/codpaste-teachingpack.pdf'"> </ngx-extended-pdf-viewer>
    </ng-template>
  </mat-tab>
</mat-tab-group>
```

```typescript
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  public visible = { 0: true };

  public activateTab(tab: number): void {
    this.hideOtherPDFs();
    setTimeout(() => {
      this.visible[tab] = true;
    }, 100);
  }

  public hideOtherPDFs(): void {
    console.log('Hiding');
    this.visible[0] = false;
    this.visible[1] = false;
  }
}
```

## Memory footprint and lazy loading

Since version 1.9.0, the pdf.js files are loaded lazily by default. If you dont, the library adds a roughly 1500 KB to the bundle zip. Gzipping reduces this to roughly 500 KB.

## More troubleshooting

| Error message or description                                            |                                                                                                                                                                                                                                                                                                                                                                                       Solution                                                                                                                                                                                                                                                                                                                                                                                       |
| ----------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| sticky toolbar (when scrolling, the PDF file appears above the toolbar) |                                                                                                                                                                                                                            This happens if you're using the `z-index` to position the `<ngx-extended-pdf-viewer>`. If you can't avoid to do so, add the global CSS rule `.body .toolbar { z-index: 0; }`. The PDF viewer works without the `z-index` of the toolbar. The only difference is that the shadow of the toolbar is hidden by the PDF document.                                                                                                                                                                                                                            |
| Print also includes UI elements                                         |                                                                                                                                                                                                                      Usually, the entire screen is hidden automatically, but sometimes this fails, especially with widgets that are dynamically added, such as error messages, progress bars, and block UI overlays. Use media queries to hide the unwanted UI elements. For example, use something like `@media print { #modal-error-dialog: display none; }`.                                                                                                                                                                                                                      |
| Printing prints empty or truncated pages                                | The print algorithm often conflicts with your CSS framework. That's because the print algorithm simply generates images of each page, adds them to the document, hides everything else, and prints what's left. Basically, that's simply a list of `<div>` tags containing images. If you CSS framework influences the `<div>` or `<image>`, you end up with empty or truncated pages. ngx-extended-pdf-viewer covers several popular CSS frameworks (such as BootsFaces and Material Design), but it's still possible there's a conflict I haven't seen yet. If so, checking the `display` and `overflow` properties is a good starting point. Often adding this CSS snippet solves the problem: `@media print { #printContainer > div { display: inline; overflow-y: visible; } }` |
