export type PDFPageProxy = import("../src/display/api").PDFPageProxy;
export type AnnotationStorage = import("../src/display/annotation_storage").AnnotationStorage;
export type PageViewport = import("../src/display/page_viewport").PageViewport;
export type PDFLinkService = import("./pdf_link_service.js").PDFLinkService;
export type XfaLayerBuilderOptions = {
    pdfPage: PDFPageProxy;
    annotationStorage?: import("../src/display/annotation_storage").AnnotationStorage | undefined;
    linkService: PDFLinkService;
    xfaHtml?: object | undefined;
};
export type XfaLayerBuilderRenderOptions = {
    viewport: PageViewport;
    /**
     * - The default value is "display".
     */
    intent?: string | undefined;
};
/**
 * @typedef {object} XfaLayerBuilderOptions
 * @property {PDFPageProxy} pdfPage
 * @property {AnnotationStorage} [annotationStorage]
 * @property {PDFLinkService} linkService
 * @property {object} [xfaHtml]
 */
/**
 * @typedef {object} XfaLayerBuilderRenderOptions
 * @property {PageViewport} viewport
 * @property {string} [intent] - The default value is "display".
 */
export class XfaLayerBuilder {
    /**
     * @param {XfaLayerBuilderOptions} options
     */
    constructor({ pdfPage, annotationStorage, linkService, xfaHtml, }: XfaLayerBuilderOptions);
    div: null;
    pdfPage: import("../src/display/api").PDFPageProxy;
    annotationStorage: import("../src/display/annotation_storage").AnnotationStorage;
    linkService: import("./pdf_link_service.js").PDFLinkService;
    xfaHtml: object;
    /**
     * @param {XfaLayerBuilderRenderOptions} viewport
     * @returns {Promise<object | void>} A promise that is resolved when rendering
     *   of the XFA layer is complete. The first rendering will return an object
     *   with a `textDivs` property that can be used with the TextHighlighter.
     */
    render({ viewport, intent }: XfaLayerBuilderRenderOptions): Promise<object | void>;
    cancel(): void;
    hide(): void;
    #private;
}
