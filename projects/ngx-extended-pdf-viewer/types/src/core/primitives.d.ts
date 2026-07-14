export const CIRCULAR_REF: unique symbol;
export function clearPrimitiveCaches(): void;
export class Cmd {
    static get(cmd: any): any;
    constructor(cmd: any);
    cmd: any;
}
export class Dict {
    static get empty(): any;
    static merge({ xref, dictArray, mergeSubDicts }: {
        xref: any;
        dictArray: any;
        mergeSubDicts?: boolean | undefined;
    }): any;
    constructor(xref?: null);
    __nonSerializable__: () => /*elided*/ any;
    objId: null;
    suppressEncryption: boolean;
    xref: any;
    assignXref(newXref: any): void;
    get size(): number;
    get(key1: any, key2: any, key3: any): any;
    getAsync(key1: any, key2: any, key3: any): Promise<any>;
    getArray(key1: any, key2: any, key3: any): any;
    getRaw(key: any): any;
    getKeys(): MapIterator<any>;
    getRawValues(): MapIterator<any>;
    getRawEntries(): MapIterator<[any, any]>;
    set(key: any, value: any): void;
    setIfNotExists(key: any, value: any): void;
    setIfNumber(key: any, value: any): void;
    setIfArray(key: any, value: any): void;
    setIfDefined(key: any, value: any): void;
    setIfName(key: any, value: any): void;
    setIfDict(key: any, value: any): void;
    has(key: any): boolean;
    clone(): Dict;
    delete(key: any): void;
    [Symbol.iterator](): Generator<any[], void, unknown>;
    #private;
}
export const EOF: unique symbol;
export function isCmd(v: any, cmd: any): boolean;
export function isDict(v: any, type: any): boolean;
export function isName(v: any, name: any): boolean;
export function isRefsEqual(v1: any, v2: any): boolean;
export class Name {
    static get(name: any): any;
    constructor(name: any);
    name: any;
}
export class Ref {
    static fromString(str: any): any;
    static get(num: any, gen: any): any;
    constructor(num: any, gen: any);
    num: any;
    gen: any;
    toString(): string;
}
export class RefSet {
    constructor(parent?: null);
    _set: Set<any>;
    has(ref: any): boolean;
    put(ref: any): void;
    remove(ref: any): void;
    clear(): void;
    [Symbol.iterator](): SetIterator<any>;
}
export class RefSetCache {
    _map: Map<any, any>;
    get size(): number;
    get(ref: any): any;
    has(ref: any): boolean;
    put(ref: any, obj: any): void;
    putAlias(ref: any, aliasRef: any): void;
    clear(): void;
    values(): Generator<any, void, unknown>;
    items(): Generator<any[], void, unknown>;
    keys(): Generator<any, void, unknown>;
    [Symbol.iterator](): MapIterator<any>;
}
