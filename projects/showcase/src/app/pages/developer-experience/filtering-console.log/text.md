You can override the default function `globalThis.ngxConsoleFilter(logLevel, message)` to filter the log messages.

The example below re-defines `ngxConsolefilter()` to grab the version number from the console messages and to store it in a variable so it can be shown here:

```text
PDF.js: 4.7.700 [7031e2aff] modified by ngx-extended-pdf-viewer 22.0.0
```

The original use-case of `ngxConsolefilter()` is suppressing messages you don't want to log. For example, many PDF documents cause the viewer to emit messages like `Warning: TT: undefined function: 32`. That's one of the messages you can almost always safely ignore, so it doesn't make sense to pump it into, say, an ELK stack or Splunk. If your custom implementation of `ngxConsolefilter()` returns `false` depending on the message text, the message is never logged.

**Breaking change**: Before version 17, you have to register the filter function with theWindow object instead of globalThis.

## TypeScript

````typescript
@Component({
standalone: false, 
  selector: 'app-filtering-console-log',
  templateUrl: './filtering-console-log.component.html',
  styleUrls: ['./filtering-console-log.component.css'],
})
export class FilteringConsoleLogComponent {
  version = '';

  constructor() {
    globalThis['ngxConsoleFilter'] = (level: string, message: any): boolean => {
      if (message.includes('running on')) {
        this.version = message;
        return false;
      }
      return true;
    }
  }
}
````
