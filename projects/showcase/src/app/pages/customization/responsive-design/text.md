The PDF viewer uses responsive design to display nicely on devices of all sizes. On large screens, the toolbar shows many buttons. On smaller screens, some of these buttons are shifted to the secondary menu. A few actions are only available in the secondary menu: the scroll mode, the spread modes, and the document properties. In a future version, I might add toolbar icons for these icons, so the corresponding attributes are also called `showXXXButton`, ignoring the fact that currently, these actions are currently only available in the secondary menu.

I've breakpoints to the buttons to show as many buttons as possible on any screen. However, if you don't need every button, you've got more available screen estate. So you can override my choice of breakpoint by setting, for example, `showXXXButton="xs"`. `xs` means the button shows if the PDF viewer is at least 490 pixel wide. `sm` means the button is visible if the PDF viewer is at least 560 pixels wide, and so on until `xxl`, which hides buttons if the PDF viewer is less than 830 pixels wide.

Note that these width don't refer to the width of the screen. That's a difference to the definition of reponsive breakpoints in Tailwind, Bootstrap or Material Design. The PDF viewer frequently is smaller than the screen, so I went the extra mile to define breakpoints relative to the component width.

You can modify the breakpoints themselves if my default selection of 490, 560, 610, 660, 740, and 830 doesn't match your requirements. To do so, set the static attributes of the class `PdfBreakpoints`. You can experiment with these settings on the third tab of this demo.

The PDF viewer hides rarely used buttons on small screens, pushing them to the secondary menu. However, if you're showing only a subset of the buttons, the default are an ill match. So you can tweak this to fit your needs.
Setting `showXXXButton="xs"` means it's visible on very small screens, `showXXXButton="sm"` means it's shown on small but hidden on tiny screens, and so on.

## Custom Breakpoints 

You can fine-tune when a breakpoint triggers. You have to resize the window after modifying the numbers to see the effect. There's no automatic update.

## HTML

```html
<ngx-extended-pdf-viewer
  [src]="'/assets/pdfs/pdf-sample.pdf'"
  [height]="'auto'"
  [showSidebarButton]="showSidebarButton"
  [showFindButton]="showFindButton"
  [showPagingButtons]="showPagingButtons"
  [showZoomButtons]="showZoomButtons"
  [showPresentationModeButton]="showPresentationModeButton"
  [showOpenFileButton]="showOpenFileButton"
  [showPrintButton]="showPrintButton"
  [showDownloadButton]="showDownloadButton"
  [showSecondaryToolbarButton]="showSecondaryToolbarButton"
  [showRotateButton]="showRotateButton"
  [showHandToolButton]="showHandToolButton"
  [showScrollingButtons]="showScrollingButton"
  [showSpreadButton]="showSpreadButton"
  [showPropertiesButton]="showPropertiesButton"
  height="250px" zoom="25%">
</ngx-extended-pdf-viewer>
```

## TypeScript

```typescript
@Component({ ... })
export class CustomBreakpointsComponent {
  constructor() {
    // these are the default values
    PdfBreakpoints.xs = 490; // unit: pixels
    PdfBreakpoints.sm = 560;
    PdfBreakpoints.md = 610;
    PdfBreakpoints.lg = 660;
    PdfBreakpoints.xl = 740;
    PdfBreakpoints.xxl = 830;
  }
}
```
