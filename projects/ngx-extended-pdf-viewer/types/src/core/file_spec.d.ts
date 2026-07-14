/**
 * @import { CatalogAttachmentContent } from "./catalog.js";
 */
/**
 * "A PDF file can refer to the contents of another file by using a File
 * Specification (PDF 1.1)", see the spec (7.11) for more details.
 * NOTE: Only embedded files are supported (as part of the attachments support)
 * TODO: support the 'URL' file system (with caching if !/V), portable
 * collections attributes and related files (/RF)
 */
export class FileSpec {
    /**
     * Get a platform-specific item from a file-spec dictionary.
     *
     * Search order follows the PDF platform keys: `UF`, `F`, `Unix`, `Mac`,
     * `DOS`.
     *
     * @param {Dict | null | undefined} dict
     *   Dictionary.
     * @param {boolean} [raw]
     *   Return the raw (possibly indirect) value rather than the resolved one.
     * @returns {unknown}
     *   Matching dictionary value or `null` when no key is found.
     */
    static pickPlatformItem(dict: Dict | null | undefined, raw?: boolean): unknown;
    /**
     * Whether a file specification carries an embedded file we can read.
     *
     * @param {Dict} fileSpecDict
     * @returns {boolean}
     */
    static hasEmbeddedFile(fileSpecDict: Dict): boolean;
    /**
     * Read attachment bytes from a file-spec dictionary.
     *
     * @param {Dict | null | undefined} dict
     *   File-spec dictionary containing an `EF` entry.
     * @returns {CatalogAttachmentContent}
     *   Attachment bytes when available; otherwise `null`.
     * @throws {PasswordException}
     *   When attachment bytes are encrypted and no key is available.
     */
    static readContent(dict: Dict | null | undefined): CatalogAttachmentContent;
    /**
     * Read the bytes of an embedded-file stream.
     *
     * @param {BaseStream} stream
     *   Embedded-file stream.
     * @returns {CatalogAttachmentContent}
     *   Attachment bytes.
     * @throws {PasswordException}
     *   When the bytes are encrypted and no key is available.
     */
    static readStreamContent(stream: BaseStream): CatalogAttachmentContent;
    /**
     * @param {Dict | null | undefined} root
     *   File specification dictionary.
     */
    constructor(root: Dict | null | undefined);
    root: Dict | undefined;
    fs: any;
    get filename(): string;
    get description(): string;
    get serializable(): {
        rawFilename: string;
        filename: any;
        description: string;
    };
}
import { Dict } from "./primitives.js";
import type { CatalogAttachmentContent } from "./catalog.js";
import { BaseStream } from "./base_stream.js";
