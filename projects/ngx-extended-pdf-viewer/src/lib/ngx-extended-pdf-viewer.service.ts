import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { Subject } from 'rxjs';
import { EditorAnnotation, StampEditorAnnotation } from './options/editor-annotations';
import { PdfLayer } from './options/optional_content_config';
import { PDFPrintRange } from './options/pdf-print-range';
import { IPDFViewerApplication, PDFDocumentProxy, TextItem, TextMarkedContent } from './options/pdf-viewer-application';

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

  public recalculateSize$ = new Subject<void>();

  public secondaryMenuIsEmpty = false;

  private renderer: Renderer2;

  constructor(private rendererFactory: RendererFactory2) {
    this.renderer = this.rendererFactory.createRenderer(null, null);
  }

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
    const PDFViewerApplication: IPDFViewerApplication = (globalThis as any).PDFViewerApplication;
    if (PDFViewerApplication) {
      const alreadyThere = !!globalThis['isInPDFPrintRange'] && !printRange;
      if (!alreadyThere) {
        if (!printRange) {
          printRange = {} as PDFPrintRange;
        }
        this.setPrintRange(printRange);
      }
      (globalThis as any).printPDF();
      if (!alreadyThere) {
        PDFViewerApplication.eventBus.on('afterprint', () => {
          this.removePrintRange();
        });
      }
    }
  }

  public removePrintRange() {
    globalThis['isInPDFPrintRange'] = undefined;
    globalThis['filteredPageCount'] = undefined;
  }

  public setPrintRange(printRange: PDFPrintRange) {
    const PDFViewerApplication: IPDFViewerApplication = (globalThis as any).PDFViewerApplication;
    globalThis['isInPDFPrintRange'] = (page: number) => this.isInPDFPrintRange(page, printRange);
    globalThis['filteredPageCount'] = this.filteredPageCount(PDFViewerApplication?.pagesCount, printRange);
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
    const PDFViewerApplication: IPDFViewerApplication = (globalThis as any).PDFViewerApplication;
    if (PDFViewerApplication) {
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
    return [];
  }

  public async getPageAsText(pageNumber: number): Promise<string> {
    const PDFViewerApplication: IPDFViewerApplication = (globalThis as any).PDFViewerApplication;
    if (!PDFViewerApplication) {
      return '';
    }
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
    const PDFViewerApplication: IPDFViewerApplication = (globalThis as any).PDFViewerApplication;
    if (!PDFViewerApplication) {
      return Promise.resolve(undefined);
    }
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
    this.renderer.setStyle(canvas, 'width', `${width}px`);
    this.renderer.setStyle(canvas, 'height', `${height}px`);

    return { ctx, canvas };
  }

  public async getCurrentDocumentAsBlob(): Promise<Blob> {
    const PDFViewerApplication: IPDFViewerApplication = (globalThis as any).PDFViewerApplication;
    return await PDFViewerApplication?.export();
  }

  public async getFormData(currentFormValues = true): Promise<Array<Object>> {
    const PDFViewerApplication: IPDFViewerApplication = (globalThis as any).PDFViewerApplication;
    if (!PDFViewerApplication) {
      return [];
    }
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
    const PDFViewerApplication: IPDFViewerApplication = (globalThis as any).PDFViewerApplication;
    return PDFViewerApplication?.pdfViewer.addPageToRenderQueue(pageIndex);
  }

  public isRenderQueueEmpty(): boolean {
    const scrolledDown = true;
    const renderExtra = false;
    const PDFViewerApplication: IPDFViewerApplication = (globalThis as any).PDFViewerApplication;
    const nextPage = PDFViewerApplication?.pdfViewer.renderingQueue.getHighestPriority(
      PDFViewerApplication.pdfViewer._getVisiblePages(),
      PDFViewerApplication.pdfViewer._pages,
      scrolledDown,
      renderExtra
    );
    return !nextPage;
  }

  public hasPageBeenRendered(pageIndex: number): boolean {
    const PDFViewerApplication: IPDFViewerApplication = (globalThis as any).PDFViewerApplication;
    if (!PDFViewerApplication) {
      return false;
    }
    const pages = PDFViewerApplication.pdfViewer._pages;
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
    const PDFViewerApplication: IPDFViewerApplication = (globalThis as any).PDFViewerApplication;
    if (!PDFViewerApplication) {
      return [];
    }
    const pages = PDFViewerApplication.pdfViewer._pages;
    return pages.filter((page) => page.renderingState === 3).map((page) => page.id);
  }

  public numberOfPages(): number {
    const PDFViewerApplication: IPDFViewerApplication = (globalThis as any).PDFViewerApplication;
    if (!PDFViewerApplication) {
      return 0;
    }
    const pages = PDFViewerApplication.pdfViewer._pages;
    return pages.length;
  }

  public getCurrentlyVisiblePageNumbers(): Array<number> {
    const app = (globalThis as any).PDFViewerApplication as IPDFViewerApplication;
    if (!app) {
      return [];
    }
    const pages = (app.pdfViewer._getVisiblePages() as any).views as Array<any>;
    return pages?.map((page) => page.id);
  }

  public recalculateSize(): void {
    this.recalculateSize$.next();
  }

  public async listLayers(): Promise<Array<PdfLayer> | undefined> {
    const PDFViewerApplication: IPDFViewerApplication = (globalThis as any).PDFViewerApplication;
    if (!PDFViewerApplication) {
      return [];
    }

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
    const PDFViewerApplication: IPDFViewerApplication = (globalThis as any).PDFViewerApplication;
    if (!PDFViewerApplication) {
      return;
    }
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
    const PDFViewerApplication: IPDFViewerApplication = (globalThis as any).PDFViewerApplication;
    const viewer = PDFViewerApplication?.pdfViewer as any;
    viewer?.scrollPagePosIntoView(pageNumber, pageSpot);
  }

  public getSerializedAnnotations(): EditorAnnotation[] | null {
    const PDFViewerApplication: IPDFViewerApplication = (globalThis as any).PDFViewerApplication;
    return PDFViewerApplication?.pdfViewer.getSerializedAnnotations();
  }

  public addEditorAnnotation(serializedAnnotation: string | EditorAnnotation): void {
    const PDFViewerApplication: IPDFViewerApplication = (globalThis as any).PDFViewerApplication;
    PDFViewerApplication?.pdfViewer.addEditorAnnotation(serializedAnnotation);
  }

  public removeEditorAnnotations(filter?: (serialized: object) => boolean): void {
    const PDFViewerApplication: IPDFViewerApplication = (globalThis as any).PDFViewerApplication;
    PDFViewerApplication?.pdfViewer.removeEditorAnnotations(filter);
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
    const PDFViewerApplication: IPDFViewerApplication = (globalThis as any).PDFViewerApplication;
    if (PDFViewerApplication) {
      if (page !== undefined) {
        if (page !== this.currentPageIndex()) {
          await this.renderPage(page);
        }
      } else {
        page = this.currentPageIndex();
      }
      const previousAnnotationEditorMode = PDFViewerApplication.pdfViewer.annotationEditorMode;
      this.switchAnnotationEdtorMode(13);
      const dataUrl = await this.loadImageAsDataURL(urlOrDataUrl);
      const pageSize = PDFViewerApplication.pdfViewer._pages[page].pdfPage.view;
      const leftDim = pageSize[0];
      const bottomDim = pageSize[1];
      const rightDim = pageSize[2];
      const topDim = pageSize[3];
      const width = rightDim - leftDim;
      const height = topDim - bottomDim;
      const imageWidth = PDFViewerApplication.pdfViewer._pages[page].div.clientWidth;
      const imageHeight = PDFViewerApplication.pdfViewer._pages[page].div.clientHeight;

      const leftPdf = this.convertToPDFCoordinates(left, width, 0, imageWidth);
      const bottomPdf = this.convertToPDFCoordinates(bottom, height, 0, imageHeight);
      const rightPdf = this.convertToPDFCoordinates(right, width, width, imageWidth);
      const topPdf = this.convertToPDFCoordinates(top, height, height, imageHeight);

      const stampAnnotation: StampEditorAnnotation = {
        annotationType: 13,
        pageIndex: page,
        bitmapUrl: dataUrl,
        rect: [leftPdf, bottomPdf, rightPdf, topPdf],
        rotation: rotation ?? 0,
      };
      this.addEditorAnnotation(stampAnnotation);
      await this.sleep(10);
      this.switchAnnotationEdtorMode(previousAnnotationEditorMode);
    }
  }

  public currentPageIndex(): number {
    const PDFViewerApplication: IPDFViewerApplication = (globalThis as any).PDFViewerApplication;
    return PDFViewerApplication?.pdfViewer.currentPageNumber - 1;
  }

  private convertToPDFCoordinates(value: string | number | undefined, maxValue: number, defaultValue: number, imageMaxValue: number): number {
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
    const PDFViewerApplication: IPDFViewerApplication = (globalThis as any).PDFViewerApplication;
    PDFViewerApplication?.eventBus.dispatch('switchannotationeditormode', { mode });
  }
}
