export type XfaLayerBuilderOptions = {
    pageDiv: HTMLDivElement;
    pdfPage: any;
    annotationStorage?: any;
};
/**
 * @implements IPDFXfaLayerFactory
 */
export class DefaultXfaLayerFactory {
    /**
     * @param {HTMLDivElement} pageDiv
     * @param {PDFPage} pdfPage
     * @param {AnnotationStorage} [annotationStorage]
     */
    createXfaLayerBuilder(pageDiv: HTMLDivElement, pdfPage: any, annotationStorage?: any): XfaLayerBuilder;
}
/**
 * @typedef {Object} XfaLayerBuilderOptions
 * @property {HTMLDivElement} pageDiv
 * @property {PDFPage} pdfPage
 * @property {AnnotationStorage} [annotationStorage]
 */
export class XfaLayerBuilder {
    /**
     * @param {XfaLayerBuilderOptions} options
     */
    constructor({ pageDiv, pdfPage, annotationStorage }: XfaLayerBuilderOptions);
    pageDiv: HTMLDivElement;
    pdfPage: any;
    annotationStorage: any;
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
