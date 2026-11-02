export function applyOpacity(color: any, opacity: any): any;
export function computeLuminance(x: any): number;
/**
 * Find a color that has sufficient contrast against a fixed color.
 * The luminance (in HSL color space) of the base color is adjusted
 * until the contrast ratio between the base color and the fixed color
 * is at least the minimum contrast ratio required by WCAG 2.1.
 * @param {Array<number>} baseColor
 * @param {Array<number>} fixedColor
 * @returns {string}
 */
export function findContrastColor(baseColor: Array<number>, fixedColor: Array<number>): string;
export function getCurrentTransform(ctx: any): any[];
export function getCurrentTransformInverse(ctx: any): any[];
export function getRGB(color: any): any[];
export function getRGBA(color: any): any[] | null;
export function makePathFromDrawOPS(data: any): Path2D;
/**
 * Scale factors for the canvas, necessary with HiDPI displays.
 */
export class OutputScale {
    static get pixelRatio(): number;
    static capPixels(maxPixels: any, capAreaFactor: any): any;
    /**
     * @type {number} Horizontal scale.
     */
    sx: number;
    /**
     * @type {number} Vertical scale.
     */
    sy: number;
    /**
     * @type {boolean} Returns `true` when scaling is required, `false` otherwise.
     */
    get scaled(): boolean;
    /**
     * @type {boolean} Returns `true` when scaling is symmetric,
     *   `false` otherwise.
     */
    get symmetric(): boolean;
    /**
     * @returns {boolean} Returns `true` if scaling was limited,
     *   `false` otherwise.
     */
    limitCanvas(width: any, height: any, maxPixels: any, maxDim: any, capAreaFactor?: number): boolean;
}
export class PixelsPerInch {
    static CSS: number;
    static PDF: number;
    static PDF_TO_CSS_UNITS: number;
}
declare const RenderingCancelledException_base: any;
export class RenderingCancelledException extends RenderingCancelledException_base {
    [x: string]: any;
    constructor(msg: any, extraDelay?: number);
    extraDelay: number;
}
export {};
