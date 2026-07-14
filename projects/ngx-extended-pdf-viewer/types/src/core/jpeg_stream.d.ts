/**
 * For JPEG's we use a library to decode these images and the stream behaves
 * like all the other DecodeStreams.
 */
export class JpegStream extends DecodeStream {
    static #isImageDecoderSupported: any;
    static get canUseImageDecoder(): any;
    static setOptions({ isImageDecoderSupported }: {
        isImageDecoderSupported?: boolean | undefined;
    }): void;
    constructor(stream: any, maybeLength: any, params: any);
    stream: any;
    dict: any;
    maybeLength: any;
    params: any;
    get bytes(): any;
    ensureBuffer(requested: any): void;
    get jpegOptions(): any;
    decodeImage(bytes: any): Uint8Array<ArrayBuffer>;
    get canAsyncDecodeImageFromBuffer(): any;
    getTransferableImage(): Promise<VideoFrame | null>;
    #private;
}
import { DecodeStream } from "./decode_stream.js";
