/**
 * Basic text editor in order to create a FreeTex annotation.
 */
export class StampEditor extends AnnotationEditor {
    static _type: string;
    /** @inheritdoc */
    static deserialize(data: any, parent: any, uiManager: any): AnnotationEditor | null;
    constructor(params: any);
    /** @inheritdoc */
    render(): HTMLDivElement | null;
    /** @inheritdoc */
    serialize(isForCopying?: boolean, context?: null): {
        annotationType: number;
        bitmapId: null;
        pageIndex: number;
        rect: any[];
        rotation: number;
        isSvg: boolean;
    } | null;
    #private;
}
import { AnnotationEditor } from "./editor.js";
