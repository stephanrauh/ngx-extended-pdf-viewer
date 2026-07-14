/**
 * PDF page viewport created based on scale, rotation and offset.
 */
export interface PageViewport {
  viewBox: number[];
  scale: number;
  rotation: number;
  offsetX: number;
  offsetY: number;
  transform: number[];
  width: number;
  height: number;
  /**
   * The original, un-scaled, viewport dimensions.
   * @type {Object}
   */
  get rawDims(): Object;

  /**
   * Converts PDF point to the viewport coordinates. For examples, useful for
   * converting PDF location into canvas pixel coordinates.
   * @param {number} x - The x-coordinate.
   * @param {number} y - The y-coordinate.
   * @returns {Object} Object containing `x` and `y` properties of the
   *   point in the viewport coordinate space.
   * @see {@link convertToPdfPoint}
   * @see {@link convertToViewportRectangle}
   */
  convertToViewportPoint(x: number, y: number): Object;
  /**
   * Converts PDF rectangle to the viewport coordinates.
   * @param {Array} rect - The xMin, yMin, xMax and yMax coordinates.
   * @returns {Array} Array containing corresponding coordinates of the
   *   rectangle in the viewport coordinate space.
   * @see {@link convertToViewportPoint}
   *
   * @deprecated Removed in pdf.js 6.1; still available on the stable (6.0)
   * engine. On 6.1+ apply the viewport `transform` to both corners yourself:
   * `Util.applyTransform([rect[0], rect[1]], viewport.transform)` (and the
   * `[rect[2], rect[3]]` corner), or read `viewport.transform` directly.
   */
  convertToViewportRectangle(rect: any[]): any[];
  /**
   * Converts viewport coordinates to the PDF location. For examples, useful
   * for converting canvas pixel location into PDF one.
   * @param {number} x - The x-coordinate.
   * @param {number} y - The y-coordinate.
   * @returns {Object} Object containing `x` and `y` properties of the
   *   point in the PDF coordinate space.
   * @see {@link convertToViewportPoint}
   */
  convertToPdfPoint(x: number, y: number): Object;

  /**
   * Clones viewport.
   * @returns {PageViewport} PageViewport cloned by this viewport.
   * @see {@link clone}
   */
  clone(): PageViewport;
}
