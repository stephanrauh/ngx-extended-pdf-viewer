export class NullStream extends Stream {
    constructor();
}
export class Stream extends BaseStream {
    constructor(arrayBuffer: any, start: any, length: any, dict: any);
    bytes: Uint8Array<any>;
    start: any;
    pos: any;
    end: any;
    dict: any;
    getByte(): number;
    getBytes(length: any): Uint8Array<any>;
    getByteRange(begin: any, end: any): Uint8Array<any>;
    makeSubStream(start: any, length: any, dict?: null): Stream;
    clone(): Stream;
}
export class StringStream extends Stream {
    constructor(str: any, dict?: null);
}
import { BaseStream } from "./base_stream.js";
