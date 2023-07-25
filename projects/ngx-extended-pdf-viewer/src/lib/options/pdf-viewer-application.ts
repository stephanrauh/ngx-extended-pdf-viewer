import { OptionalContentConfig } from './optional_content_config';
import { PasswordPrompt } from './password-prompt';
import { AnnotationStorage, PrintAnnotationStorage } from './pdf-annotation-storage';
import { IEventBus } from './pdf-event-bus';
import { PageViewport } from './pdf-page-view-port';
import { IPDFViewer, PageViewModeType } from './pdf-viewer';
import { IPDFViewerAppConfig } from './pdf-viewer-app-config';

export interface IWebL10n {
  translate(element: HTMLElement | null): Promise<void>;
  get(key: string, args: any, fallbackString: string): string;
}

export interface ViewHistory {
  get(name: string, defaultValue?: string): Promise<string>;
}

/**
 * Page text content.
 */
export type TextContent = {
  /**
   * - Array of
   * {@link TextItem } and {@link TextMarkedContent } objects. TextMarkedContent
   * items are included when includeMarkedContent is true.
   */
  items: Array<TextItem | TextMarkedContent>;
};

export interface FindController {
  state: any;
  _pageMatches: Array<any>;
  _pageMatchesColor: Array<number>;
  _pageMatchesLength: Array<number>;
  pageViewMode: PageViewModeType;
}

export interface Metadata {
  getRaw(): any;
  get(name: any): any;
  getAll(): any;
  has(name: any): any;
}

export interface MessageHandler {
  sourceName: any;
  targetName: any;
  comObj: any;
  callbackId: number;
  streamId: number;
  streamSinks: any;
  streamControllers: any;
  callbackCapabilities: any;
  actionHandler: any;
  on(actionName: any, handler: any): void;
  /**
   * Sends a message to the comObj to invoke the action with the supplied data.
   * @param {string} actionName - Action to call.
   * @param {JSON} data - JSON data to send.
   * @param {Array} [transfers] - List of transfers/ArrayBuffers.
   */
  send(actionName: string, data: JSON, transfers: any[] | undefined): void;
  /**
   * Sends a message to the comObj to invoke the action with the supplied data.
   * Expects that the other side will callback with the response.
   * @param {string} actionName - Action to call.
   * @param {JSON} data - JSON data to send.
   * @param {Array} [transfers] - List of transfers/ArrayBuffers.
   * @returns {Promise} Promise to be resolved with response data.
   */
  sendWithPromise(actionName: string, data: JSON, transfers: any[] | undefined): Promise<any>;
  /**
   * Sends a message to the comObj to invoke the action with the supplied data.
   * Expect that the other side will callback to signal 'start_complete'.
   * @param {string} actionName - Action to call.
   * @param {JSON} data - JSON data to send.
   * @param {Object} queueingStrategy - Strategy to signal backpressure based on
   *                 internal queue.
   * @param {Array} [transfers] - List of transfers/ArrayBuffers.
   * @returns {ReadableStream} ReadableStream to read data in chunks.
   */
  sendWithStream(actionName: string, data: JSON, queueingStrategy: Object, transfers: any[] | undefined): ReadableStream;

  destroy(): void;
}

export interface PDFWorker {
  name: any;
  destroyed: boolean;
  verbosity: number;

  /**
   * Promise for worker initialization completion.
   * @type {Promise<void>}
   */
  get promise(): Promise<void>;
  /**
   * The current `workerPort`, when it exists.
   * @type {Worker}
   */
  get port(): Worker;
  /**
   * The current MessageHandler-instance.
   * @type {MessageHandler}
   */
  get messageHandler(): MessageHandler;
  _initializeFromPort(port: any): void;
  _initialize(): void;
  _setupFakeWorker(): void;
  /**
   * Destroys the worker instance.
   */
  destroy(): void;
}

/**
 * Document initialization / loading parameters object.
 */
export type DocumentInitParameters = {
  /**
   * - The URL of the PDF.
   */
  url: string | URL | undefined;
  /**
   * - Binary PDF data.
   * Use TypedArrays (Uint8Array) to improve the memory usage. If PDF data is
   * BASE64-encoded, use `atob()` to convert it to a binary string first.
   *
   * NOTE: If TypedArrays are used they will generally be transferred to the
   * worker-thread. This will help reduce main-thread memory usage, however
   * it will take ownership of the TypedArrays.
   */
  data: ArrayBuffer | ArrayBufferView | undefined;
  /**
   * - Basic authentication headers.
   */
  httpHeaders: Object | undefined;
  /**
   * - Indicates whether or not
   * cross-site Access-Control requests should be made using credentials such
   * as cookies or authorization headers. The default is `false`.
   */
  withCredentials: boolean | undefined;
  /**
   * - For decrypting password-protected PDFs.
   */
  password: string | undefined;
  /**
   * - The PDF file length. It's used for progress
   * reports and range requests operations.
   */
  length: number | undefined;
  /**
   * - Allows for using a custom range
   * transport implementation.
   */
  range: any | undefined;
  /**
   * - Specify maximum number of bytes fetched
   * per range request. The default value is {@link DEFAULT_RANGE_CHUNK_SIZE }.
   */
  rangeChunkSize: number | undefined;
  /**
   * - The worker that will be used for loading and
   * parsing the PDF data.
   */
  worker: PDFWorker | undefined;
  /**
   * - Controls the logging level; the constants
   * from {@link VerbosityLevel } should be used.
   */
  verbosity: number | undefined;
  /**
   * - The base URL of the document, used when
   * attempting to recover valid absolute URLs for annotations, and outline
   * items, that (incorrectly) only specify relative URLs.
   */
  docBaseUrl: string | undefined;
  /**
   * - The URL where the predefined Adobe CMaps are
   * located. Include the trailing slash.
   */
  cMapUrl: string | undefined;
  /**
   * - Specifies if the Adobe CMaps are binary
   * packed or not. The default value is `true`.
   */
  cMapPacked: boolean | undefined;
  /**
   * - The factory that will be used when
   * reading built-in CMap files. Providing a custom factory is useful for
   * environments without Fetch API or `XMLHttpRequest` support, such as
   * Node.js. The default value is {DOMCMapReaderFactory}.
   */
  CMapReaderFactory: Object | undefined;
  /**
   * - When `true`, fonts that aren't
   * embedded in the PDF document will fallback to a system font.
   * The default value is `true` in web environments and `false` in Node.js;
   * unless `disableFontFace === true` in which case this defaults to `false`
   * regardless of the environment (to prevent completely broken fonts).
   */
  useSystemFonts: boolean | undefined;
  /**
   * - The URL where the standard font
   * files are located. Include the trailing slash.
   */
  standardFontDataUrl: string | undefined;
  /**
   * - The factory that will be used
   * when reading the standard font files. Providing a custom factory is useful
   * for environments without Fetch API or `XMLHttpRequest` support, such as
   * Node.js. The default value is {DOMStandardFontDataFactory}.
   */
  StandardFontDataFactory: Object | undefined;
  /**
   * - Enable using the Fetch API in the
   * worker-thread when reading CMap and standard font files. When `true`,
   * the `CMapReaderFactory` and `StandardFontDataFactory` options are ignored.
   * The default value is `true` in web environments and `false` in Node.js.
   */
  useWorkerFetch: boolean | undefined;
  /**
   * - Reject certain promises, e.g.
   * `getOperatorList`, `getTextContent`, and `RenderTask`, when the associated
   * PDF data cannot be successfully parsed, instead of attempting to recover
   * whatever possible of the data. The default value is `false`.
   */
  stopAtErrors: boolean | undefined;
  /**
   * - The maximum allowed image size in total
   * pixels, i.e. width * height. Images above this value will not be rendered.
   * Use -1 for no limit, which is also the default value.
   */
  maxImageSize: number | undefined;
  /**
   * - Determines if we can evaluate strings
   * as JavaScript. Primarily used to improve performance of font rendering, and
   * when parsing PDF functions. The default value is `true`.
   */
  isEvalSupported: boolean | undefined;
  /**
   * - Determines if we can use
   * `OffscreenCanvas` in the worker. Primarily used to improve performance of
   * image conversion/rendering.
   * The default value is `true` in web environments and `false` in Node.js.
   */
  isOffscreenCanvasSupported: boolean | undefined;
  /**
   * - By default fonts are converted to
   * OpenType fonts and loaded via the Font Loading API or `@font-face` rules.
   * If disabled, fonts will be rendered using a built-in font renderer that
   * constructs the glyphs with primitive path commands.
   * The default value is `false` in web environments and `true` in Node.js.
   */
  disableFontFace: boolean | undefined;
  /**
   * - Include additional properties,
   * which are unused during rendering of PDF documents, when exporting the
   * parsed font data from the worker-thread. This may be useful for debugging
   * purposes (and backwards compatibility), but note that it will lead to
   * increased memory usage. The default value is `false`.
   */
  fontExtraProperties: boolean | undefined;
  /**
   * - Render Xfa forms if any.
   * The default value is `false`.
   */
  enableXfa: boolean | undefined;
  /**
   * - Specify an explicit document
   * context to create elements with and to load resources, such as fonts,
   * into. Defaults to the current document.
   */
  ownerDocument: Document | undefined;
  /**
   * - Disable range request loading of PDF
   * files. When enabled, and if the server supports partial content requests,
   * then the PDF will be fetched in chunks. The default value is `false`.
   */
  disableRange: boolean | undefined;
  /**
   * - Disable streaming of PDF file data.
   * By default PDF.js attempts to load PDF files in chunks. The default value
   * is `false`.
   */
  disableStream: boolean | undefined;
  /**
   * - Disable pre-fetching of PDF file
   * data. When range requests are enabled PDF.js will automatically keep
   * fetching more data even if it isn't needed to display the current page.
   * The default value is `false`.
   *
   * NOTE: It is also necessary to disable streaming, see above, in order for
   * disabling of pre-fetching to work correctly.
   */
  disableAutoFetch: boolean | undefined;
  /**
   * - Enables special hooks for debugging PDF.js
   * (see `web/debugger.js`). The default value is `false`.
   */
  pdfBug: boolean | undefined;
};
export type OnProgressParameters = {
  /**
   * - Currently loaded number of bytes.
   */
  loaded: number;
  /**
   * - Total number of bytes in the PDF file.
   */
  total: number;
};

/**
 * Page annotation parameters.
 */
export type GetAnnotationsParameters = {
  /**
   * - Determines the annotations that are fetched,
   * can be 'display' (viewable annotations), 'print' (printable annotations),
   * or 'any' (all annotations). The default value is 'display'.
   */
  intent: string | undefined;
};

export type TextItem = {
  /**
   * - Text content.
   */
  str: string;
  /**
   * - Text direction: 'ttb', 'ltr' or 'rtl'.
   */
  dir: string;
  /**
   * - Transformation matrix.
   */
  transform: Array<any>;
  /**
   * - Width in device space.
   */
  width: number;
  /**
   * - Height in device space.
   */
  height: number;
  /**
   * - Font name used by PDF.js for converted font.
   */
  fontName: string;
  /**
   * - Indicating if the text content is followed by a
   * line-break.
   */
  hasEOL: boolean;
};

/**
 * Page text marked content part.
 */
export type TextMarkedContent = {
  /**
   * - Either 'beginMarkedContent',
   * 'beginMarkedContentProps', or 'endMarkedContent'.
   */
  type: string;
  /**
   * - The marked content identifier. Only used for type
   * 'beginMarkedContentProps'.
   */
  id: string;
};

/**
 * A PDF document and page is built of many objects. E.g. there are objects for
 * fonts, images, rendering code, etc. These objects may get processed inside of
 * a worker. This class implements some basic methods to manage these objects.
 */
declare interface PDFObjects {
  /**
   * If called *without* callback, this returns the data of `objId` but the
   * object needs to be resolved. If it isn't, this method throws.
   *
   * If called *with* a callback, the callback is called with the data of the
   * object once the object is resolved. That means, if you call this method
   * and the object is already resolved, the callback gets called right away.
   *
   * @param {string} objId
   * @param {function} [callback]
   * @returns {any}
   */
  get(objId: string, callback: Function | undefined): any;
  /**
   * @param {string} objId
   * @returns {boolean}
   */
  has(objId: string): boolean;
  /**
   * Resolves the object `objId` with optional `data`.
   *
   * @param {string} objId
   * @param {any} [data]
   */
  resolve(objId: string, data?: any): void;
  clear(): void;
}

export type RefProxy = {
  num: number;
  gen: number;
};

/**
 * Page getViewport parameters.
 */
export type GetViewportParameters = {
  /**
   * - The desired scale of the viewport.
   */
  scale: number;
  /**
   * - The desired rotation, in degrees, of
   * the viewport. If omitted it defaults to the page rotation.
   */
  rotation?: number;
  /**
   * - The horizontal, i.e. x-axis, offset.
   * The default value is `0`.
   */
  offsetX?: number;
  /**
   * - The vertical, i.e. y-axis, offset.
   * The default value is `0`.
   */
  offsetY?: number;
  /**
   * - If true, the y-axis will not be
   * flipped. The default value is `false`.
   */
  dontFlip?: boolean;
};

export interface PDFDateString {
  /**
   * Convert a PDF date string to a JavaScript `Date` object.
   *
   * The PDF date string format is described in section 7.9.4 of the official
   * PDF 32000-1:2008 specification. However, in the PDF 1.7 reference (sixth
   * edition) Adobe describes the same format including a trailing apostrophe.
   * This syntax in incorrect, but Adobe Acrobat creates PDF files that contain
   * them. We ignore all apostrophes as they are not necessary for date parsing.
   *
   * Moreover, Adobe Acrobat doesn't handle changing the date to universal time
   * and doesn't use the user's time zone (effectively ignoring the HH' and mm'
   * parts of the date string).
   *
   * @param {string} input
   * @returns {Date|null}
   */
  // static toDateObject(input: string): Date | null;
}

/**
 * Page getTextContent parameters.
 */
export type getTextContentParameters = {
  /**
   * - Do not attempt to combine
   * same line {@link TextItem }'s. The default value is `false`.
   */
  disableCombineTextItems: boolean;
  /**
   * - When true include marked
   * content items in the items array of TextContent. The default is `false`.
   */
  includeMarkedContent: boolean | undefined;
};

/**
 * Allows controlling of the rendering tasks.
 */
export interface RenderTask {
  /**
   * Callback for incremental rendering -- a function that will be called
   * each time the rendering is paused.  To continue rendering call the
   * function that is the first argument to the callback.
   * @type {function}
   */
  onContinue: Function;
  /**
   * Promise for rendering task completion.
   * @type {Promise<void>}
   */
  get promise(): Promise<void>;
  /**
   * Cancels the rendering task. If the task is currently rendering it will
   * not be cancelled until graphics pauses with a timeout. The promise that
   * this object extends will be rejected when cancelled.
   *
   * @param {number} [extraDelay]
   */
  cancel(extraDelay: number | undefined): void;
  /**
   * Whether form fields are rendered separately from the main operatorList.
   * @type {boolean}
   */
  get separateAnnots(): boolean;
}

/**
 * Page render parameters.
 */
export type RenderParameters = {
  /**
   * - A 2D context of a DOM Canvas object.
   */
  canvasContext: Object;
  /**
   * - Rendering viewport obtained by calling
   * the `PDFPageProxy.getViewport` method.
   */
  viewport: PageViewport;
  /**
   * - Rendering intent, can be 'display', 'print',
   * or 'any'. The default value is 'display'.
   */
  intent: string | undefined;
  /**
   * Controls which annotations are rendered
   * onto the canvas, for annotations with appearance-data; the values from
   * {@link AnnotationMode } should be used. The following values are supported:
   * - `AnnotationMode.DISABLE`, which disables all annotations.
   * - `AnnotationMode.ENABLE`, which includes all possible annotations (thus
   * it also depends on the `intent`-option, see above).
   * - `AnnotationMode.ENABLE_FORMS`, which excludes annotations that contain
   * interactive form elements (those will be rendered in the display layer).
   * - `AnnotationMode.ENABLE_STORAGE`, which includes all possible annotations
   * (as above) but where interactive form elements are updated with data
   * from the {@link AnnotationStorage }-instance; useful e.g. for printing.
   * The default value is `AnnotationMode.ENABLE`.
   */
  annotationMode: number | undefined;
  /**
   * - Additional transform, applied just
   * before viewport transform.
   */
  transform: any[] | undefined;
  /**
   * - The factory instance that will be used
   * when creating canvases. The default value is {new DOMCanvasFactory()}.
   */
  canvasFactory: Object | undefined;
  /**
   * - Background to use for the canvas.
   * Any valid `canvas.fillStyle` can be used: a `DOMString` parsed as CSS
   * <color> value, a `CanvasGradient` object (a linear or radial gradient) or
   * a `CanvasPattern` object (a repetitive image). The default value is
   * 'rgb(255,255,255)'.
   *
   * NOTE: This option may be partially, or completely, ignored when the
   * `pageColors`-option is used.
   */
  background: string | Object | undefined;
  /**
   * - Overwrites background and foreground colors
   * with user defined ones in order to improve readability in high contrast
   * mode.
   */
  pageColors: Object | undefined;
  /**
   * - Map some
   * annotation ids with canvases used to render them.
   */
  annotationCanvasMap: Map<string, HTMLCanvasElement> | undefined;
  printAnnotationStorage: PrintAnnotationStorage | undefined;

  backgroundColorToReplace: string | undefined; // added by ngx-extended-pdf-viewer
  optionalContentConfigPromise: Promise<unknown> | undefined; // added by ngx-extended-pdf-viewer?
};

/**
 * Structure tree node. The root node will have a role "Root".
 */
export type StructTreeNode = {
  /**
   * - Array of
   * {@link StructTreeNode } and {@link StructTreeContent } objects.
   */
  children: Array<StructTreeNode | StructTreeContent>;
  /**
   * - element's role, already mapped if a role map exists
   * in the PDF.
   */
  role: string;
};
/**
 * Structure tree content.
 */
export type StructTreeContent = {
  /**
   * - either "content" for page and stream structure
   * elements or "object" for object references.
   */
  type: string;
  /**
   * - unique id that will map to the text layer.
   */
  id: string;
};

export interface PDFPageProxy {
  /** @type {PDFObjects} */
  commonObjs: PDFObjects;
  objs: PDFObjects;
  _bitmaps: Set<any>;
  cleanupAfterRender: boolean;
  pendingCleanup: boolean;
  _intentStates: Map<any, any>;
  destroyed: boolean;
  /**
   * @type {number} Page number of the page. First page is 1.
   */
  get pageNumber(): number;
  /**
   * @type {number} The number of degrees the page is rotated clockwise.
   */
  get rotate(): number;
  /**
   * @type {RefProxy | null} The reference that points to this page.
   */
  get ref(): RefProxy | null;
  /**
   * @type {number} The default size of units in 1/72nds of an inch.
   */
  get userUnit(): number;
  /**
   * @type {Array<number>} An array of the visible portion of the PDF page in
   *   user space units [x1, y1, x2, y2].
   */
  get view(): number[];
  /**
   * @param {GetViewportParameters} params - Viewport parameters.
   * @returns {PageViewport} Contains 'width' and 'height' properties
   *   along with transforms required for rendering.
   */
  getViewport({ scale, rotation, offsetX, offsetY, dontFlip }?: GetViewportParameters): PageViewport;
  /**
   * @param {GetAnnotationsParameters} params - Annotation parameters.
   * @returns {Promise<Array<any>>} A promise that is resolved with an
   *   {Array} of the annotation objects.
   */
  getAnnotations({ intent }?: GetAnnotationsParameters): Promise<Array<any>>;
  /**
   * @returns {Promise<Object>} A promise that is resolved with an
   *   {Object} with JS actions.
   */
  getJSActions(): Promise<Object>;
  /**
   * @type {boolean} True if only XFA form.
   */
  get isPureXfa(): boolean;
  /**
   * @returns {Promise<Object | null>} A promise that is resolved with
   *   an {Object} with a fake DOM object (a tree structure where elements
   *   are {Object} with a name, attributes (class, style, ...), value and
   *   children, very similar to a HTML DOM tree), or `null` if no XFA exists.
   */
  getXfa(): Promise<Object | null>;
  /**
   * Begins the process of rendering a page to the desired context.
   *
   * @param {RenderParameters} params - Page render parameters.
   * @returns {RenderTask} An object that contains a promise that is
   *   resolved when the page finishes rendering.
   */
  render({
    canvasContext,
    viewport,
    intent,
    annotationMode,
    transform,
    canvasFactory,
    background,
    backgroundColorToReplace,
    optionalContentConfigPromise,
    annotationCanvasMap,
    pageColors,
    printAnnotationStorage,
  }: RenderParameters): RenderTask;

  /**
   * NOTE: All occurrences of whitespace will be replaced by
   * standard spaces (0x20).
   *
   * @param {getTextContentParameters} params - getTextContent parameters.
   * @returns {ReadableStream} Stream for reading text content chunks.
   */
  streamTextContent({ disableCombineTextItems, includeMarkedContent }?: getTextContentParameters): ReadableStream;
  /**
   * NOTE: All occurrences of whitespace will be replaced by
   * standard spaces (0x20).
   *
   * @param {getTextContentParameters} params - getTextContent parameters.
   * @returns {Promise<TextContent>} A promise that is resolved with a
   *   {@link TextContent} object that represents the page's text content.
   */
  getTextContent(params?: getTextContentParameters): Promise<TextContent>;
  /**
   * @returns {Promise<StructTreeNode>} A promise that is resolved with a
   *   {@link StructTreeNode} object that represents the page's structure tree,
   *   or `null` when no structure tree is present for the current page.
   */
  getStructTree(): Promise<StructTreeNode>;
  /**
   * Destroys the page object.
   * @private
   */
  _destroy;
  /**
   * Cleans up resources allocated by the page.
   *
   * @param {boolean} [resetStats] - Reset page stats, if enabled.
   *   The default value is `false`.
   * @returns {boolean} Indicates if clean-up was successfully run.
   */
  cleanup(resetStats: boolean | undefined): boolean;
  /**
   * Attempts to clean up if rendering is in a state where that's possible.
   * @private
   */
  _tryCleanup;
  /**
   * @private
   */
  _startRenderPage;
  /**
   * @private
   */
  _renderPageChunk;
  /**
   * @private
   */
  _pumpOperatorList;
  /**
   * @private
   */
  _abortOperatorList;
  /**
   * @type {Object} Returns page stats, if enabled; returns `null` otherwise.
   */
  get stats(): Object;
}

/**
 * The loading task controls the operations required to load a PDF document
 * (such as network requests) and provides a way to listen for completion,
 * after which individual pages can be rendered.
 */
export interface PDFDocumentLoadingTask {
  /**
   * Unique identifier for the document loading task.
   * @type {string}
   */
  docId: string;
  /**
   * Whether the loading task is destroyed or not.
   * @type {boolean}
   */
  destroyed: boolean;
  /**
   * Callback to request a password if a wrong or no password was provided.
   * The callback receives two parameters: a function that should be called
   * with the new password, and a reason (see {@link PasswordResponses}).
   * @type {function}
   */
  onPassword: Function;
  /**
   * Callback to be able to monitor the loading progress of the PDF file
   * (necessary to implement e.g. a loading bar).
   * The callback receives an {@link OnProgressParameters} argument.
   * @type {function}
   */
  onProgress: Function;
  /**
   * Callback for when an unsupported feature is used in the PDF document.
   * The callback receives an {@link UNSUPPORTED_FEATURES} argument.
   * @type {function}
   */
  set onUnsupportedFeature(arg: Function | null);
  /**
   * @type {function | null} The current callback used with unsupported
   * features.
   */
  get onUnsupportedFeature(): Function | null;
  /**
   * Promise for document loading task completion.
   * @type {Promise<PDFDocumentProxy>}
   */
  get promise(): Promise<PDFDocumentProxy>;
  /**
   * Abort all network requests and destroy the worker.
   * @returns {Promise<void>} A promise that is resolved when destruction is
   *   completed.
   */
  destroy(): Promise<void>;
}
export interface PDFDocumentProxy {
  _pdfInfo: any;
  _transport: any;
  /**
   * @type {AnnotationStorage} Storage for annotation data in forms.
   */
  get annotationStorage(): AnnotationStorage;
  /**
   * @type {number} Total number of pages in the PDF file.
   */
  get numPages(): number;
  /**
   * @type {Array<string, string|null>} A (not guaranteed to be) unique ID to
   *   identify the PDF document.
   *   NOTE: The first element will always be defined for all PDF documents,
   *   whereas the second element is only defined for *modified* PDF documents.
   */
  get fingerprints(): string[];
  /**
   * @type {boolean} True if only XFA form.
   */
  get isPureXfa(): boolean;
  /**
   * NOTE: This is (mostly) intended to support printing of XFA forms.
   *
   * @type {Object | null} An object representing a HTML tree structure
   *   to render the XFA, or `null` when no XFA form exists.
   */
  get allXfaHtml(): Object | null;
  /**
   * @param {number} pageNumber - The page number to get. The first page is 1.
   * @returns {Promise<PDFPageProxy>} A promise that is resolved with
   *   a {@link PDFPageProxy} object.
   */
  getPage(pageNumber: number): Promise<PDFPageProxy>;
  /**
   * @param {RefProxy} ref - The page reference.
   * @returns {Promise<number>} A promise that is resolved with the page index,
   *   starting from zero, that is associated with the reference.
   */
  getPageIndex(ref: RefProxy): Promise<number>;
  /**
   * @returns {Promise<Object<string, Array<any>>>} A promise that is resolved
   *   with a mapping from named destinations to references.
   *
   * This can be slow for large documents. Use `getDestination` instead.
   */
  getDestinations(): Promise<{
    [x: string]: Array<any>;
  }>;
  /**
   * @param {string} id - The named destination to get.
   * @returns {Promise<Array<any> | null>} A promise that is resolved with all
   *   information of the given named destination, or `null` when the named
   *   destination is not present in the PDF file.
   */
  getDestination(id: string): Promise<Array<any> | null>;
  /**
   * @returns {Promise<Array<string> | null>} A promise that is resolved with
   *   an {Array} containing the page labels that correspond to the page
   *   indexes, or `null` when no page labels are present in the PDF file.
   */
  getPageLabels(): Promise<Array<string> | null>;
  /**
   * @returns {Promise<string>} A promise that is resolved with a {string}
   *   containing the page layout name.
   */
  getPageLayout(): Promise<string>;
  /**
   * @returns {Promise<string>} A promise that is resolved with a {string}
   *   containing the page mode name.
   */
  getPageMode(): Promise<string>;
  /**
   * @returns {Promise<Object | null>} A promise that is resolved with an
   *   {Object} containing the viewer preferences, or `null` when no viewer
   *   preferences are present in the PDF file.
   */
  getViewerPreferences(): Promise<Object | null>;
  /**
   * @returns {Promise<any | null>} A promise that is resolved with an {Array}
   *   containing the destination, or `null` when no open action is present
   *   in the PDF.
   */
  getOpenAction(): Promise<any | null>;
  /**
   * @returns {Promise<any>} A promise that is resolved with a lookup table
   *   for mapping named attachments to their content.
   */
  getAttachments(): Promise<any>;
  /**
   * @returns {Promise<Array<string> | null>} A promise that is resolved with
   *   an {Array} of all the JavaScript strings in the name tree, or `null`
   *   if no JavaScript exists.
   */
  getJavaScript(): Promise<Array<string> | null>;
  /**
   * @returns {Promise<Object | null>} A promise that is resolved with
   *   an {Object} with the JavaScript actions:
   *     - from the name tree (like getJavaScript);
   *     - from A or AA entries in the catalog dictionary.
   *   , or `null` if no JavaScript exists.
   */
  getJSActions(): Promise<Object | null>;
  /**
   * @typedef {Object} OutlineNode
   * @property {string} title
   * @property {boolean} bold
   * @property {boolean} italic
   * @property {Uint8ClampedArray} color - The color in RGB format to use for
   *   display purposes.
   * @property {string | Array<any> | null} dest
   * @property {string | null} url
   * @property {string | undefined} unsafeUrl
   * @property {boolean | undefined} newWindow
   * @property {number | undefined} count
   * @property {Array<OutlineNode>} items
   */
  /**
   * @returns {Promise<Array<OutlineNode>>} A promise that is resolved with an
   *   {Array} that is a tree outline (if it has one) of the PDF file.
   */
  getOutline(): Promise<
    {
      title: string;
      bold: boolean;
      italic: boolean;
      /**
       * - The color in RGB format to use for
       * display purposes.
       */
      color: Uint8ClampedArray;
      dest: string | Array<any> | null;
      url: string | null;
      unsafeUrl: string | undefined;
      newWindow: boolean | undefined;
      count: number | undefined;
      items: any[];
    }[]
  >;
  /**
   * @returns {Promise<OptionalContentConfig>} A promise that is resolved with
   *   an {@link OptionalContentConfig} that contains all the optional content
   *   groups (assuming that the document has any).
   */
  getOptionalContentConfig(): Promise<OptionalContentConfig>;
  /**
   * @returns {Promise<Array<number> | null>} A promise that is resolved with
   *   an {Array} that contains the permission flags for the PDF document, or
   *   `null` when no permissions are present in the PDF file.
   */
  getPermissions(): Promise<Array<number> | null>;
  /**
   * @returns {Promise<{ info: Object, metadata: Metadata }>} A promise that is
   *   resolved with an {Object} that has `info` and `metadata` properties.
   *   `info` is an {Object} filled with anything available in the information
   *   dictionary and similarly `metadata` is a {Metadata} object with
   *   information from the metadata section of the PDF.
   */
  getMetadata(): Promise<{
    info: Object;
    metadata: Metadata;
  }>;
  /**
   * @typedef {Object} MarkInfo
   * Properties correspond to Table 321 of the PDF 32000-1:2008 spec.
   * @property {boolean} Marked
   * @property {boolean} UserProperties
   * @property {boolean} Suspects
   */
  /**
   * @returns {Promise<MarkInfo | null>} A promise that is resolved with
   *   a {MarkInfo} object that contains the MarkInfo flags for the PDF
   *   document, or `null` when no MarkInfo values are present in the PDF file.
   */
  getMarkInfo(): Promise<{
    Marked: boolean;
    UserProperties: boolean;
    Suspects: boolean;
  } | null>;
  /**
   * @returns {Promise<Uint8Array>} A promise that is resolved with a
   *   {Uint8Array} containing the raw data of the PDF document.
   */
  getData(): Promise<Uint8Array>;
  /**
   * @returns {Promise<Uint8Array>} A promise that is resolved with a
   *   {Uint8Array} containing the full data of the saved document.
   */
  saveDocument(): Promise<Uint8Array>;
  /**
   * @returns {Promise<{ length: number }>} A promise that is resolved when the
   *   document's data is loaded. It is resolved with an {Object} that contains
   *   the `length` property that indicates size of the PDF data in bytes.
   */
  getDownloadInfo(): Promise<{
    length: number;
  }>;
  /**
   * Cleans up resources allocated by the document on both the main and worker
   * threads.
   *
   * NOTE: Do not, under any circumstances, call this method when rendering is
   * currently ongoing since that may lead to rendering errors.
   *
   * @param {boolean} [keepLoadedFonts] - Let fonts remain attached to the DOM.
   *   NOTE: This will increase persistent memory usage, hence don't use this
   *   option unless absolutely necessary. The default value is `false`.
   * @returns {Promise} A promise that is resolved when clean-up has finished.
   */
  cleanup(keepLoadedFonts: boolean | undefined): Promise<any>;
  /**
   * Destroys the current document instance and terminates the worker.
   */
  destroy(): Promise<void>;
  /**
   * @type {DocumentInitParameters} A subset of the current
   *   {DocumentInitParameters}, which are needed in the viewer.
   */
  get loadingParams(): DocumentInitParameters;
  /**
   * @type {PDFDocumentLoadingTask} The loadingTask for the current document.
   */
  get loadingTask(): PDFDocumentLoadingTask;
  /**
   * @returns {Promise<Object<string, Array<Object>> | null>} A promise that is
   *   resolved with an {Object} containing /AcroForm field data for the JS
   *   sandbox, or `null` when no field data is present in the PDF file.
   */
  getFieldObjects(): Promise<{
    [x: string]: Array<Object>;
  } | null>;
  /**
   * @returns {Promise<boolean>} A promise that is resolved with `true`
   *   if some /AcroForm fields have JavaScript actions.
   */
  hasJSActions(): Promise<boolean>;
  /**
   * @returns {Promise<Array<string> | null>} A promise that is resolved with an
   *   {Array<string>} containing IDs of annotations that have a calculation
   *   action, or `null` when no such annotations are present in the PDF file.
   */
  getCalculationOrderIds(): Promise<Array<string> | null>;
}

export interface IPDFViewerApplication {
  pdfThumbnailViewer: any;
  pdfDocumentProperties: any;
  appConfig: IPDFViewerAppConfig;
  _boundEvents: any;
  enablePrint: boolean;
  eventBus: IEventBus;
  findBar: any;
  findController: FindController;
  isViewerEmbedded: boolean;
  l10n: IWebL10n;
  onError: (error: Error) => void;
  page: number;
  pagesCount: number;
  passwordPrompt: PasswordPrompt;
  pdfDocument: PDFDocumentProxy;
  pdfLinkService: any /* PDFLinkService;*/;
  pdfSidebar: any;
  pdfViewer: IPDFViewer;
  printKeyDownListener: undefined | ((this: Window, ev: KeyboardEvent) => any);
  sidebarViewOnLoad: 0 | 1;
  spreadModeOnLoad: 0 | 1 | 2;
  secondaryToolbar: any;
  store: ViewHistory;
  toolbar: any;
  viewer: HTMLDivElement;

  _cleanup(): void;
  close(): Promise<void>;
  open(source: string | ArrayBuffer | { range: any } | any, options?: any): Promise<any>;
  unbindEvents(): void;
  unbindWindowEvents(): void;
  export(): Promise<Blob>;
}
