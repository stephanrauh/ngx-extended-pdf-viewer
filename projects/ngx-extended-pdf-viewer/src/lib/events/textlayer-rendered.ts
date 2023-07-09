import { PDFPageView } from '../options/pdf_page_view';

export type PageViewportParameters = {
  /**
   * - The xMin, yMin, xMax and
   * yMax coordinates.
   */
  viewBox: Array<number>;
  /**
   * - The scale of the viewport.
   */
  scale: number;
  /**
   * - The rotation, in degrees, of the viewport.
   */
  rotation: number;
  /**
   * - The horizontal, i.e. x-axis, offset. The
   * default value is `0`.
   */
  offsetX: number | undefined;
  /**
   * - The vertical, i.e. y-axis, offset. The
   * default value is `0`.
   */
  offsetY: number | undefined;
  /**
   * - If true, the y-axis will not be flipped.
   * The default value is `false`.
   */
  dontFlip: boolean | undefined;
};

export interface TextLayerRenderedEvent {
  source: PDFPageView;
  pageNumber: number;
  numTextDivs: number;
}
