You can hide every button of the toolbar and every menu item of the secondary menu.

### HTML

```html
<ngx-extended-pdf-viewer
  [src]="'/assets/pdfs/pdf-sample.pdf'"
  [showToolbar]="true"
  [showSidebarButton]="false"
  [showFindButton]="true"
  [showPagingButtons]="false"
  [showDrawEditor]="false"
  [showStampEditor]="false"
  [showTextEditor]="false"
  [showZoomButtons]="false"
  [showPresentationModeButton]="false"
  [showOpenFileButton]="false"
  [showPrintButton]="false"
  [showDownloadButton]="true"
  [showSecondaryToolbarButton]="true"
  [showRotateButton]="undefined"
  [showRotateCwButton]="false"
  [showRotateCcwButton]="false"
  [showHandToolButton]="false"
  [showScrollingButtons]="false"
  [showSpreadButton]="false"
  [showPropertiesButton]="false">
</ngx-extended-pdf-viewer>
```
