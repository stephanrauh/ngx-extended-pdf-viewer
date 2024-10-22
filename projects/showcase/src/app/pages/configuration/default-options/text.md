## Overriding Options

You can fine-tune the behavior of the PDF viewer by modifying the default options. Most options are very advanced or covered by regular attributes of `<ngx-extended-pdf-viewer />`, so use the options at your own risk.

### TypeScript

```typescript
import { pdfDefaultOptions } from 'ngx-extended-pdf-viewer';

@Component({ ... })
export class DefaultOptionsComponent {
  constructor() {
    pdfDefaultOptions.assetsFolder = 'bleeding-edge';
  }
}
```
