/**
 * Combines multiple ArrayBuffers into a single Uint8Array.
 * @param {Array<ArrayBuffer>} arr - An array of ArrayBuffers.
 * @returns {Uint8Array}
 */
export function arrayBuffersToBytes(arr: Array<ArrayBuffer>): Uint8Array;
export function codePointIter(str: any): Generator<any, void, unknown>;
export function collectActions(xref: any, dict: any, eventType: any): any;
export function deepCompare(a: any, b: any): boolean;
export function encodeToXmlString(str: any): any;
export function escapePDFName(str: any): any;
export function escapeString(str: any): any;
export function fetchBinaryData(url: any): Promise<Uint8Array<ArrayBuffer>>;
/**
 * Get the value of an inheritable property.
 *
 * If the PDF specification explicitly lists a property in a dictionary as
 * inheritable, then the value of the property may be present in the dictionary
 * itself or in one or more parents of the dictionary.
 *
 * If the key is not found in the tree, `undefined` is returned. Otherwise,
 * the value for the key is returned or, if `stopWhenFound` is `false`, a list
 * of values is returned.
 *
 * @param {Dict} dict - Dictionary from where to start the traversal.
 * @param {string} key - The key of the property to find the value for.
 * @param {boolean} getArray - Whether or not the value should be fetched as an
 *   array. The default value is `false`.
 * @param {boolean} stopWhenFound - Whether or not to stop the traversal when
 *   the key is found. If set to `false`, we always walk up the entire parent
 *   chain, for example to be able to find `\Resources` placed on multiple
 *   levels of the tree. The default value is `true`.
 */
export function getInheritableProperty({ dict, key, getArray, stopWhenFound, }: Dict): any;
export function getLookupTableFactory(initializer: any): () => any;
export function getModificationDate(date?: Date): string;
export function getNewAnnotationsMap(annotationStorage: any): Map<any, any> | null;
/**
 * Get the parent dictionary to update when a property is set.
 *
 * @param {Dict} dict - Dictionary from where to start the traversal.
 * @param {Ref} ref - The reference to the dictionary.
 * @param {XRef} xref - The `XRef` instance.
 */
export function getParentToUpdate(dict: Dict, ref: Ref, xref: XRef): {
    dict: null;
    ref: null;
};
export function getRotationMatrix(rotation: any, width: any, height: any): any[];
/**
 * Get the number of bytes to use to represent the given positive integer.
 * If n is zero, the function returns 0 which means that we don't need to waste
 * a byte to represent it.
 * @param {number} x - a positive integer.
 * @returns {number}
 */
export function getSizeInBytes(x: number): number;
export const IDENTITY_MATRIX: number[];
/**
 * Checks if something is an Array containing only boolean values,
 * and (optionally) checks its length.
 * @param {any} arr
 * @param {number | null} len
 * @returns {boolean}
 */
export function isBooleanArray(arr: any, len: number | null): boolean;
/**
 * Checks if something is an Array containing only numbers,
 * and (optionally) checks its length.
 * @param {any} arr
 * @param {number | null} len
 * @returns {boolean}
 */
export function isNumberArray(arr: any, len: number | null): boolean;
export function isWhiteSpace(ch: any): boolean;
export function lookupMatrix(arr: any, fallback: any): any;
export function lookupNormalRect(arr: any, fallback: any): any;
export function lookupRect(arr: any, fallback: any): any;
export const MAX_INT_32: number;
declare const MissingDataException_base: any;
export class MissingDataException extends MissingDataException_base {
    [x: string]: any;
    constructor(begin: any, end: any);
    begin: any;
    end: any;
}
export function numberToString(value: any): any;
declare const ParserEOFException_base: any;
export class ParserEOFException extends ParserEOFException_base {
    [x: string]: any;
    constructor(msg: any);
}
/**
 * AcroForm field names use an array like notation to refer to
 * repeated XFA elements e.g. foo.bar[nnn].
 * see: XFA Spec Chapter 3 - Repeated Elements
 *
 * @param {string} path - XFA path name.
 * @returns {Array} - Array of Objects with the name and pos of
 * each part of the path.
 */
export function parseXFAPath(path: string): any[];
export const PDF_VERSION_REGEXP: RegExp;
export function recoverJsURL(str: any): {
    url: string;
    newWindow: boolean;
} | null;
export const RESOURCES_KEYS_OPERATOR_LIST: string[];
export const RESOURCES_KEYS_TEXT_CONTENT: string[];
/**
 * Converts positive integers to (upper case) Roman numerals.
 * @param {number} number - The number that should be converted.
 * @param {boolean} lowerCase - Indicates if the result should be converted
 *   to lower case letters. The default value is `false`.
 * @returns {string} The resulting Roman number.
 */
export function toRomanNumerals(number: number, lowerCase?: boolean): string;
export function validateCSSFont(cssFontInfo: any): boolean;
export function validateFontName(fontFamily: any, mustWarn?: boolean): boolean;
declare const XRefEntryException_base: any;
export class XRefEntryException extends XRefEntryException_base {
    [x: string]: any;
    constructor(msg: any);
}
declare const XRefParseException_base: any;
export class XRefParseException extends XRefParseException_base {
    [x: string]: any;
    constructor(msg: any);
}
import { Dict } from "./primitives.js";
import { Ref } from "./primitives.js";
export {};
