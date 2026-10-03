/**
 * Remove from the polylines everything lying inside the circle of center
 * (cx, cy) and radius r. Segments crossing the circle are cut at the
 * intersection points, so the remaining polylines end exactly at the eraser
 * boundary and not at the nearest sampled point.
 * @param {Array<Float32Array>} paths - Polylines [x0, y0, x1, y1, ...].
 * @param {number} cx
 * @param {number} cy
 * @param {number} r
 * @returns {{paths: Array<Float32Array>, modified: boolean}} The remaining
 *   polylines (the input array when nothing was removed).
 */
export function clipPathsWithCircle(paths: Array<Float32Array>, cx: number, cy: number, r: number): {
    paths: Array<Float32Array>;
    modified: boolean;
};
/**
 * @param {Array<Float32Array>} paths
 * @param {number} [margin] - Added on each side.
 * @returns {Array<number>|null} The bounding box [left, top, right, bottom]
 *   of the polylines, or null when there is no point.
 */
export function getPathsBBox(paths: Array<Float32Array>, margin?: number): Array<number> | null;
/**
 * Build the exact, invertible mapping between the PDF page coordinates used by
 * a drawing editor's serialized points and the layer pixels used by the
 * eraser, for the given view rotation.
 * @param {number} rotation - The view rotation (0/90/180/270).
 * @param {{width: number, height: number}} layerRect - The editor layer size.
 * @param {Array<number>} pageTranslation - [pageX, pageY].
 * @param {Array<number>} pageDimensions - [pageWidth, pageHeight].
 * @returns {{toLayer: Function, toPage: Function}}
 */
export function makeLayerTransform(rotation: number, { width: layerW, height: layerH }: {
    width: number;
    height: number;
}, [pageX, pageY]: Array<number>, [pageW, pageH]: Array<number>): {
    toLayer: Function;
    toPage: Function;
};
/**
 * Remove from the polylines everything swept by the circle of radius r
 * moving from (prevX, prevY) to (x, y).
 * @param {Array<Float32Array>} paths
 * @param {number} x
 * @param {number} y
 * @param {number} r
 * @param {number} [prevX]
 * @param {number} [prevY]
 * @returns {{paths: Array<Float32Array>, modified: boolean}}
 */
export function sweepCircleOverPaths(paths: Array<Float32Array>, x: number, y: number, r: number, prevX?: number, prevY?: number): {
    paths: Array<Float32Array>;
    modified: boolean;
};
