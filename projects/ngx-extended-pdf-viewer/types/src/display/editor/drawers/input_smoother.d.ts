/**
 * Average pointer positions over a sliding time window to reduce jitter.
 * Based on Google Ink's sliding window input model (https://github.com/google/ink).
 */
export class InputSmoother {
    static #HALF_WINDOW: number;
    static #UPSAMPLING_PERIOD: number;
    static #MAX_DIVISIONS: number;
    static #TIME_EPSILON: number;
    constructor(x: any, y: any, timeStamp: any);
    /**
     * @param {number} x
     * @param {number} y
     * @param {number} timeStamp
     * @returns {Array<number>} new stable points as [x, y, ...].
     */
    add(x: number, y: number, timeStamp: number): Array<number>;
    /**
     * @returns {Array<number>} unstable points as [x, y, ...], ending at the
     *   latest sample when nonempty.
     */
    get pendingPoints(): Array<number>;
    /**
     * @returns {Array<number>} remaining smoothed points as [x, y, ...].
     */
    end(): Array<number>;
    #private;
}
