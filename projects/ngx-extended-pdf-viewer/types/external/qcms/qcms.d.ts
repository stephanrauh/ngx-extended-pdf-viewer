/**
 * Converts `src` and hands the result to `copy_result`, laid out as RGB, or as
 * RGBA with an opaque alpha when `add_alpha` is set.
 *
 * # Safety
 *
 * This function is called directly from JavaScript.
 * @param {number} transformer
 * @param {Uint8Array} src
 * @param {boolean} add_alpha
 */
export function qcms_convert_array(transformer: number, src: Uint8Array, add_alpha: boolean): void;
/**
 * # Safety
 *
 * This function is called directly from JavaScript.
 * @param {number} transformer
 * @param {number} src1
 * @param {number} src2
 * @param {number} src3
 * @param {number} src4
 * @returns {number}
 */
export function qcms_convert_four(transformer: number, src1: number, src2: number, src3: number, src4: number): number;
/**
 * # Safety
 *
 * This function is called directly from JavaScript.
 * @param {number} transformer
 * @param {number} src
 * @returns {number}
 */
export function qcms_convert_one(transformer: number, src: number): number;
/**
 * # Safety
 *
 * This function is called directly from JavaScript.
 * @param {number} transformer
 * @param {number} src1
 * @param {number} src2
 * @param {number} src3
 * @returns {number}
 */
export function qcms_convert_three(transformer: number, src1: number, src2: number, src3: number): number;
/**
 * # Safety
 *
 * This function is called directly from JavaScript.
 * @param {number} transformer
 */
export function qcms_drop_transformer(transformer: number): void;
/**
 * # Safety
 *
 * This function is called directly from JavaScript.
 * @param {Uint8Array} mem
 * @param {DataType} in_type
 * @param {Intent} intent
 * @returns {number}
 */
export function qcms_transformer_from_memory(mem: Uint8Array, in_type: DataType, intent: Intent): number;
export type DataType = 0 | 1 | 2 | 3 | 4 | 5;
/**
 * @enum {0 | 1 | 2 | 3 | 4 | 5}
 */
export const DataType: Readonly<{
    RGB8: 0;
    "0": "RGB8";
    RGBA8: 1;
    "1": "RGBA8";
    BGRA8: 2;
    "2": "BGRA8";
    Gray8: 3;
    "3": "Gray8";
    GrayA8: 4;
    "4": "GrayA8";
    CMYK: 5;
    "5": "CMYK";
}>;
export type Intent = 0 | 1 | 2 | 3;
/**
 * @enum {0 | 1 | 2 | 3}
 */
export const Intent: Readonly<{
    Perceptual: 0;
    "0": "Perceptual";
    RelativeColorimetric: 1;
    "1": "RelativeColorimetric";
    Saturation: 2;
    "2": "Saturation";
    AbsoluteColorimetric: 3;
    "3": "AbsoluteColorimetric";
}>;
export function initSync(module: any): any;
declare function __wbg_init(module_or_path: any): Promise<any>;
export { __wbg_init as default };
