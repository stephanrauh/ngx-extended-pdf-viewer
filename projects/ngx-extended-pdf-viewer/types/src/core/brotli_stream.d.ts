export class BrotliStream extends DecodeStream {
    constructor(stream: any, maybeLength: any);
    stream: any;
    dict: any;
    getImageData(length: any, _decoderOptions: any): Promise<Uint8Array<ArrayBuffer>>;
    asyncGetBytes(): Promise<Uint8Array<ArrayBuffer> | null>;
    #private;
}
import { DecodeStream } from "./decode_stream.js";
