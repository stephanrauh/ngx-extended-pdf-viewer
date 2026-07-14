export class DecodeStream extends BaseStream {
    constructor(maybeMinBufferLength: any);
    buffer: Uint8Array<ArrayBuffer>;
    bufferLength: number;
    eof: boolean;
    minBufferLength: number;
    pos: number;
    _rawMinBufferLength: any;
    readBlock(): void;
    ensureBuffer(requested: any): Uint8Array<ArrayBuffer>;
    getByte(): number;
    getBytes(length: any, decoderOptions?: null): Uint8Array<ArrayBuffer>;
    getImageData(length: any, decoderOptions: any): Promise<any>;
    asyncGetBytesFromDecompressionStream(name: any): Promise<{
        decompressed: Uint8Array<ArrayBuffer>;
        compressed: any;
    } | {
        decompressed: null;
        compressed: any;
    }>;
    makeSubStream(start: any, length: any, dict?: null): Stream;
    clone(): Stream;
    getBaseStreams(): any;
}
export class StreamsSequenceStream extends DecodeStream {
    constructor(streams: any, onError?: null);
    streams: any;
    _onError: any;
    getBaseStreams(): any[] | null;
}
import { BaseStream } from "./base_stream.js";
import { Stream } from "./stream.js";
