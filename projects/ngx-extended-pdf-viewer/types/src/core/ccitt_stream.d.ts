export class CCITTFaxStream extends DecodeStream {
    constructor(str: any, maybeLength: any, params: any);
    stream: any;
    maybeLength: any;
    dict: any;
    params: {
        K: any;
        EndOfLine: boolean;
        EncodedByteAlign: boolean;
        Columns: any;
        Rows: any;
        EndOfBlock: boolean;
        BlackIs1: boolean;
    };
    get bytes(): any;
    decodeImage(bytes: any, length: any, _decoderOptions: any): Promise<Uint8Array<ArrayBuffer>>;
}
import { DecodeStream } from "./decode_stream.js";
