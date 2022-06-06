export type AnnotationEditorLayer = import("./annotation_editor_layer.js").AnnotationEditorLayer;
export type AnnotationEditorParameters = {
    /**
     * - the layer containing this editor
     */
    parent: AnnotationEditorLayer;
    /**
     * - editor id
     */
    id: string;
    /**
     * - x-coordinate
     */
    x: number;
    /**
     * - y-coordinate
     */
    y: number;
};
/**
 * @typedef {Object} AnnotationEditorParameters
 * @property {AnnotationEditorLayer} parent - the layer containing this editor
 * @property {string} id - editor id
 * @property {number} x - x-coordinate
 * @property {number} y - y-coordinate
 */
/**
 * Base class for editors.
 */
export class AnnotationEditor {
    /**
     * @param {AnnotationEditorParameters} parameters
     */
    constructor(parameters: AnnotationEditorParameters);
    parent: import("./annotation_editor_layer.js").AnnotationEditorLayer;
    id: string;
    width: any;
    height: any;
    pageIndex: number;
    name: any;
    div: HTMLDivElement | null;
    x: number;
    y: number;
    isAttachedToDOM: boolean;
    /**
     * onfocus callback.
     */
    focusin(): void;
    /**
     * onblur callback.
     * @param {FocusEvent} event
     * @returns {undefined}
     */
    focusout(event: FocusEvent): undefined;
    /**
     * Get the pointer coordinates in order to correctly translate the
     * div in case of drag-and-drop.
     * @param {MouseEvent} event
     */
    mousedown(event: MouseEvent): void;
    mouseX: number | undefined;
    mouseY: number | undefined;
    /**
     * We use drag-and-drop in order to move an editor on a page.
     * @param {DragEvent} event
     */
    dragstart(event: DragEvent): void;
    /**
     * Set the editor position within its parent.
     * @param {number} x
     * @param {number} y
     */
    setAt(x: number, y: number): void;
    /**
     * Translate the editor position within its parent.
     * @param {number} x
     * @param {number} y
     */
    translate(x: number, y: number): void;
    /**
     * Set the dimensions of this editor.
     * @param {number} width
     * @param {number} height
     */
    setDims(width: number, height: number): void;
    /**
     * Render this editor in a div.
     * @returns {HTMLDivElement}
     */
    render(): HTMLDivElement;
    /**
     * Executed once this editor has been rendered.
     */
    onceAdded(): void;
    /**
     * Apply the current transform (zoom) to this editor.
     * @param {Array<number>} transform
     */
    transform(transform: Array<number>): void;
    /**
     * Check if the editor contains something.
     * @returns {boolean}
     */
    isEmpty(): boolean;
    /**
     * Enable edit mode.
     * @returns {undefined}
     */
    enableEditMode(): undefined;
    /**
     * Disable edit mode.
     * @returns {undefined}
     */
    disableEditMode(): undefined;
    /**
     * Check if the editor is edited.
     * @returns {boolean}
     */
    isInEditMode(): boolean;
    /**
     * If it returns true, then this editor handle the keyboard
     * events itself.
     * @returns {boolean}
     */
    shouldGetKeyboardEvents(): boolean;
    /**
     * Copy the elements of an editor in order to be able to build
     * a new one from these data.
     * It's used on ctrl+c action.
     *
     * To implement in subclasses.
     * @returns {AnnotationEditor}
     */
    copy(): AnnotationEditor;
    /**
     * Check if this editor needs to be rebuilt or not.
     * @returns {boolean}
     */
    needsToBeRebuilt(): boolean;
    /**
     * Rebuild the editor in case it has been removed on undo.
     *
     * To implement in subclasses.
     * @returns {undefined}
     */
    rebuild(): undefined;
    /**
     * Serialize the editor.
     * The result of the serialization will be used to construct a
     * new annotation to add to the pdf document.
     *
     * To implement in subclasses.
     * @returns {undefined}
     */
    serialize(): undefined;
    /**
     * Remove this editor.
     * It's used on ctrl+backspace action.
     *
     * @returns {undefined}
     */
    remove(): undefined;
    /**
     * Select this editor.
     */
    select(): void;
    /**
     * Unselect this editor.
     */
    unselect(): void;
    #private;
}
