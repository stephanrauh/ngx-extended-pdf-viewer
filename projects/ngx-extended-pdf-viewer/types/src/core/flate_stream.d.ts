export class FlateStream extends DecodeStream {
    static #MIN_NATIVE_COMPRESSED_LENGTH: number;
    static #MAX_JS_DECODED_LENGTH: number;
    constructor(str: any, maybeLength: any);
    stream: any;
    dict: any;
    codeSize: number;
    codeBuf: number;
    getImageData(length: any, _decoderOptions: any): Promise<Uint8Array<ArrayBuffer>>;
    /**
     * @param {number} [decodedLength] - Expected output length, or 0 if unknown.
     */
    asyncGetBytes(decodedLength?: number): Promise<Uint8Array<ArrayBuffer> | null>;
    getBits(bits: any): number;
    getCode(table: any): number;
    generateHuffmanTable(lengths: any): (number | Int32Array<ArrayBuffer>)[];
    #private;
}
import { DecodeStream } from "./decode_stream.js";
