/**
 * Callback used to lazily fetch attachment content.
 */
export type GetAttachmentContent = (id: string) => CatalogAttachmentContent;
/**
 * Attachment value.
 */
export type CatalogAttachmentContent = Uint8Array | null;
/**
 * Attachment metadata.
 */
export type CatalogAttachment = {
    /**
     * Value, when already available.
     */
    content?: CatalogAttachmentContent | undefined;
    /**
     *   Description.
     */
    description: string;
    /**
     *   Filename (just the basename) for display.
     */
    filename: string;
    /**
     *   File path.
     */
    rawFilename: string;
};
export class Catalog {
    /**
     * @typedef {Object} ParseDestDictionaryParameters
     * @property {Dict} destDict - The dictionary containing the destination.
     * @property {Object} resultObj - The object where the parsed destination
     *   properties will be placed.
     * @property {string} [docBaseUrl] - The document base URL that is used when
     *   attempting to recover valid absolute URLs from relative ones.
     * @property {Record<string, CatalogAttachment> | null} [docAttachments] - The
     *   document attachments (may not exist in most PDF documents).
     */
    /**
     * Derive a destination array from a Structure Element reference.
     * Walks the SE dict to find its page (Pg) and optional bounding box (A.BBox),
     * then returns an XYZ destination array that can be used for navigation.
     * @param {XRef} xref
     * @param {Ref} seRef
     * @returns {Array|null}
     */
    static #getDestFromStructElement(xref: XRef, seRef: Ref): any[] | null;
    /**
     * Helper function used to parse the contents of destination dictionaries.
     * @param {ParseDestDictionaryParameters} params
     */
    static parseDestDictionary({ destDict, resultObj, docBaseUrl, docAttachments, }: {
        /**
         * - The dictionary containing the destination.
         */
        destDict: Dict;
        /**
         * - The object where the parsed destination
         * properties will be placed.
         */
        resultObj: Object;
        /**
         * - The document base URL that is used when
         * attempting to recover valid absolute URLs from relative ones.
         */
        docBaseUrl?: string | undefined;
        /**
         * - The
         * document attachments (may not exist in most PDF documents).
         */
        docAttachments?: Record<string, CatalogAttachment> | null | undefined;
    }): void;
    constructor(pdfManager: any, xref: any, options?: {});
    builtInCMapCache: Map<any, any>;
    fontCache: RefSetCache;
    globalColorSpaceCache: GlobalColorSpaceCache;
    globalImageCache: GlobalImageCache;
    nonBlendModesSet: RefSet;
    pageDictCache: RefSetCache;
    pageIndexCache: RefSetCache;
    pageKidsCountCache: RefSetCache;
    standardFontDataCache: Map<any, any>;
    systemFontCache: Map<any, any>;
    pdfManager: any;
    xref: any;
    enableOpenActionJavaScript: boolean;
    enableCatalogAAJavaScript: boolean;
    cloneDict(): any;
    /**
     * Create an id for an attachment from a FileAttachment annotation.
     *
     * The id is registered here rather than parsed from a public string prefix in
     * `attachmentContent`, since catalog attachment names can be arbitrary PDF
     * strings and may otherwise collide with annotation-local ids.
     *
     * @param {Ref} ref
     *   File-spec or embedded-file stream reference.
     * @param {boolean} [isSound]
     *   When set, the referenced stream holds raw PDF sound samples that
     *   `attachmentContent` wraps in a WAV container on fetch.
     * @returns {string}
     *   Attachment id.
     */
    getAttachmentIdForAnnotation(ref: Ref, isSound?: boolean): string;
    get version(): any;
    get lang(): any;
    /**
     * @type {boolean} `true` for pure XFA documents,
     *   `false` for XFA Foreground documents.
     */
    get needsRendering(): boolean;
    get collection(): any;
    get acroForm(): any;
    get acroFormRef(): any;
    get metadata(): any;
    get markInfo(): any;
    get hasStructTree(): any;
    get structTreeRoot(): any;
    get toplevelPagesDict(): any;
    get documentOutline(): any;
    get documentOutlineForEditor(): any;
    get permissions(): any;
    get optionalContentConfig(): any;
    setActualNumPages(num?: null): void;
    get hasActualNumPages(): boolean;
    get _pagesCount(): any;
    get numPages(): any;
    get destinations(): any;
    getDestination(id: any): any;
    get rawPageLabels(): Map<any, any> | null;
    get pageLabels(): any;
    get pageLayout(): any;
    get pageMode(): any;
    get viewerPreferences(): any;
    get openAction(): any;
    /**
     * Get attachments.
     *
     * @returns {Map<string, CatalogAttachment> | null}
     *   Attachments.
     */
    get attachments(): Map<string, CatalogAttachment> | null;
    /**
     * Get content for an attachment.
     *
     * @param {string} id
     *   Unique attachment identifier (required).
     * @returns {CatalogAttachmentContent}
     *   Content.
     */
    attachmentContent(id: string): CatalogAttachmentContent;
    get rawEmbeddedFiles(): Map<any, any> | null;
    get xfaImages(): any;
    get jsActions(): any;
    cleanup(manuallyTriggered?: boolean): Promise<void>;
    getPageDict(pageIndex: any): Promise<(Dict | Ref)[] | (Dict | null)[]>;
    /**
     * Eagerly fetches the entire /Pages-tree; should ONLY be used as a fallback.
     * @returns {Promise<Map>}
     */
    getAllPageDicts(recoveryMode?: boolean): Promise<Map<any, any>>;
    getPageIndex(pageRef: any): Promise<any>;
    get baseUrl(): any;
    #private;
}
import { RefSetCache } from "./primitives.js";
import { GlobalColorSpaceCache } from "./image_utils.js";
import { GlobalImageCache } from "./image_utils.js";
import { RefSet } from "./primitives.js";
import { Ref } from "./primitives.js";
import { Dict } from "./primitives.js";
import type { XRef } from "./xref.js";
