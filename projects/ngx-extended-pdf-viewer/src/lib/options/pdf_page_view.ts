/**
 * @implements {IRenderableView}
 */
export interface PDFPageView {
  /**
   * @param {PDFPageViewOptions} options
   */
  id: number;
  renderingId: string;
  pdfPage: any;
  pageLabel: string | null;
  rotation: number;
  scale: number;
  pdfPageRotate: number;
  hasRestrictedScaling: boolean;
  textLayerMode: number;
  imageResourcesPath: string;
  useOnlyCssZoom: boolean;
  isOffscreenCanvasSupported: boolean;
  maxCanvasPixels: any;
  pageColors: Object | null;
  renderer: any;
  l10n: {
    getLanguage(): Promise<string>;
    getDirection(): Promise<string>;
    get(key: any, args?: null, fallback?: any): Promise<any>;
    translate(element: any): Promise<void>;
  };
  paintTask: {
    promise: any;
    onRenderContinue(cont: any): void;
    cancel(extraDelay?: number): void;
    readonly separateAnnots: any;
  } | null;
  paintedViewportMap: WeakMap<object, any>;
  resume: (() => void) | null;
  _renderError: any;
  _isStandalone: boolean | undefined;
  _annotationCanvasMap: any;
  zoomLayer: ParentNode | null;
  structTreeLayer: any;
  div: HTMLDivElement;
  set renderingState(arg: number);
  get renderingState(): number;
  setPdfPage(pdfPage: any): void;
  destroy(): void;
  get _textHighlighter(): any;
  /**
   * @private
   */
  reset({
    keepZoomLayer,
    keepAnnotationLayer,
    keepAnnotationEditorLayer,
    keepXfaLayer,
    keepTextLayer,
  }?: {
    keepZoomLayer?: boolean | undefined;
    keepAnnotationLayer?: boolean | undefined;
    keepAnnotationEditorLayer?: boolean | undefined;
    keepXfaLayer?: boolean | undefined;
    keepTextLayer?: boolean | undefined;
  }): void;
  loadingIconDiv: HTMLDivElement | undefined;
  update({
    scale,
    rotation,
    optionalContentConfigPromise,
    drawingDelay,
  }: {
    scale?: number | undefined;
    rotation?: null | undefined;
    optionalContentConfigPromise?: null | undefined;
    drawingDelay?: number | undefined;
  }): void;
  /**
   * PLEASE NOTE: Most likely you want to use the `this.reset()` method,
   *              rather than calling this one directly.
   */
  cancelRendering({
    keepAnnotationLayer,
    keepAnnotationEditorLayer,
    keepXfaLayer,
    keepTextLayer,
    cancelExtraDelay,
  }?: {
    keepAnnotationLayer?: boolean | undefined;
    keepAnnotationEditorLayer?: boolean | undefined;
    keepXfaLayer?: boolean | undefined;
    keepTextLayer?: boolean | undefined;
    cancelExtraDelay?: number | undefined;
  }): void;
  cssTransform({
    target,
    redrawAnnotationLayer,
    redrawAnnotationEditorLayer,
    redrawXfaLayer,
    redrawTextLayer,
    hideTextLayer,
  }: {
    target: any;
    redrawAnnotationLayer?: boolean | undefined;
    redrawAnnotationEditorLayer?: boolean | undefined;
    redrawXfaLayer?: boolean | undefined;
    redrawTextLayer?: boolean | undefined;
    hideTextLayer?: boolean | undefined;
  }): void;
  get width(): number;
  get height(): number;
  getPagePoint(x: any, y: any): Object;
  draw(): any;
  paintOnCanvas(canvasWrapper: any): {
    promise: any;
    onRenderContinue(cont: any): void;
    cancel(extraDelay?: number): void;
    readonly separateAnnots: any;
  };
  canvas: HTMLCanvasElement | undefined;
  paintOnSvg(wrapper: any): {
    promise: any;
    onRenderContinue(cont: any): void;
    cancel(): void;
    readonly separateAnnots: boolean;
  };
  svg: any;
  /**
   * @param {string|null} label
   */
  setPageLabel(label: string | null): void;
  determineMaxDimensions(): number;
  maxWidth: number | undefined;
  /**
   * For use by the `PDFThumbnailView.setImage`-method.
   * @ignore
   */
  get thumbnailCanvas(): HTMLCanvasElement | null | undefined;
}
