export class JBig2CCITTFaxImage extends WasmImage {
    static get instance(): any;
    _filename: string;
    _noWasmFilename: string;
    decode(bytes: any, width: any, height: any, globals: any, CCITTOptions: any): Promise<never>;
}
declare const Jbig2Error_base: any;
export class Jbig2Error extends Jbig2Error_base {
    [x: string]: any;
    constructor(msg: any);
}
import { WasmImage } from "./wasm_image.js";
export {};
