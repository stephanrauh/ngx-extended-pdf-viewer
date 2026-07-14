export class DecryptStream extends DecodeStream {
    constructor(str: any, maybeLength: any, decrypt: any);
    stream: any;
    dict: any;
    decrypt: any;
    getOriginalStream(): this;
    #private;
}
import { DecodeStream } from "./decode_stream.js";
