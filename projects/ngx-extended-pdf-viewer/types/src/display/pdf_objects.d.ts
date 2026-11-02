/**
 * A PDF document and page is built of many objects. E.g. there are objects for
 * fonts, images, rendering code, etc. These objects may get processed inside of
 * a worker. This class implements some basic methods to manage these objects.
 */
export class PDFObjects {
    /**
     * If called *without* callback, this returns the data of `objId` but the
     * object needs to be resolved. If it isn't, this method throws.
     *
     * If called *with* a callback, the callback is called with the data of the
     * object once the object is resolved. That means, if you call this method
     * and the object is already resolved, the callback gets called right away.
     * @param {string} objId
     * @param {Function} [callback]
     * @param {Function} [errorCallback] - Called with the rejection reason if the
     *   object fails to resolve (e.g. it could never be delivered). Only used
     *   together with `callback`.
     * @returns {any}
     */
    get(objId: string, callback?: Function, errorCallback?: Function): any;
    /**
     * @param {string} objId
     * @returns {boolean}
     */
    has(objId: string): boolean;
    /**
     * @param {string} objId
     * @returns {boolean}
     */
    delete(objId: string): boolean;
    /**
     * Resolves the object `objId` with optional `data`.
     * @param {string} objId
     * @param {any} [data]
     */
    resolve(objId: string, data?: any): void;
    /**
     * Rejects the object `objId`, signalling that it will never be resolved.
     * @param {string} objId
     * @param {Error} reason
     */
    reject(objId: string, reason: Error): void;
    clear(): void;
    [Symbol.iterator](): Generator<any[], void, unknown>;
    #private;
}
