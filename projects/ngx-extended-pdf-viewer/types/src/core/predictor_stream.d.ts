export class PredictorStream extends DecodeStream {
    constructor(str: any, maybeLength: any, params: any);
    predictor: any;
    stream: any;
    dict: any;
    colors: any;
    bits: any;
    columns: any;
    pixBytes: number | undefined;
    rowBytes: number | undefined;
    readBlockTiff(): void;
    readBlockPng(): void;
}
import { DecodeStream } from "./decode_stream.js";
