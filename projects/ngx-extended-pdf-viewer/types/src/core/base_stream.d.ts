export class BaseStream {
    /**
     * @returns {number}
     */
    get length(): number;
    /**
     * @returns {boolean}
     */
    get isEmpty(): boolean;
    get isDataLoaded(): any;
    getByte(): void;
    /**
     * @param {number | undefined} [length]
     * @returns {Uint8Array}
     */
    getBytes(length?: number | undefined): Uint8Array;
    /**
     * NOTE: This method can only be used to get image-data that is guaranteed
     *       to be fully loaded, since otherwise intermittent errors may occur;
     *       note the `ObjectLoader` class.
     */
    getImageData(length: any, decoderOptions: any): Promise<Uint8Array<ArrayBufferLike>>;
    asyncGetBytes(): Promise<void>;
    get isAsync(): boolean;
    get isAsyncDecoder(): boolean;
    get isImageStream(): boolean;
    get canAsyncDecodeImageFromBuffer(): boolean;
    getTransferableImage(): Promise<null>;
    peekByte(): void;
    peekBytes(length: any): Uint8Array<ArrayBufferLike>;
    getUint16(): any;
    getInt32(): any;
    getByteRange(begin: any, end: any): void;
    getString(length: any): string;
    skip(n: any): void;
    reset(): void;
    moveStart(): void;
    makeSubStream(start: any, length: any, dict?: null): void;
    clone(): void;
    /**
     * @returns {Array | null}
     */
    getBaseStreams(): any[] | null;
    getOriginalStream(): any;
}
