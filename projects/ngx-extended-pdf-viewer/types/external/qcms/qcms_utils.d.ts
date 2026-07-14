export function copy_result(ptr: any, len: any): void;
export function copy_rgb(ptr: any): void;
export function make_cssRGB(ptr: any): void;
export class QCMS {
    static #memoryArray: null;
    static _memory: null;
    static _mustAddAlpha: boolean;
    static _destBuffer: null;
    static _destOffset: number;
    static _destLength: number;
    static _cssColor: string;
    static _makeHexColor: null;
    static get _memoryArray(): Uint8Array<any>;
}
