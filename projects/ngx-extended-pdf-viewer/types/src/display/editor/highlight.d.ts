/**
 * Editor for text-selection and freehand highlights.
 * Their geometry comes from separate outline implementations.
 */
export class HighlightEditor extends DrawingEditor {
    static _DEFAULT_OPACITY: number;
    static _DEFAULT_THICKNESS: number;
    static _defaultDrawingOptions: null;
    static _type: string;
    static _editorType: number;
    static get _keyboardManager(): any;
    /** @inheritdoc */
    static initialize(l10n: any, uiManager: any): void;
    /** @inheritdoc */
    static getDefaultDrawingOptions(options: any): any;
    /** @inheritdoc */
    static get typesMap(): any;
    static computeTelemetryFinalData(data: any): {
        numberOfColors: any;
    };
    /** @inheritdoc */
    static createDrawerInstance({ x, y, box, parent, isLTR }: {
        x: any;
        y: any;
        box: any;
        parent: any;
        isLTR: any;
    }): FreeHighlightDrawer;
    /** @inheritdoc */
    static _getDrawingTarget(parent: any, { target }: {
        target: any;
    }): any;
    /** @inheritdoc */
    static _getPointerCoords({ x, y }: {
        x: any;
        y: any;
    }): any[];
    /** @inheritdoc */
    static _addDrawingListeners(target: any, signal: any): void;
    /** @inheritdoc */
    static deserializeDraw(pageX: any, pageY: any, pageWidth: any, pageHeight: any, _innerMargin: any, data: any, uiManager: any): import("./drawers/freedraw.js").FreeDrawOutline | HighlightOutline;
    defaultL10nId: string;
    get colorType(): number;
    get color(): any;
    get opacity(): any;
    /** @inheritdoc */
    get _opacityName(): string;
    /** @inheritdoc */
    get addedEventValue(): {
        color: any;
        thickness: any;
        isFreeHighlight: boolean;
        text: string;
    };
    /** @inheritdoc */
    get telemetryInitialData(): {
        action: string;
        type: string;
        color: any;
        thickness: any;
        methodOfCreation: string;
    };
    /** @inheritdoc */
    get telemetryFinalData(): {
        type: string;
        color: any;
    };
    /** @inheritdoc */
    translateInPage(x: any, y: any): void;
    /** @inheritdoc */
    get toolbarPosition(): number[];
    /** @inheritdoc */
    get commentButtonPosition(): number[];
    /** @inheritdoc */
    fixAndSetPosition(): void;
    /** @inheritdoc */
    getRect(tx: any, ty: any): any[];
    /** @inheritdoc */
    startErase(layerRect: any): number[] | null;
    /** @inheritdoc */
    erase(x: any, y: any, radius: any, prevX?: any, prevY?: any): void;
    /** @inheritdoc */
    endErase(): {
        cmd?: undefined;
        undo?: undefined;
    } | {
        cmd: () => void;
        undo: () => void;
    };
    _moveCaret(direction: any): void;
    /** @inheritdoc */
    createDrawingOptions({ color, opacity, thickness }: {
        color: any;
        opacity: any;
        thickness: any;
    }): void;
    _drawingOptions: any;
    /** @inheritdoc */
    serialize(isForCopying?: boolean, context?: null, includeId?: boolean): Object | null;
    #private;
}
import { DrawingEditor } from "./draw.js";
import { FreeHighlightDrawer } from "./drawers/highlight.js";
import { HighlightOutline } from "./drawers/highlight.js";
