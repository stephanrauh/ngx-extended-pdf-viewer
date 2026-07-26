export class CanvasGraphics {
    constructor(canvasCtx: any, commonObjs: any, objs: any, canvasFactory: any, filterFactory: any, { optionalContentConfig, markedContentStack }: {
        optionalContentConfig: any;
        markedContentStack?: null | undefined;
    }, annotationCanvasMap: any, pageColors: any, dependencyTracker: any, imagesTracker: any);
    ctx: any;
    current: CanvasExtraState;
    stateStack: any[];
    pendingClip: {} | {} | null;
    pendingEOFill: boolean;
    commonObjs: any;
    objs: any;
    canvasFactory: any;
    filterFactory: any;
    groupStack: any[];
    baseTransform: any;
    baseTransformStack: any[];
    groupLevel: number;
    smaskStack: any[];
    tempSMask: any;
    smaskGroupCanvases: any[];
    smaskPreparedEntry: any;
    smaskPreparedFor: any;
    smaskPreparedOffsetX: number;
    smaskPreparedOffsetY: number;
    smaskPreparedOOBAlpha: any;
    suspendedCtx: any;
    contentVisible: boolean;
    markedContentStack: never[];
    optionalContentConfig: any;
    cachedPatterns: Map<any, any>;
    annotationCanvasMap: any;
    viewportScale: number;
    outputScaleX: number;
    outputScaleY: number;
    pageColors: any;
    _cachedScaleForStroking: number[];
    _cachedGetSinglePixelWidth: number | null;
    _cachedBitmapsMap: Map<any, any>;
    dependencyTracker: any;
    imagesTracker: any;
    getObject(opIdx: any, data: any, fallback?: null): any;
    beginDrawing({ transform, viewport, transparency, background, }: {
        transform: any;
        viewport: any;
        transparency?: boolean | undefined;
        background?: null | undefined;
    }): void;
    transparentCanvasEntry: any;
    compositeCtx: any;
    executeOperatorList(operatorList: any, executionStartIdx: any, continueCallback: any, stepper: any, operationsFilter: any): any;
    transparentCanvas: any;
    endDrawing(): void;
    _scaleImage(img: any, inverseTransform: any): {
        img: any;
        paintWidth: any;
        paintHeight: any;
        tmpCanvas: any;
    };
    _createMaskCanvas(opIdx: any, img: any): {
        canvas: any;
        offsetX: number;
        offsetY: number;
        canvasEntry?: undefined;
    } | {
        canvas: any;
        canvasEntry: any;
        offsetX: number;
        offsetY: number;
    };
    setLineWidth(opIdx: any, width: any): void;
    setLineCap(opIdx: any, style: any): void;
    setLineJoin(opIdx: any, style: any): void;
    setMiterLimit(opIdx: any, limit: any): void;
    setDash(opIdx: any, dashArray: any, dashPhase: any): void;
    setRenderingIntent(opIdx: any, intent: any): void;
    setFlatness(opIdx: any, flatness: any): void;
    setGState(opIdx: any, states: any): void;
    get inSMaskMode(): boolean;
    _clearPreparedSMask(): void;
    _ensurePreparedSMask(smask: any): void;
    checkSMaskState(opIdx: any): void;
    _prepareSMaskCanvas(smask: any): void;
    /**
     * Bake the mask plus optional backdrop into a (w x h) canvas with the
     * mask drawn at (drawX, drawY), then optionally pipe through the SVG
     * filter described by `filterSpec`. Returns the prepared canvas-
     * factory entry.
     *
     * The backdrop fill uses destination-atop so transparent / partial-
     * alpha pixels inside the mask see the backdrop *before* filtering
     * (per PDF spec). Filtering the raw mask would yield filter(0)
     * instead of filter(backdrop) -- wrong for "keep" Luminosity and for
     * Alpha masks whose transferMap[255] differs from transferMap[0].
     *
     * In the no-backdrop layer-size case the OOB region of srcEntry
     * stays transparent and the filter outputs filter(transparent) =
     * transferMap[0], matching the spec's transparent extension of the
     * mask group. No-backdrop mask-size prebakes have no OOB region;
     * destination-in handles OOB at compose time.
     *
     * Some browsers (e.g. older Safari) silently ignore SVG `url(#id)`
     * filters on a 2D canvas: the assignment is accepted but
     * `ctx.filter` reads back as "none" and `drawImage` produces an
     * unfiltered copy. We detect that and fall back to a pixel-buffer
     * loop that reproduces the SVG filter exactly (matrix luminance and
     * `feFuncA` transferMap, both with sRGB color-interpolation, i.e.
     * straight on gamma-encoded byte values).
     */
    _bakeSMaskCanvas(maskCanvas: any, drawX: any, drawY: any, w: any, h: any, backdrop: any, filterSpec: any): any;
    /**
     * Replaces the current drawing canvas with a temporary scratch canvas and
     * suspends the main context. Drawing operations on the scratch canvas are
     * composited back via `compose()`. The scratch canvas mirrors many operations
     * onto the suspended canvas to keep their graphics-state stacks in sync, so
     * that clipping paths and transformations remain correct when soft mask mode
     * ends.
     */
    beginSMaskMode(opIdx: any): void;
    smaskScratchCanvas: any;
    endSMaskMode(): void;
    compose(dirtyBox: any): void;
    composeSMask(ctx: any, smask: any, layerCtx: any, layerBox: any): void;
    /**
     * Fade the dirty box's OOB region by a constant alpha. Called from
     * composeSMask when smaskPreparedOOBAlpha is in (0, 255).
     *
     * destination-in clears every destination pixel outside the source's
     * footprint, so four fillRects (one per strip) would each clear the
     * others. Instead one fillRect covers the dirty box, restricted by
     * an even-odd clip enclosing exactly (dirty_box XOR mask_region);
     * within the clip the source covers everything so no "outside
     * source" pixels exist.
     */
    _applySMaskOOBAlpha(layerCtx: any, layerOffsetX: any, layerOffsetY: any, layerWidth: any, layerHeight: any, maskX0: any, maskY0: any, maskX1: any, maskY1: any, alpha: any): void;
    genericComposeSMask(smask: any, layerCtx: any, width: any, height: any, layerOffsetX: any, layerOffsetY: any): void;
    save(opIdx: any): void;
    restore(opIdx: any): void;
    transform(opIdx: any, a: any, b: any, c: any, d: any, e: any, f: any): void;
    constructPath(opIdx: any, op: any, data: any, minMax: any): void;
    _pathStartIdx: any;
    closePath(opIdx: any): void;
    stroke(opIdx: any, path: any, consumePath?: boolean): void;
    closeStroke(opIdx: any, path: any): void;
    fill(opIdx: any, path: any, consumePath?: boolean): void;
    eoFill(opIdx: any, path: any): void;
    fillStroke(opIdx: any, path: any): void;
    eoFillStroke(opIdx: any, path: any): void;
    closeFillStroke(opIdx: any, path: any): void;
    closeEOFillStroke(opIdx: any, path: any): void;
    endPath(opIdx: any, path: any): void;
    rawFillPath(opIdx: any, path: any): void;
    clip(opIdx: any): void;
    eoClip(opIdx: any): void;
    beginText(opIdx: any): void;
    endText(opIdx: any): void;
    setCharSpacing(opIdx: any, spacing: any): void;
    setWordSpacing(opIdx: any, spacing: any): void;
    setHScale(opIdx: any, scale: any): void;
    setLeading(opIdx: any, leading: any): void;
    setFont(opIdx: any, fontRefName: any, size: any): void;
    setTextRenderingMode(opIdx: any, mode: any): void;
    setTextRise(opIdx: any, rise: any): void;
    moveText(opIdx: any, x: any, y: any): void;
    setLeadingMoveText(opIdx: any, x: any, y: any): void;
    setTextMatrix(opIdx: any, matrix: any): void;
    nextLine(opIdx: any): void;
    paintChar(opIdx: any, character: any, x: any, y: any, patternFillTransform: any, patternStrokeTransform: any): void;
    get isFontSubpixelAAEnabled(): any;
    showText(opIdx: any, glyphs: any): void;
    showType3Text(opIdx: any, glyphs: any): void;
    setCharWidth(opIdx: any, xWidth: any, yWidth: any): void;
    setCharWidthAndBounds(opIdx: any, xWidth: any, yWidth: any, llx: any, lly: any, urx: any, ury: any): void;
    getColorN_Pattern(opIdx: any, IR: any): any;
    setStrokeColorN(opIdx: any, ...args: any[]): void;
    setFillColorN(opIdx: any, ...args: any[]): void;
    setStrokeRGBColor(opIdx: any, color: any): void;
    setStrokeTransparent(opIdx: any): void;
    setFillRGBColor(opIdx: any, color: any): void;
    setFillTransparent(opIdx: any): void;
    _getPattern(opIdx: any, objId: any, matrix?: null): any;
    shadingFill(opIdx: any, objId: any): void;
    beginInlineImage(): void;
    beginImageData(): void;
    paintFormXObjectBegin(opIdx: any, matrix: any, bbox: any): void;
    paintFormXObjectEnd(opIdx: any): void;
    beginGroup(opIdx: any, group: any): void;
    endGroup(opIdx: any, group: any): void;
    beginAnnotation(opIdx: any, id: any, rect: any, transform: any, matrix: any, hasOwnCanvas: any, canvasName: any): void;
    annotationCanvas: any;
    endAnnotation(opIdx: any): void;
    paintImageMaskXObject(opIdx: any, img: any): void;
    paintImageMaskXObjectRepeat(opIdx: any, img: any, scaleX: any, skewX: number | undefined, skewY: number | undefined, scaleY: any, positions: any): void;
    paintImageMaskXObjectGroup(opIdx: any, images: any): void;
    paintImageXObject(opIdx: any, objId: any): void;
    paintImageXObjectRepeat(opIdx: any, objId: any, scaleX: any, scaleY: any, positions: any): void;
    applyTransferMapsToCanvas(ctx: any): any;
    applyTransferMapsToBitmap(imgData: any): {
        img: any;
        canvasEntry: any;
    };
    paintInlineImageXObject(opIdx: any, imgData: any): void;
    paintInlineImageXObjectGroup(opIdx: any, imgData: any, map: any): void;
    paintSolidColorImageMask(opIdx: any): void;
    markPoint(opIdx: any, tag: any): void;
    markPointProps(opIdx: any, tag: any, properties: any): void;
    beginMarkedContent(opIdx: any, tag: any): void;
    beginMarkedContentProps(opIdx: any, tag: any, properties: any): void;
    endMarkedContent(opIdx: any): void;
    beginCompat(opIdx: any): void;
    endCompat(opIdx: any): void;
    consumePath(opIdx: any, path: any, clipBox: any): void;
    getSinglePixelWidth(): number;
    getScaleForStroking(): number[];
    rescaleAndStroke(path: any, saveRestore: any): void;
    isContentVisible(): boolean;
    #private;
}
declare class CanvasExtraState {
    constructor(width: any, height: any);
    alphaIsShape: boolean;
    fontSize: number;
    fontSizeScale: number;
    textMatrix: null;
    textMatrixScale: number;
    fontMatrix: number[];
    leading: number;
    x: number;
    y: number;
    lineX: number;
    lineY: number;
    charSpacing: number;
    wordSpacing: number;
    textHScale: number;
    textRenderingMode: number;
    textRise: number;
    fillColor: string;
    strokeColor: string;
    tilingPatternDims: null;
    patternFill: boolean;
    patternStroke: boolean;
    fillAlpha: number;
    strokeAlpha: number;
    lineWidth: number;
    activeSMask: null;
    transferMaps: string;
    minMax: Float32Array<ArrayBuffer>;
    clipBox: Float32Array<ArrayBuffer>;
    clone(): any;
    getPathBoundingBox(pathType?: string, transform?: null): Float32Array<ArrayBuffer>;
    updateClipFromPath(): void;
    isEmptyClip(): boolean;
    startNewPathAndClipBox(box: any): void;
    getClippedPathBoundingBox(pathType?: string, transform?: null): number[] | null;
}
export {};
