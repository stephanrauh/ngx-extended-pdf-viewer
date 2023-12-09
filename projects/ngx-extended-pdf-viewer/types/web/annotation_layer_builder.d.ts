export type PDFPageProxy = import("../src/display/api").PDFPageProxy;
export type PageViewport = import("../src/display/display_utils").PageViewport;
export type AnnotationStorage = import("../src/display/annotation_storage").AnnotationStorage;
export type IDownloadManager = import("./interfaces").IDownloadManager;
export type IPDFLinkService = import("./interfaces").IPDFLinkService;
export type TextAccessibilityManager = import("./text_accessibility.js").TextAccessibilityManager;
export type AnnotationLayerBuilderOptions = {
    pageDiv: HTMLDivElement;
    pdfPage: PDFPageProxy;
    annotationStorage?: import("../src/display/annotation_storage").AnnotationStorage | undefined;
    /**
     * - Path for image resources, mainly
     * for annotation icons. Include trailing slash.
     */
    imageResourcesPath?: string | undefined;
    renderForms: boolean;
    linkService: IPDFLinkService;
    downloadManager?: import("./interfaces").IDownloadManager | undefined;
    enableScripting?: boolean | undefined;
    hasJSActionsPromise?: Promise<boolean> | undefined;
    fieldObjectsPromise?: Promise<{
        [x: string]: Object[];
    } | null> | undefined;
    annotationCanvasMap?: Map<string, HTMLCanvasElement> | undefined;
    accessibilityManager?: import("./text_accessibility.js").TextAccessibilityManager | undefined;
};
/**
 * @typedef {Object} AnnotationLayerBuilderOptions
 * @property {HTMLDivElement} pageDiv
 * @property {PDFPageProxy} pdfPage
 * @property {AnnotationStorage} [annotationStorage]
 * @property {string} [imageResourcesPath] - Path for image resources, mainly
 *   for annotation icons. Include trailing slash.
 * @property {boolean} renderForms
 * @property {IPDFLinkService} linkService
 * @property {IDownloadManager} [downloadManager]
 * @property {boolean} [enableScripting]
 * @property {Promise<boolean>} [hasJSActionsPromise]
 * @property {Promise<Object<string, Array<Object>> | null>}
 *   [fieldObjectsPromise]
 * @property {Map<string, HTMLCanvasElement>} [annotationCanvasMap]
 * @property {TextAccessibilityManager} [accessibilityManager]
 */
export class AnnotationLayerBuilder {
    /**
     * @param {AnnotationLayerBuilderOptions} options
     */
    constructor({ pageDiv, pdfPage, linkService, downloadManager, annotationStorage, imageResourcesPath, renderForms, enableScripting, hasJSActionsPromise, fieldObjectsPromise, annotationCanvasMap, accessibilityManager, }: AnnotationLayerBuilderOptions);
    pageDiv: HTMLDivElement;
    pdfPage: import("../src/display/api").PDFPageProxy;
    linkService: import("./interfaces").IPDFLinkService;
    downloadManager: import("./interfaces").IDownloadManager | undefined;
    imageResourcesPath: string;
    renderForms: boolean;
    annotationStorage: import("../src/display/annotation_storage").AnnotationStorage;
    enableScripting: boolean;
    _hasJSActionsPromise: Promise<boolean>;
    _fieldObjectsPromise: Promise<{
        [x: string]: Object[];
    } | null>;
    _annotationCanvasMap: Map<string, HTMLCanvasElement>;
    _accessibilityManager: import("./text_accessibility.js").TextAccessibilityManager;
    annotationLayer: AnnotationLayer | null;
    div: HTMLDivElement | null;
    _cancelled: boolean;
    _eventBus: any;
    /**
     * @param {PageViewport} viewport
     * @param {string} intent (default value is 'display')
     * @returns {Promise<void>} A promise that is resolved when rendering of the
     *   annotations is complete.
     */
    render(viewport: PageViewport, intent?: string): Promise<void>;
    cancel(): void;
    hide(): void;
    #private;
}
import { AnnotationLayer } from "../src/pdf";
