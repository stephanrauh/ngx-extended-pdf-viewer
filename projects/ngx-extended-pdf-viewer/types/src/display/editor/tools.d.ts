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
     * @param {function} cmd
     * @param {function} undo
     * @param {boolean} mustExec
     */
    addCommands(cmd: Function, undo: Function, mustExec: boolean): void;
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
     * Suppress some editors from the given layer.
     * @param {AnnotationEditorLayer} layer
     */
    suppress(layer: AnnotationEditorLayer): void;
    /**
     * Copy the selected editor.
     */
    copy(): void;
    /**
     * Cut the selected editor.
     * @param {AnnotationEditorLayer}
     */
    cut(layer: any): void;
    /**
     * Paste a previously copied editor.
     * @param {AnnotationEditorLayer}
     * @returns {undefined}
     */
    paste(layer: any): undefined;
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
