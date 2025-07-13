/**
 * View History - This is a utility for saving various view parameters for
 *                recently opened files.
 *
 * The way that the view parameters are stored depends on how PDF.js is built,
 * for 'gulp <flag>' the following cases exist:
 *  - MOZCENTRAL        - uses sessionStorage.
 *  - GENERIC or CHROME - uses localStorage, if it is available.
 */
export class ViewHistory {
    constructor(fingerprint: any, cacheSize?: number);
    fingerprint: any;
    cacheSize: number;
    _initializedPromise: Promise<void>;
    file: any;
    database: any;
    _writeToStorage(): Promise<void>;
    _readFromStorage(): Promise<string | null | undefined>;
    set(name: any, val: any): Promise<void>;
    setMultiple(properties: any): Promise<void>;
    get(name: any, defaultValue: any): Promise<any>;
    getMultiple(properties: any): Promise<any>;
}
