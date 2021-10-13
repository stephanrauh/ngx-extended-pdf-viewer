import { NgxExtendedPdfViewerComponent } from './ngx-extended-pdf-viewer.component';
import { PDFPrintRange } from './options/pdf-print-range';
import { IPDFViewerApplication } from './options/pdf-viewer-application';

export interface FindOptions {
  highlightAll?: boolean;
  matchCase?: boolean;
  wholeWords?: boolean;
  ignoreAccents?: boolean;
  findMultipleSearchTexts?: boolean;
  fuzzySearch?: boolean;
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

export class NgxExtendedPdfViewerService {
  constructor() {}

  public findMultiple(text: Array<string>, options: FindOptions = {}): boolean {
    options = {
      ...options,
      findMultipleSearchTexts: true,
    };
    const searchString = text.join('\n') + '\n';
    return this.find(searchString, options);
  }

  public find(text: string, options: FindOptions = {}): boolean {
    if (!NgxExtendedPdfViewerComponent.ngxExtendedPdfViewerInitialized) {
      // tslint:disable-next-line:quotemark
      console.error("The PDF viewer hasn't finished initializing. Please call find() later.");
      return false;
    } else {
      const highlightAllCheckbox = document.getElementById('findHighlightAll') as HTMLInputElement;
      if (highlightAllCheckbox) {
        highlightAllCheckbox.checked = options.highlightAll || false;
      }
      const matchCaseCheckbox = document.getElementById('findMatchCase') as HTMLInputElement;
      if (matchCaseCheckbox) {
        matchCaseCheckbox.checked = options.matchCase || false;
      }
      const entireWordCheckbox = document.getElementById('findEntireWord') as HTMLInputElement;
      if (entireWordCheckbox) {
        entireWordCheckbox.checked = options.wholeWords || false;
      }
      const findIgnoreAccentsCheckbox = document.getElementById('findIgnoreAccents') as HTMLInputElement;
      if (findIgnoreAccentsCheckbox) {
        findIgnoreAccentsCheckbox.checked = options.ignoreAccents || false;
      }
      const multipleSearchTerms = options.findMultipleSearchTexts || text.includes('\n') || false;
      const findMultipleSearchTextsCheckbox = document.getElementById('findMultipleSearchTexts') as HTMLInputElement;
      if (findMultipleSearchTextsCheckbox) {
        findMultipleSearchTextsCheckbox.checked = multipleSearchTerms;
      }
      const individualWordsModeCheckbox = document.getElementById('individualWordsMode') as HTMLInputElement;
      if (individualWordsModeCheckbox) {
        individualWordsModeCheckbox.checked = false;
      }
      const fuzzySearchCheckbox = document.getElementById('findFuzzy') as HTMLInputElement;
      if (fuzzySearchCheckbox) {
        fuzzySearchCheckbox.checked = options.fuzzySearch || false;
      }
      const inputField = multipleSearchTerms ? document.getElementById('findInputMultiline') : document.getElementById('findInput');
      if (inputField) {
        if (inputField instanceof HTMLTextAreaElement) {
          inputField.value = text;

          // todo dirty hack!
          inputField.classList.remove('hidden');
          (document.getElementById('findInput') as HTMLInputElement).classList.add('hidden');
          (document.getElementById('individualWordsModeLabel') as HTMLInputElement).classList.remove('hidden');
          (document.getElementById('individualWordsMode') as HTMLInputElement).classList.remove('hidden');
          // end of the dirty hack
        } else if (inputField instanceof HTMLInputElement) {
          inputField.value = text;
          // todo dirty hack!
          inputField.classList.remove('hidden');
          (document.getElementById('findInputMultiline') as HTMLInputElement).classList.add('hidden');
          (document.getElementById('individualWordsModeLabel') as HTMLInputElement).classList.add('hidden');
          (document.getElementById('individualWordsMode') as HTMLInputElement).classList.add('hidden');
          // end of the dirty hack
        }
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
    if (!NgxExtendedPdfViewerComponent.ngxExtendedPdfViewerInitialized) {
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
    if (!NgxExtendedPdfViewerComponent.ngxExtendedPdfViewerInitialized) {
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
    window['isInPDFPrintRange'] = (page: number) => this.isInPDFPrintRange(page, printRange as PDFPrintRange);
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
      let e = printRange.excluded as Array<number>;
      if (e.some((p) => p === page)) {
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

  public getPageAsText(pageNumber: number): Promise<string> {
    const PDFViewerApplication: IPDFViewerApplication = (window as any).PDFViewerApplication;
    const pdfDocument = PDFViewerApplication.pdfDocument;

    const pagePromise: Promise<any> = pdfDocument.getPage(pageNumber);

    const extractTextSnippets = (pdfPage) =>
      new Promise<any>((resolve, reject) => {
        const textSnippets = pdfPage.getTextContent();
        resolve(textSnippets);
      });
    const combineTextSnippets = (textSnippets) =>
      new Promise<string>((resolve, reject) => {
        const text = this.convertTextInfoToText(textSnippets);
        resolve(text);
      });
    return pagePromise.then(extractTextSnippets).then(combineTextSnippets);
  }

  private convertTextInfoToText(textInfo: any): string {
    if (!textInfo) {
      return '';
    }
    return textInfo.items.map((info) => info.str).join('');
  }

  public getPageAsImage(pageNumber: number, scale: PDFExportScaleFactor): Promise<any> {
    const PDFViewerApplication: IPDFViewerApplication = (window as any).PDFViewerApplication;
    const pdfDocument = PDFViewerApplication.pdfDocument;
    const pagePromise: Promise<any> = pdfDocument.getPage(pageNumber);
    const imagePromise = (pdfPage) =>
      new Promise<any>((resolve, reject) => {
        resolve(this.draw(pdfPage, scale));
      });

    return pagePromise.then(imagePromise);
  }

  private draw(pdfPage: any, scale: PDFExportScaleFactor): Promise<HTMLCanvasElement> {
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
      background: 'rgba(255, 0, 255, 0.3)'
    };
    const renderTask = pdfPage.render(renderContext);

    const dataUrlPromise = () =>
      new Promise<string>((resolve, reject) => {
        resolve(canvas.toDataURL());
      });

    return renderTask.promise.then(dataUrlPromise);
  }

  private getPageDrawContext(width: number, height: number): DrawContext {
    const canvas = document.createElement('canvas') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) {
      // tslint:disable-next-line: quotemark
      throw new Error("Couldn't create the 2d context");
    }

    canvas.width = width;
    canvas.height = height;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';

    return { ctx, canvas };
  }

  public async getCurrentDocumentAsBlob(): Promise<Blob> {
    const PDFViewerApplication: IPDFViewerApplication = (window as any).PDFViewerApplication;
    const data = await PDFViewerApplication.pdfDocument.saveDocument(PDFViewerApplication.pdfDocument.annotationStorage);
    return new Blob([data], { type: 'application/pdf' });
  }

  public async getFormData(): Promise<Array<Object>> {
    const PDFViewerApplication: IPDFViewerApplication = (window as any).PDFViewerApplication;
    const pdf /*: PDFDocumentProxy */ = PDFViewerApplication.pdfDocument;
    // screen DPI / PDF DPI
    const dpiRatio = 96 / 72;
    const result: Array<Object> = [];
    for (let i = 1; i <= pdf.numPages; i++) {
      // track the current page
      const currentPage /* : PDFPageProxy */ = await pdf.getPage(i);
      const annotations = await currentPage.getAnnotations();

      annotations
        .filter((a) => a.subtype === 'Widget') // get the form field annotations only
        .forEach((a) => {
          // get the rectangle that represent the single field
          // and resize it according to the current DPI
          const fieldRect: Array<number> = currentPage.getViewport({ scale: dpiRatio }).convertToViewportRectangle(a.rect);

          // add the corresponding input
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
    const nextPage = PDFViewerApplication.pdfViewer.renderingQueue.getHighestPriority(PDFViewerApplication.pdfViewer._getVisiblePages(), PDFViewerApplication.pdfViewer._pages, scrolledDown, renderExtra);
    return !nextPage;
  }

  public hasPageBeenRendered(pageIndex: number): boolean {
    const PDFViewerApplication: IPDFViewerApplication = (window as any).PDFViewerApplication;
    const pages = PDFViewerApplication.pdfViewer._pages;
    if (pages.length > pageIndex && pageIndex >= 0) {
      const pageView = pages[pageIndex];
      const isLoading = pageView.div.querySelector(".loadingIcon");
      return isLoading;
    }
    return false;
  }

  public numberOfPages(): number {
    const PDFViewerApplication: IPDFViewerApplication = (window as any).PDFViewerApplication;
    const pages = PDFViewerApplication.pdfViewer._pages;
    return pages.length;
  }
}
