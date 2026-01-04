export class EditorUndoBar {
    static "__#private@#l10nMessages": Readonly<{
        highlight: "pdfjs-editor-undo-bar-message-highlight";
        freetext: "pdfjs-editor-undo-bar-message-freetext";
        stamp: "pdfjs-editor-undo-bar-message-stamp";
        ink: "pdfjs-editor-undo-bar-message-ink";
        signature: "pdfjs-editor-undo-bar-message-signature";
        _multiple: "pdfjs-editor-undo-bar-message-multiple";
    }>;
    constructor({ container, message, undoButton, closeButton }: {
        container: any;
        message: any;
        undoButton: any;
        closeButton: any;
    }, eventBus: any);
    isOpen: boolean;
    destroy(): void;
    show(undoAction: any, messageData: any): void;
    hide(): void;
    #private;
}
