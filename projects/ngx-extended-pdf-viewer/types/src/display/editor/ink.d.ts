export class InkDrawingOptions extends DrawingOptions {
    constructor(viewerParameters: any);
    _viewParameters: any;
    clone(): InkDrawingOptions;
}
/**
 * Basic draw editor in order to generate an Ink annotation.
 */
export class InkEditor extends DrawingEditor {
    static _type: string;
    static _editorType: number;
    static _defaultDrawingOptions: null;
    /** @inheritdoc */
    static initialize(l10n: any, uiManager: any): void;
    /** @inheritdoc */
    static getDefaultDrawingOptions(options: any): any;
    /** @inheritdoc */
    static get typesMap(): any;
    /** @inheritdoc */
    static createDrawerInstance({ x, y, box: [, , width, height], rotation }: {
        x: any;
        y: any;
        box: [any, any, any, any];
        rotation: any;
    }): InkDrawOutliner;
    /** @inheritdoc */
    static deserializeDraw(pageX: any, pageY: any, pageWidth: any, pageHeight: any, innerMargin: any, data: any): any;
    defaultL10nId: string;
    /** @inheritdoc */
    get toolbarButtons(): (string | null)[][];
    get colorType(): number;
    get colorAndOpacityType(): number;
    get opacityType(): number;
    get color(): any;
    get opacity(): any;
    /** @inheritdoc */
    createDrawingOptions({ color, thickness, opacity }: {
        color: any;
        thickness: any;
        opacity: any;
    }): void;
    _drawingOptions: any;
    /** @inheritdoc */
    serialize(isForCopying?: boolean, context?: null, includeId?: boolean): object | null;
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
    #private;
}
import { DrawingOptions } from "./draw.js";
import { DrawingEditor } from "./draw.js";
import { InkDrawOutliner } from "./drawers/inkdraw.js";
