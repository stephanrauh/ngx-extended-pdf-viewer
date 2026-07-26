/**
 * A list of pages: single page numbers and/or inclusive `[from, to]` ranges,
 * e.g. `[0, [3, 5], 9]`.
 *
 * Note that these are **0-based** page indexes because they're passed to pdf.js
 * unchanged. The friendly `mergeDocument()` API uses 1-based page numbers instead.
 */
export type PdfPageSelection = Array<number | [number, number]>;

/**
 * One source of pages for `NgxExtendedPdfViewerService.extractPages()`.
 *
 * This is pdf.js's `PageInfo` structure, passed through as-is - so every index in
 * here is **0-based**. It's the low-level escape hatch; prefer `mergeDocument()`
 * unless you need the full flexibility.
 */
export interface PdfPageInfo {
  /**
   * The document to take the pages from: the raw bytes of a PDF file, or `null`
   * for the document that is currently open in the viewer.
   */
  document?: Uint8Array | null | undefined;

  /** An image to insert as a synthetic (one-page) PDF page. Alternative to `document`. */
  image?: ImageBitmap | undefined;

  /** The password of `document`, if it is encrypted. */
  password?: string | undefined;

  /** Which pages of `document` to use (0-based). Defaults to every page. */
  includePages?: PdfPageSelection | undefined;

  /** Which pages of `document` to skip (0-based). Applied after `includePages`. */
  excludePages?: PdfPageSelection | undefined;

  /**
   * Explicit 0-based positions of this entry's pages in the resulting document.
   * The positions of all entries together must form a gap-free `[0, n)` range.
   * Can't be combined with `insertAfter` on the same entry.
   */
  pageIndices?: Array<number> | undefined;

  /**
   * 0-based index of the page after which this entry's pages are inserted.
   * Use `-1` to insert before the first page. Values beyond the end are clamped,
   * so the pages are appended. Can't be combined with `pageIndices` on the same entry.
   */
  insertAfter?: number | undefined;
}

/**
 * pdf.js's bookkeeping of pages the user has reordered, copied, or deleted in the
 * thumbnail sidebar. Available since pdf.js 6.0 as `PDFDocumentProxy.pagesMapper`.
 */
export interface PdfPagesMapper {
  /** The number of pages currently shown, which may differ from the page count of the file. */
  readonly pagesNumber: number;

  /** Has the user reordered, copied, or deleted pages? */
  hasBeenAltered(): boolean;

  /** Describes the pages currently shown, in their current order. */
  getPageMappingForSaving(): Array<PdfPageInfo>;

  /**
   * Describes a document consisting of the given pages only, in the order given.
   * The page numbers count from 1 and refer to the pages as they are shown now.
   */
  extractPages(pageNumbers: Iterable<number>): Array<PdfPageInfo>;
}
