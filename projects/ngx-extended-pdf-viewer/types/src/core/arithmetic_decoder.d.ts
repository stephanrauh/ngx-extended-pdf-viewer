/**
 * This class implements the QM Coder decoding as defined in
 *   JPEG 2000 Part I Final Committee Draft Version 1.0
 *   Annex C.3 Arithmetic decoding procedure
 * available at http://www.jpeg.org/public/fcd15444-1.pdf
 *
 * The arithmetic decoder is used in conjunction with context models to decode
 * JPEG2000 and JBIG2 streams.
 */
export class ArithmeticDecoder {
    constructor(data: any, start: any, end: any);
    data: any;
    bp: any;
    dataEnd: any;
    chigh: number;
    clow: number;
    a: number;
    byteIn(): void;
    ct: number | undefined;
    readBit(contexts: any, pos: any): number;
}
