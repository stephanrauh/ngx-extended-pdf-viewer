export type AnnotationEditorUIManager = import("./tools.js").AnnotationEditorUIManager;
export type PageViewport = import("../page_viewport.js").PageViewport;
export type TextAccessibilityManager = import("../../../web/text_accessibility.js").TextAccessibilityManager;
export type AnnotationLayer = import("../annotation_layer.js").AnnotationLayer;
export type DrawLayer = import("../draw_layer.js").DrawLayer;
export type StructTreeLayerBuilder = import("../../../web/struct_tree_layer_builder.js").StructTreeLayerBuilder;
export type L10n = import("../../../web/l10n.js").L10n;
export type AnnotationEditorLayerOptions = {
    mode: object;
    div: HTMLDivElement;
    structTreeLayer: StructTreeLayerBuilder;
    uiManager: AnnotationEditorUIManager;
    enabled: boolean;
    accessibilityManager?: import("../../../web/text_accessibility.js").TextAccessibilityManager | undefined;
    pageIndex: number;
    l10n: L10n;
    annotationLayer?: import("../annotation_layer.js").AnnotationLayer | undefined;
    textLayer?: HTMLDivElement | undefined;
    drawLayer: DrawLayer;
    viewport: PageViewport;
};
export type RenderEditorLayerOptions = {
    viewport: PageViewport;
};
/**
 * @typedef {object} AnnotationEditorLayerOptions
 * @property {object} mode
 * @property {HTMLDivElement} div
 * @property {StructTreeLayerBuilder} structTreeLayer
 * @property {AnnotationEditorUIManager} uiManager
 * @property {boolean} enabled
 * @property {TextAccessibilityManager} [accessibilityManager]
 * @property {number} pageIndex
 * @property {L10n} l10n
 * @property {AnnotationLayer} [annotationLayer]
 * @property {HTMLDivElement} [textLayer]
 * @property {DrawLayer} drawLayer
 * @property {PageViewport} viewport
 */
/**
 * @typedef {object} RenderEditorLayerOptions
 * @property {PageViewport} viewport
 */
/**
 * Manage all the different editors on a page.
 */
export class AnnotationEditorLayer {
    static _initialized: boolean;
    static #editorTypes: Map<number, typeof EraserEditor | typeof FreeTextEditor | typeof HighlightEditor | typeof InkEditor | typeof SignatureEditor | typeof StampEditor>;
    /**
     * @param {AnnotationEditorLayerOptions} options
     */
    constructor({ uiManager, pageIndex, div, structTreeLayer, accessibilityManager, annotationLayer, drawLayer, textLayer, viewport, l10n, eventBus, }: AnnotationEditorLayerOptions);
    pageIndex: number;
    div: HTMLDivElement;
    viewport: import("../page_viewport.js").PageViewport;
    drawLayer: import("../draw_layer.js").DrawLayer;
    _structTree: import("../../../web/struct_tree_layer_builder.js").StructTreeLayerBuilder;
    eventBus: any;
    get isEmpty(): boolean;
    get isInvisible(): boolean;
    /**
     * Update the toolbar if it's required to reflect the tool currently used.
     * @param {object} options
     */
    updateToolbar(options: object): void;
    /**
     * The mode has changed: it must be updated.
     * @param {number} mode
     */
    updateMode(mode?: number): void;
    hasTextLayer(textLayer: any): boolean;
    /**
     * Set the editing state.
     * @param {boolean} isEditing
     */
    setEditingState(isEditing: boolean): void;
    /**
     * Add some commands into the CommandManager (undo/redo stuff).
     * @param {object} params
     */
    addCommands(params: object): void;
    cleanUndoStack(type: any): void;
    toggleDrawing(enabled?: boolean): void;
    togglePointerEvents(enabled?: boolean): void;
    toggleAnnotationLayerPointerEvents(enabled?: boolean): void;
    /**
     * Enable pointer events on the main div in order to enable
     * editor creation.
     */
    enable(): Promise<void>;
    /**
     * Disable editor creation.
     */
    disable(): void;
    getEditableAnnotation(id: any): any;
    /**
     * Set the current editor.
     * @param {AnnotationEditor} editor
     */
    setActiveEditor(editor: AnnotationEditor): void;
    enableTextSelection(): void;
    disableTextSelection(): void;
    enableClick(): void;
    disableClick(): void;
    attach(editor: any): void;
    detach(editor: any): void;
    /**
     * Remove an editor.
     * @param {AnnotationEditor} editor
     */
    remove(editor: AnnotationEditor): void;
    /**
     * An editor can have a different parent, for example after having
     * being dragged and dropped from a page to another.
     * @param {AnnotationEditor} editor
     */
    changeParent(editor: AnnotationEditor): void;
    /**
     * Add a new editor in the current view.
     * @param {AnnotationEditor} editor
     */
    add(editor: AnnotationEditor): void;
    moveEditorInDOM(editor: any): void;
    /**
     * Add or rebuild depending if it has been removed or not.
     * @param {AnnotationEditor} editor
     */
    addOrRebuild(editor: AnnotationEditor): void;
    /**
     * Add a new editor and make this addition undoable.
     * @param {AnnotationEditor} editor
     */
    addUndoableEditor(editor: AnnotationEditor): void;
    getEditorByUID(uid: any): any;
    combinedSignal(ac: any): AbortSignal;
    canCreateNewEmptyEditor(): boolean | undefined;
    /**
     * Paste some content into a new editor.
     * @param {object} options
     * @param {object} params
     */
    pasteEditor(options: object, params: object): Promise<void>;
    /**
     * Create a new editor
     * @param {object} data
     * @returns {Promise<AnnotationEditor | null>}
     */
    deserialize(data: object): Promise<AnnotationEditor | null>;
    /**
     * Create and add a new editor.
     * @param {PointerEvent} event
     * @param {boolean} isCentered
     * @param {object} [data]
     * @returns {AnnotationEditor}
     */
    createAndAddNewEditor(event: PointerEvent, isCentered: boolean, data?: object): AnnotationEditor;
    get boundingClientRect(): DOMRect;
    /**
     * Create and add a new editor.
     */
    addNewEditor(data?: {}): void;
    /**
     * Set the last selected editor.
     * @param {AnnotationEditor} editor
     */
    setSelected(editor: AnnotationEditor): void;
    /**
     * Add or remove an editor the current selection.
     * @param {AnnotationEditor} editor
     */
    toggleSelected(editor: AnnotationEditor): void;
    /**
     * Unselect an editor.
     * @param {AnnotationEditor} editor
     */
    unselect(editor: AnnotationEditor): void;
    /**
     * Pointerup callback.
     * @param {PointerEvent} event
     */
    pointerup(event: PointerEvent): void;
    /**
     * Pointerdown callback.
     * @param {PointerEvent} event
     */
    pointerdown(event: PointerEvent): void;
    startDrawingSession(event: any): void;
    pause(on: any): void;
    endDrawingSession(isAborted?: boolean): any;
    /**
     * @param {AnnotationEditor} editor
     * @param {number} x
     * @param {number} y
     * @returns {boolean}
     */
    findNewParent(editor: AnnotationEditor, x: number, y: number): boolean;
    commitOrRemove(): boolean;
    onScaleChanging(): void;
    /**
     * Destroy the main editor.
     */
    destroy(): void;
    /**
     * Render the main editor.
     * @param {RenderEditorLayerOptions} parameters
     */
    render({ viewport }: RenderEditorLayerOptions): Promise<void>;
    /**
     * Update the main editor.
     * @param {RenderEditorLayerOptions} parameters
     */
    update({ viewport }: RenderEditorLayerOptions): void;
    /**
     * Get page dimensions.
     * @returns {object} dimensions.
     */
    get pageDimensions(): object;
    get scale(): number;
    #private;
}
import { AnnotationEditor } from "./editor.js";
import { EraserEditor } from "./eraser.js";
import { FreeTextEditor } from "./freetext.js";
import { HighlightEditor } from "./highlight.js";
import { InkEditor } from "./ink.js";
import { SignatureEditor } from "./signature.js";
import { StampEditor } from "./stamp.js";
