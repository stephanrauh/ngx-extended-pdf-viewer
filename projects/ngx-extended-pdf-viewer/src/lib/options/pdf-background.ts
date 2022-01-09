export interface PdfBackgroundParameters {
  pageNumber?: number;
  pageLabel?: number;
  context?: CanvasRenderingContext2D;
  width?: number;
  height?: number;
}

export type PdfBackgroundAlgorithm = (params: PdfBackgroundParameters) => string | void;

export type PdfBackground = string | PdfBackgroundAlgorithm | undefined;
