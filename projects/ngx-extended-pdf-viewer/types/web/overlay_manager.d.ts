export class OverlayManager {
    get active(): null;
    /**
     * @param {HTMLDialogElement} dialog - The overlay's DOM element.
     * @param {boolean} [canForceClose] - Indicates if opening the overlay closes
     *                  an active overlay. The default is `false`.
     * @returns {Promise} A promise that is resolved when the overlay has been
     *                    registered.
     */
    register(dialog: HTMLDialogElement, canForceClose?: boolean): Promise<any>;
    unregister(dialog: any): void;
    /**
     * @param {HTMLDialogElement} dialog - The overlay's DOM element.
     * @returns {Promise} A promise that is resolved when the overlay has been
     *                    opened.
     */
    open(dialog: HTMLDialogElement): Promise<any>;
    /**
     * @param {HTMLDialogElement} dialog - The overlay's DOM element.
     * @returns {Promise} A promise that is resolved when the overlay has been
     *                    closed.
     */
    close(dialog?: HTMLDialogElement, silent?: boolean): Promise<any>;
    /**
     * @param {HTMLDialogElement} dialog - The overlay's DOM element.
     * @returns {Promise} A promise that is resolved when the overlay has been
     *                    closed.
     */
    closeIfActive(dialog: HTMLDialogElement): Promise<any>;
    #private;
}
