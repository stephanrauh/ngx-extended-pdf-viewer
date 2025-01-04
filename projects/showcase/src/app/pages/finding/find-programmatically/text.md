`ngx-extended-pdf-viewer` provides two APIs to programmatically find something.

**User Find Controller**

The first one is the user find controller, which is part of the UI. This one is reflected in the UI.

**API Find Controller**

The second one is the API find controller, also known as secondary find controller. The API find controller can be used by programmers, and it has the advantage that the user still can use the find functionality without interfering with the API find controller.

Both controllers are used via the `NgxExtendedPdfViewerService`. You can inject this service normally.

## Basic usage

The difference in code is very minimal. Besides setting a parameter there isn't any difference.

### TS 

#### Find via User Find Controller

```typescript
const searchText = 'some search text';
this.ngxExtendedPdfViewerService.find(searchtext, {
  useSecondaryFindcontroller: false
});
```

#### Find via API Find Controller

```typescript
const searchText = 'some search text';
this.ngxExtendedPdfViewerService.find(searchtext, {
  useSecondaryFindcontroller: true // <- Set this to true
});
```

### With all find options

```typescript
interface FindOptions {
  highlightAll?: boolean;
  matchCase?: boolean;
  wholeWords?: boolean;
  matchDiacritics?: boolean;
  dontScrollIntoView?: boolean;
  findMultiple?: boolean;
  regexp?: boolean;
  useSecondaryFindcontroller?: boolean;
}


const searchText = 'some search text';
this.ngxExtendedPdfViewerService.find(searchtext, {
  highlightAll: this.highlightAll,
  matchCase: this.matchCase,
  wholeWords: this.wholeWord,
  matchDiacritics: this.matchDiacritics,
  findMultiple: this.multiple,
  regexp: this.matchRegExp,
  dontScrollIntoView: this.dontScrollIntoView,
  useSecondaryFindcontroller: false
});
```

## Find Results

The event `(updateFindMatchesCount)` contains three attributes telling you about the search result:

- `matches` is an array of arrays of numbers. The first dimension is the page index. If there's a find result on a page, the inner array is a list of find positions. Basically, such a position the number of characters before the hit.
- `matchesLength` is a similar array of arrays of numbers. In a nutshell, it tells you how long your search term is.

You can get the text of each page by calling `ngxPdfViewerService.getPageAsText()`. If you want to find out which part of the DOM shows the find result, you need to catch the event `renderedtextlayerhighlights`.

### HTML

```html
<ngx-extended-pdf-viewer
  src="/assets/pdfs/Portugues-para-principiantes.pdf"
  (updateFindMatchesCount)="updateFindMatchesCount($event)"
  (updateFindState)="updateFindState($event)">
</ngx-extended-pdf-viewer>
```

### TypeScript

```typescript
updateFindMatchesCount(result: FindResultMatchesCount) {
  // ... your logic
}

updateFindState(result: FindState) {
  // ... your logic
}
```

This example shows how to access the `renderedtextlayerhighlights` event.

```typescript
this.PDFViewerApplication?.eventBus?.on('renderedtextlayerhighlights', (event: RenderedTextLayerHighlights) => {
  event.highlights.forEach((highlight) => {
    highlight.style.border = '2px solid black';
  });
});
```
