/**
 * Basic draw editor in order to generate an Highlight annotation.
 */
export class HighlightEditor extends AnnotationEditor {
    static _defaultColor: null;
    static _defaultOpacity: number;
    static _l10nPromise: any;
    static _type: string;
    static _editorType: number;
    static initialize(l10n: any): void;
    static updateDefaultParams(type: any, value: any): void;
    static get defaultPropertiesToUpdate(): (number | null)[][];
    static "__#18@#rotateBbox"({ x, y, width, height }: {
        x: any;
        y: any;
        width: any;
        height: any;
    }, angle: any): {
        x: any;
        y: any;
        width: any;
        height: any;
    };
    /** @inheritdoc */
    static deserialize(data: any, parent: any, uiManager: any): AnnotationEditor | null;
    constructor(params: any);
    color: any;
    /** @inheritdoc */
    updateParams(type: any, value: any): void;
    /** @inheritdoc */
    get propertiesToUpdate(): any[][];
    /** @inheritdoc */
    fixAndSetPosition(): void;
    /** @inheritdoc */
    getRect(tx: any, ty: any): any[];
    /** @inheritdoc */
    rotate(angle: any): void;
    pointerover(): void;
    pointerleave(): void;
    /** @inheritdoc */
    serialize(isForCopying?: boolean): {
        annotationType: number;
        color: number[];
        opacity: any;
        quadPoints: any[];
        outlines: any[][];
        pageIndex: number;
        rect: any[];
        rotation: number;
        structTreeParentId: any;
    } | null;
    #private;
}
import { AnnotationEditor } from "./editor.js";
