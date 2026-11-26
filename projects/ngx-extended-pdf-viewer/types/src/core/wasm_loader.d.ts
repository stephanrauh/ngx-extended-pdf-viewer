export function decodeBrotli(data: any): Promise<Uint8Array<ArrayBuffer>>;
export class WasmLoader {
    static #modules: Map<any, any>;
    /**
     * Fetch a binary file in the worker or via the main thread.
     * @param {object} context - Document handler and options.
     * @param {string} kind - Base URL option name.
     * @param {string} filename
     * @returns {Promise<Uint8Array>}
     */
    static fetch(context: object, kind: string, filename: string): Promise<Uint8Array>;
    static #workerFetch(baseUrl: any, filename: any): Promise<Response>;
    static #fetchAndCompile(context: any, filename: any): Promise<WebAssembly.Module>;
    static #compile(context: any, filename: any): any;
    static #importFallback(context: any, wasmUrl: any, filename: any): Promise<any>;
    /**
     * Initialize a Wasm module or its JS fallback.
     * @param {object} context - Document handler and options.
     * @param {string} filename - Wasm file.
     * @param {string} noWasmFilename - JS fallback file.
     * @param {Function} init - Receives `instantiate(imports) => exports`.
     * @returns {Promise<boolean>} Whether `init` was called without throwing.
     */
    static load(context: object, filename: string, noWasmFilename: string, init: Function): Promise<boolean>;
}
