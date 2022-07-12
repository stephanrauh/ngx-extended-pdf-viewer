export type AnnotationEditor = import("./editor.js").AnnotationEditor;
export type AnnotationEditorUIManager = import("./tools.js").AnnotationEditorUIManager;
export type AnnotationStorage = import("../annotation_storage.js").AnnotationStorage;
export type IL10n = any;
export type AnnotationEditorLayerOptions = {
    mode: Object;
    div: HTMLDivElement;
    uiManager: AnnotationEditorUIManager;
    enabled: boolean;
    annotationStorag: AnnotationStorage;
    pageIndex: number;
    l10n: any;
};
/**
 * @typedef {Object} AnnotationEditorLayerOptions
 * @property {Object} mode
 * @property {HTMLDivElement} div
 * @property {AnnotationEditorUIManager} uiManager
 * @property {boolean} enabled
 * @property {AnnotationStorage} annotationStorag
 * @property {number} pageIndex
 * @property {IL10n} l10n
 */
/**
 * Manage all the different editors on a page.
 */
export class AnnotationEditorLayer {
    static _initialized: boolean;
    static _keyboardManager: KeyboardManager;
    /**
     * @param {AnnotationEditorLayerOptions} options
     */
    constructor(options: AnnotationEditorLayerOptions);
    annotationStorage: any;
    pageIndex: number;
    div: HTMLDivElement;
    /**
     * Update the toolbar if it's required to reflect the tool currently used.
     * @param {number} mode
     * @returns {undefined}
     */
    updateToolbar(mode: number): undefined;
    /**
     * The mode has changed: it must be updated.
     * @param {number} mode
     */
    updateMode(mode?: number): void;
    addInkEditorIfNeeded(isCommitting: any): void;
    /**
     * Set the editing state.
     * @param {boolean} isEditing
     */
    setEditingState(isEditing: boolean): void;
    /**
     * Add some commands into the CommandManager (undo/redo stuff).
     * @param {Object} params
     */
    addCommands(params: Object): void;
    /**
     * Undo the last command.
     */
    undo(): void;
    /**
     * Redo the last command.
     */
    redo(): void;
    /**
     * Suppress the selected editor or all editors.
     * @returns {undefined}
     */
    delete(): undefined;
    /**
     * Copy the selected editor.
     */
    copy(): void;
    /**
     * Cut the selected editor.
     */
    cut(): void;
    /**
     * Paste a previously copied editor.
     * @returns {undefined}
     */
    paste(): undefined;
    /**
     * Select all the editors.
     */
    selectAll(): void;
    /**
     * Unselect all the editors.
     */
    unselectAll(): void;
    /**
     * Enable pointer events on the main div in order to enable
     * editor creation.
     */
    enable(): void;
    /**
     * Disable editor creation.
     */
    disable(): void;
    /**
     * Set the current editor.
     * @param {AnnotationEditor} editor
     */
    setActiveEditor(editor: AnnotationEditor): void;
    attach(editor: any): void;
    detach(editor: any): void;
    /**
     * Remove an editor.
     * @param {AnnotationEditor} editor
     */
    remove(editor: AnnotationEditor): void;
    /**
     * Add a new editor in the current view.
     * @param {AnnotationEditor} editor
     */
    add(editor: AnnotationEditor): void;
    /**
     * Add or rebuild depending if it has been removed or not.
     * @param {AnnotationEditor} editor
     */
    addOrRebuild(editor: AnnotationEditor): void;
    /**
     * Add a new editor and make this addition undoable.
     * @param {AnnotationEditor} editor
     */
    addANewEditor(editor: AnnotationEditor): void;
    /**
     * Add a new editor and make this addition undoable.
     * @param {AnnotationEditor} editor
     */
    addUndoableEditor(editor: AnnotationEditor): void;
    /**
     * Get an id for an editor.
     * @returns {string}
     */
    getNextId(): string;
    /**
     * Mouseclick callback.
     * @param {MouseEvent} event
     * @returns {undefined}
     */
    click(event: MouseEvent): undefined;
    /**
     * Drag callback.
     * @param {DragEvent} event
     * @returns {undefined}
     */
    drop(event: DragEvent): undefined;
    /**
     * Dragover callback.
     * @param {DragEvent} event
     */
    dragover(event: DragEvent): void;
    /**
     * Keydown callback.
     * @param {KeyboardEvent} event
     */
    keydown(event: KeyboardEvent): void;
    /**
     * Destroy the main editor.
     */
    destroy(): void;
    /**
     * Render the main editor.
     * @param {Object} parameters
     */
    render(parameters: Object): void;
    viewport: any;
    /**
     * Update the main editor.
     * @param {Object} parameters
     */
    update(parameters: Object): void;
    /**
     * Get the scale factor from the viewport.
     * @returns {number}
     */
    get scaleFactor(): number;
    /**
     * Get page dimensions.
     * @returns {Object} dimensions.
     */
    get pageDimensions(): Object;
    get viewportBaseDimensions(): any[];
    /**
     * Set the dimensions of the main div.
     */
    setDimensions(): void;
    #private;
}
import { KeyboardManager } from "./tools.js";
