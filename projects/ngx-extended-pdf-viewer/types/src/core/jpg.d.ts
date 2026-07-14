declare const JpegError_base: any;
export class JpegError extends JpegError_base {
    [x: string]: any;
    constructor(msg: any);
}
export class JpegImage {
    static canUseImageDecoder(data: any, colorTransform?: number): {
        exifStart: any;
        exifEnd: any;
    } | {
        exifStart?: undefined;
        exifEnd?: undefined;
    } | null;
    constructor({ decodeTransform, colorTransform }?: {
        decodeTransform?: null | undefined;
        colorTransform?: number | undefined;
    });
    _decodeTransform: any;
    _colorTransform: number;
    parse(data: any, { dnlScanLines }?: {
        dnlScanLines?: null | undefined;
    }): any;
    width: any;
    height: any;
    jfif: {
        version: {
            major: any;
            minor: any;
        };
        densityUnits: any;
        xDensity: number;
        yDensity: number;
        thumbWidth: any;
        thumbHeight: any;
        thumbData: any;
    } | null | undefined;
    adobe: {
        version: number;
        flags0: number;
        flags1: number;
        transformCode: any;
    } | null | undefined;
    components: any[] | undefined;
    numComponents: number | undefined;
    get _isColorConversionNeeded(): boolean;
    _convertYccToRgb(data: any): any;
    _convertYccToRgba(data: any, out: any): any;
    _convertYcckToRgb(data: any): any;
    _convertYcckToRgba(data: any): any;
    _convertYcckToCmyk(data: any): any;
    _convertCmykToRgb(data: any): any;
    _convertCmykToRgba(data: any): any;
    getData({ width, height, forceRGBA, forceRGB, isSourcePDF, }: {
        width: any;
        height: any;
        forceRGBA?: boolean | undefined;
        forceRGB?: boolean | undefined;
        isSourcePDF?: boolean | undefined;
    }): any;
    #private;
}
export {};
