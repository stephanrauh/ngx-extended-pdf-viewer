export class EditorToolbar {
    static #l10nRemove: null;
    static #pointerDown(e: any): void;
    constructor(editor: any);
    render(): HTMLDivElement;
    get div(): null;
    hide(): void;
    show(): void;
    addDeleteButton(): void;
    addAltText(altText: any): Promise<void>;
    addComment(comment: any): void;
    addColorPicker(colorPicker: any): void;
    addEditSignatureButton(signatureManager: any): Promise<void>;
    addButton(name: any, tool: any): Promise<void>;
    updateEditSignatureButton(description: any): void;
    remove(): void;
    #private;
}
export class FloatingToolbar {
    constructor(uiManager: any);
    show(parent: any, boxes: any, isLTR: any): void;
    hide(): void;
    #private;
}
