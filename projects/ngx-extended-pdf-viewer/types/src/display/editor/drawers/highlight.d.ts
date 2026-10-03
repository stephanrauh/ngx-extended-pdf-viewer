export class FreeHighlightDrawer {
    constructor(x: any, y: any, box: any, scaleFactor: any, thickness: any, isLTR: any, innerMargin: any);
    add(x: any, y: any): {
        path: {
            d: string;
        };
    } | null;
    addPoints(points: any): {
        path: {
            d: string;
        };
    } | null;
    end(x: any, y: any): {
        path: {
            d: string;
        };
    } | null;
    isEmpty(): boolean;
    isCancellable(): boolean;
    removeLastElement(): Object;
    updateProperty(_name: any, _value: any): null;
    getOutlines(): FreeDrawOutline;
    get defaultSVGProperties(): {
        bbox: number[];
        root: {
            viewBox: string;
        };
        rootClass: {
            highlight: boolean;
            free: boolean;
        };
        path: {
            d: string;
        };
    };
    #private;
}
export class FreeHighlightOutliner extends FreeDrawOutliner {
    newFreeDrawOutline(outline: any, points: any, box: any, scaleFactor: any, innerMargin: any, isLTR: any): FreeHighlightOutline;
}
export class HighlightOutline extends Outline {
    /**
     * Build a text selection and its hover/selection outline.
     * @param {Array<Object>} boxes - the boxes of the selected text.
     * @param {boolean} isLTR
     * @returns {HighlightOutline}
     */
    static build(boxes: Array<Object>, isLTR: boolean): HighlightOutline;
    constructor(outlines: any, box: any, firstPoint: any, lastPoint: any);
    firstPoint: any;
    lastPoint: any;
    get isFree(): boolean;
    /** @inheritdoc */
    get defaultSVGProperties(): any;
    /** @inheritdoc */
    getFocusSVGProperties(rotation: any): Object;
    /** @inheritdoc */
    updateRotation(rotation: any): {
        root: {
            "data-main-rotation": any;
        };
    };
    /** @inheritdoc */
    serializeQuadPoints([pageX, pageY]: [any, any], [pageWidth, pageHeight]: [any, any]): Float32Array<ArrayBuffer>;
    /**
     * Serialize the outlines into the PDF page coordinate system.
     * @param {Array<number>} _bbox - the bounding box of the annotation.
     * @param {number} _rotation - the rotation of the annotation.
     * @returns {Array<Array<number>>}
     */
    serialize([blX, blY, trX, trY]: Array<number>, _rotation: number): Array<Array<number>>;
    get box(): any;
    #private;
}
export class HighlightOutliner {
    /**
     * Construct an outliner.
     * @param {Array<Object>} boxes - An array of axis-aligned rectangles.
     * @param {number} borderWidth - The width of the border of the boxes, it
     *   allows to make the boxes bigger (or smaller).
     * @param {number} innerMargin - The margin between the boxes and the
     *   outlines. It's important to not have a null innerMargin when we want to
     *   draw the outline else the stroked outline could be clipped because of its
     *   width.
     * @param {boolean} isLTR - true if we're in LTR mode. It's used to determine
     *   the last point of the boxes.
     */
    constructor(boxes: Array<Object>, borderWidth?: number, innerMargin?: number, isLTR?: boolean);
    getOutlines(): HighlightOutline;
    #private;
}
import { FreeDrawOutline } from "./freedraw.js";
import { FreeDrawOutliner } from "./freedraw.js";
declare class FreeHighlightOutline extends FreeDrawOutline {
    static #EXTRA_THICKNESS: number;
    newOutliner(x: any, y: any, box: any, scaleFactor: any, thickness: any, isLTR: any, innerMargin?: number): FreeHighlightOutliner;
    get isFree(): boolean;
    /** @param {number} thickness */
    buildFocusOutline(thickness: number): void;
    /** @inheritdoc */
    get defaultSVGProperties(): any;
    /** @inheritdoc */
    getFocusSVGProperties(rotation: any): Object;
    /** @inheritdoc */
    updateRotation(rotation: any): {
        root: {
            "data-main-rotation": any;
        };
    };
    /** @inheritdoc */
    updateProperty(name: any, value: any): Float32Array<ArrayBufferLike> | null;
    /** @inheritdoc */
    getPathResizedSVGProperties(): {
        path: {
            d: string;
        };
    };
}
import { Outline } from "./outline.js";
export {};
