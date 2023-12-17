import { Subject } from 'rxjs';
import { PdfLayer } from './options/optional_content_config';
import { PDFPrintRange } from './options/pdf-print-range';
import { IPDFViewerApplication, PDFDocumentProxy, TextItem, TextMarkedContent } from './options/pdf-viewer-application';
import { EditorAnnotation } from './options/pdf-viewer';

export interface FindOptions {
  highlightAll?: boolean;
  matchCase?: boolean;
  wholeWords?: boolean;
  matchDiacritics?: boolean;
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

export class NgxExtendedPdfViewerService {

  public ngxExtendedPdfViewerInitialized = false;

  public recalculateSize$ = new Subject<void>();

  public secondaryMenuIsEmpty = false;

  public find(text: string, options: FindOptions = {}): boolean {
    if (!this.ngxExtendedPdfViewerInitialized) {
      // tslint:disable-next-line:quotemark
      console.error("The PDF viewer hasn't finished initializing. Please call find() later.");
      return false;
    } else {
      const highlightAllCheckbox = document.getElementById('findHighlightAll') as HTMLInputElement;
      if (highlightAllCheckbox) {
        highlightAllCheckbox.checked = options.highlightAll ?? false;
      }

      const matchCaseCheckbox = document.getElementById('findMatchCase') as HTMLInputElement;
      if (matchCaseCheckbox) {
        matchCaseCheckbox.checked = options.matchCase ?? false;
      }
      const entireWordCheckbox = document.getElementById('findEntireWord') as HTMLInputElement;
      if (entireWordCheckbox) {
        entireWordCheckbox.checked = options.wholeWords ?? false;
      }
      const matchDiacriticsCheckbox = document.getElementById('findMatchDiacritics') as HTMLInputElement;
      if (matchDiacriticsCheckbox) {
        matchDiacriticsCheckbox.checked = options.matchDiacritics ?? false;
      }
      const inputField = document.getElementById('findInput') as HTMLInputElement;
      if (inputField) {
        inputField.value = text;
        // todo dirty hack!
        inputField.classList.remove('hidden');
        // end of the dirty hack
        inputField.dispatchEvent(new Event('input'));
        return true;
      } else {
        // tslint:disable-next-line:quotemark
        console.error("Unexpected error: the input field used to search isn't part of the DOM.");
        return false;
      }
    }
  }

  public findNext(): boolean {
    if (!this.ngxExtendedPdfViewerInitialized) {
      // tslint:disable-next-line:quotemark
      console.error("The PDF viewer hasn't finished initializing. Please call findNext() later.");
      return false;
    } else {
      const button = document.getElementById('findNext');
      if (button) {
        button.click();
        return true;
      }
      return false;
    }
  }

  public findPrevious(): boolean {
    if (!this.ngxExtendedPdfViewerInitialized) {
      // tslint:disable-next-line:quotemark
      console.error("The PDF viewer hasn't finished initializing. Please call findPrevious() later.");
      return false;
    } else {
      const button = document.getElementById('findPrevious');
      if (button) {
        button.click();
        return true;
      }
      return false;
    }
  }

  public print(printRange?: PDFPrintRange) {
    const PDFViewerApplication: IPDFViewerApplication = (window as any).PDFViewerApplication;
    const alreadyThere = !!window['isInPDFPrintRange'] && !printRange;
    if (!alreadyThere) {
      if (!printRange) {
        printRange = {} as PDFPrintRange;
      }
      this.setPrintRange(printRange);
    }
    (window as any).printPDF();
    if (!alreadyThere) {
      PDFViewerApplication.eventBus.on('afterprint', () => {
        this.removePrintRange();
      });
    }
  }

  public removePrintRange() {
    window['isInPDFPrintRange'] = undefined;
    window['filteredPageCount'] = undefined;
  }

  public setPrintRange(printRange: PDFPrintRange) {
    const PDFViewerApplication: IPDFViewerApplication = (window as any).PDFViewerApplication;
    window['isInPDFPrintRange'] = (page: number) => this.isInPDFPrintRange(page, printRange);
    window['filteredPageCount'] = this.filteredPageCount(PDFViewerApplication.pagesCount, printRange);
  }

  public filteredPageCount(pageCount: number, range: PDFPrintRange): number {
    let result = 0;
    for (let page = 1; page <= pageCount; page++) {
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
    const PDFViewerApplication: IPDFViewerApplication = (window as any).PDFViewerApplication;
    const pdfDocument = PDFViewerApplication.pdfDocument;

    const page = await pdfDocument.getPage(pageNumber);
    const textSnippets = (await page.getTextContent()).items //
      .filter((info) => !info['type']); // ignore the TextMarkedContent items

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
      if (!currentSnippet.hasEOL) {
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
      }

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

  public async getPageAsText(pageNumber: number): Promise<string> {
    const PDFViewerApplication: IPDFViewerApplication = (window as any).PDFViewerApplication;
    const pdfDocument = PDFViewerApplication.pdfDocument;

    const page = await pdfDocument.getPage(pageNumber);
    const textSnippets = (await page.getTextContent()).items;
    return this.convertTextInfoToText(textSnippets);
  }

  private convertTextInfoToText(textInfoItems: Array<TextItem | TextMarkedContent>): string {
    if (!textInfoItems) {
      return '';
    }
    return textInfoItems
      .filter((info) => !info['type'])
      .map((info: TextItem) => (info.hasEOL ? info.str + '\n' : info.str))
      .join('');
  }

  public getPageAsImage(pageNumber: number, scale: PDFExportScaleFactor, background?: string, backgroundColorToReplace: string = '#FFFFFF'): Promise<any> {
    const PDFViewerApplication: IPDFViewerApplication = (window as any).PDFViewerApplication;
    const pdfDocument = PDFViewerApplication.pdfDocument;
    const pagePromise: Promise<any> = pdfDocument.getPage(pageNumber);
    const imagePromise = (pdfPage) => Promise.resolve(this.draw(pdfPage, scale, background, backgroundColorToReplace));

    return pagePromise.then(imagePromise);
  }

  private draw(pdfPage: any, scale: PDFExportScaleFactor, background?: string, backgroundColorToReplace: string = '#FFFFFF'): Promise<HTMLCanvasElement> {
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
    };
    const renderTask = pdfPage.render(renderContext);

    const dataUrlPromise = () => Promise.resolve(canvas.toDataURL());

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
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    return { ctx, canvas };
  }

  public async getCurrentDocumentAsBlob(): Promise<Blob> {
    const PDFViewerApplication: IPDFViewerApplication = (window as any).PDFViewerApplication;
    return await PDFViewerApplication.export();
  }

  public async getFormData(currentFormValues = true): Promise<Array<Object>> {
    const PDFViewerApplication: IPDFViewerApplication = (window as any).PDFViewerApplication;
    const pdf: PDFDocumentProxy | undefined = PDFViewerApplication.pdfDocument;
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
                const currentValue: any = PDFViewerApplication.pdfDocument.annotationStorage.getValue(a.id, a.fieldName + '/' + a.exportValue, '');
                a.value = currentValue?.value;
              } else if (a.radioButton) {
                const currentValue: any = PDFViewerApplication.pdfDocument.annotationStorage.getValue(a.id, a.fieldName + '/' + a.fieldValue, '');
                a.value = currentValue?.value;
              } else {
                const currentValue: any = PDFViewerApplication.pdfDocument.annotationStorage.getValue(a.id, a.fieldName, '');
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
   * @returns {boolean} false, if the page has already been rendered
   * or if it's out of range
   */
  public addPageToRenderQueue(pageIndex: number): boolean {
    const PDFViewerApplication: IPDFViewerApplication = (window as any).PDFViewerApplication;
    return PDFViewerApplication.pdfViewer.addPageToRenderQueue(pageIndex);
  }

  public isRenderQueueEmpty(): boolean {
    const scrolledDown = true;
    const renderExtra = false;
    const PDFViewerApplication: IPDFViewerApplication = (window as any).PDFViewerApplication;
    const nextPage = PDFViewerApplication.pdfViewer.renderingQueue.getHighestPriority(
      PDFViewerApplication.pdfViewer._getVisiblePages(),
      PDFViewerApplication.pdfViewer._pages,
      scrolledDown,
      renderExtra
    );
    return !nextPage;
  }

  public hasPageBeenRendered(pageIndex: number): boolean {
    const PDFViewerApplication: IPDFViewerApplication = (window as any).PDFViewerApplication;
    const pages = PDFViewerApplication.pdfViewer._pages;
    if (pages.length > pageIndex && pageIndex >= 0) {
      const pageView = pages[pageIndex];
      const isLoading = pageView.renderingState === 3;
      return !isLoading;
    }
    return false;
  }

  public currentlyRenderedPages(): Array<number> {
    const PDFViewerApplication: IPDFViewerApplication = (window as any).PDFViewerApplication;
    const pages = PDFViewerApplication.pdfViewer._pages;
    return pages.filter((page) => page.renderingState === 3).map((page) => page.id);
  }

  public numberOfPages(): number {
    const PDFViewerApplication: IPDFViewerApplication = (window as any).PDFViewerApplication;
    const pages = PDFViewerApplication.pdfViewer._pages;
    return pages.length;
  }

  public getCurrentlyVisiblePageNumbers(): Array<number> {
    const app = (window as any).PDFViewerApplication as IPDFViewerApplication;
    const pages = (app.pdfViewer._getVisiblePages() as any).views as Array<any>;
    return pages?.map((page) => page.id);
  }

  public recalculateSize(): void {
    this.recalculateSize$.next();
  }

  public async listLayers(): Promise<Array<PdfLayer> | undefined> {
    const PDFViewerApplication: IPDFViewerApplication = (window as any).PDFViewerApplication;

    const optionalContentConfig = await PDFViewerApplication.pdfViewer.optionalContentConfigPromise;
    if (optionalContentConfig) {
      const levelData = optionalContentConfig.getOrder();
      const layerIds = levelData.filter((groupId) => typeof groupId !== 'object');
      return layerIds.map((layerId) => {
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
    const PDFViewerApplication: IPDFViewerApplication = (window as any).PDFViewerApplication;
    const optionalContentConfig = await PDFViewerApplication.pdfViewer.optionalContentConfigPromise;
    if (optionalContentConfig) {
      let isVisible = optionalContentConfig.getGroup(layerId).visible;
      const checkbox = document.querySelector(`input[id='${layerId}']`);
      if (checkbox) {
        isVisible = (checkbox as HTMLInputElement).checked;
        (checkbox as HTMLInputElement).checked = !isVisible;
      }
      optionalContentConfig.setVisibility(layerId, !isVisible);
      PDFViewerApplication.eventBus.dispatch('optionalcontentconfig', {
        source: this,
        promise: Promise.resolve(optionalContentConfig),
      });
    }
  }

  public scrollPageIntoView(pageNumber: number, pageSpot?: { top?: number | string; left?: number | string }): void {
    const PDFViewerApplication: IPDFViewerApplication = (window as any).PDFViewerApplication;
    const viewer = PDFViewerApplication.pdfViewer as any;
    viewer.scrollPagePosIntoView(pageNumber, pageSpot);
  }

  public getSerializedAnnotations(): EditorAnnotation[] | null {
    const PDFViewerApplication: IPDFViewerApplication = (window as any).PDFViewerApplication;
    return PDFViewerApplication.pdfViewer.getSerializedAnnotations();
  }

  public addEditorAnnotation(serializedAnnotation: string | EditorAnnotation): void {
    const PDFViewerApplication: IPDFViewerApplication = (window as any).PDFViewerApplication;
    PDFViewerApplication.pdfViewer.addEditorAnnotation(serializedAnnotation);
  }

  public removeEditorAnnotations(filter?: (serialized: object) => boolean): void {
    const PDFViewerApplication: IPDFViewerApplication = (window as any).PDFViewerApplication;
    PDFViewerApplication.pdfViewer.removeEditorAnnotations(filter);
  }
}
