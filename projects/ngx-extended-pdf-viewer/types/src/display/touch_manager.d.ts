export type TouchManagerOptions = {
    container: HTMLElement | Window;
    isPinchingDisabled?: Function | undefined;
    isPinchingStopped?: Function | undefined;
    onPinchStart?: Function | undefined;
    /**
     * - Called with the previous client
     * midpoint, the previous/current screen distance, and the client midpoint
     * delta.
     */
    onPinching?: Function | undefined;
    onPinchEnd?: Function | undefined;
    /**
     * - Called with the client midpoint delta
     * when no scale update is emitted.
     */
    onPanning?: Function | undefined;
    signal: AbortSignal;
};
/**
 * @typedef {Object} TouchManagerOptions
 * @property {HTMLElement | Window} container
 * @property {function} [isPinchingDisabled]
 * @property {function} [isPinchingStopped]
 * @property {function} [onPinchStart]
 * @property {function} [onPinching] - Called with the previous client
 *   midpoint, the previous/current screen distance, and the client midpoint
 *   delta.
 * @property {function} [onPinchEnd]
 * @property {function} [onPanning] - Called with the client midpoint delta
 *   when no scale update is emitted.
 * @property {AbortSignal} signal
 */
export class TouchManager {
    /**
     * @param {TouchManagerOptions} options
     */
    constructor({ container, isPinchingDisabled, isPinchingStopped, onPinchStart, onPinching, onPinchEnd, onPanning, signal, }: TouchManagerOptions);
    /**
     * NOTE: Don't shadow this value since `devicePixelRatio` may change if the
     * window resolution changes, e.g. if the viewer is moved to another monitor.
     */
    get MIN_TOUCH_DISTANCE_TO_PINCH(): number;
    /**
     * Once pinching, the span must change by at least 4 device pixels to update
     * the scale: below that it's contact jitter (a moving finger is reported
     * with a slight lag and its position is quantized), not an intentional
     * pinch, hence a two-finger pan doesn't make the zoom drift.
     *
     * NOTE: Don't shadow this value since `devicePixelRatio` may change.
     */
    get MIN_TOUCH_DISTANCE_TO_SCALE(): number;
    destroy(): void;
    #private;
}
