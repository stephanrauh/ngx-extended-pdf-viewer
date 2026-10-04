export class CssFontInfo {
    constructor(buffer: any);
    get fontFamily(): any;
    get fontWeight(): any;
    get italicAngle(): any;
    #private;
}
export class FontInfo {
    constructor(buffer: any);
    get black(): any;
    get bold(): any;
    get disableFontFace(): any;
    get fontExtraProperties(): any;
    get isInvalidPDFjsFont(): any;
    get isType3Font(): any;
    get italic(): any;
    get missingFile(): any;
    get remeasure(): any;
    get vertical(): any;
    get bbox(): any;
    get fontMatrix(): any;
    get fallbackName(): any;
    get loadedName(): any;
    get data(): Uint8Array<any> | undefined;
    clearData(): void;
    get cssFontInfo(): any;
    get systemFontInfo(): any;
    #private;
}
export class FontPathInfo {
    constructor(buffer: any);
    get path(): any;
    #private;
}
export class PatternInfo {
    constructor(buffer: any);
    buffer: any;
    view: DataView<any>;
    data: Uint8Array<any>;
    getIR(): (string | number | number[] | Float32Array<any> | Uint8Array<any> | null)[] | (string | number | number[] | (string | number)[][] | null)[];
}
export class SystemFontInfo {
    constructor(buffer: any);
    get css(): any;
    get loadedName(): any;
    get baseFontName(): any;
    get src(): any;
    get style(): any;
    #private;
}
