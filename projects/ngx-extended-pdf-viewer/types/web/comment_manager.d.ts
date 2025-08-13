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
    }, overlayManager: any);
    open(uiManager: any, editor: any, position: any): Promise<void>;
    get _dialogWidth(): any;
    destroy(): void;
    #private;
}
