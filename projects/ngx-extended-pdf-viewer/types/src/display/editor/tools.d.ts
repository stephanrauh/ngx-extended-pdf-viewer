export type AnnotationEditor = import("./editor.js").AnnotationEditor;
export type AnnotationEditorLayer = import("./annotation_editor_layer.js").AnnotationEditorLayer;
/**
 * A pdf has several pages and each of them when it will rendered
 * will have an AnnotationEditorLayer which will contain the some
 * new Annotations associated to an editor in order to modify them.
 *
 * This class is used to manage all the different layers, editors and
 * some action like copy/paste, undo/redo, ...
 */
export class AnnotationEditorUIManager {
    constructor(eventBus: any);
    destroy(): void;
    /**
     * Execute an action for a given name.
     * For example, the user can click on the "Undo" entry in the context menu
     * and it'll trigger the undo action.
     * @param {Object} details
     */
    onEditingAction(details: Object): void;
    /**
     * Set the editing state.
     * It can be useful to temporarily disable it when the user is editing a
     * FreeText annotation.
     * @param {boolean} isEditing
     */
    setEditingState(isEditing: boolean): void;
    registerEditorTypes(types: any): void;
    /**
     * Get an id.
     * @returns {string}
     */
    getId(): string;
    /**
     * Add a new layer for a page which will contains the editors.
     * @param {AnnotationEditorLayer} layer
     */
    addLayer(layer: AnnotationEditorLayer): void;
    /**
     * Remove a layer.
     * @param {AnnotationEditorLayer} layer
     */
    removeLayer(layer: AnnotationEditorLayer): void;
    /**
     * Change the editor mode (None, FreeText, Ink, ...)
     * @param {number} mode
     */
    updateMode(mode: number): void;
    /**
     * Update the toolbar if it's required to reflect the tool currently used.
     * @param {number} mode
     * @returns {undefined}
     */
    updateToolbar(mode: number): undefined;
    /**
     * Update a parameter in the current editor or globally.
     * @param {number} type
     * @param {*} value
     */
    updateParams(type: number, value: any): void;
    /**
     * Get all the editors belonging to a give page.
     * @param {number} pageIndex
     * @returns {Array<AnnotationEditor>}
     */
    getEditors(pageIndex: number): Array<AnnotationEditor>;
    /**
     * Get an editor with the given id.
     * @param {string} id
     * @returns {AnnotationEditor}
     */
    getEditor(id: string): AnnotationEditor;
    /**
     * Add a new editor.
     * @param {AnnotationEditor} editor
     */
    addEditor(editor: AnnotationEditor): void;
    /**
     * Remove an editor.
     * @param {AnnotationEditor} editor
     */
    removeEditor(editor: AnnotationEditor): void;
    /**
     * Set the given editor as the active one.
     * @param {AnnotationEditor} editor
     */
    setActiveEditor(editor: AnnotationEditor): void;
    /**
     * Undo the last command.
     */
    undo(): void;
    /**
     * Redo the last undoed command.
     */
    redo(): void;
    /**
     * Add a command to execute (cmd) and another one to undo it.
     * @param {Object} params
     */
    addCommands(params: Object): void;
    /**
     * @param {boolean} allow
     */
    set allowClick(arg: boolean);
    /**
     * When set to true a click on the current layer will trigger
     * an editor creation.
     * @return {boolean}
     */
    get allowClick(): boolean;
    /**
     * Unselect the current editor.
     */
    unselect(): void;
    /**
     * Delete the current editor or all.
     */
    delete(): void;
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
     * Is the current editor the one passed as argument?
     * @param {AnnotationEditor} editor
     * @returns
     */
    isActive(editor: AnnotationEditor): boolean;
    /**
     * Get the current active editor.
     * @returns {AnnotationEditor|null}
     */
    getActive(): AnnotationEditor | null;
    /**
     * Check if there is an active editor.
     * @returns {boolean}
     */
    hasActive(): boolean;
    /**
     * Get the current editor mode.
     * @returns {number}
     */
    getMode(): number;
    #private;
}
export function bindEvents(obj: any, element: any, names: any): void;
export class ColorManager {
    static _colorsMapping: Map<string, number[]>;
    get _colors(): any;
    /**
     * In High Contrast Mode, the color on the screen is not always the
     * real color used in the pdf.
     * For example in some cases white can appear to be black but when saving
     * we want to have white.
     * @param {string} color
     * @returns {Array<number>}
     */
    convert(color: string): Array<number>;
    /**
     * An input element must have its color value as a hex string
     * and not as color name.
     * So this function converts a name into an hex string.
     * @param {string} name
     * @returns {string}
     */
    getHexCode(name: string): string;
}
/**
 * Class to handle the different keyboards shortcuts we can have on mac or
 * non-mac OSes.
 */
export class KeyboardManager {
    static get platform(): any;
    /**
     * Create a new keyboard manager class.
     * @param {Array<Array>} callbacks - an array containing an array of shortcuts
     * and a callback to call.
     * A shortcut is a string like `ctrl+c` or `mac+ctrl+c` for mac OS.
     */
    constructor(callbacks: Array<any[]>);
    buffer: any[];
    callbacks: Map<any, any>;
    allKeys: Set<any>;
    /**
     * Execute a callback, if any, for a given keyboard event.
     * The page is used as `this` in the callback.
     * @param {AnnotationEditorLayer} page.
     * @param {KeyboardEvent} event
     * @returns
     */
    exec(page: any, event: KeyboardEvent): void;
    #private;
}
