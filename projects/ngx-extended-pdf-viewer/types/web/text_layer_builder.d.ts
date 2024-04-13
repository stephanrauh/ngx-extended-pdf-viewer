export type PageViewport = import("../src/display/display_utils").PageViewport;
export type TextContent = import("../src/display/api").TextContent;
export type TextHighlighter = import("./text_highlighter").TextHighlighter;
export type TextAccessibilityManager = import("./text_accessibility.js").TextAccessibilityManager;
export type TextLayerBuilderOptions = {
    /**
     * - Optional object that will handle
     * highlighting text from the find controller.
     */
    highlighter: TextHighlighter;
    accessibilityManager?: import("./text_accessibility.js").TextAccessibilityManager | undefined;
    onAppend?: Function | undefined;
};
/**
 * @typedef {Object} TextLayerBuilderOptions
 * @property {TextHighlighter} highlighter - Optional object that will handle
 *   highlighting text from the find controller.
 * @property {TextAccessibilityManager} [accessibilityManager]
 * @property {function} [onAppend]
 */
/**
 * The text layer builder provides text selection functionality for the PDF.
 * It does this by creating overlay divs over the PDF's text. These divs
 * contain text that matches the PDF text they are overlaying.
 */
export class TextLayerBuilder {
    constructor({ highlighter, accessibilityManager, enablePermissions, onAppend, }: {
        highlighter?: null | undefined;
        accessibilityManager?: null | undefined;
        enablePermissions?: boolean | undefined;
        onAppend?: null | undefined;
    });
    textContentItemsStr: any[];
    renderingDone: boolean;
    textDivs: any[];
    textDivProperties: WeakMap<WeakKey, any>;
    textLayerRenderTask: import("../src/display/text_layer.js").TextLayerRenderTask | null;
    highlighter: any;
    accessibilityManager: any;
    div: HTMLDivElement;
    get numTextDivs(): number;
    /**
     * Renders the text layer.
     * @param {PageViewport} viewport
     */
    render(viewport: PageViewport): Promise<void>;
    hide(): void;
    show(): void;
    /**
     * Cancel rendering of the text layer.
     */
    cancel(): void;
    /**
     * @param {ReadableStream | TextContent} source
     */
    setTextContentSource(source: ReadableStream | TextContent): void;
    #private;
}
