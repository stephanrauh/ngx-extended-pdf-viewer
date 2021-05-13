export class PDFImage {
    /**
     * Handles processing of image data and returns the Promise that is resolved
     * with a PDFImage when the image is ready to be used.
     */
    static buildImage({ xref, res, image, isInline, pdfFunctionFactory, localColorSpaceCache, }: {
        xref: any;
        res: any;
        image: any;
        isInline?: boolean;
        pdfFunctionFactory: any;
        localColorSpaceCache: any;
    }): Promise<PDFImage>;
    static createMask({ imgArray, width, height, imageIsFromDecodeStream, inverseDecode, }: {
        imgArray: any;
        width: any;
        height: any;
        imageIsFromDecodeStream: any;
        inverseDecode: any;
    }): {
        data: any;
        width: any;
        height: any;
    };
    constructor({ xref, res, image, isInline, smask, mask, isMask, pdfFunctionFactory, localColorSpaceCache, }: {
        xref: any;
        res: any;
        image: any;
        isInline?: boolean;
        smask?: any;
        mask?: any;
        isMask?: boolean;
        pdfFunctionFactory: any;
        localColorSpaceCache: any;
    });
    image: any;
    width: any;
    height: any;
    interpolate: any;
    imageMask: any;
    matte: any;
    bpc: any;
    colorSpace: any;
    numComps: any;
    decode: any;
    needsDecode: boolean;
    decodeCoefficients: number[];
    decodeAddends: any[];
    smask: PDFImage;
    mask: any;
    get drawWidth(): number;
    get drawHeight(): number;
    decodeBuffer(buffer: any): void;
    getComponents(buffer: any): any;
    fillOpacity(rgbaBuf: any, width: any, height: any, actualHeight: any, image: any): void;
    undoPreblend(buffer: any, width: any, height: any): void;
    createImageData(forceRGBA?: boolean): {
        width: number;
        height: number;
        kind: number;
        data: any;
    };
    fillGrayBuffer(buffer: any): void;
    getImageBytes(length: any, drawWidth: any, drawHeight: any, forceRGB?: boolean): any;
}
