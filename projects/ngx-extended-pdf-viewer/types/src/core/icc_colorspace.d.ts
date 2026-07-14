export class CmykICCBasedCS extends IccColorSpace {
    static #iccUrl: any;
    static setOptions({ iccUrl }: {
        iccUrl: any;
    }): void;
    constructor();
}
export class IccColorSpace extends ColorSpace {
    static #useWasm: boolean;
    static #wasmUrl: null;
    static #finalizer: null;
    static setOptions({ useWasm, useWorkerFetch, wasmUrl }: {
        useWasm: any;
        useWorkerFetch: any;
        wasmUrl: any;
    }): void;
    static get isUsable(): any;
    constructor(iccProfile: any, name: any, numComps: any);
    getOutputLength(inputLength: any, alpha01: any): number;
    #private;
}
import { ColorSpace } from "./colorspace.js";
