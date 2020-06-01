export interface PDFPrintRange {
  from?: number;
  to?: number;
  excluded?: Array<number>;
  included?: Array<number>;
}
