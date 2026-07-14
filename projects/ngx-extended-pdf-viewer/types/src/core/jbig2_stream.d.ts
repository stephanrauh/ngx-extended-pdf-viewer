/**
 * For JBIG2's we use a library to decode these images and
 * the stream behaves like all the other DecodeStreams.
 */
export class Jbig2Stream extends DecodeStream {
    static stripFileHeader(bytes: any): any;
    constructor(stream: any, maybeLength: any, params: any);
    stream: any;
    dict: any;
    maybeLength: any;
    params: any;
    get bytes(): any;
    ensureBuffer(requested: any): void;
    decodeImage(bytes: any, length: any, _decoderOptions: any): Promise<Uint8Array<ArrayBuffer>>;
    get canAsyncDecodeImageFromBuffer(): any;
}
import { DecodeStream } from "./decode_stream.js";
