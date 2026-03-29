import { PDFPrintRange } from '../options/pdf-print-range';

/**
 * Determines whether a given page index falls within the specified print range.
 *
 * @param pageIndex - Zero-based page index
 * @param pageCount - Total number of pages in the document (used for validation context)
 * @param range - The print range specification
 * @returns true if the page should be printed
 */
export function isInPDFPrintRange(pageIndex: number, _pageCount: number, range: PDFPrintRange): boolean {
  const page = pageIndex + 1;

  if (range.from) {
    if (page < range.from) {
      return false;
    }
  }
  if (range.to) {
    if (page > range.to) {
      return false;
    }
  }
  if (range.excluded) {
    if (range.excluded.some((p) => p === page)) {
      return false;
    }
  }
  if (range.included) {
    if (!range.included.some((p) => p === page)) {
      return false;
    }
  }
  return true;
}

/**
 * Counts how many pages fall within the specified print range.
 *
 * @param pageCount - Total number of pages in the document
 * @param range - The print range specification
 * @returns The number of pages that match the print range
 */
export function filteredPageCount(pageCount: number, range: PDFPrintRange): number {
  let result = 0;
  for (let page = 0; page < pageCount; page++) {
    if (isInPDFPrintRange(page, pageCount, range)) {
      result++;
    }
  }
  return result;
}
