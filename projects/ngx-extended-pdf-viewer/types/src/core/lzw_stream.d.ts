export class LZWStream extends DecodeStream {
    constructor(str: any, maybeLength: any, earlyChange: any);
    stream: any;
    dict: any;
    cachedData: number;
    bitsCached: number;
    lzwState: {
        earlyChange: any;
        codeLength: number;
        nextCode: number;
        dictionaryValues: Uint8Array<ArrayBuffer>;
        dictionaryLengths: Uint16Array<ArrayBuffer>;
        dictionaryPrevCodes: Uint16Array<ArrayBuffer>;
        currentSequence: Uint8Array<ArrayBuffer>;
        currentSequenceLength: number;
    };
    readBits(n: any): number | null;
}
import { DecodeStream } from "./decode_stream.js";
