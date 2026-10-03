export class FreeDrawOutline extends Outline {
    constructor(outline: any, points: any, box: any, scaleFactor: any, innerMargin: any, isLTR: any);
    firstPoint: number[];
    lastPoint: number[];
    serialize([blX, blY, trX, trY]: [any, any, any, any], rotation: any): {
        outline: any[];
        points: any[][];
    };
    get box(): Float32Array<ArrayBuffer>;
    newOutliner(x: any, y: any, box: any, scaleFactor: any, thickness: any, isLTR: any, innerMargin?: number): FreeDrawOutliner;
    /**
     * @param {number} thickness
     * @returns {Float32Array} The new bounding box.
     */
    updateThickness(thickness: number): Float32Array;
    getNewOutline(thickness: any, innerMargin: any): FreeDrawOutline;
    #private;
}
export class FreeDrawOutliner {
    static #MIN_DIST: number;
    static #MIN_DIFF: number;
    static #MIN: number;
    constructor(x: any, y: any, box: any, scaleFactor: any, thickness: any, isLTR: any, innerMargin?: number);
    isEmpty(): boolean;
    isCancellable(): boolean;
    /** @returns {Object} The SVG properties to apply. */
    removeLastElement(): Object;
    add(x: any, y: any): boolean;
    toSVGPath(): string;
    newFreeDrawOutline(outline: any, points: any, box: any, scaleFactor: any, innerMargin: any, isLTR: any): FreeDrawOutline;
    getOutlines(): FreeDrawOutline;
    #private;
}
import { Outline } from "./outline.js";
