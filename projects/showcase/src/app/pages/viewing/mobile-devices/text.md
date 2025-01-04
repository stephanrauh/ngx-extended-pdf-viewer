On mobile devices, like a tiny smartphone, all the buttons are pushed to the secondary menu. That's most inconvenient, so chances are you want to put a small selection of buttons into the toolbar. The recommended way to do so is to define a custom toolbar.

However, you can also use CSS rules to do the trick. Don't forget to set `ignoreResponsiveCSS="true"`. Otherwise, your CSS rules will be overwritten by JavaScript.

**Caveat**: the selector `::ng-deep` is deprecated and will be removed soon. As far as I know, the only replacement is putting the CSS rules into the global styles.css file. Also note that the `!important` bit is important. You can't avoid it because the CSS class .hidden already bears the `!important` tag.

## CSS

```css
/* deep/ /is deprecated, so move this to the global styles.css if possible! */
::ng-deep button#printButton,
::ng-deep button#printButton * {
  display: block !important;
}

::ng-deep button#download,
::ng-deep button#download * {
  display: block !important;
}

::ng-deep #toolbarViewerMiddle {
  display: none;
}
```
## HTML

```html
<ngx-extended-pdf-viewer
  [src]="'/assets/pdfs/A COOL KID LIKE ME.pdf.pdf'"
  [height]="'667px'"
  backgroundColor="#ffffff"
  [mobileFriendlyZoom]="'150%'"
  [showSecondaryToolbarButton]="false"
>
</ngx-extended-pdf-viewer>
```

## TypeScript

```typescript
@Component({
standalone: false,  ... })
export class MobileComponent {
  public mobileFriendlyZoomSetting = '150%';
}
```
