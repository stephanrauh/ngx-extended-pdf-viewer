export class CssFontInfo {
    constructor(buffer: any);
    get fontFamily(): any;
    get fontWeight(): any;
    get italicAngle(): any;
    #private;
}
export class FontInfo {
    constructor({ buffer, extra }: {
        buffer: any;
        extra: any;
    });
    get black(): boolean | undefined;
    get bold(): boolean | undefined;
    get disableFontFace(): boolean | undefined;
    get fontExtraProperties(): boolean | undefined;
    get isInvalidPDFjsFont(): boolean | undefined;
    get isType3Font(): boolean | undefined;
    get italic(): boolean | undefined;
    get missingFile(): boolean | undefined;
    get remeasure(): boolean | undefined;
    get vertical(): boolean | undefined;
    get ascent(): number;
    get defaultWidth(): number;
    get descent(): number;
    get bbox(): any[] | undefined;
    get fontMatrix(): any[] | undefined;
    get defaultVMetrics(): any[] | undefined;
    get fallbackName(): any;
    get loadedName(): any;
    get mimetype(): any;
    get name(): any;
    get data(): Uint8Array<any> | undefined;
    clearData(): void;
    get cssFontInfo(): CssFontInfo | null;
    get systemFontInfo(): SystemFontInfo | null;
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
    get guessFallback(): boolean;
    get css(): any;
    get loadedName(): any;
    get baseFontName(): any;
    get src(): any;
    get style(): {
        style: any;
        weight: any;
    };
    #private;
}
