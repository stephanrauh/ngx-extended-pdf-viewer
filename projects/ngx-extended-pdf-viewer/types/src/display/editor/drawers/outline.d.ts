export class Outline {
    static PRECISION: number;
    /**
     * Rotate a bounding box which lives in the unit square.
     * @param {Array<number>} bbox
     * @param {number} angle
     * @returns {Array<number>}
     */
    static _rotateBox([x, y, width, height]: Array<number>, angle: number): Array<number>;
    static _rescale(src: any, tx: any, ty: any, sx: any, sy: any, dest: any): any;
    static _rescaleAndSwap(src: any, tx: any, ty: any, sx: any, sy: any, dest: any): any;
    static _translate(src: any, tx: any, ty: any, dest: any): any;
    static svgRound(x: any): number;
    static _normalizePoint(x: any, y: any, parentWidth: any, parentHeight: any, rotation: any): number[];
    static createBezierPoints(x1: any, y1: any, x2: any, y2: any, x3: any, y3: any): number[];
    /** @type {Outline|null} Optional hover/selection outline drawn separately. */
    focusOutline: Outline | null;
    /**
     * @returns {string} The SVG path of the outline.
     */
    toSVGPath(): string;
    /**
     * @type {Object|null} The bounding box of the outline.
     */
    get box(): Object | null;
    serialize(_bbox: any, _rotation: any): void;
    /** @type {Object} */
    get defaultSVGProperties(): Object;
    /** @type {Object} SVG properties used to finalize a drawing session. */
    get defaultProperties(): Object;
    /**
     * @param {number} _rotation - the rotation to apply to the outline.
     * @returns {Object|null}
     */
    getFocusSVGProperties(_rotation: number): Object | null;
    /** @type {boolean} Whether `DrawLayer.drawOutline` applies its mask. */
    get focusMustRemoveSelfIntersections(): boolean;
    /**
     * @param {string} _name
     * @param {*} _value
     * @returns {Array<number>|Float32Array|null} The new bounding box, if any.
     */
    updateProperty(_name: string, _value: any): Array<number> | Float32Array | null;
    /**
     * @param {Array<number>} _dimensions
     * @param {number} _scale
     * @returns {Array<number>|Float32Array|null} The new bounding box, if any.
     */
    updateParentDimensions(_dimensions: Array<number>, _scale: number): Array<number> | Float32Array | null;
    /**
     * @param {Array<number>} _pageTranslation
     * @param {Array<number>} _pageDimensions
     * @returns {Float32Array|null}
     */
    serializeQuadPoints(_pageTranslation: Array<number>, _pageDimensions: Array<number>): Float32Array | null;
    /**
     * @param {number} _rotation
     * @returns {Object} the SVG properties to apply to the rotated shape.
     */
    updateRotation(_rotation: number): Object;
    /**
     * Called on each resizing step, hence the outline itself is unchanged.
     * @param {Array<number>} _bbox - the bounding box being resized to.
     * @returns {Object} the SVG properties to apply to the resizing shape.
     */
    getPathResizingSVGProperties(_bbox: Array<number>): Object;
    /**
     * Called once the resizing is done, hence the outline can be updated.
     * @param {Array<number>} _bbox - the new bounding box.
     * @returns {Object} the SVG properties to apply to the resized shape.
     */
    getPathResizedSVGProperties(_bbox: Array<number>): Object;
    /**
     * Called once the translation is done, hence the outline can be updated.
     * @param {Array<number>} _bbox - the new bounding box.
     * @param {Array<number>} _parentDimensions
     * @returns {Object} the SVG properties to apply to the translated shape.
     */
    getPathTranslatedSVGProperties(_bbox: Array<number>, _parentDimensions: Array<number>): Object;
}
