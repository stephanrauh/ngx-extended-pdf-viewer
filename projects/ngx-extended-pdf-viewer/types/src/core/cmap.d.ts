export class CMap {
    constructor(builtInCMap?: boolean);
    codespaceRanges: never[][];
    numCodespaceRanges: number;
    _map: any[];
    name: string;
    vertical: boolean;
    useCMap: any;
    builtInCMap: boolean;
    addCodespaceRange(n: any, low: any, high: any): void;
    mapCidRange(low: any, high: any, dstLow: any): void;
    mapBfRange(low: any, high: any, dstLow: any): void;
    mapBfRangeToArray(low: any, high: any, array: any): void;
    mapOne(src: any, dst: any): void;
    lookup(code: any): any;
    contains(code: any): boolean;
    forEach(callback: any): void;
    charCodeOf(value: any): number;
    getMap(): any[];
    readCharCode(str: any, offset: any, out: any): void;
    get length(): number;
    get isIdentityCMap(): boolean;
}
export class IdentityCMap extends CMap {
    constructor(vertical: any, n: any);
}
export namespace CMapFactory {
    function create(params: any): Promise<any>;
    function create(params: any): Promise<any>;
}
