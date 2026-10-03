export const CONTROL_CHAR_REGEXP: RegExp;
/**
 * Serializes a font family, originating from the PDF document, such that it
 * can safely be interpolated into CSS.
 * @param {string} fontFamily
 * @returns {string}
 */
export function serializeFontFamily(fontFamily: string): string;
