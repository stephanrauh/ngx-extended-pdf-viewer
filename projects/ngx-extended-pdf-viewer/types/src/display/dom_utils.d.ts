export class ColorScheme {
    static get isDarkMode(): any;
}
export class CSSConstants {
    static get commentForegroundColor(): any;
}
/**
 * This file contains helper functions that:
 *  - Directly, or indirectly, access the DOM.
 *  - Are only invoked from code running in the main-thread.
 */
export function fetchData(url: any, type?: string): Promise<any>;
export function getColorValues(colors: any): void;
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
export function isDataScheme(url: any): boolean;
export function isPdfFile(filename: any): boolean;
export function isValidFetchUrl(url: any, baseUrl: any): boolean;
/**
 * Event handler to suppress context menu.
 */
export function noContextMenu(e: any): void;
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
     * @param {string} input
     * @returns {Date|null}
     */
    static toDateObject(input: string): Date | null;
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
export function stopEvent(e: any): void;
export const SupportedImageMimeTypes: Set<string>;
import { PageViewport } from "./page_viewport.js";
