export class CaretBrowsingMode {
    static "__#83@#caretPositionFromPoint"(x: any, y: any): CaretPosition | {
        offsetNode: any;
        offset: any;
    } | null;
    constructor(abortSignal: any, mainContainer: any, viewerContainer: any, toolbarContainer: any);
    /**
     * Move the caret in the given direction.
     * @param {boolean} isUp
     * @param {boolean} select
     */
    moveCaret(isUp: boolean, select: boolean): void;
    #private;
}
