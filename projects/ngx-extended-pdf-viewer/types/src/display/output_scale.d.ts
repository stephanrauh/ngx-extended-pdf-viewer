/**
 * Scale factors for the canvas, necessary with HiDPI displays.
 */
export class OutputScale {
    static get pixelRatio(): number;
    static capPixels(maxPixels: any, capAreaFactor: any): any;
    /**
     * @type {number} Horizontal scale.
     */
    sx: number;
    /**
     * @type {number} Vertical scale.
     */
    sy: number;
    /**
     * @type {boolean} Returns `true` when scaling is required, `false` otherwise.
     */
    get scaled(): boolean;
    /**
     * @type {boolean} Returns `true` when scaling is symmetric,
     *   `false` otherwise.
     */
    get symmetric(): boolean;
    /**
     * @returns {boolean} Returns `true` if scaling was limited,
     *   `false` otherwise.
     */
    limitCanvas(width: any, height: any, maxPixels: any, maxDim: any, capAreaFactor?: number): boolean;
}
