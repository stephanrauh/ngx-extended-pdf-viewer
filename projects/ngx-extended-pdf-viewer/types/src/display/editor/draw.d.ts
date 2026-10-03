export type AnnotationEditorLayer = import("./annotation_editor_layer.js").AnnotationEditorLayer;
export type AnnotationEditorUIManager = import("./tools.js").AnnotationEditorUIManager;
/**
 * Basic draw editor.
 */
export class DrawingEditor extends AnnotationEditor {
    static _currentDrawId: number;
    static _currentParent: null;
    static #currentDraw: null;
    static #currentDrawingAC: null;
    static #currentDrawingOptions: null;
    static #currentClipPathId: null;
    static #currentPointers: null;
    static _INNER_MARGIN: number;
    static _mergeSVGProperties(p1: any, p2: any): any;
    /**
     * @param {Object} options
     * @return {DrawingOptions} the default options to use for a new editor.
     */
    static getDefaultDrawingOptions(_options: any): DrawingOptions;
    /**
     * @return {Map<AnnotationEditorParamsType, string>} a map between the
     *   parameter types and the name of the options.
     */
    static get typesMap(): Map<{
        RESIZE: number;
        CREATE: number;
        FREETEXT_SIZE: number;
        FREETEXT_COLOR: number;
        FREETEXT_OPACITY: number;
        INK_COLOR: number;
        INK_THICKNESS: number;
        INK_OPACITY: number;
        INK_COLOR_AND_OPACITY: number;
        ERASER_THICKNESS: number;
        HIGHLIGHT_COLOR: number;
        HIGHLIGHT_THICKNESS: number;
        HIGHLIGHT_FREE: number;
        HIGHLIGHT_SHOW_ALL: number;
        DRAW_STEP: number;
        ERASER_STEP: number;
    }, string>;
    static get _hasClipPath(): boolean;
    static get _hasDrawClass(): boolean;
    /**
     * @returns {boolean} `true` if several drawings can be added to the
     * annotation.
     */
    static get supportMultipleDrawings(): boolean;
    /** @inheritdoc */
    static updateDefaultParams(type: any, value: any): void;
    /** @inheritdoc */
    static get defaultPropertiesToUpdate(): any[][];
    static onScaleChangingWhenDrawing(): void;
    /**
     * @param {Object} params
     * @param {number} params.x - The x coordinate of the event.
     * @param {number} params.y - The y coordinate of the event.
     * @param {Array<number>} params.box - The target's client bounding box.
     * @param {number} params.rotation - The viewport rotation.
     * @param {AnnotationEditorLayer} params.parent - The parent layer.
     * @param {boolean} params.isLTR - Whether the direction is left-to-right.
     */
    static createDrawerInstance(_params: any): void;
    /**
     * @param {AnnotationEditorLayer} _parent
     * @param {PointerEvent} event
     * @returns {HTMLElement}
     */
    static _getDrawingTarget(_parent: AnnotationEditorLayer, { target }: PointerEvent): HTMLElement;
    /**
     * @param {PointerEvent} event
     * @param {PointerEvent} [referenceEvent]
     * @returns {Array<number>}
     */
    static _getPointerCoords({ offsetX, offsetY, clientX, clientY }: PointerEvent, referenceEvent?: PointerEvent): Array<number>;
    /**
     * @param {HTMLElement} _target
     * @param {AbortSignal} _signal
     */
    static _addDrawingListeners(_target: HTMLElement, _signal: AbortSignal): void;
    /** @param {boolean} isAborted */
    static _endDrawingSession(isAborted?: boolean): any;
    static startDrawing(parent: any, uiManager: any, isLTR: any, event: any): void;
    static _drawMove(event: any): void;
    static _cleanup(all: any): void;
    static _endDraw(event: any): void;
    static endDrawing(isAborted: any): any;
    /**
     * Deserialize the drawing outlines.
     * @param {number} pageX - The x coordinate of the page.
     * @param {number} pageY - The y coordinate of the page.
     * @param {number} pageWidth - The width of the page.
     * @param {number} pageHeight - The height of the page.
     * @param {number} innerMargin - The outline's inner margin.
     * @param {Object} data - The data to deserialize.
     * @param {AnnotationEditorUIManager} uiManager
     * @returns {Object} The deserialized outlines.
     */
    static deserializeDraw(_pageX: any, _pageY: any, _pageWidth: any, _pageHeight: any, _innerMargin: any, _data: any, _uiManager: any): Object;
    /** @inheritdoc */
    static deserialize(data: any, parent: any, uiManager: any): Promise<AnnotationEditor | null>;
    /**
     * Report that drawing started or stopped. These two carry neither a page nor
     * an id, and their `editorType` is the editor's name rather than its class.
     *
     * `static`, because a drawing session is: `startDrawing()` and `_endDraw()`
     * run on the class - there is no editor instance until the stroke is
     * committed. That also rules out `_dispatchEditorEvent()`, which needs an
     * instance for its `page` and `id`; the event goes straight to the event bus
     * `AnnotationEditorLayer` puts on the editor class instead.
     *
     * @param {string} type - "drawingStarted" or "drawingStopped"
     */
    static _dispatchDrawingEvent(type: string): void;
    /** Report that the drawn path changed. `static` for the reason above. */
    static _dispatchBezierPathChangedEvent(): void;
    constructor(params: any);
    _clipPathId: null;
    _colorPicker: null;
    _drawId: null;
    _drawOutlines: null;
    _focusDrawId: null;
    /** @inheritdoc */
    onUpdatedOpacity(): void;
    _addOutlines(params: any): void;
    get _drawRotation(): number;
    get _opacityName(): any;
    /** @inheritdoc */
    updateParams(type: any, value: any): void;
    /** @inheritdoc */
    get propertiesToUpdate(): any[][];
    /**
     * Update a property and make this action undoable.
     * @param {string} color
     */
    _updateProperty(type: any, name: any, value: any): void;
    /**
     * Update color and opacity atomically as one undoable command.
     */
    _updateColorAndOpacity(color: any, opacity: any, type?: any): void;
    /** @inheritdoc */
    _onTranslating(_x: any, _y: any): void;
    /** @inheritdoc */
    _onTranslated(): void;
    get _mustBeDisabledOnCommit(): boolean;
    /** @inheritdoc */
    onceAdded(focus: any): void;
    /**
     * @inheritdoc
     * @param {number} [parentRotation] - The parent rotation to apply.
     */
    rotate(parentRotation?: number): void;
    pointerover(): void;
    pointerleave(): void;
    onScaleChanging(): void;
    /**
     * Create the drawing options.
     * @param {Object} _data
     */
    createDrawingOptions(_data: Object): void;
    serializeDraw(isForCopying: any): any;
    /** @inheritdoc */
    renderAnnotationElement(annotation: any): null;
    /**
     * Report a change of the stroke colour, its width or its opacity.
     * @param {string} name - the SVG property that changed
     * @param {*} value - its new value
     */
    _dispatchDrawPropertyEvent(name: string, value: any): void;
    #private;
}
export class DrawingOptions {
    updateProperty(name: any, value: any): void;
    updateProperties(properties: any): void;
    updateSVGProperty(name: any, value: any): void;
    toSVGProperties(): {
        root: any;
    };
    reset(): void;
    updateAll(options?: this): void;
    clone(): void;
    #private;
}
import { AnnotationEditor } from "./editor.js";
