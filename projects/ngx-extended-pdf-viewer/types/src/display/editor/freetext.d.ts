/**
 * Basic text editor in order to create a FreeTex annotation.
 */
export class FreeTextEditor extends AnnotationEditor {
    static _freeTextDefaultContent: string;
    static _l10nPromise: any;
    static _internalPadding: number;
    static _defaultFontSize: number;
    static _defaultColor: string;
    static initialize(l10n: any): void;
    static updateDefaultParams(type: any, value: any): void;
    static get defaultPropertiesToUpdate(): (string | number)[][];
    constructor(params: any);
    /** @inheritdoc */
    copy(): FreeTextEditor;
    /** @inheritdoc */
    updateParams(type: any, value: any): void;
    /** @inheritdoc */
    get propertiesToUpdate(): any[][];
    /** @inheritdoc */
    rebuild(): void;
    /** @inheritdoc */
    enableEditMode(): void;
    /** @inheritdoc */
    disableEditMode(): void;
    /**
     * Commit the content we have in this editor.
     * @returns {undefined}
     */
    commit(): undefined;
    /**
     * ondblclick callback.
     * @param {MouseEvent} event
     */
    dblclick(event: MouseEvent): void;
    /** @inheritdoc */
    render(): HTMLDivElement | null;
    editorDiv: HTMLDivElement | undefined;
    overlayDiv: HTMLDivElement | undefined;
    /** @inheritdoc */
    serialize(): {
        annotationType: number;
        color: any;
        fontSize: any;
        value: string;
        pageIndex: number;
        rect: number[];
        rotation: any;
    };
    #private;
}
import { AnnotationEditor } from "./editor.js";
