export class Comment {
    constructor(editor: any);
    toolbar: any;
    render(): HTMLButtonElement | null;
    edit(): void;
    finish(): void;
    isDeleted(): boolean;
    hasBeenEdited(): boolean;
    serialize(): {
        text: null;
        date: null;
        deleted: boolean;
    };
    /**
     * Set the comment data.
     */
    set data(text: {
        text: null;
        date: null;
        deleted: boolean;
    });
    get data(): {
        text: null;
        date: null;
        deleted: boolean;
    };
    setInitialText(text: any): void;
    toggle(enabled?: boolean): void;
    shown(): void;
    destroy(): void;
    #private;
}
