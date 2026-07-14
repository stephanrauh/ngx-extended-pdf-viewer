export class FlateStream extends DecodeStream {
    constructor(str: any, maybeLength: any);
    stream: any;
    dict: any;
    codeSize: number;
    codeBuf: number;
    getImageData(length: any, _decoderOptions: any): Promise<Uint8Array<ArrayBuffer>>;
    asyncGetBytes(): Promise<Uint8Array<ArrayBuffer> | null>;
    getBits(bits: any): number;
    getCode(table: any): number;
    generateHuffmanTable(lengths: any): (number | Int32Array<ArrayBuffer>)[];
    #private;
}
import { DecodeStream } from "./decode_stream.js";
