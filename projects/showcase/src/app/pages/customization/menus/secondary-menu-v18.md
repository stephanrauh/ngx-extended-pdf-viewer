## Secondary menu (since version 18)

Since version 18, almost every button is able to move dynamically from the toolbar to the secondary menu. The idea is to move buttons from the toolbar to the secondary menu until the toolbar fits on the screen, so small displays can still show all buttons.

Every toolbar button has a `show<ButtonName>` attribute which defines the breakpoint of the button. If the screen is wider than the breakpoint, the button is displayed in the toolbar. Otherwise it's displayed in the secondary menu. There are also two special values: `always-visible` means the button is never moved to the secondary menu. Conversely, `always-in-secondary-menu` means the button always hides in the secondary menu.

There's an interactive live-demo at the [responsive design page](./responsive-design) of this showcase.

If you use the `<pdf-shy-button>` component to define your custom buttons they also benefit from responsive design. However, there's a catch: if you're using the `<pdf-shy-button>`, you can use the `action` attribute to define custom logic. Basically, the `action` attribute is treated like a fat arrow function - and that means it's inheriting the `this` reference from the `PdfShyButton` class. The constructor of your button component is never called, and neither is `ngOnInit`. Probably that sounds more confusing than it is, so don't worry - it's easy to implement custom "shy" buttons. Just keep in mind that this is not what you might expect.


### Adding custom buttons to the toolbar and/or the secondary menu

The `<pdf-shy-button>` allows you to benefit from seamless integration into the toolbar and the secondary menu. A typical shy button looks like so:

```html
<pdf-shy-button
  [cssClass]="'always-in-secondary-menu' | responsiveCSSClass"
  title="Infinite scroll"
  primaryToolbarId="infiniteScroll"
  l10nId="infinite_scroll"
  [toggled]="pageViewMode == 'infinite-scroll'"
  [action]="onClick"
  l10nLabel="pdfjs-infinite-scroll-button-label"
  [order]="3400"
  [closeOnClick]="false"
  image="<svg xmlns='http://www.w3.org/2000/svg' 
          height= '24' viewBox= '0 -960 960 960' 
          width='24'>
           <path d= '...'/>
         </svg>"
>
</pdf-shy-button>
```

The clumsy `[cssClass]` definition allows you to define the breakpoint using a shortcut. Legal values are `always-visible` , `always-in-secondary-menu` , `xxs` , `xs` , `sm` , `md` , `lg` , `xl` , and `xxl`. `xxl` means the button is only visible in the toolbar on very large screens, while `xxs` means it's visible on fairly small screens.

The two `l10n` attributes use the translation tables of pdf.js. They're useless for you unless you can use one of the pre-defined texts of the viewer.properties file. In most cases, `[title]` should to the trick just as well.

`[order]` determines where the button appears in the secondary menu. The default buttons use increments of 100, so you can insert 99 custom menu items between two default menu items. If the button shows in the toolbar, its position is determined by the position in the source code (plus CSS - in other words, it's exactly the behavior you'd expect).

The `[action]` attribute is a bit tricky. You can't use this in the event listener method because the event listener is used both for the toolbar (`this` is available here) and the secondary menu (`this` is undefined here). I'm sure I've selected a clumsy solution, but here's my current approach:

```typescript
export class PdfInfiniteScrollComponent implements OnDestroy {
  @Input() 
  public pageViewMode: PageViewModeType;

  @Output()
  public pageViewModeChange = new EventEmitter<PageViewModeType>();

  public onClick?: () => void;

  constructor() {
    const emitter = this.pageViewModeChange;
    this.onClick = () => {
      setTimeout(() => {
           emitter.emit('infinite-scroll');
      });
    };
  }

  public ngOnDestroy(): void {
    this.onClick = undefined;
  }
}
```

The key idea is to define the event listener in the constructor, where you can capture this in a constant.
