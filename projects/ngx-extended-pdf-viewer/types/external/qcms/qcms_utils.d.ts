export function copy_result(ptr: any, len: any): void;
export class QCMS {
    static #memoryArray: null;
    static _memory: null;
    static _destBuffer: null;
    static _destOffset: number;
    static _keepAlpha: boolean;
    static get _memoryArray(): Uint8Array<any>;
}
