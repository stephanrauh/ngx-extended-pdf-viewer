The PDF viewer can be controlled by the keyboard. If necessary, you can disable the key bindings, either globally or only certain keys.

- `[ignoreKeyboard]="true"`: disables the keyboard entirely
- `[ignoreKeys]` comma-separated list of keys. Every key in the list is ignored.
- `[acceptKeys]` comma-separated list of keys. Every key in the list is accepted, and every other key is ignored.

The keys are defined by their name and - optionally - their modifiers (`SHIFT`, `ALT`, `CTRL`, `CMD`, and `META`). CMD is used on Apple keyboards, while META is used on some UNIX keyboards.

Examples: `CTRL+SHIFT+P` is the key binding of the presentation mode. `F4` toggles the sidebar.

### HTML

```html
  <ngx-extended-pdf-viewer
    src="/assets/pdfs/hammond-organ-wikipedia.pdf"
    [ignoreKeyboard]="false"
    [ignoreKeys]="['J', 'K', 'F4']"
    [acceptKeys]="[]"
    [showPresentationModeButton]="true">
  </ngx-extended-pdf-viewer>
```

### TypeScript

```typescript
@Component({ ... })
export class KeyboardComponent implements OnInit {
  public ignoreKeyboard = false;
  public acceptKeys = ['J', 'K', 'F$'];
  public ignoreKeys = [];
}
```
