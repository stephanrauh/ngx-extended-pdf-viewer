export type PageViewportParameters = {
    /**
     * - The xMin, yMin, xMax and
     * yMax coordinates.
     */
    viewBox: Array<number>;
    /**
     * - The size of units.
     */
    userUnit: number;
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
export type PageViewportCloneParameters = {
    /**
     * - The scale, overriding the one in the cloned
     * viewport. The default value is `this.scale`.
     */
    scale?: number | undefined;
    /**
     * - The rotation, in degrees, overriding the one
     * in the cloned viewport. The default value is `this.rotation`.
     */
    rotation?: number | undefined;
    /**
     * - The horizontal, i.e. x-axis, offset.
     * The default value is `this.offsetX`.
     */
    offsetX?: number | undefined;
    /**
     * - The vertical, i.e. y-axis, offset.
     * The default value is `this.offsetY`.
     */
    offsetY?: number | undefined;
    /**
     * - If true, the x-axis will not be flipped.
     * The default value is `false`.
     */
    dontFlip?: boolean | undefined;
};
/**
 * @typedef {Object} PageViewportParameters
 * @property {Array<number>} viewBox - The xMin, yMin, xMax and
 *   yMax coordinates.
 * @property {number} userUnit - The size of units.
 * @property {number} scale - The scale of the viewport.
 * @property {number} rotation - The rotation, in degrees, of the viewport.
 * @property {number} [offsetX] - The horizontal, i.e. x-axis, offset. The
 *   default value is `0`.
 * @property {number} [offsetY] - The vertical, i.e. y-axis, offset. The
 *   default value is `0`.
 * @property {boolean} [dontFlip] - If true, the y-axis will not be flipped.
 *   The default value is `false`.
 */
/**
 * @typedef {Object} PageViewportCloneParameters
 * @property {number} [scale] - The scale, overriding the one in the cloned
 *   viewport. The default value is `this.scale`.
 * @property {number} [rotation] - The rotation, in degrees, overriding the one
 *   in the cloned viewport. The default value is `this.rotation`.
 * @property {number} [offsetX] - The horizontal, i.e. x-axis, offset.
 *   The default value is `this.offsetX`.
 * @property {number} [offsetY] - The vertical, i.e. y-axis, offset.
 *   The default value is `this.offsetY`.
 * @property {boolean} [dontFlip] - If true, the x-axis will not be flipped.
 *   The default value is `false`.
 */
/**
 * PDF page viewport created based on scale, rotation and offset.
 */
export class PageViewport {
    /**
     * @param {PageViewportParameters}
     */
    constructor({ viewBox, userUnit, scale, rotation, offsetX, offsetY, dontFlip, }: PageViewportParameters);
    viewBox: number[];
    userUnit: number;
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
     * Clones viewport, with optional additional properties.
     * @param {PageViewportCloneParameters} [params]
     * @returns {PageViewport} Cloned viewport.
     */
    clone({ scale, rotation, offsetX, offsetY, dontFlip, }?: PageViewportCloneParameters): PageViewport;
    /**
     * Converts PDF point to the viewport coordinates. For examples, useful for
     * converting PDF location into canvas pixel coordinates.
     * @param {number} x - The x-coordinate.
     * @param {number} y - The y-coordinate.
     * @returns {Array} Array containing `x`- and `y`-coordinates of the
     *   point in the viewport coordinate space.
     * @see {@link convertToPdfPoint}
     * @see {@link convertToViewportRectangle}
     */
    convertToViewportPoint(x: number, y: number): any[];
    /**
     * Converts PDF rectangle to the viewport coordinates.
     * @param {Array} rect - The xMin, yMin, xMax and yMax coordinates.
     * @returns {Array} Array containing corresponding coordinates of the
     *   rectangle in the viewport coordinate space.
     * @see {@link convertToViewportPoint}
     */
    convertToViewportRectangle(rect: any[]): any[];
    /**
     * Converts viewport coordinates to the PDF location. For examples, useful
     * for converting canvas pixel location into PDF one.
     * @param {number} x - The x-coordinate.
     * @param {number} y - The y-coordinate.
     * @returns {Array} Array containing `x`- and `y`-coordinates of the
     *   point in the PDF coordinate space.
     * @see {@link convertToViewportPoint}
     */
    convertToPdfPoint(x: number, y: number): any[];
}
