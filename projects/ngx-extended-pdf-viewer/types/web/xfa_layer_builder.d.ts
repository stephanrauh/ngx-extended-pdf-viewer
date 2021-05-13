export type XfaLayerBuilderOptions = {
    pageDiv: HTMLDivElement;
    pdfPage: any;
};
/**
 * @implements IPDFXfaLayerFactory
 */
export class DefaultXfaLayerFactory {
    /**
     * @param {HTMLDivElement} pageDiv
     * @param {PDFPage} pdfPage
     */
    createXfaLayerBuilder(pageDiv: HTMLDivElement, pdfPage: any): XfaLayerBuilder;
}
/**
 * @typedef {Object} XfaLayerBuilderOptions
 * @property {HTMLDivElement} pageDiv
 * @property {PDFPage} pdfPage
 */
export class XfaLayerBuilder {
    /**
     * @param {XfaLayerBuilderOptions} options
     */
    constructor({ pageDiv, pdfPage }: XfaLayerBuilderOptions);
    pageDiv: HTMLDivElement;
    pdfPage: any;
    div: HTMLDivElement | null;
    _cancelled: boolean;
    /**
     * @param {PageViewport} viewport
     * @param {string} intent (default value is 'display')
     * @returns {Promise<void>} A promise that is resolved when rendering of the
     *   annotations is complete.
     */
    render(viewport: any, intent?: string): Promise<void>;
    cancel(): void;
    hide(): void;
}
