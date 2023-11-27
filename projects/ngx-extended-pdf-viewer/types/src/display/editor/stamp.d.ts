/**
 * Basic text editor in order to create a FreeTex annotation.
 */
export class StampEditor extends AnnotationEditor {
    static _type: string;
    static _editorType: number;
    /** @inheritdoc */
    static initialize(l10n: any): void;
    static get supportedTypes(): any;
    static get supportedTypesStr(): any;
    /** @inheritdoc */
    static isHandlingMimeForPasting(mime: any): any;
    /** @inheritdoc */
    static paste(item: any, parent: any): void;
    /** @inheritdoc */
    static deserialize(data: any, parent: any, uiManager: any): AnnotationEditor | null;
    constructor(params: any);
    /** @inheritdoc */
    getImageForAltText(): null;
    /** @inheritdoc */
    serialize(isForCopying?: boolean, context?: null): {
        annotationType: number;
        bitmapId: null;
        pageIndex: number;
        rect: any[];
        rotation: number;
        isSvg: boolean;
        structTreeParentId: any;
    } | null;
    #private;
}
import { AnnotationEditor } from "./editor.js";
