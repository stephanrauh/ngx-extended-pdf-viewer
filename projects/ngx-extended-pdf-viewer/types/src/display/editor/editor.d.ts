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
    static _colorManager: ColorManager;
    static get _defaultLineColor(): any;
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
    rotation: any;
    isAttachedToDOM: boolean;
    /**
     * This editor will be behind the others.
     */
    setInBackground(): void;
    /**
     * This editor will be in the foreground.
     */
    setInForeground(): void;
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
    commitOrRemove(): void;
    /**
     * We use drag-and-drop in order to move an editor on a page.
     * @param {DragEvent} event
     */
    dragstart(event: DragEvent): void;
    startX: number | undefined;
    startY: number | undefined;
    /**
     * Set the editor position within its parent.
     * @param {number} x
     * @param {number} y
     * @param {number} tx - x-translation in screen coordinates.
     * @param {number} ty - y-translation in screen coordinates.
     */
    setAt(x: number, y: number, tx: number, ty: number): void;
    /**
     * Translate the editor position within its parent.
     * @param {number} x - x-translation in screen coordinates.
     * @param {number} y - y-translation in screen coordinates.
     */
    translate(x: number, y: number): void;
    /**
     * Convert a screen translation into a page one.
     * @param {number} x
     * @param {number} y
     */
    screenToPageTranslation(x: number, y: number): number[];
    /**
     * Set the dimensions of this editor.
     * @param {number} width
     * @param {number} height
     */
    setDims(width: number, height: number): void;
    /**
     * Get the translation used to position this editor when it's created.
     * @returns {Array<number>}
     */
    getInitialTranslation(): Array<number>;
    /**
     * Render this editor in a div.
     * @returns {HTMLDivElement}
     */
    render(): HTMLDivElement;
    /**
     * Onmousedown callback.
     * @param {MouseEvent} event
     */
    mousedown(event: MouseEvent): void;
    getRect(tx: any, ty: any): number[];
    /**
     * Executed once this editor has been rendered.
     */
    onceAdded(): void;
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
    /**
     * Update some parameters which have been changed through the UI.
     * @param {number} type
     * @param {*} value
     */
    updateParams(type: number, value: any): void;
    /**
     * Get some properties to update in the UI.
     * @returns {Object}
     */
    get propertiesToUpdate(): Object;
    #private;
}
import { ColorManager } from "./tools.js";
