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

## Internet Explorer 11 (and old versions of the "evergreen browsers")
`ngx-extended-pdf-viewer` is compatible to Internet Explorer 11:

- add `pdf-es5.js`, `pdf-worker*.js`, and `viewer-es5.js` to the `scripts` section of the `angular.json` (instead of the smaller default files `pdf.js`, `pdf-worker.js`, and `viewer.js`). As for the `pdf-worker*.js` bit: it adds both the ES2015 version and the ES5 version of the service worker. That's a small performance boost on modern browsers, while still being compatible to IE11.
- Don't forget to activate your polyfills. Or - even better - use the clever approach of the Angular CLI 7.3+ to import the polyfills automatically if and only if they are needed (see [my article on Angular 7.3 polyfills)](https://beyondjava.net/what-happened-to-the-polyfills). Otherwise, you'll end up with an error message like this:

```
SCRIPT438: Object doesn't support property or method `fill`
```

## There shall be only one viewer - or: beware of timing problems!
The PDF viewer is very prone to timing problems:

- Hiding and re-displaying a PDF quickly (or vice versa) results in errors. This is because the bulk of `pdf.js` works asynchronously. It takes some time to initialize the widget. If it's destroyed while still being initialized, you run into problems. The same happens if it's initialized while an earlier instance is still being destroyed.
- Putting PDFs in tab frequently causes this problem. Switching between tabs often means that the content of one of the tabs is hidden. At the same time, the content of the new tab is shown. I've observed this when using @angular/material. The solution is to hide the first tab and to show the new tab after a timeout, as demonstrated in [the demo project](https://github.com/stephanrauh/ngx-extended-pdf-viewer/tree/master/src/app).

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
  styleUrls: ['./app.component.css']
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
| "TypeError: Cannot read property 'setPagesCount' of null"               |                                                                                                                                                         The language files couldn't be loaded. If you're following the default approach, `useBrowserLocale="true"`. In any case, check whether the language files are part of your project and if they are loaded from the correct path. Note that there's no default translation. You have to load a language file for any language, including English. In rare cases the language files are loaded, just not in time. In this case increase the value of `delayFirstView`.                                                                                                                                                         |
| sticky toolbar (when scrolling, the PDF file appears above the toolbar) |                                                                                                                                                                                                                            This happens if you're using the `z-index` to position the `<ngx-extended-pdf-viewer>`. If you can't avoid to do so, add the global CSS rule `.body .toolbar { z-index: 0; }`. The PDF viewer works without the `z-index` of the toolbar. The only difference is that the shadow of the toolbar is hidden by the PDF document.                                                                                                                                                                                                                            |
| Print also includes UI elements                                         |                                                                                                                                                                                                                      Usually, the entire screen is hidden automatically, but sometimes this fails, especially with widgets that are dynamically added, such as error messages, progress bars, and block UI overlays. Use media queries to hide the unwanted UI elements. For example, use something like `@media print { #modal-error-dialog: display none; }`.                                                                                                                                                                                                                      |
| Printing prints empty or truncated pages                                | The print algorithm often conflicts with your CSS framework. That's because the print algorithm simply generates images of each page, adds them to the document, hides everything else, and prints what's left. Basically, that's simply a list of `<div>` tags containing images. If you CSS framework influences the `<div>` or `<image>`, you end up with empty or truncated pages. ngx-extended-pdf-viewer covers several popular CSS frameworks (such as BootsFaces and Material Design), but it's still possible there's a conflict I haven't seen yet. If so, checking the `display` and `overflow` properties is a good starting point. Often adding this CSS snippet solves the problem: `@media print { #printContainer > div { display: inline; overflow-y: visible; } }` |

