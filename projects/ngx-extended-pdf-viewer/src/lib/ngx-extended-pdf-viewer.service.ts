import { effect, Injectable, Renderer2, RendererFactory2, signal } from '@angular/core';
import { AnnotationEditorParamsType, AnnotationMode, EditorAnnotation, HighlightEditorAnnotation, StampEditorAnnotation } from './options/editor-annotations';
import { PdfLayer } from './options/optional_content_config';
import { PdfPageInfo, PdfPageSelection } from './options/pdf-page-info';
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

/**
 * A rectangular region of a page, expressed in normalized coordinates on the
 * page's *un-rotated* frame. Every value is a fraction between 0 and 1, measured
 * from the top-left corner of the un-rotated page (x grows to the right, y grows
 * downwards).
 *
 * To screenshot a single annotation, use the editor's rotation-independent
 * rectangle `event.source.normalizedPageRect` (from the `annotationEditorEvent`),
 * which is already in this coordinate system. Note that the editor's raw
 * `x`/`y`/`width`/`height` are **not** suitable here: they are stored in whatever
 * rotation the page had when the annotation was added (axes swapped for 90°/270°),
 * so they only match this frame when the annotation was added un-rotated.
 *
 * Example: the upper-left quarter of a page is `{ x: 0, y: 0, width: 0.5, height: 0.5 }`.
 */
export interface PdfPageCropBox {
  /** Distance of the left edge from the left of the page, as a fraction (0..1). */
  x: number;
  /** Distance of the top edge from the top of the page, as a fraction (0..1). */
  y: number;
  /** Width of the region, as a fraction of the page width (0..1). */
  width: number;
  /** Height of the region, as a fraction of the page height (0..1). */
  height: number;
}

/**
 * Rotation (in degrees, clockwise) to render a page at, e.g. when exporting it
 * via {@link NgxExtendedPdfViewerService.getPageAsCanvas} /
 * {@link NgxExtendedPdfViewerService.getPageAsImage}. Overrides the rotation the
 * user applied in the viewer. `0` gives the page in its authored orientation
 * regardless of how the user rotated it; `90`/`180`/`270` force that rotation.
 * Omit it to follow the user's current on-screen rotation.
 */
export type PdfPageRotation = 0 | 90 | 180 | 270;

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

/**
 * A PDF file or an image you want to merge into the document that's currently open:
 * a URL, a `File` from a file picker, a `Blob`, the raw bytes, or an `ImageBitmap`.
 */
export type PdfMergeSource = string | URL | Blob | ArrayBuffer | ArrayBufferView | ImageBitmap;

export interface PdfMergeOptions {
  /**
   * The page number after which the new pages are inserted, counting from 1.
   * Pass `0` to insert them **before the first page**. If you omit it, the pages
   * are appended at the end of the document.
   */
  insertAfterPage?: number | undefined;

  /**
   * Which pages of the added file to insert, counting from 1. Accepts single page
   * numbers and inclusive ranges, e.g. `[1, [4, 8]]`. Defaults to every page.
   * Ignored when you add an image.
   */
  includePages?: PdfPageSelection | undefined;

  /**
   * Which pages of the added file to skip, counting from 1. Applied after
   * `includePages`. Ignored when you add an image.
   */
  excludePages?: PdfPageSelection | undefined;

  /** The password of the added file, if it is encrypted. */
  password?: string | undefined;
}

@Injectable({
  providedIn: 'root',
})
export class NgxExtendedPdfViewerService {
  /**
   * Tracks the most recently mounted `<ngx-extended-pdf-viewer>` instance's `openPDF()`
   * completion. Public for backward compatibility — historically used as the "is the viewer
   * ready?" gate when the library only supported a single instance at a time.
   *
   * Today this flag is **not** the source of truth for the service's own `find()` /
   * `findNext()` / `findPrevious()` methods; those gate on the live `findController`
   * directly. Component-internal effect guards have moved to a per-instance flag.
   *
   * In a future multi-viewer world this field will likely become "any viewer is mounted".
   * Prefer querying viewer state via a viewer reference (see future API) instead of via
   * this singleton flag.
   */
  public ngxExtendedPdfViewerInitialized = false;

  public secondaryMenuIsEmpty = signal(false);

  private readonly renderer: Renderer2;
  private PDFViewerApplication?: IPDFViewerApplication | undefined;

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
    // #3216 Gate on the live findController rather than the public flag — the controller is
    // the actual authority on "can I find?", and the flag can be stale across destroy/recreate.
    const findController = options.useSecondaryFindcontroller ? this.PDFViewerApplication?.customFindController : this.PDFViewerApplication?.findController;
    if (!findController) {
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
      const result = findController.ngxFind(findParameters);
      return result;
    }
  }

  public findNext(useSecondaryFindcontroller: boolean = false): boolean {
    // #3216 Gate on the live findController, not the public flag.
    const findController = useSecondaryFindcontroller ? this.PDFViewerApplication?.customFindController : this.PDFViewerApplication?.findController;
    if (!findController) {
      // tslint:disable-next-line:quotemark
      console.error("The PDF viewer hasn't finished initializing. Please call findNext() later.");
      return false;
    } else {
      findController.ngxFindNext();
      return true;
    }
  }

  public findPrevious(useSecondaryFindcontroller: boolean = false): boolean {
    // #3216 Gate on the live findController, not the public flag.
    const findController = useSecondaryFindcontroller ? this.PDFViewerApplication?.customFindController : this.PDFViewerApplication?.findController;
    if (!findController) {
      // tslint:disable-next-line:quotemark
      console.error("The PDF viewer hasn't finished initializing. Please call findPrevious() later.");
      return false;
    } else {
      findController.ngxFindPrevious();
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

  /**
   * Renders a single page to an off-screen `<canvas>`.
   *
   * @param pageNumber 1-based page number to render.
   * @param scale How large the rendered page should be. Provide exactly one of
   *        `width`, `height` (both in pixels) or `scale` (a zoom factor, e.g. `2`).
   * @param background Optional CSS color painted behind the page (e.g. `'rgba(255,0,0,0.3)'`).
   * @param backgroundColorToReplace The page background color that is replaced by `background`. Defaults to white.
   * @param annotationMode Which annotations to render. Defaults to
   *        `AnnotationMode.ENABLE_STORAGE`, so the screenshot includes what you
   *        see on screen: saved annotations, current form-field values, and
   *        annotations you just added with the editor (e.g. an image stamp) that
   *        haven't been saved into the PDF yet. Pass `AnnotationMode.ENABLE` to
   *        get only the annotations already baked into the document, or
   *        `AnnotationMode.DISABLE` for none.
   * @param cropBox Optional region to crop to, in normalized 0..1 coordinates on
   *        the page's *un-rotated* frame (top-left origin). When set, only that
   *        part of the page is returned; the crop is rotated to follow the
   *        rendered rotation for you. To screenshot a single annotation, pass the
   *        editor's rotation-independent rectangle: `event.source.normalizedPageRect`
   *        (do **not** pass the raw `x`/`y`/`width`/`height`, which are stored in
   *        the rotation the annotation was added at). See {@link PdfPageCropBox}.
   * @param rotation Optional rotation override (`0`, `90`, `180` or `270`). By
   *        default the screenshot follows the rotation the user applied in the
   *        viewer. Pass `0` to always get the page in its authored orientation
   *        regardless of the user's rotation, or `90`/`180`/`270` to force a
   *        specific rotation. See {@link PdfPageRotation}.
   * @returns The rendered (and optionally cropped) canvas, or `undefined` if no document is loaded.
   */
  public async getPageAsCanvas(
    pageNumber: number,
    scale: PDFExportScaleFactor,
    background?: string,
    backgroundColorToReplace: string = '#FFFFFF',
    annotationMode: AnnotationMode = AnnotationMode.ENABLE_STORAGE,
    cropBox?: PdfPageCropBox,
    rotation?: PdfPageRotation,
  ): Promise<HTMLCanvasElement | undefined> {
    if (!this.PDFViewerApplication) {
      return undefined;
    }
    const pdfDocument = this.PDFViewerApplication.pdfDocument;
    const pdfPage = await pdfDocument.getPage(pageNumber);
    return this.draw(pdfPage, scale, background, backgroundColorToReplace, annotationMode, cropBox, rotation);
  }

  /**
   * Renders a single page and returns it as a PNG data URL.
   *
   * Same parameters as {@link NgxExtendedPdfViewerService.getPageAsCanvas}; in
   * particular `cropBox` lets you export just a sub-region (e.g. a single
   * annotation) using normalized 0..1 page-relative coordinates.
   *
   * @returns A `data:image/png;base64,...` string, or `undefined` if no document is loaded.
   */
  public async getPageAsImage(
    pageNumber: number,
    scale: PDFExportScaleFactor,
    background?: string,
    backgroundColorToReplace: string = '#FFFFFF',
    annotationMode: AnnotationMode = AnnotationMode.ENABLE_STORAGE,
    cropBox?: PdfPageCropBox,
    rotation?: PdfPageRotation,
  ): Promise<string | undefined> {
    const canvas = await this.getPageAsCanvas(pageNumber, scale, background, backgroundColorToReplace, annotationMode, cropBox, rotation);
    return canvas?.toDataURL();
  }

  private async draw(
    pdfPage: PDFPageProxy,
    scale: PDFExportScaleFactor,
    background?: string,
    backgroundColorToReplace: string = '#FFFFFF',
    annotationMode: AnnotationMode = AnnotationMode.ENABLE_STORAGE,
    cropBox?: PdfPageCropBox,
    rotationOverride?: PdfPageRotation,
  ): Promise<HTMLCanvasElement> {
    // #3234 modified by ngx-extended-pdf-viewer
    // Render the page in its current on-screen orientation. getViewport() only
    // defaults to the page's intrinsic /Rotate; it ignores the rotation the user
    // applied in the viewer. Without passing that in, a screenshot of a rotated
    // page would come out in the un-rotated orientation (#3234). Callers can
    // override the user's rotation via `rotationOverride` (e.g. pass 0 to always
    // get the authored orientation); when omitted the user's current rotation wins.
    const userRotation = rotationOverride ?? this.PDFViewerApplication?.pdfViewer?.pagesRotation ?? 0;
    const rotation = (userRotation + pdfPage.rotate) % 360;

    let zoomFactor = 1;
    if (scale.scale) {
      zoomFactor = scale.scale;
    } else if (scale.width) {
      zoomFactor = scale.width / pdfPage.getViewport({ scale: 1, rotation }).width;
    } else if (scale.height) {
      zoomFactor = scale.height / pdfPage.getViewport({ scale: 1, rotation }).height;
    }
    const viewport = pdfPage.getViewport({
      scale: zoomFactor,
      rotation,
    });
    // #3234 end of modification by ngx-extended-pdf-viewer
    const { ctx, canvas } = this.getPageDrawContext(viewport.width, viewport.height);
    const drawViewport = viewport.clone();

    const renderContext = {
      canvasContext: ctx,
      viewport: drawViewport,
      // Omit `background` when undefined: pdf.js's RenderParameters types it as
      // `string | Object` (no `undefined`), which trips exactOptionalPropertyTypes.
      ...(background !== undefined && { background }),
      backgroundColorToReplace,
      annotationMode,
    };
    const renderTask = pdfPage.render(renderContext);

    // #3234 modified by ngx-extended-pdf-viewer
    // The cropBox is expressed in the page's un-rotated coordinate space (e.g. an
    // editor's `normalizedPageRect`). The canvas above is rendered at `rotation`
    // degrees, so we rotate the cropBox by the same amount to hit the right region;
    // otherwise a rotated screenshot crops the wrong part of the page (#3234).
    const effectiveCropBox = cropBox ? this.rotateCropBox(cropBox, rotation) : undefined;
    const result = () => (effectiveCropBox ? this.cropCanvas(canvas, effectiveCropBox) : canvas);
    // #3234 end of modification by ngx-extended-pdf-viewer

    return renderTask.promise.then(result);
  }

  /**
   * Rotates a normalized (0..1, top-left origin) cropBox from the page's
   * un-rotated coordinate space into the space of a canvas rendered at
   * `rotation` degrees clockwise. For 90°/270° the width and height swap axes.
   */
  private rotateCropBox(cropBox: PdfPageCropBox, rotation: number): PdfPageCropBox {
    const { x, y, width, height } = cropBox;
    switch (((rotation % 360) + 360) % 360) {
      case 90:
        return { x: 1 - y - height, y: x, width: height, height: width };
      case 180:
        return { x: 1 - x - width, y: 1 - y - height, width, height };
      case 270:
        return { x: y, y: 1 - x - width, width: height, height: width };
      default:
        return cropBox;
    }
  }

  /**
   * Returns a new canvas containing only the region described by `cropBox`
   * (normalized 0..1 page-relative coordinates, top-left origin) of `source`.
   */
  private cropCanvas(source: HTMLCanvasElement, cropBox: PdfPageCropBox): HTMLCanvasElement {
    const sx = Math.round(cropBox.x * source.width);
    const sy = Math.round(cropBox.y * source.height);
    const sw = Math.max(1, Math.round(cropBox.width * source.width));
    const sh = Math.max(1, Math.round(cropBox.height * source.height));
    const { ctx, canvas } = this.getPageDrawContext(sw, sh);
    ctx.drawImage(source, sx, sy, sw, sh, 0, 0, sw, sh);
    return canvas;
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
          // and resize it according to the current DPI.
          // pdf.js 6.1 removed PageViewport.convertToViewportRectangle, so inline
          // the equivalent: apply the viewport transform to both rect corners.
          const { transform } = currentPage.getViewport({ scale: dpiRatio });
          const toViewport = (x: number, y: number): [number, number] => [
            x * transform[0] + y * transform[2] + transform[4],
            x * transform[1] + y * transform[3] + transform[5],
          ];
          const [vx1, vy1] = toViewport(a.rect[0], a.rect[1]);
          const [vx2, vy2] = toViewport(a.rect[2], a.rect[3]);
          const fieldRect: Array<number> = [vx1, vy1, vx2, vy2];

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
      await this.addPageToRenderQueue(pageIndex); // NOSONAR — awaiting non-Promise is intentional, keeps the loop structure simple
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
   * **Two kinds of identifier:**
   * - `id` — a **temporary** identifier (`pdfjs_internal_editor_N`) regenerated
   *   every session. Useful for live event tracking via `annotationEditorEvent`,
   *   but it is **not** stable, so do not persist it.
   * - `customId` — a **stable**, developer-supplied identifier (e.g. a UUID).
   *   It is only present if you set it (see below). Unlike `id`, it survives the
   *   `getSerializedAnnotations()` → store → `addEditorAnnotation()` round-trip,
   *   so it is the field to rely on when correlating saved annotations.
   *
   * **Example - Stable IDs across sessions (#3225):**
   * ```typescript
   * // First save: assign your own stable id to each annotation.
   * const annotations = pdfService.getSerializedAnnotations() ?? [];
   * const toStore = annotations.map((a) => ({ ...a, customId: a.customId ?? crypto.randomUUID() }));
   * localStorage.setItem('annotations', JSON.stringify(toStore));
   *
   * // Restore: customId is preserved (the temporary `id` is regenerated).
   * const stored = JSON.parse(localStorage.getItem('annotations')!);
   * await pdfService.addEditorAnnotation(stored);
   * // getSerializedAnnotations() now returns the same customId values.
   * ```
   *
   * @returns Array of serialized annotations (each with a temporary `id`, plus a
   *          stable `customId` if you assigned one), or null if none exist
   */
  public getSerializedAnnotations(): EditorAnnotation[] | null | undefined {
    // #2424 modified by ngx-extended-pdf-viewer
    // Auto-commit any active annotation editor before serializing, so that
    // annotations still being edited are included in the result.
    (this.PDFViewerApplication?.pdfViewer as any)?.annotationEditorUIManager?.commitOrRemove();
    // #2424 end of modification by ngx-extended-pdf-viewer
    return this.PDFViewerApplication?.pdfViewer.getSerializedAnnotations();
  }

  // #3076 added by ngx-extended-pdf-viewer
  /**
   * Returns a single editor annotation by its identifier.
   *
   * Matches against **both** identifiers, so you can look an annotation up by
   * either the temporary `id` (e.g. the one carried by an `annotationEditorEvent`)
   * or the stable `customId` you assigned (see {@link getSerializedAnnotations}).
   *
   * @param id The annotation's temporary `id` or its stable `customId`
   * @returns The serialized annotation matching the identifier, or null if not found
   */
  public getSerializedAnnotation(id: string): EditorAnnotation | null | undefined {
    // #2424: use our wrapper which auto-commits active editors
    const annotations = this.getSerializedAnnotations();
    if (!annotations || !Array.isArray(annotations)) {
      return null;
    }
    // #3225 match on the stable customId as well as the temporary id. The
    // `customId != null` guard keeps a nullish query from matching annotations
    // that simply have no customId (preserves the #3076 `id`-only behavior).
    return annotations.find((annotation) => annotation.id === id || (annotation.customId != null && annotation.customId === id)) || null;
  }
  // #3076 end of modification by ngx-extended-pdf-viewer

  /**
   * Programmatically adds one or more editor annotations to the PDF.
   *
   * **ID Behavior:**
   * - The temporary `id` field is **ignored** - a fresh internal id is always
   *   assigned, so no id conflicts can occur.
   * - The stable `customId` field, if present, is **preserved** (#3225). Set it
   *   to your own value (e.g. a UUID) before storing, and the restored
   *   annotation keeps it - `getSerializedAnnotations()` will return it again.
   *   Uniqueness of `customId` values is your responsibility.
   *
   * **Supported Annotation Types:**
   * - Ink (drawings)
   * - FreeText (text boxes)
   * - Stamp (images)
   * - Highlight
   * - Popup (comments)
   *
   * **Timing:** an annotation is added to a page's annotation _editor_ layer,
   * which is created only after that page has been rendered (slightly after the
   * display annotation layer). Wait for the page's `(annotationEditorLayerRendered)`
   * event before calling this method - **not** `(annotationLayerRendered)`, which
   * fires too early. Calling it before the editor layer exists logs
   * `paste: "Cannot read properties of undefined (reading 'deserialize')"` and adds
   * nothing (see issue #2656).
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
   *   rotation: 0,
   *   // `id` is ignored; set `customId` if you want a stable id that survives the round-trip
   *   customId: 'a3f1c2e0-...'
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

  /**
   * Adds an image to a page as a stamp (editor) annotation. Since this is a
   * viewer rather than an editor, the image is placed on the annotation editor
   * layer; in most cases the result is indistinguishable from a real stamp.
   *
   * The `left`, `bottom`, `right`, and `top` coordinates accept percentages
   * (e.g. `'50%'`), pixels (e.g. `'100px'`), or PDF coordinates (e.g. `100`).
   * Omitted coordinates default to the logical origin (`left`/`bottom` to `0`,
   * `right`/`top` to `'100%'`). If `page` is omitted, the current page is used.
   *
   * **Timing:** wait for the target page's `(annotationEditorLayerRendered)`
   * event before calling this - **not** `(annotationLayerRendered)`. The editor
   * layer is created only after the page is rendered, so calling it too early
   * logs `paste: "Cannot read properties of undefined (reading 'deserialize')"`
   * and adds nothing (see issue #2656). On large, lazily-rendered documents,
   * add each page's image from its own `(annotationEditorLayerRendered)` handler.
   *
   * @param parameters The image source, optional target page, position, and rotation
   * @returns Promise that resolves once the image has been added
   */
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

    const rect = NgxExtendedPdfViewerService.toPageRect(leftPdf, bottomPdf, rightPdf, topPdf, width, height, 'addImageToAnnotationLayer');
    if (!rect) {
      this.switchAnnotationEdtorMode(previousAnnotationEditorMode);
      if (wasHidden && popup) {
        this.renderer.removeClass(popup, 'ngx-keep-hidden');
      }
      return;
    }

    const stampAnnotation: StampEditorAnnotation = {
      annotationType: 13,
      pageIndex: pageToModify,
      bitmapUrl: dataUrl,
      rect,
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

  /**
   * Adds a highlight (editor) annotation to a page.
   *
   * The `left`, `bottom`, `right`, and `top` coordinates accept percentages
   * (e.g. `'50%'`), pixels (e.g. `'100px'`), or PDF coordinates (e.g. `100`).
   * If `page` is omitted (`undefined`), the current page is used.
   *
   * **Timing:** like {@link addImageToAnnotationLayer}, wait for the target
   * page's `(annotationEditorLayerRendered)` event before calling this - **not**
   * `(annotationLayerRendered)`. Calling it before the editor layer exists logs
   * `paste: "Cannot read properties of undefined (reading 'deserialize')"` and
   * adds nothing (see issue #2656).
   *
   * @param color RGB color as a 0-255 triple, e.g. `[255, 255, 0]` for yellow
   * @param page Zero-based page index, or `undefined` for the current page
   * @param left Left edge (percentage, pixels, or PDF coordinate)
   * @param bottom Bottom edge (percentage, pixels, or PDF coordinate)
   * @param right Right edge (percentage, pixels, or PDF coordinate)
   * @param top Top edge (percentage, pixels, or PDF coordinate)
   * @param thickness Highlighter thickness; defaults to `12`
   * @param rotation Rotation in degrees (`0`, `90`, `180`, or `270`); defaults to `0`
   * @param opacity Opacity between `0` and `1`; defaults to `0.5`
   * @returns Promise that resolves once the highlight has been added
   */
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

    const rect = NgxExtendedPdfViewerService.toPageRect(
      this.convertToPDFCoordinates(left, width, 0, pageWidth),
      this.convertToPDFCoordinates(bottom, height, 0, pageHeight),
      this.convertToPDFCoordinates(right, width, width, pageWidth),
      this.convertToPDFCoordinates(top, height, height, pageHeight),
      width,
      height,
      'addHighlightToAnnotationLayer',
    );
    if (!rect) {
      this.switchAnnotationEdtorMode(previousAnnotationEditorMode);
      if (wasHidden && popup) {
        this.renderer.removeClass(popup, 'ngx-keep-hidden');
      }
      return;
    }
    const [leftPdf, bottomPdf, rightPdf, topPdf] = rect;

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

  /**
   * Turns four edge coordinates into a valid PDF rectangle: sorts them, and keeps them on the page.
   *
   * Without this, a coordinate outside the page - easy to hit with pixels, because they refer to the
   * page as it is rendered right now, which may be only a few hundred pixels wide - produced a
   * rectangle with a negative width or height. pdf.js then failed deep inside the stamp editor with
   * "Failed to execute 'transferToImageBitmap' on 'OffscreenCanvas'".
   *
   * @returns the rectangle, or `undefined` if there's no area left to draw on
   */
  private static toPageRect(
    left: number,
    bottom: number,
    right: number,
    top: number,
    pageWidth: number,
    pageHeight: number,
    method: string,
  ): [number, number, number, number] | undefined {
    const edges = [left, bottom, right, top];
    if (edges.some((edge) => !Number.isFinite(edge))) {
      console.error(`${method}(): the coordinates [${edges.join(', ')}] aren't valid numbers. Is the page rendered yet?`);
      return undefined;
    }
    const clamp = (value: number, max: number) => Math.min(Math.max(value, 0), max);
    const x1 = clamp(Math.min(left, right), pageWidth);
    const x2 = clamp(Math.max(left, right), pageWidth);
    const y1 = clamp(Math.min(bottom, top), pageHeight);
    const y2 = clamp(Math.max(bottom, top), pageHeight);

    if (x2 - x1 < 1 || y2 - y1 < 1) {
      console.error(
        `${method}(): the coordinates [left=${left.toFixed(1)}, bottom=${bottom.toFixed(1)}, right=${right.toFixed(1)}, top=${top.toFixed(1)}] ` +
          `leave no room on a page of ${pageWidth.toFixed(1)} x ${pageHeight.toFixed(1)} PDF units, so nothing was added. ` +
          `Note that pixel values ("250px") refer to the page as it is rendered on screen right now, so they shrink when the user zooms out.`,
      );
      return undefined;
    }
    return [x1, y1, x2, y2];
  }

  private convertToPDFCoordinates(value: ZoomType, maxValue: number, defaultValue: number, imageMaxValue: number): number {
    if (!value) {
      return defaultValue;
    }
    if (typeof value === 'string') {
      if (value.endsWith('%')) {
        return (Number.parseInt(value, 10) / 100) * maxValue;
      } else if (value.endsWith('px')) {
        return Number.parseInt(value, 10) * (maxValue / imageMaxValue);
      } else {
        return Number.parseInt(value, 10);
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

  /** @deprecated This feature was never wired up in pdf.js. Use editorHighlightColor instead. */
  public set editorHighlightDefaultColor(color: string) {
    this.setEditorProperty(AnnotationEditorParamsType.HIGHLIGHT_COLOR, color);
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

  /**
   * Adds the pages of another PDF file - or an image - to the document that's currently
   * open. This is the programmatic counterpart of the sidebar's "Add file" button, but
   * it can insert the pages anywhere, including **before the first page**.
   *
   * The document on screen is replaced by the merged one. The original file on the server
   * is never touched; use `getCurrentDocumentAsBlob()` if you want to store the result.
   * Pending page reorderings and deletions are kept.
   *
   * Requires pdf.js 6.0 or newer (i.e. ngx-extended-pdf-viewer 28 or newer). Merging is
   * still an experimental feature of pdf.js, so the result may change in future versions.
   *
   * @param source One or several PDF files or images: a URL, a `File`, a `Blob`,
   *   the raw bytes, or an `ImageBitmap`. Several sources are inserted in the order given.
   * @param options Where to insert the pages, and which pages to take
   * @returns Promise that resolves when the merged document has been loaded and rendered
   * @throws Error if the viewer isn't ready yet, if a source can't be loaded, or if
   *   pdf.js can't build the merged document
   *
   * @example
   * // Add a cover page in front of the document
   * await pdfService.mergeDocument('/assets/cover.pdf', { insertAfterPage: 0 });
   *
   * // Append a file the user picked, but only its pages 1 and 4-8
   * await pdfService.mergeDocument(input.files[0], { includePages: [1, [4, 8]] });
   *
   * // Insert a scanned image after page 3
   * await pdfService.mergeDocument(imageBlob, { insertAfterPage: 3 });
   */
  public async mergeDocument(source: PdfMergeSource | Array<PdfMergeSource>, options: PdfMergeOptions = {}): Promise<void> {
    const application = this.PDFViewerApplication;
    if (!application?.pdfDocument) {
      throw new Error('mergeDocument(): the PDF viewer has not been initialized yet.');
    }
    const { insertAfterPage } = options;
    if (insertAfterPage !== undefined && (!Number.isInteger(insertAfterPage) || insertAfterPage < 0)) {
      throw new Error(`mergeDocument(): insertAfterPage must be a page number >= 0, but it was ${insertAfterPage}. Pass 0 to insert before the first page.`);
    }
    const sources = Array.isArray(source) ? source : [source];
    if (sources.length === 0) {
      return;
    }

    // pdf.js counts pages from 0 and wants the page *before* the insertion point,
    // so page 1 becomes 0 and "before the first page" becomes -1. Insertion points
    // beyond the last page are clamped by pdf.js, hence appending is the default.
    const pageCount = this.getPageCount();
    const insertAfter = Math.min(insertAfterPage ?? pageCount, pageCount) - 1;

    const newPages: Array<PdfPageInfo> = [];
    for (const singleSource of sources) {
      newPages.push(await this.toPageInfo(singleSource, insertAfter, options));
    }

    // Merging replaces the document, so pages the user has already reordered or deleted
    // have to be part of the description of the new document - otherwise they'd come back.
    const thumbnailViewer = application.pdfThumbnailViewer;
    const pendingChanges: Array<PdfPageInfo> | null = thumbnailViewer?.hasStructuralChanges?.() ? thumbnailViewer.getStructuralChanges() : null;
    const currentDocument: Array<PdfPageInfo> = pendingChanges ?? [{ document: null }];

    await this.extractPages([...currentDocument, ...newPages]);
  }

  /**
   * Rebuilds the document that's currently open from the page descriptions you pass in,
   * and shows the result. This is the low-level escape hatch behind `mergeDocument()`:
   * it hands `pageInfos` to pdf.js unchanged, so you can combine several documents,
   * drop pages, and put every page exactly where you want it - at the price of using
   * pdf.js's own **0-based** semantics.
   *
   * Unlike `mergeDocument()`, this method does not add pending page reorderings and
   * deletions for you; `pageInfos` describes the new document completely.
   *
   * Requires pdf.js 6.0 or newer (i.e. ngx-extended-pdf-viewer 28 or newer). This is an
   * experimental pdf.js API, so its semantics may change in future versions.
   *
   * @param pageInfos The sources of the new document, in pdf.js's `PageInfo` format
   * @returns Promise that resolves when the new document has been loaded and rendered
   * @throws Error if the viewer isn't ready yet, or if pdf.js can't build the document
   *
   * @example
   * // Put another PDF in front of the current document, minus its third page
   * await pdfService.extractPages([
   *   { document: null },                                    // the document on screen
   *   { document: bytes, excludePages: [2], insertAfter: -1 } // 0-based: page 3, before page 1
   * ]);
   */
  public async extractPages(pageInfos: Array<PdfPageInfo>): Promise<void> {
    const application = this.PDFViewerApplication;
    const pdfDocument = application?.pdfDocument;
    if (!application || !pdfDocument) {
      throw new Error('extractPages(): the PDF viewer has not been initialized yet.');
    }
    if (typeof pdfDocument.extractPages !== 'function') {
      throw new Error('extractPages(): merging pages requires pdf.js 6.0 or newer.');
    }

    const mergedDocument = await pdfDocument.extractPages(pageInfos);
    if (!mergedDocument) {
      throw new Error("extractPages(): pdf.js couldn't build the document. Is every source a valid PDF file? (XFA files and wrong passwords are rejected, too.)");
    }

    // Same bookkeeping as pdf.js's own "Add file" button (see onSaveAndLoad() in app.js):
    // the document on screen is no longer the file it was loaded from.
    application._mergedDocumentNeedsSaving = true;
    const rendered = this.waitForPagesLoaded();
    try {
      await application.open({ data: mergedDocument, filename: application._docFilename });
    } catch (error) {
      rendered.cancel();
      throw error;
    }
    await rendered.promise;
  }

  /**
   * Removes pages from the document that's currently open. The pages are gone for good -
   * unlike the sidebar's delete button, this can't be undone.
   *
   * The document on screen is replaced by one without those pages; the original file on the
   * server is never touched. Pages the user has reordered are kept where they are, so the
   * page numbers you pass in are always the ones the user sees.
   *
   * Requires pdf.js 6.0 or newer (i.e. ngx-extended-pdf-viewer 28 or newer).
   *
   * @param pages The pages to delete, counting from 1. Accepts a single page number, and a
   *   list of page numbers and inclusive ranges, e.g. `[1, [4, 8]]`.
   * @returns Promise that resolves when the shortened document has been loaded and rendered
   * @throws Error if the viewer isn't ready yet, if a page number doesn't exist, or if you
   *   try to delete every page
   *
   * @example
   * await pdfService.deletePages(3);            // delete page 3
   * await pdfService.deletePages([1, [8, 10]]); // delete page 1 and the pages 8 to 10
   */
  public async deletePages(pages: number | PdfPageSelection): Promise<void> {
    const pdfDocument = this.PDFViewerApplication?.pdfDocument;
    if (!pdfDocument) {
      throw new Error('deletePages(): the PDF viewer has not been initialized yet.');
    }
    const pageCount = this.getPageCount();
    const deletedPages = NgxExtendedPdfViewerService.toPageNumbers(typeof pages === 'number' ? [pages] : pages, pageCount, 'deletePages');
    if (deletedPages.size === 0) {
      return;
    }
    if (deletedPages.size >= pageCount) {
      throw new Error(`deletePages(): a PDF file needs at least one page, so you can't delete all ${pageCount} of them.`);
    }
    const pagesMapper = pdfDocument.pagesMapper;
    if (!pagesMapper) {
      throw new Error('deletePages(): deleting pages requires pdf.js 6.0 or newer.');
    }

    const remainingPages: Array<number> = [];
    for (let pageNumber = 1; pageNumber <= pageCount; pageNumber++) {
      if (!deletedPages.has(pageNumber)) {
        remainingPages.push(pageNumber);
      }
    }
    // The mapper describes the remaining pages the way the user sees them, so pages they've
    // already reordered or deleted in the sidebar keep their current position.
    await this.extractPages(pagesMapper.extractPages(remainingPages));
  }

  /** Expands a list of 1-based page numbers and `[from, to]` ranges into single page numbers. */
  private static toPageNumbers(pages: PdfPageSelection, pageCount: number, method: string): Set<number> {
    const pageNumbers = new Set<number>();
    for (const entry of pages) {
      const [from, to] = Array.isArray(entry) ? entry : [entry, entry];
      if (!Number.isInteger(from) || !Number.isInteger(to) || from < 1 || to < from || to > pageCount) {
        throw new Error(`${method}(): ${JSON.stringify(entry)} is not a valid page number or range. The document has ${pageCount} pages, counting from 1.`);
      }
      for (let pageNumber = from; pageNumber <= to; pageNumber++) {
        pageNumbers.add(pageNumber);
      }
    }
    return pageNumbers;
  }

  private async toPageInfo(source: PdfMergeSource, insertAfter: number, options: PdfMergeOptions): Promise<PdfPageInfo> {
    if (typeof ImageBitmap !== 'undefined' && source instanceof ImageBitmap) {
      return { image: source, insertAfter };
    }

    let blob: Blob | undefined;
    if (typeof source === 'string' || source instanceof URL) {
      const response = await fetch(source);
      if (!response.ok) {
        throw new Error(`mergeDocument(): failed to load ${source.toString()}: ${response.status} ${response.statusText}`);
      }
      blob = await response.blob();
    } else if (source instanceof Blob) {
      blob = source;
    }

    let bytes: Uint8Array;
    if (blob) {
      if (await NgxExtendedPdfViewerService.isImage(blob)) {
        return { image: await createImageBitmap(blob), insertAfter };
      }
      bytes = new Uint8Array(await blob.arrayBuffer());
    } else if (source instanceof ArrayBuffer) {
      bytes = new Uint8Array(source);
    } else if (ArrayBuffer.isView(source)) {
      bytes = new Uint8Array(source.buffer, source.byteOffset, source.byteLength);
    } else {
      throw new Error('mergeDocument(): the source must be a URL, a Blob, a File, an ArrayBuffer, a typed array, or an ImageBitmap.');
    }

    const pageInfo: PdfPageInfo = { document: bytes, insertAfter };
    if (options.includePages) {
      pageInfo.includePages = NgxExtendedPdfViewerService.toZeroBasedPages(options.includePages);
    }
    if (options.excludePages) {
      pageInfo.excludePages = NgxExtendedPdfViewerService.toZeroBasedPages(options.excludePages);
    }
    if (options.password !== undefined) {
      pageInfo.password = options.password;
    }
    return pageInfo;
  }

  private static async isImage(blob: Blob): Promise<boolean> {
    if (blob.type) {
      return blob.type.startsWith('image/');
    }
    // Some file pickers don't report a MIME type, so fall back to the PDF magic bytes -
    // the same check pdf.js does when you drop a file onto the thumbnail sidebar.
    return (await blob.slice(0, 5).text()) !== '%PDF-';
  }

  private static toZeroBasedPages(pages: PdfPageSelection): PdfPageSelection {
    return pages.map((page) => (Array.isArray(page) ? ([page[0] - 1, page[1] - 1] as [number, number]) : page - 1));
  }

  /** Resolves when the (re)loaded document has been rendered. */
  private waitForPagesLoaded(): { promise: Promise<void>; cancel: () => void } {
    const eventBus = this.PDFViewerApplication?.eventBus;
    if (!eventBus) {
      return { promise: Promise.resolve(), cancel: () => undefined };
    }
    let done: () => void = () => undefined;
    const promise = new Promise<void>((resolve) => (done = resolve));
    // If the document fails to load, open() rejects - stop waiting for pages that never come.
    const onPagesLoaded = () => {
      eventBus.off('documenterror', onDocumentError);
      done();
    };
    const onDocumentError = () => {
      eventBus.off('pagesloaded', onPagesLoaded);
      done();
    };
    eventBus.on('pagesloaded', onPagesLoaded, { once: true });
    eventBus.on('documenterror', onDocumentError, { once: true });
    return {
      promise,
      cancel: () => {
        eventBus.off('pagesloaded', onPagesLoaded);
        eventBus.off('documenterror', onDocumentError);
        done();
      },
    };
  }
}
