export type PDFPageProxy = import("../src/display/api").PDFPageProxy;
export type StructTreeLayerBuilderOptions = {
    pdfPage: PDFPageProxy;
    rawDims: Object;
};
/**
 * @typedef {Object} StructTreeLayerBuilderOptions
 * @property {PDFPageProxy} pdfPage
 * @property {Object} rawDims
 */
export class StructTreeLayerBuilder {
    /**
     * @param {StructTreeLayerBuilderOptions} options
     */
    constructor(pdfPage: any, rawDims: any);
    /**
     * @returns {Promise<void>}
     */
    render(): Promise<void>;
    /**
     * @param {string} annotationId
     * @param {Object} [options]
     * @param {boolean} [options.enableLinkOwnership]
     * @returns {Promise<Map<string, string>|null|undefined>}
     */
    getAriaAttributes(annotationId: string, { enableLinkOwnership }?: {
        enableLinkOwnership?: boolean | undefined;
    }): Promise<Map<string, string> | null | undefined>;
    /**
     * Get the ids of annotations owned by the structure tree.
     * @returns {Promise<Set<string>|null>}
     */
    getAnnotationIds(): Promise<Set<string> | null>;
    hide(): void;
    show(): void;
    updateTextLayer(): void;
    #private;
}
