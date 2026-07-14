declare const JpxError_base: any;
export class JpxError extends JpxError_base {
    [x: string]: any;
    constructor(msg: any);
}
export class JpxImage extends WasmImage {
    static get instance(): any;
    static parseImageProperties(stream: any): {
        width: number;
        height: number;
        bitsPerComponent: number;
        componentsCount: any;
    };
    _filename: string;
    _noWasmFilename: string;
    decode(bytes: any, { numComponents, isIndexedColormap, smaskInData, reducePower, }?: {
        numComponents?: number | undefined;
        isIndexedColormap?: boolean | undefined;
        smaskInData?: boolean | undefined;
        reducePower?: number | undefined;
    }): Promise<never>;
}
import { WasmImage } from "./wasm_image.js";
export {};
