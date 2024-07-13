import { PDFPrintRange } from './pdf-print-range';

export declare class PDFPrintService {
  performPrint: () => Promise<void>;

  public filteredPageCount?: (pageCount: number, range: PDFPrintRange) => number;
  public isInPDFPrintRange?: (pageIndex: number, printRange: PDFPrintRange) => boolean;
}
