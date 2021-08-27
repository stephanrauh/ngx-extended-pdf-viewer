export type XfaLayerBuilderOptions = {
    pageDiv: HTMLDivElement;
    pdfPage: any;
    annotationStorage?: any;
};
/**
 * @implements IPDFXfaLayerFactory
 */
export class DefaultXfaLayerFactory implements IPDFXfaLayerFactory {
    /**
     * @param {HTMLDivElement} pageDiv
     * @param {PDFPage} pdfPage
     * @param {AnnotationStorage} [annotationStorage]
     * @param {Object} [xfaHtml]
     */
    createXfaLayerBuilder(pageDiv: HTMLDivElement, pdfPage: any, annotationStorage?: any, xfaHtml?: Object | undefined): XfaLayerBuilder;
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
    constructor({ pageDiv, pdfPage, xfaHtml, annotationStorage }: XfaLayerBuilderOptions);
    pageDiv: HTMLDivElement;
    pdfPage: any;
    xfaHtml: any;
    annotationStorage: any;
    div: HTMLDivElement | null;
    _cancelled: boolean;
    /**
     * @param {PageViewport} viewport
     * @param {string} intent (default value is 'display')
     * @returns {Promise<Object | void>} A promise that is resolved when rendering
     *   of the XFA layer is complete. The first rendering will return an object
     *   with a `textDivs` property that  can be used with the TextHighlighter.
     */
    render(viewport: any, intent?: string): Promise<Object | void>;
    cancel(): void;
    hide(): void;
}
