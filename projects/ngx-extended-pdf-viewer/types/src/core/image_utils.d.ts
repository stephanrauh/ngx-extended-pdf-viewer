export class GlobalColorSpaceCache extends BaseLocalCache {
    set(name: null | undefined, ref: any, data: any): void;
    clear(): void;
}
export class GlobalImageCache {
    static NUM_PAGES_THRESHOLD: number;
    static MIN_IMAGES_TO_CACHE: number;
    static MAX_BYTE_SIZE: number;
    _refCache: RefSetCache;
    _imageCache: RefSetCache;
    shouldCache(ref: any, pageIndex: any): boolean;
    addDecodeFailed(ref: any): void;
    hasDecodeFailed(ref: any): boolean;
    /**
     * PLEASE NOTE: Must be called *after* the `setData` method.
     */
    addByteSize(ref: any, byteSize: any): void;
    getData(ref: any, pageIndex: any): any;
    setData(ref: any, data: any): void;
    clear(onlyData?: boolean): void;
    #private;
}
export class LocalColorSpaceCache extends BaseLocalCache {
    set(name: null | undefined, ref: null | undefined, data: any): void;
}
export class LocalFunctionCache extends BaseLocalCache {
    set(name: null | undefined, ref: any, data: any): void;
}
export class LocalGStateCache extends BaseLocalCache {
    set(name: any, ref: null | undefined, data: any): void;
}
export class LocalImageCache extends BaseLocalCache {
    set(name: any, ref: null | undefined, data: any): void;
}
export class LocalTilingPatternCache extends BaseLocalCache {
    set(name: null | undefined, ref: any, data: any): void;
}
export class RegionalImageCache extends BaseLocalCache {
    set(name: null | undefined, ref: any, data: any): void;
}
declare class BaseLocalCache {
    constructor(options: any);
    _onlyRefs: boolean;
    _nameRefMap: Map<any, any> | undefined;
    _imageMap: Map<any, any> | undefined;
    _imageCache: RefSetCache;
    getByName(name: any): any;
    getByRef(ref: any): any;
    set(name: any, ref: any, data: any): void;
}
import { RefSetCache } from "./primitives.js";
export {};
