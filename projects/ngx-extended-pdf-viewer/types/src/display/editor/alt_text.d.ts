export class AltText {
    static _l10nPromise: null;
    static initialize(l10nPromise: any): void;
    constructor(editor: any);
    render(): Promise<HTMLButtonElement>;
    finish(): void;
    isEmpty(): boolean;
    /**
     * Set the alt text data.
     */
    set data({ altText, decorative }: {
        altText: string;
        decorative: boolean;
    });
    get data(): {
        altText: string;
        decorative: boolean;
    };
    toggle(enabled?: boolean): void;
    destroy(): void;
    #private;
}
