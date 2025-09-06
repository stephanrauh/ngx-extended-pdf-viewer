export class CommentManager {
    constructor({ dialog, toolbar, actions, menu, editMenuItem, deleteMenuItem, closeButton, textInput, textView, cancelButton, saveButton, }: {
        dialog: any;
        toolbar: any;
        actions: any;
        menu: any;
        editMenuItem: any;
        deleteMenuItem: any;
        closeButton: any;
        textInput: any;
        textView: any;
        cancelButton: any;
        saveButton: any;
    }, sidebar: any, eventBus: any, linkService: any, overlayManager: any);
    showSidebar(annotations: any): void;
    hideSidebar(): void;
    removeComments(ids: any): void;
    selectComment(id: any): void;
    addComment(annotation: any): void;
    open(uiManager: any, editor: any, position: any): Promise<void>;
    get _dialogWidth(): any;
    destroy(): void;
    #private;
}
