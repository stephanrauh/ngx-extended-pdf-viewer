export type AnnotationEditorLayer = import("./annotation_editor_layer.js").AnnotationEditorLayer;
export type AnnotationEditorUIManager = import("./tools.js").AnnotationEditorUIManager;
export type AnnotationEditorParameters = {
    /**
     * - the global manager
     */
    uiManager: AnnotationEditorUIManager;
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
 * @property {AnnotationEditorUIManager} uiManager - the global manager
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
    static _zIndex: number;
    static get _defaultLineColor(): any;
    static deleteAnnotationElement(editor: any): void;
    /**
     * Initialize the l10n stuff for this type of editor.
     * @param {Object} _l10n
     */
    static initialize(_l10n: Object): void;
    /**
     * Update the default parameters for this type of editor.
     * @param {number} _type
     * @param {*} _value
     */
    static updateDefaultParams(_type: number, _value: any): void;
    /**
     * Get the default properties to set in the UI for this type of editor.
     * @returns {Array}
     */
    static get defaultPropertiesToUpdate(): any[];
    /**
     * Deserialize the editor.
     * The result of the deserialization is a new editor.
     *
     * @param {Object} data
     * @param {AnnotationEditorLayer} parent
     * @param {AnnotationEditorUIManager} uiManager
     * @returns {AnnotationEditor}
     */
    static deserialize(data: Object, parent: AnnotationEditorLayer, uiManager: AnnotationEditorUIManager): AnnotationEditor;
    static get MIN_SIZE(): number;
    /**
     * @param {AnnotationEditorParameters} parameters
     */
    constructor(parameters: AnnotationEditorParameters);
    _uiManager: null;
    parent: import("./annotation_editor_layer.js").AnnotationEditorLayer;
    id: string;
    width: any;
    height: any;
    pageIndex: number;
    name: any;
    div: HTMLDivElement | null;
    annotationElementId: any;
    _willKeepAspectRatio: boolean;
    rotation: number;
    pageRotation: number;
    pageDimensions: any[];
    pageTranslation: any[];
    x: number;
    y: number;
    isAttachedToDOM: boolean;
    deleted: boolean;
    /**
     * Get the properties to update in the UI for this editor.
     * @returns {Array}
     */
    get propertiesToUpdate(): any[];
    /**
     * Add some commands into the CommandManager (undo/redo stuff).
     * @param {Object} params
     */
    addCommands(params: Object): void;
    get currentLayer(): any;
    /**
     * This editor will be behind the others.
     */
    setInBackground(): void;
    /**
     * This editor will be in the foreground.
     */
    setInForeground(): void;
    setParent(parent: any): void;
    /**
     * onfocus callback.
     */
    focusin(event: any): void;
    /**
     * onblur callback.
     * @param {FocusEvent} event
     */
    focusout(event: FocusEvent): void;
    commitOrRemove(): void;
    /**
     * Commit the data contained in this editor.
     */
    commit(): void;
    addToAnnotationStorage(): void;
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
     * Translate the editor position within its page and adjust the scroll
     * in order to have the editor in the view.
     * @param {number} x - x-translation in page coordinates.
     * @param {number} y - y-translation in page coordinates.
     */
    translateInPage(x: number, y: number): void;
    fixAndSetPosition(): void;
    /**
     * Convert a screen translation into a page one.
     * @param {number} x
     * @param {number} y
     */
    screenToPageTranslation(x: number, y: number): number[];
    /**
     * Convert a page translation into a screen one.
     * @param {number} x
     * @param {number} y
     */
    pageTranslationToScreen(x: number, y: number): number[];
    get parentScale(): any;
    get parentRotation(): number;
    get parentDimensions(): number[];
    /**
     * Set the dimensions of this editor.
     * @param {number} width
     * @param {number} height
     */
    setDims(width: number, height: number): void;
    fixDims(): void;
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
     * Onpointerdown callback.
     * @param {PointerEvent} event
     */
    pointerdown(event: PointerEvent): void;
    /**
     * Convert the current rect into a page one.
     */
    getRect(tx: any, ty: any): any[];
    getRectInCurrentCoords(rect: any, pageHeight: any): any[];
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
     */
    enableEditMode(): void;
    /**
     * Disable edit mode.
     */
    disableEditMode(): void;
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
     * Check if this editor needs to be rebuilt or not.
     * @returns {boolean}
     */
    needsToBeRebuilt(): boolean;
    /**
     * Rebuild the editor in case it has been removed on undo.
     *
     * To implement in subclasses.
     */
    rebuild(): void;
    /**
     * Serialize the editor.
     * The result of the serialization will be used to construct a
     * new annotation to add to the pdf document.
     *
     * To implement in subclasses.
     * @param {boolean} isForCopying
     * @param {Object} [context]
     */
    serialize(_isForCopying?: boolean, _context?: null): void;
    /**
     * Remove this editor.
     * It's used on ctrl+backspace action.
     */
    remove(): void;
    /**
     * @returns {boolean} true if this editor can be resized.
     */
    get isResizable(): boolean;
    /**
     * Add the resizers to this editor.
     */
    makeResizable(): void;
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
     * When the user disables the editing mode some editors can change some of
     * their properties.
     */
    disableEditing(): void;
    /**
     * When the user enables the editing mode some editors can change some of
     * their properties.
     */
    enableEditing(): void;
    /**
     * The editor is about to be edited.
     */
    enterInEditMode(): void;
    /**
     * Get the div which really contains the displayed content.
     */
    get contentDiv(): HTMLDivElement | null;
    /**
     * When set to true, it means that this editor is currently edited.
     * @param {boolean} value
     */
    set isEditing(arg: boolean);
    /**
     * If true then the editor is currently edited.
     * @type {boolean}
     */
    get isEditing(): boolean;
    /**
     * Set the aspect ratio to use when resizing.
     * @param {number} width
     * @param {number} height
     */
    setAspectRatio(width: number, height: number): void;
    #private;
}
import { ColorManager } from "./tools.js";
