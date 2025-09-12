export type SimpleDependency = "lineWidth" | "lineCap" | "lineJoin" | "miterLimit" | "dash" | "strokeAlpha" | "fillColor" | "fillAlpha" | "globalCompositeOperation" | "path" | "filter";
export type IncrementalDependency = "transform" | "moveText" | "sameLineText";
export type InternalIncrementalDependency = IncrementalDependency | typeof FORCED_DEPENDENCY_LABEL;
/**
 * @typedef {"lineWidth" | "lineCap" | "lineJoin" | "miterLimit" | "dash" |
 * "strokeAlpha" | "fillColor" | "fillAlpha" | "globalCompositeOperation" |
 * "path" | "filter"} SimpleDependency
 */
/**
 * @typedef {"transform" | "moveText" | "sameLineText"} IncrementalDependency
 */
/**
 * @typedef {IncrementalDependency |
 * typeof FORCED_DEPENDENCY_LABEL} InternalIncrementalDependency
 */
export class CanvasDependencyTracker {
    constructor(canvas: any);
    save(opIdx: any): this;
    restore(opIdx: any): this;
    /**
     * @param {number} idx
     */
    recordOpenMarker(idx: number): this;
    getOpenMarker(): any;
    recordCloseMarker(idx: any): this;
    beginMarkedContent(opIdx: any): this;
    endMarkedContent(opIdx: any): this;
    pushBaseTransform(ctx: any): this;
    popBaseTransform(): this;
    /**
     * @param {SimpleDependency} name
     * @param {number} idx
     */
    recordSimpleData(name: SimpleDependency, idx: number): this;
    /**
     * @param {IncrementalDependency} name
     * @param {number} idx
     */
    recordIncrementalData(name: IncrementalDependency, idx: number): this;
    /**
     * @param {IncrementalDependency} name
     * @param {number} idx
     */
    resetIncrementalData(name: IncrementalDependency, idx: number): this;
    recordNamedData(name: any, idx: any): this;
    recordFutureForcedDependency(name: any, idx: any): this;
    inheritSimpleDataAsFutureForcedDependencies(names: any): this;
    inheritPendingDependenciesAsFutureForcedDependencies(): this;
    resetBBox(idx: any): this;
    get hasPendingBBox(): boolean;
    recordClipBox(idx: any, ctx: any, minX: any, maxX: any, minY: any, maxY: any): this;
    recordBBox(idx: any, ctx: any, minX: any, maxX: any, minY: any, maxY: any): this;
    recordCharacterBBox(idx: any, ctx: any, font: any, scale: number | undefined, x: number | undefined, y: number | undefined, getMeasure: any): this;
    recordFullPageBBox(idx: any): this;
    getSimpleIndex(dependencyName: any): any;
    recordDependencies(idx: any, dependencyNames: any): this;
    copyDependenciesFromIncrementalOperation(idx: any, name: any): this;
    recordNamedDependency(idx: any, name: any): this;
    /**
     * @param {number} idx
     */
    recordOperation(idx: number, preserveBbox?: boolean): this;
    bboxToClipBoxDropOperation(idx: any): this;
    _takePendingDependencies(): Set<any>;
    _extractOperation(idx: any): any;
    _pushPendingDependencies(dependencies: any): void;
    take(): {
        minX: number;
        maxX: number;
        minY: number;
        maxY: number;
        dependencies: any[];
        idx: any;
    }[];
    #private;
}
/**
 * Used to track dependencies of nested operations list, that
 * should actually all map to the index of the operation that
 * contains the nested list.
 *
 * @implements {CanvasDependencyTracker}
 */
export class CanvasNestedDependencyTracker implements CanvasDependencyTracker {
    constructor(dependencyTracker: any, opIdx: any);
    save(opIdx: any): this;
    restore(opIdx: any): this;
    recordOpenMarker(idx: any): this;
    getOpenMarker(): any;
    recordCloseMarker(idx: any): this;
    beginMarkedContent(opIdx: any): this;
    endMarkedContent(opIdx: any): this;
    pushBaseTransform(ctx: any): this;
    popBaseTransform(): this;
    /**
     * @param {SimpleDependency} name
     * @param {number} idx
     */
    recordSimpleData(name: SimpleDependency, idx: number): this;
    /**
     * @param {IncrementalDependency} name
     * @param {number} idx
     */
    recordIncrementalData(name: IncrementalDependency, idx: number): this;
    /**
     * @param {IncrementalDependency} name
     * @param {number} idx
     */
    resetIncrementalData(name: IncrementalDependency, idx: number): this;
    recordNamedData(name: any, idx: any): this;
    recordFutureForcedDependency(name: any, idx: any): this;
    inheritSimpleDataAsFutureForcedDependencies(names: any): this;
    inheritPendingDependenciesAsFutureForcedDependencies(): this;
    resetBBox(idx: any): this;
    get hasPendingBBox(): boolean;
    recordClipBox(idx: any, ctx: any, minX: any, maxX: any, minY: any, maxY: any): this;
    recordBBox(idx: any, ctx: any, minX: any, maxX: any, minY: any, maxY: any): this;
    recordCharacterBBox(idx: any, ctx: any, font: any, scale: any, x: any, y: any, getMeasure: any): this;
    recordFullPageBBox(idx: any): this;
    getSimpleIndex(dependencyName: any): any;
    recordDependencies(idx: any, dependencyNames: any): this;
    copyDependenciesFromIncrementalOperation(idx: any, name: any): this;
    recordNamedDependency(idx: any, name: any): this;
    /**
     * @param {number} idx
     * @param {SimpleDependency[]} dependencyNames
     */
    recordOperation(idx: number): this;
    bboxToClipBoxDropOperation(idx: any): this;
    recordNestedDependencies(): void;
    take(): void;
    #private;
}
export namespace Dependencies {
    let stroke: string[];
    let fill: string[];
    let imageXObject: string[];
    let rawFillPath: string[];
    let showText: string[];
    let transform: string[];
    let transformAndFill: string[];
}
declare const FORCED_DEPENDENCY_LABEL: "__forcedDependency";
export {};
