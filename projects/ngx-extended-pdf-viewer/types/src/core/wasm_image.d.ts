export class WasmImage {
    static #handler: null;
    static #instances: Set<any>;
    static #useWasm: boolean;
    static #useWorkerFetch: boolean;
    static #wasmUrl: null;
    static setOptions({ handler, useWasm, useWorkerFetch, wasmUrl }: {
        handler: any;
        useWasm: any;
        useWorkerFetch: any;
        wasmUrl: any;
    }): void;
    static get instance(): void;
    static cleanup(): void;
    constructor(trackInstance?: boolean);
    _filename: null;
    _noWasmFilename: null;
    _getModule(ImageDecoder: any): null;
    decode(bytes: any, _params: any): Promise<void>;
    #private;
}
