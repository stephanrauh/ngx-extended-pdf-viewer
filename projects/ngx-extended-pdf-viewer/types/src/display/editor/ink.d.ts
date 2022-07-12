/**
 * Basic draw editor in order to generate an Ink annotation.
 */
export class InkEditor extends AnnotationEditor {
    static _defaultColor: null;
    static _defaultThickness: number;
    static updateDefaultParams(type: any, value: any): void;
    static get defaultPropertiesToUpdate(): any[][];
    constructor(params: any);
    color: any;
    thickness: any;
    paths: any[];
    bezierPath2D: any[];
    currentPath: any[];
    scaleFactor: number;
    translationX: number;
    translationY: number;
    /** @inheritdoc */
    copy(): InkEditor;
    /** @inheritdoc */
    updateParams(type: any, value: any): void;
    /** @inheritdoc */
    get propertiesToUpdate(): any[][];
    /** @inheritdoc */
    rebuild(): void;
    /** @inheritdoc */
    remove(): void;
    canvas: HTMLCanvasElement | null | undefined;
    /** @inheritdoc */
    enableEditMode(): void;
    /** @inheritdoc */
    disableEditMode(): void;
    /**
     * Commit the curves we have in this editor.
     * @returns {undefined}
     */
    commit(): undefined;
    /**
     * onmousedown callback for the canvas we're drawing on.
     * @param {MouseEvent} event
     * @returns {undefined}
     */
    canvasMousedown(event: MouseEvent): undefined;
    /**
     * onmousemove callback for the canvas we're drawing on.
     * @param {MouseEvent} event
     * @returns {undefined}
     */
    canvasMousemove(event: MouseEvent): undefined;
    /**
     * onmouseup callback for the canvas we're drawing on.
     * @param {MouseEvent} event
     * @returns {undefined}
     */
    canvasMouseup(event: MouseEvent): undefined;
    /**
     * onmouseleave callback for the canvas we're drawing on.
     * @param {MouseEvent} event
     * @returns {undefined}
     */
    canvasMouseleave(event: MouseEvent): undefined;
    ctx: CanvasRenderingContext2D | null | undefined;
    /** @inheritdoc */
    render(): HTMLDivElement | null;
    /**
     * When the dimensions of the div change the inner canvas must
     * renew its dimensions, hence it must redraw its own contents.
     * @param {number} width - the new width of the div
     * @param {number} height - the new height of the div
     * @returns
     */
    setDimensions(width: number, height: number): void;
    /** @inheritdoc */
    serialize(): {
        annotationType: number;
        color: number[];
        thickness: any;
        paths: {
            bezier: number[];
            points: number[];
        }[];
        pageIndex: number;
        rect: number[];
        rotation: any;
    } | null;
    #private;
}
import { AnnotationEditor } from "./editor.js";
export { fitCurve };
