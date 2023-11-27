export class Outliner {
    /**
     * Construct an outliner.
     * @param {Array<Object>} boxes - An array of axis-aligned rectangles.
     * @param {number} borderWidth - The width of the border of the boxes, it
     *   allows to make the boxes bigger (or smaller).
     * @param {number} innerMargin - The margin between the boxes and the
     *   outlines. It's important to not have a null innerMargin when we want to
     *   draw the outline else the stroked outline could be clipped because of its
     *   width.
     * @param {boolean} isLTR - true if we're in LTR mode. It's used to determine
     *   the last point of the boxes.
     */
    constructor(boxes: Array<Object>, borderWidth?: number, innerMargin?: number, isLTR?: boolean);
    getOutlines(): {
        outlines: any[][];
        box: {
            x: number;
            y: number;
            width: number;
            height: number;
            lastPoint: any[];
        };
    };
    #private;
}
