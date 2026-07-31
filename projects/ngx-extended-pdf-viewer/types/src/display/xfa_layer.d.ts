export type AnnotationStorage = import("./annotation_storage").AnnotationStorage;
export type PageViewport = import("./display_utils").PageViewport;
export type PDFLinkService = import("../../web/pdf_link_service.js").PDFLinkService;
export type XfaLayerParameters = {
    viewport: PageViewport;
    div: HTMLDivElement;
    xfaHtml: Object;
    annotationStorage?: import("./annotation_storage").AnnotationStorage | undefined;
    linkService: PDFLinkService;
    /**
     * - (default value is 'display').
     */
    intent?: string | undefined;
};
export class XfaLayer {
    static get _allowedHtmlElements(): any;
    static get _allowedSvgElements(): any;
    static get _allowedRichTextElements(): any;
    static get _allowedRichTextAttributes(): any;
    static get _allowedRichTextStyles(): any;
    static setupStorage(html: any, id: any, element: any, storage: any, intent: any): void;
    static setAttributes({ html, element, storage, intent, linkService }: {
        html: any;
        element: any;
        storage?: null | undefined;
        intent: any;
        linkService: any;
    }): void;
    static "__#private@#createElement"(name: any, xmlns: any, intent: any): any;
    /**
     * Render the XFA layer.
     *
     * @param {XfaLayerParameters} parameters
     */
    static render(parameters: XfaLayerParameters): {
        textDivs: Text[];
    };
    /**
     * Update the XFA layer.
     *
     * @param {XfaLayerParameters} parameters
     */
    static update(parameters: XfaLayerParameters): void;
}
