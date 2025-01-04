To open a password-protected file, you can either have the user type the password or you can pass the password programmatically.

## HTML

```html
 <ngx-extended-pdf-viewer
    [src]="src"
    [password]="password"    
    [height]="'auto'"
  >
  </ngx-extended-pdf-viewer>
```

## TypeScript

```typescript
@Component({
  standalone: false, 
  selector: 'app-passwords',
  templateUrl: './passwords.component.html',
  styleUrls: ['./passwords.component.css']
})
export class PasswordsComponent { 
  public password = "graalvm-rocks!";
}
```

## Custom Dialog

You can also implement a custom password dialog and register it as a `pdfDefaultOption`. The dialog has to be an object implementing the interface `PasswordPrompt`. The demo implements a very simple custom password prompt: it simply uses the `confirm()` function.

### TypeScript

```typescript
import { PasswordPrompt } from "ngx-extended-pdf-viewer";

export class CustomPasswordPrompt implements PasswordPrompt {

  private updateCallback!: (password: string) => void;

  public open(): void {
    if (confirm("Come on, GraalVM does not suck!")) {
      this.updateCallback("graalvm-rocks!");
    }
  }

  setUpdateCallback(updateCallback: (password: string) => void, reason: 1 | 2) {
    this.updateCallback = updateCallback;
  }
}
```
