import { PageViewport } from '../options/pdf-page-view-port';

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
  offsetX?: number | undefined;
  /**
   * - The vertical, i.e. y-axis, offset. The
   * default value is `0`.
   */
  offsetY?: number | undefined;
  /**
   * - If true, the y-axis will not be flipped.
   * The default value is `false`.
   */
  dontFlip?: boolean | undefined;
};

export interface TextLayerBuilder {
  textLayerDiv: HTMLDivElement;
  textContentItemsStr: Array<string>;
  renderingDone: boolean;
  textDivs: Array<HTMLSpanElement>;
  viewPort: PageViewport;
}

export interface TextLayerRenderedEvent {
  source: TextLayerBuilder;
  pageNumber: number;
  numTextDivs: number;
}
