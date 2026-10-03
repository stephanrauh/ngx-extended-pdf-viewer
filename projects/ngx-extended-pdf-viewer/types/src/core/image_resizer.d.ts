export class ImageResizer {
    static #goodSquareLength: number;
    static #isImageDecoderSupported: any;
    static get canUseImageDecoder(): any;
    static needsToBeResized(width: any, height: any): boolean;
    static set MAX_AREA(area: any);
    static get MAX_AREA(): any;
    static getReducePower(width: any, height: any, maxArea?: number): number;
    static getReducePowerForJPX(width: any, height: any, componentsCount: any): number;
    static get MAX_DIM(): any;
    static setOptions({ canvasMaxAreaInBytes, isImageDecoderSupported, }: {
        canvasMaxAreaInBytes?: number | undefined;
        isImageDecoderSupported?: boolean | undefined;
    }): void;
    static _areGoodDims(width: any, height: any): boolean;
    static _guessMax(start: any, end: any, tolerance: any, defaultHeight: any): any;
    static createImage(imgData: any, isMask?: boolean): Promise<any>;
    constructor(imgData: any, isMask: any);
    _imgData: any;
    _isMask: any;
    _createImage(): Promise<any>;
    _encodeBMP(): Uint8Array<any>;
    #private;
}
