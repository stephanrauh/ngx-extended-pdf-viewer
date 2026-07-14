export type Streams = Ascii85Stream | AsciiHexStream | BaseStream | BrotliStream | CCITTFaxStream | FlateStream | Jbig2Stream | JpegStream | JpxStream | LZWStream | NullStream | PredictorStream | RunLengthStream;
export class Lexer {
    constructor(stream: any, knownCommands?: null);
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
    _imageId: number;
    refill(): void;
    buf1: any;
    buf2: any;
    shift(): void;
    tryShift(): boolean;
    /**
     * @param {CipherTransform | null} cipherTransform
     *   Cipher transform for decryption.
     * @returns {unknown}
     */
    getObj(cipherTransform?: CipherTransform | null): unknown;
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
    /**
     * @param {CipherTransform | null} cipherTransform
     * @returns {Streams}
     */
    makeInlineImage(cipherTransform: CipherTransform | null): Streams;
    makeStream(dict: any, cipherTransform: any): any;
    /**
     * @param {Streams} stream
     * @param {Dict} dict
     * @param {number | null} length
     * @param {CipherTransform | null} cipherTransform
     * @returns {Streams}
     */
    filter(stream: Streams, dict: Dict, length: number | null, cipherTransform?: CipherTransform | null): Streams;
    /**
     * @param {Streams} stream
     * @param {string} name
     * @param {number | null} maybeLength
     * @param {Dict | null} params
     * @param {CipherTransform | null | undefined} [cipherTransform]
     * @returns {Streams}
     */
    makeFilter(stream: Streams, name: string, maybeLength: number | null, params: Dict | null, cipherTransform?: CipherTransform | null | undefined): Streams;
    #private;
}
import { Ascii85Stream } from "./ascii_85_stream.js";
import { AsciiHexStream } from "./ascii_hex_stream.js";
import type { BaseStream } from "./base_stream.js";
import { BrotliStream } from "./brotli_stream.js";
import { CCITTFaxStream } from "./ccitt_stream.js";
import { FlateStream } from "./flate_stream.js";
import { Jbig2Stream } from "./jbig2_stream.js";
import { JpegStream } from "./jpeg_stream.js";
import { JpxStream } from "./jpx_stream.js";
import { LZWStream } from "./lzw_stream.js";
import { NullStream } from "./stream.js";
import { PredictorStream } from "./predictor_stream.js";
import { RunLengthStream } from "./run_length_stream.js";
import type { CipherTransform } from "./crypto.js";
import { Dict } from "./primitives.js";
