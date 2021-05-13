export function collectActions(xref: any, dict: any, eventType: any): any;
export function encodeToXmlString(str: any): any;
export function escapePDFName(str: any): any;
export function getArrayLookupTableFactory(initializer: any): () => any;
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
export function getInheritableProperty({ dict, key, getArray, stopWhenFound, }: any): any;
export function getLookupTableFactory(initializer: any): () => any;
export function isWhiteSpace(ch: any): boolean;
export function log2(x: any): number;
declare const MissingDataException_base: any;
export class MissingDataException extends MissingDataException_base {
    [x: string]: any;
    constructor(begin: any, end: any);
    begin: any;
    end: any;
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
export function readInt8(data: any, offset: any): number;
export function readUint16(data: any, offset: any): number;
export function readUint32(data: any, offset: any): number;
/**
 * Converts positive integers to (upper case) Roman numerals.
 * @param {number} number - The number that should be converted.
 * @param {boolean} lowerCase - Indicates if the result should be converted
 *   to lower case letters. The default value is `false`.
 * @returns {string} The resulting Roman number.
 */
export function toRomanNumerals(number: number, lowerCase?: boolean): string;
declare const XRefEntryException_base: any;
export class XRefEntryException extends XRefEntryException_base {
    [x: string]: any;
}
declare const XRefParseException_base: any;
export class XRefParseException extends XRefParseException_base {
    [x: string]: any;
}
export {};
