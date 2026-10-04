export class FontFaceObject {
    constructor(translatedData: any, inspectFont: null | undefined, charProcOperatorList: any, extra: any);
    _inspectFont: any;
    charProcOperatorList: any;
    createNativeFontFace(): FontFace | null;
    createFontFaceRule(): string | null;
    getPathGenerator(objs: any, character: any): any;
    get black(): any;
    get bold(): any;
    set disableFontFace(value: any);
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
    get mimetype(): "font/opentype" | null;
    get data(): any;
    clearData(): void;
    get cssFontInfo(): any;
    get systemFontInfo(): any;
    #private;
}
export class FontLoader {
    constructor({ ownerDocument, styleElement, }: {
        ownerDocument?: Document | undefined;
        styleElement?: null | undefined;
    });
    _document: Document;
    styleElement: HTMLStyleElement | null;
    loadingRequests: any[] | undefined;
    loadTestFontId: number | undefined;
    addNativeFontFace(nativeFontFace: any): void;
    removeNativeFontFace(nativeFontFace: any): void;
    insertRule(rule: any): void;
    clear(): void;
    loadSystemFont({ systemFontInfo: info, disableFontFace, _inspectFont, }: {
        systemFontInfo: any;
        disableFontFace: any;
        _inspectFont: any;
    }): Promise<void>;
    bind(font: any): Promise<void>;
    get isFontLoadingAPISupported(): any;
    get isSyncFontLoadingSupported(): any;
    #private;
}
