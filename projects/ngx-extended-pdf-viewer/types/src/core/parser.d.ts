export class Lexer {
    constructor(stream: any, knownCommands?: any);
    stream: any;
    strBuf: any[];
    knownCommands: any;
    _hexStringNumWarn: number;
    beginInlineImagePos: number;
    nextChar(): any;
    currentChar: any;
    peekChar(): any;
    getNumber(): number;
    getString(): string;
    getName(): any;
    /**
     * @private
     */
    private _hexStringWarn;
    getHexString(): string;
    getObj(): any;
    peekObj(): any;
    skipToNextLine(): void;
}
export class Linearization {
    static create(stream: any): {
        length: any;
        hints: any[];
        objectNumberFirst: any;
        endFirst: any;
        numPages: any;
        mainXRefEntriesOffset: any;
        pageFirst: any;
    } | null;
}
export class Parser {
    constructor({ lexer, xref, allowStreams, recoveryMode }: {
        lexer: any;
        xref: any;
        allowStreams?: boolean | undefined;
        recoveryMode?: boolean | undefined;
    });
    lexer: any;
    xref: any;
    allowStreams: boolean;
    recoveryMode: boolean;
    imageCache: any;
    refill(): void;
    buf1: any;
    buf2: any;
    shift(): void;
    tryShift(): boolean;
    getObj(cipherTransform?: any): any;
    /**
     * Find the end of the stream by searching for the /EI\s/.
     * @returns {number} The inline stream length.
     */
    findDefaultInlineStreamEnd(stream: any): number;
    /**
     * Find the EOI (end-of-image) marker 0xFFD9 of the stream.
     * @returns {number} The inline stream length.
     */
    findDCTDecodeInlineStreamEnd(stream: any): number;
    /**
     * Find the EOD (end-of-data) marker '~>' (i.e. TILDE + GT) of the stream.
     * @returns {number} The inline stream length.
     */
    findASCII85DecodeInlineStreamEnd(stream: any): number;
    /**
     * Find the EOD (end-of-data) marker '>' (i.e. GT) of the stream.
     * @returns {number} The inline stream length.
     */
    findASCIIHexDecodeInlineStreamEnd(stream: any): number;
    /**
     * Skip over the /EI/ for streams where we search for an EOD marker.
     */
    inlineStreamSkipEI(stream: any): void;
    makeInlineImage(cipherTransform: any): any;
    _findStreamLength(startPos: any, signature: any): number;
    makeStream(dict: any, cipherTransform: any): any;
    filter(stream: any, dict: any, length: any): any;
    makeFilter(stream: any, name: any, maybeLength: any, params: any): any;
}
