export class ColorSpace {
    /**
     * @private
     */
    private static _cache;
    static getCached(cacheKey: any, xref: any, localColorSpaceCache: any): any;
    static parseAsync({ cs, xref, resources, pdfFunctionFactory, localColorSpaceCache, }: {
        cs: any;
        xref: any;
        resources?: any;
        pdfFunctionFactory: any;
        localColorSpaceCache: any;
    }): Promise<any>;
    static parse({ cs, xref, resources, pdfFunctionFactory, localColorSpaceCache, }: {
        cs: any;
        xref: any;
        resources?: any;
        pdfFunctionFactory: any;
        localColorSpaceCache: any;
    }): any;
    /**
     * @private
     */
    private static _parse;
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
    static get singletons(): any;
    constructor(name: any, numComps: any);
    name: any;
    numComps: any;
    /**
     * Converts the color value to the RGB color. The color components are
     * located in the src array starting from the srcOffset. Returns the array
     * of the rgb components, each value ranging from [0,255].
     */
    getRgb(src: any, srcOffset: any): Uint8ClampedArray;
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
    isDefaultDecode(decodeMap: any, bpc: any): boolean;
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
