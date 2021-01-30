export class GlobalImageCache {
    static get NUM_PAGES_THRESHOLD(): any;
    static get MIN_IMAGES_TO_CACHE(): any;
    static get MAX_BYTE_SIZE(): any;
    _refCache: RefSetCache;
    _imageCache: RefSetCache;
    get _byteSize(): number;
    get _cacheLimitReached(): boolean;
    shouldCache(ref: any, pageIndex: any): boolean;
    addPageIndex(ref: any, pageIndex: any): void;
    /**
     * PLEASE NOTE: Must be called *after* the `setData` method.
     */
    addByteSize(ref: any, byteSize: any): void;
    getData(ref: any, pageIndex: any): any;
    setData(ref: any, data: any): void;
    clear(onlyData?: boolean): void;
}
export class LocalColorSpaceCache extends BaseLocalCache {
    constructor(options: any);
}
export class LocalFunctionCache extends BaseLocalCache {
    constructor(options: any);
}
export class LocalGStateCache extends BaseLocalCache {
    constructor(options: any);
}
export class LocalImageCache extends BaseLocalCache {
    constructor(options: any);
}
export class LocalTilingPatternCache extends BaseLocalCache {
    constructor(options: any);
}
import { RefSetCache } from "./primitives.js";
declare class BaseLocalCache {
    constructor(options: any);
    _nameRefMap: Map<any, any> | undefined;
    _imageMap: Map<any, any> | undefined;
    _imageCache: RefSetCache;
    getByName(name: any): any;
    getByRef(ref: any): any;
    set(name: any, ref: any, data: any): void;
}
export {};
