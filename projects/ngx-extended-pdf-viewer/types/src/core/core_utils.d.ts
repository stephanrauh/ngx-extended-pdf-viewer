export function getLookupTableFactory(initializer: any): () => any;
declare const MissingDataException_base: any;
export class MissingDataException extends MissingDataException_base {
    [x: string]: any;
    constructor(begin: any, end: any);
    begin: any;
    end: any;
}
declare const XRefEntryException_base: any;
export class XRefEntryException extends XRefEntryException_base {
    [x: string]: any;
}
declare const XRefParseException_base: any;
export class XRefParseException extends XRefParseException_base {
    [x: string]: any;
}
/**
 * Get the value of an inheritable property.
 *
 * If the PDF specification explicitly lists a property in a dictionary as
 * inheritable, then the value of the property may be present in the dictionary
 * itself or in one or more parents of the dictionary.
 *
 * If the key is not found in the tree, `undefined` is returned. Otherwise,
 * the value for the key is returned or, if `stopWhenFound` is `false`, a list
 * of values is returned. To avoid infinite loops, the traversal is stopped when
 * the loop limit is reached.
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
/**
 * Converts positive integers to (upper case) Roman numerals.
 * @param {number} number - The number that should be converted.
 * @param {boolean} lowerCase - Indicates if the result should be converted
 *   to lower case letters. The default value is `false`.
 * @returns {string} The resulting Roman number.
 */
export function toRomanNumerals(number: number, lowerCase?: boolean): string;
export function log2(x: any): number;
export function readInt8(data: any, offset: any): number;
export function readUint16(data: any, offset: any): number;
export function readUint32(data: any, offset: any): number;
export function isWhiteSpace(ch: any): boolean;
export {};
