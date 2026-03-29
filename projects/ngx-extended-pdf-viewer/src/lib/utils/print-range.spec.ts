import { PDFPrintRange } from '../options/pdf-print-range';
import { filteredPageCount, isInPDFPrintRange } from './print-range';

describe('isInPDFPrintRange', () => {
  const pageCount = 10;

  it('should include all pages when range is empty', () => {
    const range: PDFPrintRange = {};
    for (let i = 0; i < pageCount; i++) {
      expect(isInPDFPrintRange(i, pageCount, range)).toBe(true);
    }
  });

  it('should respect "from" boundary', () => {
    const range: PDFPrintRange = { from: 3 };
    // pageIndex 0 => page 1, should be excluded
    expect(isInPDFPrintRange(0, pageCount, range)).toBe(false);
    expect(isInPDFPrintRange(1, pageCount, range)).toBe(false);
    // pageIndex 2 => page 3, should be included
    expect(isInPDFPrintRange(2, pageCount, range)).toBe(true);
    expect(isInPDFPrintRange(9, pageCount, range)).toBe(true);
  });

  it('should respect "to" boundary', () => {
    const range: PDFPrintRange = { to: 5 };
    expect(isInPDFPrintRange(0, pageCount, range)).toBe(true);
    expect(isInPDFPrintRange(4, pageCount, range)).toBe(true);
    // pageIndex 5 => page 6, should be excluded
    expect(isInPDFPrintRange(5, pageCount, range)).toBe(false);
    expect(isInPDFPrintRange(9, pageCount, range)).toBe(false);
  });

  it('should respect both "from" and "to"', () => {
    const range: PDFPrintRange = { from: 3, to: 7 };
    expect(isInPDFPrintRange(0, pageCount, range)).toBe(false);
    expect(isInPDFPrintRange(1, pageCount, range)).toBe(false);
    expect(isInPDFPrintRange(2, pageCount, range)).toBe(true);  // page 3
    expect(isInPDFPrintRange(6, pageCount, range)).toBe(true);  // page 7
    expect(isInPDFPrintRange(7, pageCount, range)).toBe(false); // page 8
  });

  it('should exclude specific pages', () => {
    const range: PDFPrintRange = { excluded: [2, 5, 8] };
    expect(isInPDFPrintRange(0, pageCount, range)).toBe(true);  // page 1
    expect(isInPDFPrintRange(1, pageCount, range)).toBe(false); // page 2
    expect(isInPDFPrintRange(2, pageCount, range)).toBe(true);  // page 3
    expect(isInPDFPrintRange(4, pageCount, range)).toBe(false); // page 5
    expect(isInPDFPrintRange(7, pageCount, range)).toBe(false); // page 8
    expect(isInPDFPrintRange(8, pageCount, range)).toBe(true);  // page 9
  });

  it('should include only specific pages', () => {
    const range: PDFPrintRange = { included: [1, 3, 5] };
    expect(isInPDFPrintRange(0, pageCount, range)).toBe(true);  // page 1
    expect(isInPDFPrintRange(1, pageCount, range)).toBe(false); // page 2
    expect(isInPDFPrintRange(2, pageCount, range)).toBe(true);  // page 3
    expect(isInPDFPrintRange(3, pageCount, range)).toBe(false); // page 4
    expect(isInPDFPrintRange(4, pageCount, range)).toBe(true);  // page 5
  });

  it('should combine "from" with "excluded"', () => {
    const range: PDFPrintRange = { from: 3, excluded: [5] };
    expect(isInPDFPrintRange(0, pageCount, range)).toBe(false); // page 1, below from
    expect(isInPDFPrintRange(2, pageCount, range)).toBe(true);  // page 3
    expect(isInPDFPrintRange(4, pageCount, range)).toBe(false); // page 5, excluded
    expect(isInPDFPrintRange(5, pageCount, range)).toBe(true);  // page 6
  });

  it('should combine "to" with "included"', () => {
    const range: PDFPrintRange = { to: 5, included: [2, 4, 8] };
    expect(isInPDFPrintRange(1, pageCount, range)).toBe(true);  // page 2, included and within to
    expect(isInPDFPrintRange(0, pageCount, range)).toBe(false); // page 1, not in included
    expect(isInPDFPrintRange(7, pageCount, range)).toBe(false); // page 8, included but beyond to
  });

  it('should handle single-page document', () => {
    expect(isInPDFPrintRange(0, 1, {})).toBe(true);
    expect(isInPDFPrintRange(0, 1, { from: 1, to: 1 })).toBe(true);
    expect(isInPDFPrintRange(0, 1, { excluded: [1] })).toBe(false);
  });

  it('should handle edge case where from equals to', () => {
    const range: PDFPrintRange = { from: 5, to: 5 };
    expect(isInPDFPrintRange(3, pageCount, range)).toBe(false);
    expect(isInPDFPrintRange(4, pageCount, range)).toBe(true); // page 5
    expect(isInPDFPrintRange(5, pageCount, range)).toBe(false);
  });

  it('should handle overlapping included and excluded (excluded takes precedence)', () => {
    // When both included and excluded contain the same page, excluded is checked first
    const range: PDFPrintRange = { included: [3, 5], excluded: [5] };
    expect(isInPDFPrintRange(2, pageCount, range)).toBe(true);  // page 3
    expect(isInPDFPrintRange(4, pageCount, range)).toBe(false); // page 5, excluded wins
  });
});

describe('filteredPageCount', () => {
  it('should return full page count when range is empty', () => {
    expect(filteredPageCount(10, {})).toBe(10);
  });

  it('should return 0 for 0 pages', () => {
    expect(filteredPageCount(0, {})).toBe(0);
  });

  it('should count pages within from-to range', () => {
    expect(filteredPageCount(10, { from: 3, to: 7 })).toBe(5);
  });

  it('should count pages excluding specific ones', () => {
    expect(filteredPageCount(10, { excluded: [2, 5, 8] })).toBe(7);
  });

  it('should count only included pages', () => {
    expect(filteredPageCount(10, { included: [1, 3, 5] })).toBe(3);
  });

  it('should return 1 for single page in range', () => {
    expect(filteredPageCount(10, { from: 5, to: 5 })).toBe(1);
  });

  it('should return 0 when all pages are excluded', () => {
    expect(filteredPageCount(3, { excluded: [1, 2, 3] })).toBe(0);
  });

  it('should handle included pages that exceed page count', () => {
    // included: [1, 3, 15] but only 5 pages exist
    expect(filteredPageCount(5, { included: [1, 3, 15] })).toBe(2);
  });
});
