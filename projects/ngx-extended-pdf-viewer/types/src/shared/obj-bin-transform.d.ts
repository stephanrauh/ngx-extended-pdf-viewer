export class CssFontInfo {
    static strings: string[];
    static write(info: any): ArrayBuffer;
    constructor(buffer: any);
    get fontFamily(): string;
    get fontWeight(): string;
    get italicAngle(): string;
    #private;
}
export class FontInfo {
    static bools: string[];
    static numbers: string[];
    static strings: string[];
    static #OFFSET_NUMBERS: number;
    static #OFFSET_BBOX: number;
    static #OFFSET_FONT_MATRIX: number;
    static #OFFSET_DEFAULT_VMETRICS: number;
    static #OFFSET_STRINGS: number;
    static write(font: any): any;
    constructor({ data, extra }: {
        data: any;
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
    get bbox(): number[] | undefined;
    get fontMatrix(): number[] | undefined;
    get defaultVMetrics(): number[] | undefined;
    get fallbackName(): string;
    get loadedName(): string;
    get mimetype(): string;
    get name(): string;
    get data(): Uint8Array<any> | undefined;
    clearData(): void;
    get cssFontInfo(): CssFontInfo | null;
    get systemFontInfo(): SystemFontInfo | null;
    #private;
}
export class SystemFontInfo {
    static strings: string[];
    static write(info: any): any;
    constructor(buffer: any);
    get guessFallback(): boolean;
    get css(): string;
    get loadedName(): string;
    get baseFontName(): string;
    get src(): string;
    get style(): {
        style: string;
        weight: string;
    };
    #private;
}
