import { effect, Injectable, Renderer2, RendererFactory2, signal } from '@angular/core';
import { AnnotationEditorParamsType, AnnotationMode, EditorAnnotation, HighlightEditorAnnotation, StampEditorAnnotation } from './options/editor-annotations';
import { PdfLayer } from './options/optional_content_config';
import { PDFPrintRange } from './options/pdf-print-range';
import { IPDFViewerApplication, PDFDocumentProxy, PDFFindParameters, PDFPageProxy, TextItem, TextMarkedContent } from './options/pdf-viewer-application';
import { ZoomType } from './options/zoom-type';
import { PDFNotificationService } from './pdf-notification-service';

export interface FindOptions {
  highlightAll?: boolean;
  matchCase?: boolean;
  wholeWords?: boolean;
  matchDiacritics?: boolean;
  dontScrollIntoView?: boolean;
  findMultiple?: boolean;
  regexp?: boolean;
  useSecondaryFindcontroller?: boolean;
}

interface DrawContext {
  ctx: CanvasRenderingContext2D;
  canvas: HTMLCanvasElement;
}

export interface PDFExportScaleFactor {
  width?: number;
  height?: number;
  scale?: number;
}

type DirectionType = 'ltr' | 'rtl' | 'both' | undefined;

export interface PdfImageParameters {
  urlOrDataUrl: string;
  page?: number;
  left?: number | string;
  bottom?: number | string;
  right?: number | string;
  top?: number | string;
  rotation?: 0 | 90 | 180 | 270;
}

export interface Line {
  x: number;
  y: number;
  width: number;
  height: number;
  direction: DirectionType;
  text: string;
}
export interface Section {
  x: number;
  y: number;
  width: number;
  height: number;
  direction: DirectionType;
  lines: Array<Line>;
}

@Injectable({
  providedIn: 'root',
})
export class NgxExtendedPdfViewerService {
  public ngxExtendedPdfViewerInitialized = false;

  public secondaryMenuIsEmpty = signal(false);

  private readonly renderer: Renderer2;
  private PDFViewerApplication?: IPDFViewerApplication;

  constructor(
    private readonly rendererFactory: RendererFactory2,
    notificationService: PDFNotificationService,
  ) {
    this.renderer = this.rendererFactory.createRenderer(null, null);
    effect(() => {
      this.PDFViewerApplication = notificationService.onPDFJSInitSignal();
    });
  }

  public find(text: string | string[] | RegExp, options: FindOptions = {}): Array<Promise<number>> | undefined {
    if (!this.ngxExtendedPdfViewerInitialized) {
      // tslint:disable-next-line:quotemark
      console.error("The PDF viewer hasn't finished initializing. Please call find() later.");
      return undefined;
    } else {
      if (!options.useSecondaryFindcontroller) {
        const highlightAllCheckbox = document.getElementById('findHighlightAll') as HTMLInputElement;
        if (highlightAllCheckbox) {
          highlightAllCheckbox.checked = options.highlightAll ?? false;
        }

        const matchCaseCheckbox = document.getElementById('findMatchCase') as HTMLInputElement;
        if (matchCaseCheckbox) {
          matchCaseCheckbox.checked = options.matchCase ?? false;
        }

        const findMultipleCheckbox = document.getElementById('findMultiple') as HTMLInputElement;
        if (findMultipleCheckbox) {
          findMultipleCheckbox.checked = options.findMultiple ?? false;
        }

        const entireWordCheckbox = document.getElementById('findEntireWord') as HTMLInputElement;
        if (entireWordCheckbox) {
          entireWordCheckbox.checked = options.wholeWords ?? false;
        }

        const matchDiacriticsCheckbox = document.getElementById('findMatchDiacritics') as HTMLInputElement;
        if (matchDiacriticsCheckbox) {
          matchDiacriticsCheckbox.checked = options.matchDiacritics ?? false;
        }

        const matchRegExpCheckbox = document.getElementById('matchRegExp') as HTMLInputElement;
        if (matchRegExpCheckbox) {
          matchRegExpCheckbox.checked = options.regexp ?? false;
          if (matchRegExpCheckbox.checked) {
            if (findMultipleCheckbox) {
              findMultipleCheckbox.checked = false;
            }
            if (entireWordCheckbox) {
              entireWordCheckbox.checked = false;
            }

            if (matchDiacriticsCheckbox) {
              matchDiacriticsCheckbox.checked = false;
            }
          }
          if (findMultipleCheckbox) {
            findMultipleCheckbox.disabled = matchRegExpCheckbox.checked;
          }
          if (entireWordCheckbox) {
            entireWordCheckbox.disabled = matchRegExpCheckbox.checked;
          }

          if (matchDiacriticsCheckbox) {
            matchDiacriticsCheckbox.disabled = matchRegExpCheckbox.checked;
          }
        }

        const inputField = document.getElementById('findInput') as HTMLInputElement;
        if (inputField && typeof text === 'string') {
          inputField.value = text;
        }
      }

      const findParameters: PDFFindParameters = {
        caseSensitive: options.matchCase ?? false,
        entireWord: options.wholeWords ?? false,
        highlightAll: options.highlightAll ?? false,
        matchDiacritics: options.matchDiacritics ?? false,
        findMultiple: options.findMultiple,
        matchRegExp: options.regexp ?? false,
        findPrevious: false,
        query: text,
        source: null,
        type: 'find',
        dontScrollIntoView: options.dontScrollIntoView ?? false,
      };
      const findController = options.useSecondaryFindcontroller ? this.PDFViewerApplication?.customFindController : this.PDFViewerApplication?.findController;
      const result = findController?.ngxFind(findParameters);
      return result;
    }
  }

  public findNext(useSecondaryFindcontroller: boolean = false): boolean {
    if (!this.ngxExtendedPdfViewerInitialized) {
      // tslint:disable-next-line:quotemark
      console.error("The PDF viewer hasn't finished initializing. Please call findNext() later.");
      return false;
    } else {
      const findController = useSecondaryFindcontroller ? this.PDFViewerApplication?.customFindController : this.PDFViewerApplication?.findController;
      findController?.ngxFindNext();
      return true;
    }
  }

  public findPrevious(useSecondaryFindcontroller: boolean = false): boolean {
    if (!this.ngxExtendedPdfViewerInitialized) {
      // tslint:disable-next-line:quotemark
      console.error("The PDF viewer hasn't finished initializing. Please call findPrevious() later.");
      return false;
    } else {
      const findController = useSecondaryFindcontroller ? this.PDFViewerApplication?.customFindController : this.PDFViewerApplication?.findController;
      findController?.ngxFindPrevious();
      return true;
    }
  }

  public print(printRange?: PDFPrintRange) {
    if (this.PDFViewerApplication) {
      const alreadyPrinting = this.PDFViewerApplication?.PDFPrintServiceFactory?.isInPDFPrintRange !== undefined;
      if (!alreadyPrinting) {
        // slow down hurried users clicking the print button multiple times
        if (!printRange) {
          printRange = {} as PDFPrintRange;
        }
        this.setPrintRange(printRange);
        this.PDFViewerApplication?.printPdf();
        this.PDFViewerApplication?.eventBus.on('afterprint', this.removePrintRange.bind(this), { once: true });
      }
    }
  }

  public removePrintRange() {
    if (this.PDFViewerApplication?.PDFPrintServiceFactory) {
      delete this.PDFViewerApplication.PDFPrintServiceFactory.isInPDFPrintRange;
      delete this.PDFViewerApplication.PDFPrintServiceFactory.filteredPageCount;
    }
  }

  public setPrintRange(printRange: PDFPrintRange) {
    if (!this.PDFViewerApplication?.PDFPrintServiceFactory) {
      console.error("The print service hasn't been initialized yet.");
      return;
    }

    this.PDFViewerApplication.PDFPrintServiceFactory.isInPDFPrintRange = (page: number) => this.isInPDFPrintRange(page, printRange);
    this.PDFViewerApplication.PDFPrintServiceFactory.filteredPageCount = this.filteredPageCount(this.PDFViewerApplication?.pagesCount, printRange);
  }

  public filteredPageCount(pageCount: number, range: PDFPrintRange): number {
    let result = 0;
    for (let page = 0; page < pageCount; page++) {
      if (this.isInPDFPrintRange(page, range)) {
        result++;
      }
    }
    return result;
  }

  public isInPDFPrintRange(pageIndex: number, printRange: PDFPrintRange) {
    const page = pageIndex + 1;
    if (printRange.from) {
      if (page < printRange.from) {
        return false;
      }
    }
    if (printRange.to) {
      if (page > printRange.to) {
        return false;
      }
    }
    if (printRange.excluded) {
      if (printRange.excluded.some((p) => p === page)) {
        return false;
      }
    }
    if (printRange.included) {
      if (!printRange.included.some((p) => p === page)) {
        return false;
      }
    }
    return true;
  }

  public async getPageAsLines(pageNumber: number): Promise<Array<Line>> {
    if (this.PDFViewerApplication) {
      const pdfDocument = this.PDFViewerApplication?.pdfDocument;

      const page = await pdfDocument.getPage(pageNumber);
      const textSnippets = (await page.getTextContent()).items //
        .filter((info) => !(info as any)['type']); // ignore the TextMarkedContent items

      const snippets = textSnippets as Array<TextItem>;

      let minX = Number.MAX_SAFE_INTEGER;
      let minY = Number.MAX_SAFE_INTEGER;
      let maxX = Number.MIN_SAFE_INTEGER;
      let maxY = Number.MIN_SAFE_INTEGER;
      let countLTR = 0;
      let countRTL = 0;
      let text = '';
      let lines = new Array<Line>();
      for (let i = 0; i < snippets.length; i++) {
        const currentSnippet = snippets[i];
        // #3065 modified by ngx-extended-pdf-viewer
        // Always process the current snippet's text and bounds, regardless of hasEOL
        const x = currentSnippet.transform[4];
        const y = -currentSnippet.transform[5];
        const width = currentSnippet.width;
        const height = currentSnippet.height;
        minX = Math.min(minX, x);
        minY = Math.min(minY, y);
        maxX = Math.max(maxX, x + width);
        maxY = Math.max(maxY, y + height);
        text += currentSnippet.str;
        if (currentSnippet.dir === 'rtl') {
          countRTL++;
        }
        if (currentSnippet.dir === 'ltr') {
          countLTR++;
        }
        // #3065 end of modification by ngx-extended-pdf-viewer

        let addIt = i === snippets.length - 1 || currentSnippet.hasEOL;
        if (addIt) {
          let direction: DirectionType = undefined;
          if (countLTR > 0 && countRTL > 0) {
            direction = 'both';
          } else if (countLTR > 0) {
            direction = 'ltr';
          } else if (countRTL > 0) {
            direction = 'rtl';
          }
          const line = {
            direction,
            x: minX,
            y: minY,
            width: maxX - minX,
            height: maxY - minY,
            text: text.trim(),
          } as Line;
          lines.push(line);
          minX = Number.MAX_SAFE_INTEGER;
          minY = Number.MAX_SAFE_INTEGER;
          maxX = Number.MIN_SAFE_INTEGER;
          maxY = Number.MIN_SAFE_INTEGER;
          countLTR = 0;
          countRTL = 0;
          text = '';
        }
      }
      return lines;
    }
    return [];
  }

  public async getPageAsText(pageNumber: number): Promise<string> {
    if (!this.PDFViewerApplication) {
      return '';
    }
    const pdfDocument = this.PDFViewerApplication?.pdfDocument;

    const page = await pdfDocument.getPage(pageNumber);
    const textSnippets = (await page.getTextContent()).items;
    return this.convertTextInfoToText(textSnippets);
  }

  private convertTextInfoToText(textInfoItems: Array<TextItem | TextMarkedContent>): string {
    if (!textInfoItems) {
      return '';
    }
    return textInfoItems
      .filter((info) => !(info as any)['type'])
      .map((info) => {
        const textItem = info as TextItem;
        return textItem.hasEOL ? textItem.str + '\n' : textItem.str;
      })
      .join('');
  }

  public async getPageAsCanvas(
    pageNumber: number,
    scale: PDFExportScaleFactor,
    background?: string,
    backgroundColorToReplace: string = '#FFFFFF',
    annotationMode: AnnotationMode = AnnotationMode.ENABLE,
  ): Promise<HTMLCanvasElement | undefined> {
    if (!this.PDFViewerApplication) {
      return Promise.resolve(undefined);
    }
    const pdfDocument = this.PDFViewerApplication.pdfDocument;
    const pdfPage = await pdfDocument.getPage(pageNumber);
    return this.draw(pdfPage, scale, background, backgroundColorToReplace, annotationMode);
  }

  public async getPageAsImage(
    pageNumber: number,
    scale: PDFExportScaleFactor,
    background?: string,
    backgroundColorToReplace: string = '#FFFFFF',
    annotationMode: AnnotationMode = AnnotationMode.ENABLE,
  ): Promise<string | undefined> {
    const canvas = await this.getPageAsCanvas(pageNumber, scale, background, backgroundColorToReplace, annotationMode);
    return canvas?.toDataURL();
  }

  private async draw(
    pdfPage: PDFPageProxy,
    scale: PDFExportScaleFactor,
    background?: string,
    backgroundColorToReplace: string = '#FFFFFF',
    annotationMode: AnnotationMode = AnnotationMode.ENABLE,
  ): Promise<HTMLCanvasElement> {
    let zoomFactor = 1;
    if (scale.scale) {
      zoomFactor = scale.scale;
    } else if (scale.width) {
      zoomFactor = scale.width / pdfPage.getViewport({ scale: 1 }).width;
    } else if (scale.height) {
      zoomFactor = scale.height / pdfPage.getViewport({ scale: 1 }).height;
    }
    const viewport = pdfPage.getViewport({
      scale: zoomFactor,
    });
    const { ctx, canvas } = this.getPageDrawContext(viewport.width, viewport.height);
    const drawViewport = viewport.clone();

    const renderContext = {
      canvasContext: ctx,
      viewport: drawViewport,
      background,
      backgroundColorToReplace,
      annotationMode,
    };
    const renderTask = pdfPage.render(renderContext);

    const dataUrlPromise = () => Promise.resolve(canvas);

    return renderTask.promise.then(dataUrlPromise);
  }

  private getPageDrawContext(width: number, height: number): DrawContext {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) {
      // tslint:disable-next-line: quotemark
      throw new Error("Couldn't create the 2d context");
    }

    canvas.width = width;
    canvas.height = height;
    this.renderer.setStyle(canvas, 'width', `${width}px`);
    this.renderer.setStyle(canvas, 'height', `${height}px`);

    return { ctx, canvas };
  }

  public async getCurrentDocumentAsBlob(): Promise<Blob | undefined> {
    return (await this.PDFViewerApplication?.export()) || undefined;
  }

  public async getFormData(currentFormValues = true): Promise<Array<Object>> {
    if (!this.PDFViewerApplication) {
      return [];
    }
    const pdf: PDFDocumentProxy | undefined = this.PDFViewerApplication?.pdfDocument;
    // screen DPI / PDF DPI
    const dpiRatio = 96 / 72;
    const result: Array<Object> = [];
    for (let i = 1; i <= pdf?.numPages; i++) {
      // track the current page
      const currentPage /* : PDFPageProxy */ = await pdf.getPage(i);
      const annotations = await currentPage.getAnnotations();

      annotations
        .filter((a) => a.subtype === 'Widget') // get the form field annotations only
        .map((a) => ({ ...a })) // only expose copies of the annotations to avoid side-effects
        .forEach((a) => {
          // get the rectangle that represent the single field
          // and resize it according to the current DPI
          const fieldRect: Array<number> = currentPage.getViewport({ scale: dpiRatio }).convertToViewportRectangle(a.rect);

          // add the corresponding input
          if (currentFormValues && a.fieldName) {
            try {
              if (a.exportValue) {
                const currentValue: any = this.PDFViewerApplication?.pdfDocument.annotationStorage.getValue(a.id, a.fieldName + '/' + a.exportValue, '');
                a.value = currentValue?.value;
              } else if (a.radioButton) {
                const currentValue: any = this.PDFViewerApplication?.pdfDocument.annotationStorage.getValue(a.id, a.fieldName + '/' + a.fieldValue, '');
                a.value = currentValue?.value;
              } else {
                const currentValue: any = this.PDFViewerApplication?.pdfDocument.annotationStorage.getValue(a.id, a.fieldName, '');
                a.value = currentValue?.value;
              }
            } catch (exception) {
              // just ignore it
            }
          }
          result.push({ fieldAnnotation: a, fieldRect, pageNumber: i });
        });
    }
    return result;
  }

  /**
   * Adds a page to the rendering queue
   * @param {number} pageIndex Index of the page to render
   * @returns {boolean} false, if the page has already been rendered,
   * if it's out of range or if the viewer hasn't been initialized yet
   */
  public addPageToRenderQueue(pageIndex: number): boolean {
    return this.PDFViewerApplication?.pdfViewer.addPageToRenderQueue(pageIndex) ?? false;
  }

  public isRenderQueueEmpty(): boolean {
    const scrolledDown = true;
    const renderExtra = false;
    if (this.PDFViewerApplication) {
      const nextPage = this.PDFViewerApplication.pdfViewer.renderingQueue.getHighestPriority(
        this.PDFViewerApplication?.pdfViewer._getVisiblePages(),
        this.PDFViewerApplication?.pdfViewer._pages,
        scrolledDown,
        renderExtra,
      );
      return !nextPage;
    }
    return true;
  }

  public hasPageBeenRendered(pageIndex: number): boolean {
    if (!this.PDFViewerApplication) {
      return false;
    }
    const pages = this.PDFViewerApplication?.pdfViewer._pages;
    if (pages.length > pageIndex && pageIndex >= 0) {
      const pageView = pages[pageIndex];
      const hasBeenRendered = pageView.renderingState === 3;
      return hasBeenRendered;
    }
    return false;
  }

  private sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  public async renderPage(pageIndex: number): Promise<void> {
    if (!this.hasPageBeenRendered(pageIndex)) {
      await this.addPageToRenderQueue(pageIndex);
      while (!this.hasPageBeenRendered(pageIndex)) {
        await this.sleep(7);
      }
    }
  }

  public currentlyRenderedPages(): Array<number> {
    if (!this.PDFViewerApplication) {
      return [];
    }
    const pages = this.PDFViewerApplication?.pdfViewer._pages;
    return pages.filter((page) => page.renderingState === 3).map((page) => page.id);
  }

  public numberOfPages(): number {
    if (!this.PDFViewerApplication) {
      return 0;
    }
    const pages = this.PDFViewerApplication?.pdfViewer._pages;
    return pages.length;
  }

  public getCurrentlyVisiblePageNumbers(): Array<number> {
    const app = this.PDFViewerApplication;
    if (!app) {
      return [];
    }
    const pages = (app.pdfViewer._getVisiblePages() as any).views as Array<any>;
    return pages?.map((page) => page.id);
  }

  public async listLayers(): Promise<Array<PdfLayer> | undefined> {
    if (!this.PDFViewerApplication) {
      return [];
    }

    const optionalContentConfig = await this.PDFViewerApplication?.pdfViewer.optionalContentConfigPromise;
    if (optionalContentConfig) {
      const levelData = optionalContentConfig.getOrder();
      const layerIds = levelData.filter((groupId: any) => typeof groupId !== 'object');
      return layerIds.map((layerId: any) => {
        const config = optionalContentConfig.getGroup(layerId);
        return {
          layerId: layerId,
          name: config.name,
          visible: config.visible,
        } as PdfLayer;
      });
    }
    return undefined;
  }

  public async toggleLayer(layerId: string): Promise<void> {
    if (!this.PDFViewerApplication) {
      return;
    }
    const optionalContentConfig = await this.PDFViewerApplication?.pdfViewer.optionalContentConfigPromise;
    if (optionalContentConfig) {
      let isVisible = optionalContentConfig.getGroup(layerId).visible;
      const checkbox = document.querySelector(`input[id='${layerId}']`);
      if (checkbox) {
        isVisible = (checkbox as HTMLInputElement).checked;
        (checkbox as HTMLInputElement).checked = !isVisible;
      }
      optionalContentConfig.setVisibility(layerId, !isVisible);
      this.PDFViewerApplication?.eventBus.dispatch('optionalcontentconfig', {
        source: this,
        promise: Promise.resolve(optionalContentConfig),
      });
    }
  }

  public scrollPageIntoView(pageNumber: number, pageSpot?: { top?: number | string; left?: number | string }): void {
    const viewer = this.PDFViewerApplication?.pdfViewer as any;
    viewer?.scrollPagePosIntoView(pageNumber, pageSpot);
  }

  /**
   * Returns all editor annotations (drawings, text, images, highlights) in serialized format.
   *
   * **IMPORTANT - ID Behavior:**
   * - Each annotation includes an `id` field for real-time event tracking via `annotationEditorEvent`
   * - When re-applying annotations using `addEditorAnnotation()`, **new IDs are always assigned**
   * - IDs are **not persistent** across sessions - they are temporary identifiers
   * - If you need to store annotations for later use, you can safely **omit the `id` field**
   *
   * **Example - Storing and Re-applying Annotations:**
   * ```typescript
   * // Save annotations (IDs are optional to store)
   * const annotations = pdfService.getSerializedAnnotations();
   * const toStore = annotations.map(({ id, ...rest }) => rest); // Remove IDs
   * localStorage.setItem('annotations', JSON.stringify(toStore));
   *
   * // Re-apply annotations (new IDs will be assigned automatically)
   * const stored = JSON.parse(localStorage.getItem('annotations'));
   * await pdfService.addEditorAnnotation(stored);
   * ```
   *
   * @returns Array of serialized annotations with temporary IDs, or null if no annotations exist
   */
  public getSerializedAnnotations(): EditorAnnotation[] | null | undefined {
    return this.PDFViewerApplication?.pdfViewer.getSerializedAnnotations();
  }

  // #3076 added by ngx-extended-pdf-viewer
  /**
   * Returns a single editor annotation by its ID.
   *
   * **IMPORTANT - ID Behavior:**
   * - IDs are temporary and only valid during the current session
   * - Useful for responding to `annotationEditorEvent` events
   * - Do not rely on IDs to persist across document reloads or sessions
   *
   * @param id The temporary unique identifier of the annotation (from `annotationEditorEvent` or `getSerializedAnnotations()`)
   * @returns The serialized annotation matching the ID, or null if not found
   */
  public getSerializedAnnotation(id: string): EditorAnnotation | null | undefined {
    const annotations = this.PDFViewerApplication?.pdfViewer.getSerializedAnnotations();
    if (!annotations || !Array.isArray(annotations)) {
      return null;
    }
    return annotations.find((annotation) => annotation.id === id) || null;
  }
  // #3076 end of modification by ngx-extended-pdf-viewer

  /**
   * Programmatically adds one or more editor annotations to the PDF.
   *
   * **IMPORTANT - ID Behavior:**
   * - Any `id` fields in the provided annotations are **ignored**
   * - New unique IDs are always assigned automatically
   * - This ensures no ID conflicts occur
   * - The `id` field is optional when calling this method
   *
   * **Supported Annotation Types:**
   * - Ink (drawings)
   * - FreeText (text boxes)
   * - Stamp (images)
   * - Highlight
   * - Popup (comments)
   *
   * @param serializedAnnotation A single annotation object, array of annotations, or JSON string
   * @returns Promise that resolves when the annotation(s) have been added
   *
   * @example
   * // Add a single annotation (with or without ID - both work the same)
   * await pdfService.addEditorAnnotation({
   *   annotationType: 3,
   *   color: [255, 0, 0],
   *   value: 'Hello',
   *   pageIndex: 0,
   *   rect: [100, 100, 200, 150],
   *   rotation: 0
   *   // id field is optional and will be ignored if provided
   * });
   */
  public async addEditorAnnotation(serializedAnnotation: string | EditorAnnotation): Promise<void> {
    // #3061 When the editor mode is NONE, PDF.js internally switches to FREETEXT mode temporarily,
    // which causes the FreeText popup to flash. Prevent this by hiding the popup during the operation.
    const currentMode = this.PDFViewerApplication?.pdfViewer.annotationEditorMode;
    const popup = document.getElementById('editorFreeTextParamsToolbar');
    const wasHidden = popup?.classList.contains('hidden') ?? true;

    // If mode is NONE and popup was hidden, keep it hidden during the temporary mode switch
    if (currentMode === 0 && wasHidden && popup) {
      this.renderer.addClass(popup, 'ngx-keep-hidden');
    }

    await this.PDFViewerApplication?.pdfViewer.addEditorAnnotation(serializedAnnotation);

    // #3061 Remove the temporary hiding class after the operation
    if (currentMode === 0 && wasHidden && popup) {
      this.renderer.removeClass(popup, 'ngx-keep-hidden');
    }
  }

  public removeEditorAnnotations(filter?: (serialized: object) => boolean): void {
    this.PDFViewerApplication?.pdfViewer.removeEditorAnnotations(filter);
  }

  private async loadImageAsDataURL(imageUrl: string): Promise<Blob | string> {
    if (imageUrl.startsWith('data:')) {
      return imageUrl;
    }
    const response = await fetch(imageUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch the image from ${imageUrl}: ${response.statusText}`);
    }

    const imageBlob = await response.blob();
    return imageBlob;
  }

  public async addImageToAnnotationLayer({ urlOrDataUrl, page, left, bottom, right, top, rotation }: PdfImageParameters): Promise<void> {
    if (!this.PDFViewerApplication) {
      console.error('The PDF viewer has not been initialized yet.');
      return;
    }
    let pageToModify: number;
    if (page !== undefined) {
      if (page !== this.currentPageIndex()) {
        await this.renderPage(page);
      }
      pageToModify = page;
    } else {
      pageToModify = this.currentPageIndex() ?? 0;
    }
    const previousAnnotationEditorMode = this.PDFViewerApplication.pdfViewer.annotationEditorMode;

    // #3061 Check if the stamp popup is currently hidden to prevent flashing
    const popup = document.getElementById('editorStampParamsToolbar');
    const wasHidden = popup?.classList.contains('hidden') ?? true;

    // If the popup was hidden, add a CSS class to keep it hidden during mode switch
    if (wasHidden && popup) {
      this.renderer.addClass(popup, 'ngx-keep-hidden');
    }

    this.switchAnnotationEdtorMode(13);
    const dataUrl = await this.loadImageAsDataURL(urlOrDataUrl);
    const pageSize = this.PDFViewerApplication.pdfViewer._pages[pageToModify].pdfPage.view;
    const leftDim = pageSize[0];
    const bottomDim = pageSize[1];
    const rightDim = pageSize[2];
    const topDim = pageSize[3];
    const width = rightDim - leftDim;
    const height = topDim - bottomDim;
    const imageWidth = this.PDFViewerApplication?.pdfViewer._pages[pageToModify].div.clientWidth;
    const imageHeight = this.PDFViewerApplication?.pdfViewer._pages[pageToModify].div.clientHeight;
    const leftPdf = this.convertToPDFCoordinates(left, width, 0, imageWidth);
    const bottomPdf = this.convertToPDFCoordinates(bottom, height, 0, imageHeight);
    const rightPdf = this.convertToPDFCoordinates(right, width, width, imageWidth);
    const topPdf = this.convertToPDFCoordinates(top, height, height, imageHeight);

    const stampAnnotation: StampEditorAnnotation = {
      annotationType: 13,
      pageIndex: pageToModify,
      bitmapUrl: dataUrl,
      rect: [leftPdf, bottomPdf, rightPdf, topPdf],
      rotation: rotation ?? 0,
      isCopy: true,
    };
    this.addEditorAnnotation(stampAnnotation);
    await this.sleep(10);
    this.switchAnnotationEdtorMode(previousAnnotationEditorMode);

    // #3061 Remove the temporary hiding class after switching back
    if (wasHidden && popup) {
      this.renderer.removeClass(popup, 'ngx-keep-hidden');
    }
  }

  public async addHighlightToAnnotationLayer(
    color: number[],
    page: number | undefined,
    left: number | string,
    bottom: number | string,
    right: number | string,
    top: number | string,
    thickness: number = 12,
    rotation: 0 | 90 | 180 | 270 = 0,
    opacity: number = 0.5,
  ): Promise<void> {
    if (!this.PDFViewerApplication) {
      console.error('The PDF viewer has not been initialized yet.');
      return;
    }

    let pageToModify: number;
    if (page !== undefined) {
      if (page !== this.currentPageIndex()) {
        await this.renderPage(page);
      }
      pageToModify = page;
    } else {
      pageToModify = this.currentPageIndex() ?? 0;
    }

    const previousAnnotationEditorMode = this.PDFViewerApplication.pdfViewer.annotationEditorMode;

    // #3061 Check if the popup is currently hidden to prevent flashing
    const popup = document.getElementById('editorHighlightParamsToolbar');
    const wasHidden = popup?.classList.contains('hidden') ?? true;

    // If the popup was hidden, add a CSS class to keep it hidden during mode switch
    if (wasHidden && popup) {
      this.renderer.addClass(popup, 'ngx-keep-hidden');
    }

    this.switchAnnotationEdtorMode(9); // AnnotationEditorType.HIGHLIGHT

    const pageSize = this.PDFViewerApplication.pdfViewer._pages[pageToModify].pdfPage.view;
    const leftDim = pageSize[0];
    const bottomDim = pageSize[1];
    const rightDim = pageSize[2];
    const topDim = pageSize[3];
    const width = rightDim - leftDim;
    const height = topDim - bottomDim;
    const pageWidth = this.PDFViewerApplication?.pdfViewer._pages[pageToModify].div.clientWidth;
    const pageHeight = this.PDFViewerApplication?.pdfViewer._pages[pageToModify].div.clientHeight;

    const leftPdf = this.convertToPDFCoordinates(left, width, 0, pageWidth);
    const bottomPdf = this.convertToPDFCoordinates(bottom, height, 0, pageHeight);
    const rightPdf = this.convertToPDFCoordinates(right, width, width, pageWidth);
    const topPdf = this.convertToPDFCoordinates(top, height, height, pageHeight);

    // Create quadPoints object with numeric keys (matching export format)
    const quadPoints: any = {};
    quadPoints[0] = leftPdf; // x1 - left edge start
    quadPoints[1] = topPdf; // y1 - top edge start
    quadPoints[2] = rightPdf; // x2 - right edge end
    quadPoints[3] = topPdf; // y2 - top edge end
    quadPoints[4] = leftPdf; // x3 - left edge start (bottom)
    quadPoints[5] = bottomPdf; // y3 - bottom edge start
    quadPoints[6] = rightPdf; // x4 - right edge end (bottom)
    quadPoints[7] = bottomPdf; // y4 - bottom edge end

    const highlightAnnotation: HighlightEditorAnnotation = {
      annotationType: 9,
      color: color,
      opacity: opacity,
      thickness: thickness,
      quadPoints: quadPoints,
      outlines: [
        [
          // Single outline rectangle
          leftPdf,
          bottomPdf, // Bottom-left
          leftPdf,
          topPdf, // Top-left
          rightPdf,
          topPdf, // Top-right
          rightPdf,
          bottomPdf, // Bottom-right
        ],
      ],
      pageIndex: pageToModify,
      rect: [leftPdf, bottomPdf, rightPdf, topPdf],
      rotation: rotation,
      isCopy: true,
    };

    this.addEditorAnnotation(highlightAnnotation);
    await this.sleep(10);
    this.switchAnnotationEdtorMode(previousAnnotationEditorMode);

    // #3061 Remove the temporary hiding class after switching back
    if (wasHidden && popup) {
      this.renderer.removeClass(popup, 'ngx-keep-hidden');
    }
  }

  public currentPageIndex(): number | undefined {
    const viewer = this.PDFViewerApplication?.pdfViewer;
    if (viewer) {
      return viewer.currentPageNumber - 1;
    }
    return undefined;
  }

  private convertToPDFCoordinates(value: ZoomType, maxValue: number, defaultValue: number, imageMaxValue: number): number {
    if (!value) {
      return defaultValue;
    }
    if (typeof value === 'string') {
      if (value.endsWith('%')) {
        return (parseInt(value, 10) / 100) * maxValue;
      } else if (value.endsWith('px')) {
        return parseInt(value, 10) * (maxValue / imageMaxValue);
      } else {
        return parseInt(value, 10);
      }
    } else {
      return value;
    }
  }

  public switchAnnotationEdtorMode(mode: number): void {
    this.PDFViewerApplication?.eventBus.dispatch('switchannotationeditormode', { mode });
  }

  public set editorFontSize(size: number) {
    this.setEditorProperty(AnnotationEditorParamsType.FREETEXT_SIZE, size);
  }

  public set editorFontColor(color: string) {
    this.setEditorProperty(AnnotationEditorParamsType.FREETEXT_COLOR, color);
  }

  public set editorInkColor(color: string) {
    this.setEditorProperty(AnnotationEditorParamsType.INK_COLOR, color);
  }

  public set editorInkOpacity(opacity: number) {
    this.setEditorProperty(AnnotationEditorParamsType.INK_OPACITY, opacity);
  }

  public set editorInkThickness(thickness: number) {
    this.setEditorProperty(AnnotationEditorParamsType.INK_THICKNESS, thickness);
  }

  public set editorHighlightColor(color: string) {
    this.setEditorProperty(AnnotationEditorParamsType.HIGHLIGHT_COLOR, color);
  }

  public set editorHighlightDefaultColor(color: string) {
    this.setEditorProperty(AnnotationEditorParamsType.HIGHLIGHT_DEFAULT_COLOR, color);
  }

  public set editorHighlightShowAll(showAll: boolean) {
    this.setEditorProperty(AnnotationEditorParamsType.HIGHLIGHT_SHOW_ALL, showAll);
  }

  public set editorHighlightThickness(thickness: number) {
    this.setEditorProperty(AnnotationEditorParamsType.HIGHLIGHT_THICKNESS, thickness);
  }

  public setEditorProperty(editorPropertyType: number, value: any): void {
    this.PDFViewerApplication?.eventBus.dispatch('switchannotationeditorparams', { type: editorPropertyType, value });
    this.PDFViewerApplication?.eventBus.dispatch('annotationeditorparamschanged', { details: [[editorPropertyType, value]] });
  }

  public getCurrentPage(): number {
    if (!this.PDFViewerApplication) {
      return 1;
    }
    return this.PDFViewerApplication.page ?? 1;
  }

  public getPageCount(): number {
    if (!this.PDFViewerApplication) {
      return 0;
    }
    return this.PDFViewerApplication.pagesCount ?? 0;
  }

  public movePage(fromIndex: number, toIndex: number): void {
    if (!this.PDFViewerApplication) {
      console.error('PDF viewer not initialized');
      return;
    }

    // Check if page reordering is enabled
    const enablePageReordering = (globalThis as any).pdfDefaultOptions?.enablePageReordering;
    if (!enablePageReordering) {
      console.error('Page reordering is not enabled. Set pdfDefaultOptions.enablePageReordering = true');
      return;
    }

    // Validate indices (1-based)
    const pageCount = this.getPageCount();
    if (fromIndex < 1 || fromIndex > pageCount || toIndex < 1 || toIndex > pageCount) {
      console.error(`Invalid page indices. fromIndex: ${fromIndex}, toIndex: ${toIndex}, pageCount: ${pageCount}`);
      return;
    }

    if (fromIndex === toIndex) {
      return; // No movement needed
    }

    try {
      // Call the movePage function from app.js
      if (this.PDFViewerApplication.movePage) {
        this.PDFViewerApplication.movePage(fromIndex, toIndex);
      } else {
        console.error('movePage function not available in PDF viewer application');
      }
    } catch (error) {
      console.error('Error moving page:', error);
    }
  }
}
