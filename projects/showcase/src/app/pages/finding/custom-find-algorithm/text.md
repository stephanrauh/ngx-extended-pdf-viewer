This is a very advanced usecase.

## Since Version 21.3.0

If you want to implement your own find algorithm, define a class implementing the find controller and pass it to the attribute `pdfDefaultOptions.findController` _before_ opening the PDF file.

To get started, copy the files `pdf_find_controller.js`, `ui_utils.js`, and `pdf_find_utils.js` from the source code of this showcase to your project and extend your own find controller from the class `PDFFindController`.

### HTML

```html
<ngx-extended-pdf-viewer
  src="/assets/pdfs/Portugues-para-principiantes-1538054164.pdf"
  [textLayer]="true"
  [showFindButton]="false"
  (updateFindMatchesCount)="onUpdateFindMatchesCount($event)"
  (pdfLoaded)="pdfLoaded()">
</ngx-extended-pdf-viewer>
```

### TypeScript

#### Component

```typescript
@Component({
standalone: false, ...})
export class CustomFindComponent {

  constructor() {
    pdfDefaultOptions.findController = MyCustomFindController;
  }
}
```

#### Custom Find Controller Class

````typescript
import { PDFFindController } from './pdf_find_controller';

export class MyCustomFindController extends PDFFindController {
  constructor({ linkService, eventBus, updateMatchesCountOnProgress = true, pageViewMode }: any) {
    super({ linkService, eventBus, updateMatchesCountOnProgress, pageViewMode });
    console.log('MyFindController constructor');
  }
}
````

## Before Version 21.3.0

Demonstration of customizing the find functionality. This works by overriding the default find functionality of the pdf.js viewer, adding support for regex search in this example. A more complete implementation would provide a custom find bar.

### HTML

```html
<ngx-extended-pdf-viewer
  src="/assets/pdfs/Portugues-para-principiantes-1538054164.pdf"
  [textLayer]="true"
  [showFindButton]="false"
  (updateFindMatchesCount)="onUpdateFindMatchesCount($event)"
  (pdfLoaded)="pdfLoaded()">
</ngx-extended-pdf-viewer>
```

### TypeScript

```typescript
interface CustomFindOptions extends FindOptions {
  matchRegex: boolean;
}

@Component({
standalone: false, ...})
export class CustomFindComponent {
  searchtext = '(?<=\\s)([A-z]+ough)';
  findOptions: CustomFindOptions = {
    highlightAll: true,
    matchCase: false,
    wholeWords: false,
    matchDiacritics: false,
    matchRegex: true
  };


  constructor(notificationService: PDFNotificationService) {
    effect(() => this.pdfViewerApplication = notificationService.onPDFJSInitSignal());
  }

  // Override the find feature to support regex after the PDF is loaded
  pdfLoaded() {
    this.overrideFindFeature();
  }

  // Optional: Restore the original find feature
  ngOnDestroy() {
    this.restoreFindFeature();
  }

  findRegex() {
    this.dispatchFind('find');
  }

  findNext(): void {
    this.dispatchFind('again', false);
  }

  findPrevious(): void {
    this.dispatchFind('again', true);
  }

  /**
   * Override the find feature to support regex
   */
  private overrideFindFeature() {
    const findController = this.pdfViewerApplication.findController as any;

    const originalConvertToRegExpString = findController._convertToRegExpString;
    findController._convertToRegExpString = (query: string, ...args: any[]) => {
      const { matchRegex } = findController.state;

      // If not matchRegex, call the original method
      if (!matchRegex) return originalConvertToRegExpString.call(findController, query, ...args);

      // If matchRegex, return the query as is
      return [false, query];
    };
  }

  // Need to use dispatch directly
  private dispatchFind(type: string, findPrevious = false): void {
    this.pdfViewerApplication.eventBus.dispatch('find', {
      ...this.findOptions,
      query: this.searchtext,
      type,
      findPrevious,
      source: undefined
    });
  }
}
```
