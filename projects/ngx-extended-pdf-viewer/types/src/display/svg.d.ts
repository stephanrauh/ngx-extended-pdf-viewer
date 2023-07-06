export class SVGGraphics {
    constructor(commonObjs: any, objs: any, forceDataSchema?: boolean);
    svgFactory: DOMSVGFactory;
    current: SVGExtraState;
    transformMatrix: number[];
    transformStack: any[];
    extraStack: any[];
    commonObjs: any;
    objs: any;
    pendingClip: any;
    pendingEOFill: boolean;
    embedFonts: boolean;
    embeddedFonts: any;
    cssStyle: void | null;
    forceDataSchema: boolean;
    _operatorIdMapping: string[];
    getObject(data: any, fallback?: null): any;
    save(): void;
    restore(): void;
    tgrp: void | null | undefined;
    group(items: any): void;
    loadDependencies(operatorList: any): Promise<any[]>;
    transform(a: any, b: any, c: any, d: any, e: any, f: any): void;
    getSVG(operatorList: any, viewport: any): Promise<void>;
    viewport: any;
    convertOpList(operatorList: any): any[];
    executeOpTree(opTree: any): void;
    setWordSpacing(wordSpacing: any): void;
    setCharSpacing(charSpacing: any): void;
    nextLine(): void;
    setTextMatrix(a: any, b: any, c: any, d: any, e: any, f: any): void;
    beginText(): void;
    moveText(x: any, y: any): void;
    showText(glyphs: any): void;
    setLeadingMoveText(x: any, y: any): void;
    addFontStyle(fontObj: any): void;
    setFont(details: any): void;
    endText(): void;
    setLineWidth(width: any): void;
    setLineCap(style: any): void;
    setLineJoin(style: any): void;
    setMiterLimit(limit: any): void;
    setStrokeAlpha(strokeAlpha: any): void;
    setStrokeRGBColor(r: any, g: any, b: any): void;
    setFillAlpha(fillAlpha: any): void;
    setFillRGBColor(r: any, g: any, b: any): void;
    setStrokeColorN(args: any): void;
    setFillColorN(args: any): void;
    shadingFill(args: any): void;
    /**
     * @private
     */
    private _makeColorN_Pattern;
    /**
     * @private
     */
    private _makeTilingPattern;
    svg: any;
    /**
     * @private
     */
    private _makeShadingPattern;
    setDash(dashArray: any, dashPhase: any): void;
    constructPath(ops: any, args: any): void;
    endPath(): void;
    clip(type: any): void;
    closePath(): void;
    setLeading(leading: any): void;
    setTextRise(textRise: any): void;
    setTextRenderingMode(textRenderingMode: any): void;
    setHScale(scale: any): void;
    setRenderingIntent(intent: any): void;
    setFlatness(flatness: any): void;
    setGState(states: any): void;
    fill(): void;
    stroke(): void;
    /**
     * @private
     */
    private _setStrokeAttributes;
    eoFill(): void;
    fillStroke(): void;
    eoFillStroke(): void;
    closeStroke(): void;
    closeFillStroke(): void;
    closeEOFillStroke(): void;
    paintSolidColorImageMask(): void;
    paintImageXObject(objId: any): void;
    paintInlineImageXObject(imgData: any, mask: any): void;
    paintImageMaskXObject(img: any): void;
    paintFormXObjectBegin(matrix: any, bbox: any): void;
    paintFormXObjectEnd(): void;
    /**
     * @private
     */
    private _initialize;
    defs: void | undefined;
    /**
     * @private
     */
    private _ensureClipGroup;
    /**
     * @private
     */
    private _ensureTransformGroup;
}
import { DOMSVGFactory } from "./display_utils.js";
declare class SVGExtraState {
    fontSizeScale: number;
    fontWeight: string;
    fontSize: number;
    textMatrix: number[];
    fontMatrix: number[];
    leading: number;
    textRenderingMode: number;
    textMatrixScale: number;
    x: number;
    y: number;
    lineX: number;
    lineY: number;
    charSpacing: number;
    wordSpacing: number;
    textHScale: number;
    textRise: number;
    fillColor: string;
    strokeColor: string;
    fillAlpha: number;
    strokeAlpha: number;
    lineWidth: number;
    lineJoin: string;
    lineCap: string;
    miterLimit: number;
    dashArray: any[];
    dashPhase: number;
    dependencies: any[];
    activeClipUrl: any;
    clipGroup: any;
    maskId: string;
    clone(): any;
    setCurrentPoint(x: any, y: any): void;
}
export {};
