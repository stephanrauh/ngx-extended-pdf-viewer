export type CipherConstructors = typeof AES128Cipher | typeof AES256Cipher | typeof ARCFourCipher | typeof NullCipher;
/**
 * Find the appropriate cipher class based on the filter name.
 */
export type ResolveCipher = (filterName?: Name | null | undefined) => CipherConstructors;
export class AES128Cipher extends AESBaseCipher {
    constructor(key: any);
    _rcon: Uint8Array<ArrayBuffer>;
    _cyclesOfRepetition: number;
    _keySize: number;
    _key: Uint8Array<ArrayBuffer>;
    _expandKey(cipherKey: any): Uint8Array<ArrayBuffer>;
}
export class AES256Cipher extends AESBaseCipher {
    constructor(key: any);
    _cyclesOfRepetition: number;
    _keySize: number;
    _key: Uint8Array<ArrayBuffer>;
    _expandKey(cipherKey: any): Uint8Array<ArrayBuffer>;
}
/**
 * @typedef {typeof AES128Cipher | typeof AES256Cipher | typeof ARCFourCipher
 * | typeof NullCipher} CipherConstructors
 */
/**
 * @callback ResolveCipher
 *   Find the appropriate cipher class based on the filter name.
 * @param {Name | null} [filterName]
 *   Name.
 * @returns {CipherConstructors}
 *   Cipher constructor.
 */
export class ARCFourCipher {
    constructor(key: any);
    a: number;
    b: number;
    s: Uint8Array<ArrayBuffer>;
    encryptBlock(data: any): Uint8Array<any>;
    decryptBlock(data: any): Uint8Array<any>;
    encrypt(data: any): Uint8Array<any>;
}
export class CipherTransform {
    /**
     * @param {ResolveCipher} resolveCipher
     *   Resolve a cipher constructor from a crypt filter name.
     * @param {Name | null} [stringFilterName]
     *   Default crypt filter for strings.
     * @param {Name | null} [streamFilterName]
     *   Default crypt filter for streams.
     */
    constructor(resolveCipher: ResolveCipher, stringFilterName?: Name | null, streamFilterName?: Name | null);
    /** @type {Name | null} */
    embeddedFilterName: Name | null;
    resolveCipher: ResolveCipher;
    streamFilterName: Name | null;
    stringFilterName: Name | null;
    /**
     * @param {BaseStream} stream
     * @param {number | null} length
     * @param {Name | null} [cryptFilterName]
     * @returns {DecryptStream}
     */
    createStream(stream: BaseStream, length: number | null, cryptFilterName?: Name | null): DecryptStream;
    decryptString(s: any): string;
    encryptString(s: any): string;
    #private;
}
export class CipherTransformFactory {
    static get _defaultPasswordBytes(): any;
    constructor(dict: any, fileId: any, password: any);
    filterName: any;
    dict: any;
    algorithm: any;
    cf: any;
    stmf: any;
    strf: any;
    eff: any;
    encryptMetadata: boolean;
    encryptionKey: any;
    /**
     * Set password.
     *
     * @param {string} password
     *   New password.
     * @returns {undefined}
     *   Nothing.
     */
    setPassword(password: string): undefined;
    /**
     * @param {number} num
     *   Object number.
     * @param {number} gen
     *   Generation number.
     * @returns {CipherTransform}
     *   Cipher transform.
     */
    createCipherTransform(num: number, gen: number): CipherTransform;
    #private;
}
export class PDF17 extends PDFBase {
    _hash(password: any, input: any, userBytes: any): Uint8Array<ArrayBuffer>;
}
export class PDF20 extends PDFBase {
    _hash(password: any, input: any, userBytes: any): Uint8Array<ArrayBuffer>;
}
declare class NullCipher {
    decryptBlock(data: any): any;
    encrypt(data: any): any;
}
import { Name } from "./primitives.js";
declare class AESBaseCipher {
    _s: Uint8Array<ArrayBuffer>;
    _inv_s: Uint8Array<ArrayBuffer>;
    _mix: Uint32Array<ArrayBuffer>;
    _mixCol: Uint8Array<ArrayBuffer>;
    buffer: Uint8Array<ArrayBuffer>;
    bufferPosition: number;
    _expandKey(cipherKey: any): void;
    _decrypt(input: any, key: any): Uint8Array<ArrayBuffer>;
    _encrypt(input: any, key: any): Uint8Array<ArrayBuffer>;
    _decryptBlock2(data: any, finalize: any): Uint8Array<ArrayBuffer>;
    bufferLength: number | undefined;
    iv: any;
    decryptBlock(data: any, finalize: any, iv?: null): any;
    encrypt(data: any, iv: any): Uint8Array<ArrayBuffer>;
}
import type { BaseStream } from "./base_stream.js";
import { DecryptStream } from "./decrypt_stream.js";
declare class PDFBase {
    _hash(password: any, input: any, userBytes: any): void;
    checkOwnerPassword(password: any, ownerValidationSalt: any, userBytes: any, ownerPassword: any): boolean;
    checkUserPassword(password: any, userValidationSalt: any, userPassword: any): boolean;
    getOwnerKey(password: any, ownerKeySalt: any, userBytes: any, ownerEncryption: any): any;
    getUserKey(password: any, userKeySalt: any, userEncryption: any): any;
}
export {};
