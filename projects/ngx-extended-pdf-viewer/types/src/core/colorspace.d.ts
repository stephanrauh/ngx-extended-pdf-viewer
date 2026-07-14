/**
 * Alternate color space handles both Separation and DeviceN color spaces.  A
 * Separation color space is actually just a DeviceN with one color component.
 * Both color spaces use a tinting function to convert colors to a base color
 * space.
 *
 * The default color is `new Float32Array(new Array(numComps).fill(1))`.
 */
export class AlternateCS extends ColorSpace {
    constructor(numComps: any, base: any, tintFn: any);
    base: any;
    tintFn: any;
    tmpBuf: Float32Array<any>;
    getOutputLength(inputLength: any, alpha01: any): any;
}
/**
 * CalGrayCS: Based on "PDF Reference, Sixth Ed", p.245
 *
 * The default color is `new Float32Array([0])`.
 */
export class CalGrayCS extends ColorSpace {
    constructor(whitePoint: any, blackPoint: any, gamma: any);
    G: any;
    XB: any;
    YB: any;
    ZB: any;
    getOutputLength(inputLength: any, alpha01: any): number;
    #private;
}
/**
 * CalRGBCS: Based on "PDF Reference, Sixth Ed", p.247
 *
 * The default color is `new Float32Array([0, 0, 0])`.
 */
export class CalRGBCS extends ColorSpace {
    static #BRADFORD_SCALE_MATRIX: Float32Array<ArrayBuffer>;
    static #BRADFORD_SCALE_INVERSE_MATRIX: Float32Array<ArrayBuffer>;
    static #SRGB_D65_XYZ_TO_RGB_MATRIX: Float32Array<ArrayBuffer>;
    static #FLAT_WHITEPOINT_MATRIX: Float32Array<ArrayBuffer>;
    static #tempNormalizeMatrix: Float32Array<ArrayBuffer>;
    static #tempConvertMatrix1: Float32Array<ArrayBuffer>;
    static #tempConvertMatrix2: Float32Array<ArrayBuffer>;
    static #DECODE_L_CONSTANT: number;
    constructor(whitePoint: any, blackPoint: any, gamma: any, matrix: any);
    whitePoint: any;
    blackPoint: any;
    GR: any;
    GG: any;
    GB: any;
    getOutputLength(inputLength: any, alpha01: any): number;
    #private;
}
export class ColorSpace {
    static #rgbBuf: Uint8ClampedArray<ArrayBuffer>;
    /**
     * Checks if a decode map matches the default decode map for a color space.
     * This handles the general decode maps where there are two values per
     * component, e.g. [0, 1, 0, 1, 0, 1] for a RGB color.
     * This does not handle Lab, Indexed, or Pattern decode maps since they are
     * slightly different.
     * @param {Array} decode - Decode map (usually from an image).
     * @param {number} numComps - Number of components the color space has.
     */
    static isDefaultDecode(decode: any[], numComps: number): boolean;
    constructor(name: any, numComps: any);
    name: any;
    numComps: any;
    /**
     * Converts the color value to the RGB color. The color components are
     * located in the src array starting from the srcOffset. Returns the array
     * of the rgb components, each value ranging from [0,255].
     */
    getRgb(src: any, srcOffset: any, output?: Uint8ClampedArray<ArrayBuffer>): Uint8ClampedArray<ArrayBuffer>;
    getRgbHex(src: any, srcOffset: any): string;
    /**
     * Converts the color value to the RGB color, similar to the getRgb method.
     * The result placed into the dest array starting from the destOffset.
     */
    getRgbItem(src: any, srcOffset: any, dest: any, destOffset: any): void;
    /**
     * Converts the specified number of the color values to the RGB colors.
     * The colors are located in the src array starting from the srcOffset.
     * The result is placed into the dest array starting from the destOffset.
     * The src array items shall be in [0,2^bits) range, the dest array items
     * will be in [0,255] range. alpha01 indicates how many alpha components
     * there are in the dest array; it will be either 0 (RGB array) or 1 (RGBA
     * array).
     */
    getRgbBuffer(src: any, srcOffset: any, count: any, dest: any, destOffset: any, bits: any, alpha01: any): void;
    /**
     * Determines the number of bytes required to store the result of the
     * conversion done by the getRgbBuffer method. As in getRgbBuffer,
     * |alpha01| is either 0 (RGB output) or 1 (RGBA output).
     */
    getOutputLength(inputLength: any, alpha01: any): void;
    /**
     * Returns true if source data will be equal the result/output data.
     */
    isPassthrough(bits: any): boolean;
    /**
     * Refer to the static `ColorSpace.isDefaultDecode` method below.
     */
    isDefaultDecode(decode: any, bpc: any): boolean;
    /**
     * Fills in the RGB colors in the destination buffer.  alpha01 indicates
     * how many alpha components there are in the dest array; it will be either
     * 0 (RGB array) or 1 (RGBA array).
     */
    fillRgb(dest: any, originalWidth: any, originalHeight: any, width: any, height: any, actualHeight: any, bpc: any, comps: any, alpha01: any): void;
    /**
     * True if the colorspace has components in the default range of [0, 1].
     * This should be true for all colorspaces except for lab color spaces
     * which are [0,100], [-128, 127], [-128, 127].
     */
    get usesZeroToOneRange(): any;
}
/**
 * The default color is `new Float32Array([0, 0, 0, 1])`.
 */
export class DeviceCmykCS extends ColorSpace {
    constructor();
    getOutputLength(inputLength: any, alpha01: any): number;
    #private;
}
/**
 * The default color is `new Float32Array([0])`.
 */
export class DeviceGrayCS extends ColorSpace {
    constructor();
    getOutputLength(inputLength: any, alpha01: any): number;
}
/**
 * The default color is `new Float32Array([0, 0, 0, 1])`.
 */
export class DeviceRgbaCS extends ColorSpace {
    constructor();
    getOutputLength(inputLength: any, _alpha01: any): number;
}
/**
 * The default color is `new Float32Array([0, 0, 0])`.
 */
export class DeviceRgbCS extends ColorSpace {
    constructor();
    getOutputLength(inputLength: any, alpha01: any): number;
}
/**
 * The default color is `new Uint8Array([0])`.
 */
export class IndexedCS extends ColorSpace {
    constructor(base: any, highVal: any, lookup: any);
    base: any;
    highVal: any;
    lookup: Uint8Array<ArrayBuffer>;
    getOutputLength(inputLength: any, alpha01: any): any;
}
/**
 * LabCS: Based on "PDF Reference, Sixth Ed", p.250
 *
 * The default color is `new Float32Array([0, 0, 0])`.
 */
export class LabCS extends ColorSpace {
    constructor(whitePoint: any, blackPoint: any, range: any);
    XB: any;
    YB: any;
    ZB: any;
    amin: any;
    amax: any;
    bmin: any;
    bmax: any;
    getOutputLength(inputLength: any, alpha01: any): number;
    #private;
}
export class PatternCS extends ColorSpace {
    constructor(baseCS: any);
    base: any;
    isDefaultDecode(decode: any, bpc: any): void;
}
