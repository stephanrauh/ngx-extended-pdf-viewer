`ngx-extended-pdf-viewer` allows you to define your own custom toolbar, menu, and it even allows you to create your own sidebar and your own thumbnails.

### HTML

```html
<ngx-extended-pdf-viewer
  #pdfViewer
  [customToolbar]="additionalButtons"
  [src]="'/assets/pdfs/dachstein.pdf'"
</ngx-extended-pdf-viewer>

<ng-template #additionalButtons>
  <div id="toolbarViewer" style="background-color:darkblue">
    <div id="toolbarViewerLeft">
      <pdf-toggle-sidebar></pdf-toggle-sidebar>
      <div class="toolbarButtonSpacer"></div>
      <pdf-paging-area></pdf-paging-area>
    </div>
    <pdf-zoom-toolbar ></pdf-zoom-toolbar> <!-- toolbar viewer middle -->
    <div id="toolbarViewerRight">
      <pdf-open-file></pdf-open-file>
      <pdf-presentation-mode></pdf-presentation-mode>
      <pdf-print></pdf-print>
      <app-open-in-new-tab></app-open-in-new-tab>
      <pdf-download></pdf-download>
      <div class="verticalToolbarSeparator hiddenSmallView"></div>
      <pdf-toggle-secondary-toolbar></pdf-toggle-secondary-toolbar>
    </div>
  </div>
</ng-template>
```
#### Additional Component

```html
<pdf-shy-button
  [cssClass]="'lg' | responsiveCSSClass"
  class="newTab"
  title="open PDF file in a new tab"
  primaryToolbarId="openInNewTab"
  l10nId="infinite_scroll"
  [toggled]="hasBeenClicked"
  [action]="onClick"
  [order]="1"
  [closeOnClick]="true"
  image="<svg xmlns='http://www.w3.org/2000/svg' height='24' viewBox='0 0 24 24' width='24'>
     <path fill='red' d='M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z'/>
    </svg>"
>
</pdf-shy-button>
```

### TypeScript

The PDF viewer doesn't restart reliably when you change the theme. So this demo hides the PDF viewer before changing the theme.

```typescript
@Component({
standalone: false,  ... })
export class CustomToolbarComponent {
  public _theme = 'findbar';

  public showPdfViewer = true;

  public set theme(theme: string) {
    if (this._theme !== theme) {
      this.showPdfViewer = false;
      this._theme = theme;
      setTimeout(() => this.showPdfViewer = true, 100);
    } else {
      this._theme = theme;
    }
  }

  public get theme(): string {
    return this._theme;
  }
}
```
