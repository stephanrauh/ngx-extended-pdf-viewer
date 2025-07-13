export type OverlayManager = import("./overlay_manager.js").OverlayManager;
export type PasswordPromptOptions = {
    /**
     * - The overlay's DOM element.
     */
    dialog: HTMLDialogElement;
    /**
     * - Label containing instructions for
     *   entering the password.
     */
    label: HTMLParagraphElement;
    /**
     * - Input field for entering the password.
     */
    input: HTMLInputElement;
    /**
     * - Button for submitting the
     *   password.
     */
    submitButton: HTMLButtonElement;
    /**
     * - Button for cancelling password
     *   entry.
     */
    cancelButton: HTMLButtonElement;
};
/**
 * @typedef {Object} PasswordPromptOptions
 * @property {HTMLDialogElement} dialog - The overlay's DOM element.
 * @property {HTMLParagraphElement} label - Label containing instructions for
 *                                          entering the password.
 * @property {HTMLInputElement} input - Input field for entering the password.
 * @property {HTMLButtonElement} submitButton - Button for submitting the
 *                                              password.
 * @property {HTMLButtonElement} cancelButton - Button for cancelling password
 *                                              entry.
 */
export class PasswordPrompt {
    /**
     * @param {PasswordPromptOptions} options
     * @param {OverlayManager} overlayManager - Manager for the viewer overlays.
     * @param {boolean} [isViewerEmbedded] - If the viewer is embedded, in e.g.
     *   an <iframe> or an <object>. The default value is `false`.
     */
    constructor(options: PasswordPromptOptions, overlayManager: OverlayManager, isViewerEmbedded?: boolean);
    dialog: HTMLDialogElement;
    label: HTMLParagraphElement;
    input: HTMLInputElement;
    submitButton: HTMLButtonElement;
    cancelButton: HTMLButtonElement;
    overlayManager: import("./overlay_manager.js").OverlayManager;
    _isViewerEmbedded: boolean;
    open(): Promise<void>;
    close(): Promise<void>;
    setUpdateCallback(updateCallback: any, reason: any): Promise<void>;
    #private;
}
