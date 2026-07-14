/**
 * For JPEG 2000's we use a library to decode these images and
 * the stream behaves like all the other DecodeStreams.
 */
export class JpxStream extends DecodeStream {
    constructor(stream: any, maybeLength: any);
    stream: any;
    dict: any;
    maybeLength: any;
    get bytes(): any;
    ensureBuffer(requested: any): void;
    decodeImage(bytes: any, _length: any, decoderOptions: any): Promise<Uint8Array<ArrayBuffer>>;
    get canAsyncDecodeImageFromBuffer(): any;
}
import { DecodeStream } from "./decode_stream.js";
