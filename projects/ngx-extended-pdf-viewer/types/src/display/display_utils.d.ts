export function applyOpacity(color: any, opacity: any): any;
export class ColorScheme {
    static get isDarkMode(): any;
}
export class CSSConstants {
    static get commentForegroundColor(): any;
}
export function deprecated(details: any): void;
export function fetchData(url: any, type?: string): Promise<any>;
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
export function getColorValues(colors: any): void;
export function getCurrentTransform(ctx: any): any[];
export function getCurrentTransformInverse(ctx: any): any[];
/**
 * Gets the filename from a given URL.
 * @param {string} url
 * @returns {string}
 */
export function getFilenameFromUrl(url: string): string;
/**
 * Returns the filename or guessed filename from the url (see issue 3455).
 * @param {string} url - The original PDF location.
 * @param {string} defaultFilename - The value returned if the filename is
 *   unknown, or the protocol is unsupported.
 * @returns {string} Guessed PDF filename.
 */
export function getPdfFilenameFromUrl(url: string, defaultFilename?: string): string;
export function getRGB(color: any): any[];
export function getRGBA(color: any): any[] | null;
export function isDataScheme(url: any): boolean;
export function isPdfFile(filename: any): boolean;
export function isValidFetchUrl(url: any, baseUrl: any): boolean;
export function makePathFromDrawOPS(data: any): Path2D;
/**
 * Event handler to suppress context menu.
 */
export function noContextMenu(e: any): void;
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
export class PDFDateString {
    static #regex: any;
    /**
     * Convert a PDF date string to a JavaScript `Date` object.
     *
     * The PDF date string format is described in section 7.9.4 of the official
     * PDF 32000-1:2008 specification. However, in the PDF 1.7 reference (sixth
     * edition) Adobe describes the same format including a trailing apostrophe.
     * This syntax in incorrect, but Adobe Acrobat creates PDF files that contain
     * them. We ignore all apostrophes as they are not necessary for date parsing.
     *
     * Moreover, Adobe Acrobat doesn't handle changing the date to universal time
     * and doesn't use the user's time zone (effectively ignoring the HH' and mm'
     * parts of the date string).
     *
     * @param {string} input
     * @returns {Date|null}
     */
    static toDateObject(input: string): Date | null;
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
export function renderRichText({ html, dir, className }: {
    html: any;
    dir: any;
    className: any;
}, container: any): void;
/**
 * @param {HTMLDivElement} div
 * @param {PageViewport} viewport
 * @param {boolean} mustFlip
 * @param {boolean} mustRotate
 */
export function setLayerDimensions(div: HTMLDivElement, viewport: PageViewport, mustFlip?: boolean, mustRotate?: boolean): void;
export class StatTimer {
    times: any[];
    time(name: any): void;
    timeEnd(name: any): void;
    toString(): string;
    #private;
}
export function stopEvent(e: any): void;
export const SupportedImageMimeTypes: string[];
import { PageViewport } from "./page_viewport.js";
export {};
