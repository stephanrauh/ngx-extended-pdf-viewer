/* tslint:disable:max-line-length */
import { Settings } from 'angular2-smart-table';

export const attributesSettings: Settings = {
  columns: {
    attribute: {
      title: 'Attribute',
      type: 'text',
    },
    defaultValue: {
      title: 'Default Value',
      type: 'text',
    },
    description: {
      title: 'Description',
      type: 'html',
    },
    twoWayBinding: {
      title: 'Two-Way Binding',
      type: 'text',
    },
  },
  actions: false,
  hideSubHeader: false,
  pager: {
    display: false,
    perPage: 5000,
  },
};

export const attributes = [
  {
    attribute: 'activeSidebarView',
    defaultValue: '1 (thumbnails)',
    description:
      "Two-way-binding attribute determining the current sidebar view. The legal values are defined in the enum PdfSidebarView: 1 (thumbnails), 2 (outline), 3 (attachments), and 4 (layers). If you're only interested in the event, the event name is `(activeSidebarViewChange)`. Note if you pass a value that's not supported by the PDF document the attribute is ignored.",
    twoWayBinding: 'Yes',
  },
  {
    attribute: 'disableForms',
    defaultValue: 'false',
    description: 'Disable or enable an AcroForm or XFA form in the PDF file.',
  },
  {
    attribute: 'formData',
    defaultValue: 'undefined',
    description: 'Two-way binding between a hashmap in Angular and the content of an AcroForm or XFA form in the PDF file.',
    twoWayBinding: 'Yes',
  },
  {
    attribute: 'handTool',
    defaultValue: 'true',
    description:
      'Setting this flag to true, activates the "hand tool" to scroll the PDF file by dragging. Setting this to false activates the "text selection" tool. You can also use this flag as a two-way binding attribute. If you\'re only interested in the event, the event name is `(handToolChange)`. Deactivating this flag also activates the "text layer". This, in turn, enables marking text and highlighting search result.',
    twoWayBinding: 'Yes',
  },
  {
    attribute: 'page',
    defaultValue: 'undefined',
    description:
      'Two-way binding attribute to determine the page to display; more precisely: `[page]="25"` makes the PDF viewer show page 25 (at any time - even after load time); `[(page)]="attribute"` updates the attribute each time the user scrolls to another page. If you\'re only interested in the event, that\'s `(pageChange)`.',
    twoWayBinding: 'Yes',
  },
  {
    attribute: 'pageLabel',
    defaultValue: 'undefined',
    description:
      'Two-way binding attribute to determine the page to display; more precisely: `[pageLabel]="25"` makes the PDF viewer show the page the author called page "25". This may or may not be a numeric value. For instance, many books use roman numbers for the preface and arab numbers for the rest of the document. In this case, `[pageLabe]="iv"` usually refers to the same page as `[page]="4"`. `[(pageLabel)]="attribute"` updates the attribute each time the user scrolls to another page. If you\'re only interested in the event, that\'s `(pageLabelChange)`.',
    twoWayBinding: 'Yes',
  },
  {
    attribute: 'rotation',
    defaultValue: '0',
    description:
      '[rotation] allows you to rotate every page. Note that this attribute is not responsible to rotate individual pages - it always rotates the entire document. (rotationChange) notifies you when the user rotates the document. This attribute can be used as a two-way binding attribute, i.e. [(rotation)]="angle". Legal values are 0, 90, 180, and 270. Every other value is ignored.',
    twoWayBinding: 'Yes',
  },
  {
    attribute: 'sidebarVisible',
    defaultValue: 'undefined',
    description:
      "Two-way-binding attribute determining whether the sidebar is visible. If you're only interested in the event, the event name is `(sidebarVisibleChange)`.",
    twoWayBinding: 'Yes',
  },
  {
    attribute: 'spread',
    defaultValue: 'off',
    description:
      "Determines if you're seeing one page or two pages at once (like a paper book). `'off'` means there's only one page. `'odd'` is the traditional book-like view, with two pages side-by-side. `'even'` is similar, only the first page is displayed alone.",
    twoWayBinding: 'Yes',
  },
  {
    attribute: 'src',
    defaultValue: '',
    description:
      "If `[src]` is a string: defines the URL of the PDF file to display. `src` may also be a `Blob`, a `Uint8Array`, an `URL` or an `ArrayBuffer`. To a limited extend, `[(src)]` is also a two-way binding attribute. If the user opens another PDF file, the event (srcChange) is fired. There's a catch: for security reasons, most browsers don't display the correct filename. Most often than not, the path is `C:\\fakepath\\`. The (srcChange) event removes the fakepath bit of the path. The $event attribute is simply the filename. But don't rely on it: it's up to the browser to implement that feature.",
    twoWayBinding: 'Yes',
  },
  {
    attribute: 'zoom',
    defaultValue: 'undefined',
    description:
      '`[zoom]="undefined"` (default value): use the zoom level `"auto"`. If not `undefined`: Set the zoom level of the page, no matter which zoom level was previously configured. Legal values are `[zoom]="\'auto\'"`, `\'page-actual\'"`, `"\'page-fit\'"`, `"\'page-width\'"`, `"50%"`, or `50` (or any other numeric value). Numbers are always considered percentages; the trailing "%" character is optional. This attribute supports two-way binding. `[(zoom)]="zoomAttribute"` updates the variable `zoomAttribute` each time the user changes the zoom setting. This is useful to use the same zoom across multiple PDF viewer instances or PDF document. If you\'re only interested in the event, that\'s `(zoomChange)`, described in some more detail below.',
    twoWayBinding: 'Yes',
  },
  {
    attribute: 'acceptKeys',
    defaultValue: '(none)',
    description:
      'Accepts a comma-separated list of keys. For example, a legal value is `"[\'P\', \'N\']"`. Every key in the list is accepted, and every other key is ignored. In the example, the key "n" navigates to the next page but "k" does not.',
  },
  {
    attribute: 'authorization',
    defaultValue: 'undefined',
    description:
      'This attribute is designed to activate server-side authorization. If this attribute has a (string) value, the attribute `withCredentials` is set to true. If you\'re using Keycloak, you can pass the bearer token with this attribute. Note that you have to add the prefix "Bearer: " (with a capital B and a trailing space). To support other authorization servers, you can also set additional headers using the attribute `[httpHeaders]`. Sometimes you need to set the `withCredentials` attribute without setting the `authorization` header. If set, set `[authorization]="true"`.',
  },
  {
    attribute: 'backgroundColor',
    defaultValue: '#e8e8eb',
    description: 'Background color of the PDF viewer. This setting affects the free area to the right and to the left hand side of the PDF file.',
  },
  {
    attribute: 'base64Src',
    defaultValue: '',
    description: 'Accepts a PDF file as base64 encoded string',
  },
  {
    attribute: 'contextMenuAllowed',
    defaultValue: 'true',
    description: 'Should the context menu show when the right-hand side button is clicked?',
  },
  {
    attribute: 'customFindbarButtons',
    defaultValue: '(none)',
    description:
      'Allows you to customize the pop-up dialog that opens when you click the "find" button. See [https://pdfviewer.net/custom-toolbar](https://pdfviewer.net/custom-toolbar).',
  },
  {
    attribute: 'customFindbarInputArea',
    defaultValue: '(none)',
    description:
      'Allows you to customize the pop-up dialog that opens when you click the "find" button. See [https://pdfviewer.net/custom-toolbar](https://pdfviewer.net/custom-toolbar).',
  },
  {
    attribute: 'customFreeFloatingBar',
    defaultValue: '(none)',
    description:
      'Allows you to add a toolbar you can place anywhere on the PDF viewer. The original use case was to let the zoom controls hover as a separate window at the bottom of the PDF file. See [https://pdfviewer.net/custom-toolbar](https://pdfviewer.net/custom-toolbar).',
  },
  {
    attribute: 'customSecondaryToolbar',
    defaultValue: '(none)',
    description: 'Allows you to replace the kebab menu on the right-hand side with your custom menu.',
  },
  {
    attribute: 'customSidebar',
    defaultValue: '(none)',
    description:
      'Allows you to replace the entire toolbar with your own custom toolbar. See [https://pdfviewer.net/custom-sidebar](https://pdfviewer.net/custom-sidebar).',
  },
  {
    attribute: 'customThumbnail',
    defaultValue: '(none)',
    description:
      'Allows you to implement custom thumbnails in the sidebar. See [https://pdfviewer.net/custom-thumbnails](https://pdfviewer.net/custom-thumbnails).',
  },
  {
    attribute: 'customToolbar',
    defaultValue: '(none)',
    description:
      'Allows you to replace the entire toolbar with your own custom toolbar. See [https://pdfviewer.net/custom-toolbar](https://pdfviewer.net/custom-toolbar).',
  },
  {
    attribute: 'enableDragAndDrop',
    defaultValue: 'true',
    description: 'Setting this attribute to false disables dragging and dropping a PDF file to the PDF viewer.',
  },
  {
    attribute: 'enablePrint',
    defaultValue: 'true',
    description: 'Setting this flag to false disables printing the PDF file.',
  },
  {
    attribute: 'enablePrintAutoRotate',
    defaultValue: 'true',
    description:
      'By default, the viewer rotates landscape pages in documents that have both portrait and landscape pages. Setting this flag to false deactivates the rotation. As a side effect, landscape pages are printed a bit smaller.',
  },
  {
    attribute: 'filenameForDownload',
    defaultValue: 'document.pdf',
    description: 'Allows the user to define the name of the file after clicking "download"',
  },
  {
    attribute: 'forceUsingLegacyES5',
    defaultValue: 'false',
    description:
      "Forces ngx-extended-pdf-viewer to run the ES2015 version of pdf.js. USe this only in case of an emergency, because the browser detection of ngx-extended-pdf-viewer is fairly sophisticated and the ES2015 comes at a performance penalty. Note that this attribute has gone lost when developing version 21, but more likely than not, I'm going to bring it back soon.",
  },
  {
    attribute: 'height',
    defaultValue: '(see description)',
    description:
      "Define the height of the PDF window. By default, it's 100%. Unfortunately, on most web pages, 100% translates to a height of 0 pixels. In this case, the height is set to fill all the available space. More precisely, the all the space to the bottom of the window. If that's less then 100 pixels, the height is set to 100 pixels. Note that this is just an initial setting. It doesn't change when the window is resized. You can also use `[height]=\"auto\"` to use all the available screen estate.",
  },
  {
    attribute: 'httpHeaders',
    defaultValue: '(none)',
    description: 'If you pass a JSON object to `httpHeaders`, the content of the JSON object is sent to the server as an array of additional httpHeaders.',
  },
  {
    attribute: 'ignoreKeyboard',
    defaultValue: 'false',
    description: 'If this flag is set to true, the PDF viewer ignores every keyboard event.',
  },
  {
    attribute: 'ignoreKeys',
    defaultValue: '(none)',
    description:
      'Accepts a comma-separated list of keys. For example, a legal value is `"[\'P\', \'N\']"`. Every key in the list is ignored. In the example, the key "k" navigates to the next page but "n" does not.',
  },
  {
    attribute: 'logLevel',
    defaultValue: '1',
    description:
      'Log level. Legal values: VerbosityLevel.ERRORS (=0),VerbosityLevel.WARNINGS (=1), and VerbosityLevel.INFOS (=5). The higher the log level, the more is logged. Please note that the log level is only updated when a new PDF document is loaded programmatically (i.e. when `[src]`changes).',
  },
  {
    attribute: 'minHeight',
    defaultValue: 'undefined',
    description:
      "Most of the time, ngx-extended-pdf-viewer chooses a reasonable height. If it doesn't, use the attribute `[height]`. But sometimes this isn't enough. If you want to define a mandatory lower limit of the heigt, use `[minHeight]`. Don't forget to add the unit (i.e. px, vh, %, pt, etc.)",
  },
  {
    attribute: 'mobileFriendlyZoom',
    defaultValue: '100%',
    description:
      "Increases the size of the UI elements so you can use them on small mobile devices. Must be a percentage (`'150%'`) or a floating-point number (`'1.5'`). Alternatively you can set this attribute to `'true'` (= `'150%'`) or `'false'` (= `'100%'`).",
  },
  {
    attribute: 'nameddest',
    defaultValue: 'undefined',
    description:
      'Allows you to jump to a "named destination" inside the document. Typical examples of names destinations are "chapter_7" oder "image_3". The named destination are defined within the PDF document; you can only jump to destinations defined by the author of the PDF file.',
  },
  {
    attribute: 'password',
    defaultValue: 'undefined',
    description:
      'Allows you to pass a password programatically. If you pass the wrong password, a red error message claiming "corrupt pdf file" is show in below the toolbar. Caveat: the password must be a string. During my test I accidentially used a numerical value. This fails even if the password consists only of digits. Please note that the password is stored in the main memory without encryption. If you\'re really serious about protecting your user\'s data from hackers, this might be a security issue. Please note that the log level is only updated when a new PDF document is loaded programmatically (i.e. when `[src]`changes).',
  },
  {
    attribute: 'pdfBackgroundColor',
    defaultValue: 'white',
    description:
      "By default, the PDF file is rendered on a white canvas. You can use `[pdfBackgroundColor]` to assign a different color to the background canvas. This includes the alpha channel. In other words, you can render the PDF file on a transparent background, allowing a custom background to shine through. However, as of version 10.5.0-alpha.0, using a transparent or partially transparent background doesn't work reliably (yet).",
  },
  {
    attribute: 'printResolution',
    defaultValue: '150',
    description:
      'Set the print resolution in DPI. Sensible values are 300, 600, and maybe even 900. Note that higher values result in more memory consumption, more CPU uses, and may even cause browser crashes. During my tests setting the resolution to 1100 dpi worked, but 1150 failed. In my case, the browser seemed to ignore the print request without displaying any error message.',
  },
  {
    attribute: 'scrollMode',
    defaultValue: '0',
    description:
      'Determines whether the pages scroll vertically (`[scrollMode]="0"`) or horizontally like a script role (`[scrollMode]="1"`). The third option is the block mode (`[scrollMode]="2"`), which also scrolls vertically, but arranges as many pages as the screen width allows side-by-side. Starting with pdf.js, there\'s also `[scrollMode]="3"`, which is a single-page mode. It\'s a good choice for documents containing more than a few thousand pages (because of performance reasons).',
  },
  {
    attribute: 'showBorders',
    defaultValue: 'true',
    description:
      'By default, the PDF file is displayed with page borders. You hide them by setting `[showBorders]="false"`. Note that the page borders can be switched off and on even after the PDF file is diplayed, but if you\'re using one of the zoom presets (`auto`, `page-width` etc.), the page isn\'t resized correctly.',
  },
  {
    attribute: 'showDownloadButton',
    defaultValue: "'hiddenSmallView'",
    description: 'Show or hide the "download" button (aka "save" button)',
  },
  {
    attribute: 'showFindButton',
    defaultValue: "'always-visible'",
    description: 'Show or hide the "find" button. Note that the button is only shown if the document supports a text layer.',
  },
  {
    attribute: 'showHandToolButton',
    defaultValue: 'false',
    description:
      'Show or hide the "hand tool" menu item in the secondary toolbar. (The hand tool allows you to move the page by clicking and dragging). This activates also the opposite menu item: "text selection tool". As a side effect, the hand tool also activates the "text layer". This, in turn, enables marking text and highlighting search result. Setting this attribute to true is equivalent to setting it to \'\'hiddenXXLView\';',
  },
  {
    attribute: 'showOpenFileButton',
    defaultValue: "'hiddenMediumView'",
    description: 'Show or hide the "open file" button',
  },
  {
    attribute: 'showPagingButtons',
    defaultValue: "'hiddenTinyView'",
    description:
      "Show or hide the buttons to navigate between pages and the input field to navigate to a particular input field. The default value of the page number input field is 'hiddenXXSView'.",
  },
  {
    attribute: 'showPreviousAndNextPageButtons',
    defaultValue: "'xxs'",
    description:
      "Show or hide the buttons to navigate between pages and the input field to navigate to a particular input field. The default value of the page number input field is 'hiddenXXSView'.",
  },
  {
    attribute: 'showFirstAndLastPageButtons',
    defaultValue: "'sm'",
    description:
      "Show or hide the buttons to navigate between pages and the input field to navigate to a particular input field. The default value of the page number input field is 'hiddenXXSView'.",
  },
  {
    attribute: 'showPageNumber',
    defaultValue: "'xs'",
    description:
      "Show or hide the buttons to navigate between pages and the input field to navigate to a particular input field. The default value of the page number input field is 'hiddenXXSView'.",
  },
  {
    attribute: 'showPageLabel',
    defaultValue: "'lg'",
    description:
      "Show or hide the buttons to navigate between pages and the input field to navigate to a particular input field. The default value of the page number input field is 'hiddenXXSView'.",
  },
  {
    attribute: 'showPresentationModeButton',
    defaultValue: 'false',
    description: 'Show or hide the "full screen" button. Setting this attribute to true is equivalent to setting it to \'hiddenLargeView\'.',
  },
  {
    attribute: 'showPrintButton',
    defaultValue: "'hiddenSmallView'",
    description: 'Show or hide the "print" button',
  },
  {
    attribute: 'showRotateButton',
    defaultValue: "'hiddenXLView'",
    description: 'Show or hide the "rotate" menu items. This is a convenience attribute covering both `[showRotateCwButton]` and `[showRotateCcwButton]`',
  },
  {
    attribute: 'showRotateCwButton',
    defaultValue: "'hiddenXLView'",
    description: 'Show or hide the "rotate clockwise" menu item',
  },
  {
    attribute: 'showRotateCcwButton',
    defaultValue: "'hiddenXLView'",
    description: 'Show or hide the "rotate counter-clockwise" menu item',
  },
  {
    attribute: 'showScrollingButtons',
    defaultValue: 'n/a',
    description:
      'removed with version 18.0.0. Use `[showBookModeButton]`, `[showSinglePageModeButton]`, `[showVerticalScrollButton]`,`[showHorizontalScrollButton]`, and `[showInfiniteScrollButton]` instead.',
  },
  {
    attribute: 'showSecondaryToolbarButton',
    defaultValue: 'true',
    description: 'Show or hide the secondary toolbar (the menu hiding behind the arrows at the right-hand side)',
  },
  {
    attribute: 'showSidebarButton',
    defaultValue: 'true',
    description: 'Show or hide the button to toggle the sidebar',
  },
  {
    attribute: 'showSpreadButton',
    defaultValue: 'true',
    description: 'Show or hide the "spread" menu items in the secondary toolbar. Also see the attribute `[(spread)]` below.',
  },
  {
    attribute: 'showToolbar',
    defaultValue: 'true',
    description: 'Show or hide the toolbar',
  },
  {
    attribute: 'showUnverifiedSignatures',
    defaultValue: 'false',
    description:
      'The base library, pdf.js, does not show signatures for a good reason. Signatures can\'t be verified (yet), so there\'s always the danger so show faked signatures, leading the readers to wrong conclusion. So proceed with care. If you insist, ngx-extended-pdf-viewer allows you to display signatures by setting `[showUnverifiedSignatures]="true"`. Note that you also have to disable form support. Also note that ngx-extended-pdf-viewer adds a hint making the reader aware of the potentially falsy signature.',
  },
  {
    attribute: 'showZoomButtons',
    defaultValue: "'always-visible'",
    description: 'Show or hide the "zoom" area (containing of the buttons "+" and "-" and the dropdown menu)',
  },
  {
    attribute: 'showZoomDropdown',
    defaultValue: "'xs'",
    description: 'Show or hide the "zoom" dropdown menu',
  },
  {
    attribute: 'startTabindex',
    defaultValue: 'undefined',
    description:
      'By default, the PDF viewer leaves it to the browser to determine the correct tab index. You can set the tab indexes explicitly by setting `[startTabindex]="100"`. Note that there are roughly 40, 50 buttons and menu items. It\'s a good idea to reserve a range of - say - 100 indexes for the PDF viewer.',
  },
  {
    attribute: 'theme',
    defaultValue: "'light'",
    description:
      "The PDF viewer ships with a light theme and a dark theme. The third option is 'custom'. In this case you're responsible for defining the colors and CSS rules.",
  },
  {
    attribute: 'zoomLevels',
    defaultValue: 'undefined',
    description:
      "This attribute allows you to use custom zoom levels. It's an array of strings and numbers. The default value is `['auto', 'page-actual', 'page-fit', 'page-width', 0.5, 1, 1.25, 1.5, 2, 3, 4]`",
  },
  {
    attribute: 'useInlineScripts',
    defaultValue: 'true',
    description:
      "If this flag is set to true, the PDF viewer loads fewer JavaScript files from the server. Unfortunately, this breaks compatibility to the Content Security Policy (CSP). If you're using CSP, set this attribute to `false`. If you're declaring CSP in a meta tag, the viewer sets the flag automatically to false.",
  },
  {
    attribute: 'delayFirstView',
    defaultValue: '0',
    description:
      "Number of milliseconds to wait between initializing the PDF viewer and loading the PDF file. Most users can let this parameter safely at it's default value of zero. Set this to 1000 or higher if you run into timing problems (typically caused by loading the locale files after the PDF files, so they are not available when the PDF viewer is initialized).",
  },
  {
    attribute: 'imageResourcesPath',
    defaultValue: './assets/images',
    description: "Allows you to put the viewer's SVG files into an arbitrary folder.",
  },
  {
    attribute: 'language',
    defaultValue: 'undefined',
    description: 'Language of the UI. Must the the complete locale name, such as "es-ES" or "es-AR". It may be all lowercase.',
  },
  {
    attribute: 'listenToURL',
    defaultValue: 'false',
    description:
      'Deactivates the URL listener of the PDF viewer. You can set it to "true" to allow for anchor tags like "#page=23" or "#nameddest=chapter_3". Only activate this flag if you don\'t use the anchor to encode the URLs for the router.',
  },
  {
    attribute: 'localeFolderPath',
    defaultValue: './assets/locale',
    description: 'Allows you to put the locale folder into an arbitrary folder.',
  },
  {
    attribute: 'maxZoom',
    defaultValue: '10',
    description: 'Maximum zoom factor you can achieve by pinching or by hitting the "+" button or the "+" key.',
  },
  {
    attribute: 'minifiedJSLibraries',
    defaultValue: 'true',
    description:
      "Since version 4.0.0, ngx-extended-pdf-viewer loads the minified pdf.js libraries by default. You can set this flag to load the human-readable files. However, in most cases this shouldn't be necessary due to the source map files. Using the human-readable files give you a performance penalty.",
  },
  {
    attribute: 'minZoom',
    defaultValue: '0.1',
    description: 'Minimum zoom factor you can achieve by pinching or by hitting the "-" button or the "+" key.',
  },
  {
    attribute: 'pageViewMode',
    defaultValue: 'multiple',
    description:
      '`pageViewMode="multiple"` is the default PDF viewer. It shows the entire PDF files as a long roll of pages, just as Acrobat reader does. `pageViewMode="infinite-scroll"` displays the entire PDF file without scrollbar. `pageViewMode="single"` only displays one page at a time. You can\'t scroll to the next page. The only way to navigate to another page is to click on the "next page/previous page" button, enter a page number, jump to the next result of a search, and to click on an entry of the table of contents. Starting with version 17.3.0, this attribute is a two-way binding attribute.',
    twoWayBinding: 'Yes',
  },
  {
    attribute: 'textLayer',
    defaultValue: 'undefined',
    description:
      'Allows you to activate or deactivate the text layer. If this flag is set to false, both the "find" button and the "select tool" are hidden. If you don\'t set this flag explicitely, it\'s automatically set by `[handTool]` and `[showHandToolButton]`. The text layer is shown by default if and only if `[handTool]="false"` or `[showHandToolButton]="true"`. As a rule of thumb, you always want to activate the text layer unless you run into performance problems.',
  },
  {
    attribute: 'findbarVisible',
    defaultValue: 'false',
    description: 'This attribute allows you to show the findbar programmatically. Used as an event, it tells you when the user opens or closes the findbar.',
    twoWayBinding: 'Yes',
  },
  {
    attribute: 'propertiesDialogVisible',
    defaultValue: 'false',
    description:
      'This attribute allows you to show the document properties dialog programmatically. Used as an event, it tells you when the user opens or closes the document properties dialog.',
    twoWayBinding: 'Yes',
  },
  {
    attribute: 'showTextEditor',
    defaultValue: "'hiddenTinyView'",
    description: 'This attribute allows you to hide the text editor button.',
  },
  {
    attribute: 'showStampEditor',
    defaultValue: "'hiddenTinyView'",
    description: 'This attribute allows you to hide the button that allows you to add an image to the PDF file.',
  },
  {
    attribute: 'showDrawEditor',
    defaultValue: "'hiddenTinyView'",
    description: 'This attribute allows you to hide the drawing editor button.',
  },
  {
    attribute: 'showHighlightEditor',
    defaultValue: "'hiddenTinyView'",
    description: 'This attribute allows you to hide the highlight editor button.',
  },

  {
    attribute: 'showPropertiesButton',
    defaultValue: "'always-in-secondary-menu'",
    description: 'Show or hide the "document properties" button',
  },
  {
    attribute: 'showSpreadButton',
    defaultValue: "'always-in-secondary-menu'",
    description: 'Show or hide the three spread-mode buttons',
  },
  {
    attribute: 'showSinglePageModeButton',
    defaultValue: "'always-in-secondary-menu'",
    description: 'Show or hide the "single page mode" button',
  },
  {
    attribute: 'showVerticalScrollButton',
    defaultValue: "'always-in-secondary-menu'",
    description: 'Show or hide the "scroll vertically" button',
  },
  {
    attribute: 'showHorizontalScrollButton',
    defaultValue: "'always-in-secondary-menu'",
    description: 'Show or hide the "scroll horizontally" button',
  },
  {
    attribute: 'showWrappedScrollButton',
    defaultValue: "'always-in-secondary-menu'",
    description: 'Show or hide the "wrapped (or combined) scroll" button',
  },
  {
    attribute: 'showInfiniteScrollButton',
    defaultValue: "'always-in-secondary-menu'",
    description: 'Show or hide the "infinite scroll" button',
  },
  {
    attribute: 'showBookmodeButton',
    defaultValue: "'always-in-secondary-menu'",
    description: 'Show or hide the "book mode" button',
  },
  {
    attribute: 'showFindHighlightAll',
    defaultValue: 'true',
    description: 'Show or hide the "highlight all" checkbox in the find bar.',
  },
  {
    attribute: 'showFindMatchCase',
    defaultValue: 'true',
    description: 'Show or hide the "case sensitive" checkbox in the find bar.',
  },
  {
    attribute: 'showFindMultiple',
    defaultValue: 'true',
    description: 'Show or hide the "multiple words" checkbox in the find bar.',
  },
  {
    attribute: 'showFindRegexp',
    defaultValue: 'false',
    description: 'Show or hide the "match regular expression" checkbox in the find bar.',
  },
  {
    attribute: 'showFindEntireWord',
    defaultValue: 'true',
    description: 'Show or hide the "match entire word" checkbox in the find bar.',
  },
  {
    attribute: 'showFindMatchDiacritics',
    defaultValue: 'true',
    description: 'Show or hide the "match diacritics" checkbox in the find bar.',
  },
];
