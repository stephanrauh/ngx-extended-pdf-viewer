export function clearPatternCaches(): void;
export function getTilingPatternIR(operatorList: any, dict: any, color: any, needsIsolation?: boolean): any[];
export class Pattern {
    static #hasGPU: boolean;
    static setOptions({ hasGPU }: {
        hasGPU: any;
    }): void;
    static parseShading(shading: any, xref: any, res: any, pdfFunctionFactory: any, globalColorSpaceCache: any, localColorSpaceCache: any): FunctionBasedShading | RadialAxialShading | MeshShading | DummyShading;
}
declare class FunctionBasedShading extends BaseShading {
    static MAX_STEP_COUNT: number;
    constructor(dict: any, xref: any, resources: any, pdfFunctionFactory: any, globalColorSpaceCache: any, localColorSpaceCache: any);
    bbox: any;
    background: any;
    bounds: number[];
    coords: Float32Array<ArrayBuffer>;
    colors: Uint8ClampedArray<ArrayBuffer>;
    figures: {
        type: number;
        coords: Uint32Array<ArrayBuffer>;
        colors: Uint32Array<ArrayBuffer>;
        verticesPerRow: number;
    }[];
    getIR(): any[];
}
declare class RadialAxialShading extends BaseShading {
    constructor(dict: any, xref: any, resources: any, pdfFunctionFactory: any, globalColorSpaceCache: any, localColorSpaceCache: any);
    shadingType: any;
    coordsArr: any;
    bbox: any;
    extendStart: boolean;
    extendEnd: boolean;
    colorStops: any[];
    getIR(): any[];
}
declare class MeshShading extends BaseShading {
    static MIN_SPLIT_PATCH_CHUNKS_AMOUNT: number;
    static MAX_SPLIT_PATCH_CHUNKS_AMOUNT: number;
    static TRIANGLE_DENSITY: number;
    constructor(stream: any, xref: any, resources: any, pdfFunctionFactory: any, globalColorSpaceCache: any, localColorSpaceCache: any);
    shadingType: any;
    bbox: any;
    background: any;
    coords: any[];
    colors: any[];
    figures: any[];
    _decodeType4Shading(reader: any): void;
    _decodeType5Shading(reader: any, verticesPerRow: any): void;
    _decodeType6Shading(reader: any): void;
    _decodeType7Shading(reader: any): void;
    _buildFigureFromPatch(index: any): void;
    _updateBounds(): void;
    _packData(): void;
    getIR(): any[];
}
declare class DummyShading extends BaseShading {
    getIR(): string[];
}
declare class BaseShading {
    static SMALL_NUMBER: number;
    getIR(): void;
}
export {};
