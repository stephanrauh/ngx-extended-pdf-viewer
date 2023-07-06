export type PDFPageProxy = import("./api").PDFPageProxy;
export type PageViewport = import("./display_utils").PageViewport;
export type IDownloadManager = any;
export type IPDFLinkService = import("../../web/interfaces").IPDFLinkService;
export type AnnotationElementParameters = {
    data: Object;
    layer: HTMLDivElement;
    linkService: IPDFLinkService;
    downloadManager: any;
    annotationStorage?: AnnotationStorage | undefined;
    /**
     * - Path for image resources, mainly
     * for annotation icons. Include trailing slash.
     */
    imageResourcesPath?: string | undefined;
    renderForms: boolean;
    svgFactory: Object;
    enableScripting?: boolean | undefined;
    hasJSActions?: boolean | undefined;
    fieldObjects?: Object | undefined;
};
export type AnnotationLayerParameters = {
    viewport: PageViewport;
    div: HTMLDivElement;
    annotations: any[];
    page: PDFPageProxy;
    linkService: IPDFLinkService;
    downloadManager: any;
    annotationStorage?: AnnotationStorage | undefined;
    /**
     * - Path for image resources, mainly
     * for annotation icons. Include trailing slash.
     */
    imageResourcesPath?: string | undefined;
    renderForms: boolean;
    /**
     * - Enable embedded script execution.
     */
    enableScripting?: boolean | undefined;
    /**
     * - Some fields have JS actions.
     * The default value is `false`.
     */
    hasJSActions?: boolean | undefined;
    fieldObjects?: {
        [x: string]: Object[];
    } | null | undefined;
    annotationCanvasMap?: Map<string, HTMLCanvasElement> | undefined;
    accessibilityManager?: any;
};
/**
 * @typedef {Object} AnnotationLayerParameters
 * @property {PageViewport} viewport
 * @property {HTMLDivElement} div
 * @property {Array} annotations
 * @property {PDFPageProxy} page
 * @property {IPDFLinkService} linkService
 * @property {IDownloadManager} downloadManager
 * @property {AnnotationStorage} [annotationStorage]
 * @property {string} [imageResourcesPath] - Path for image resources, mainly
 *   for annotation icons. Include trailing slash.
 * @property {boolean} renderForms
 * @property {boolean} [enableScripting] - Enable embedded script execution.
 * @property {boolean} [hasJSActions] - Some fields have JS actions.
 *   The default value is `false`.
 * @property {Object<string, Array<Object>> | null} [fieldObjects]
 * @property {Map<string, HTMLCanvasElement>} [annotationCanvasMap]
 * @property {TextAccessibilityManager} [accessibilityManager]
 */
/**
 * Manage the layer containing all the annotations.
 */
export class AnnotationLayer {
    constructor({ div, accessibilityManager, annotationCanvasMap, l10n, page, viewport, }: {
        div: any;
        accessibilityManager: any;
        annotationCanvasMap: any;
        l10n: any;
        page: any;
        viewport: any;
    });
    div: any;
    l10n: any;
    page: any;
    viewport: any;
    zIndex: number;
    popupShow: any[] | undefined;
    /**
     * Render a new annotation layer with all annotation elements.
     *
     * @param {AnnotationLayerParameters} params
     * @memberof AnnotationLayer
     */
    render(params: AnnotationLayerParameters): Promise<void>;
    /**
     * Update the annotation elements on existing annotation layer.
     *
     * @param {AnnotationLayerParameters} viewport
     * @memberof AnnotationLayer
     */
    update({ viewport }: AnnotationLayerParameters): void;
    getEditableAnnotations(): any[];
    getEditableAnnotation(id: any): any;
    #private;
}
export class FreeTextAnnotationElement extends AnnotationElement {
    constructor(parameters: any);
    textContent: any;
    annotationEditorType: number;
    render(): HTMLElement | undefined;
}
export class InkAnnotationElement extends AnnotationElement {
    constructor(parameters: any);
    containerClassName: string;
    svgElementName: string;
    annotationEditorType: number;
    render(): HTMLElement | undefined;
    getElementsToTriggerPopup(): any[];
    #private;
}
import { AnnotationStorage } from "./annotation_storage.js";
declare class AnnotationElement {
    constructor(parameters: any, { isRenderable, ignoreBorder, createQuadrilaterals, }?: {
        isRenderable?: boolean | undefined;
        ignoreBorder?: boolean | undefined;
        createQuadrilaterals?: boolean | undefined;
    });
    isRenderable: boolean;
    data: any;
    layer: any;
    linkService: any;
    downloadManager: any;
    imageResourcesPath: any;
    renderForms: any;
    svgFactory: any;
    annotationStorage: any;
    enableScripting: any;
    hasJSActions: any;
    _fieldObjects: any;
    parent: any;
    container: HTMLElement | undefined;
    quadrilaterals: HTMLElement[] | undefined;
    /**
     * Create an empty container for the annotation's HTML element.
     *
     * @private
     * @param {boolean} ignoreBorder
     * @memberof AnnotationElement
     * @returns {HTMLElement} A section element.
     */
    private _createContainer;
    setRotation(angle: any, container?: HTMLElement | undefined): void;
    get _commonActions(): any;
    _dispatchEventFromSandbox(actions: any, jsEvent: any): void;
    _setDefaultPropertiesFromJS(element: any): void;
    /**
     * Create quadrilaterals from the annotation's quadpoints.
     *
     * @private
     * @param {boolean} ignoreBorder
     * @memberof AnnotationElement
     * @returns {Array<HTMLElement>} An array of section elements.
     */
    private _createQuadrilaterals;
    firstQuadRect: any;
    /**
     * Create a popup for the annotation's HTML element. This is used for
     * annotations that do not have a Popup entry in the dictionary, but
     * are of a type that works with popups (such as Highlight annotations).
     *
     * @private
     * @memberof AnnotationElement
     */
    private _createPopup;
    /**
     * Render the quadrilaterals of the annotation.
     *
     * @private
     * @param {string} className
     * @memberof AnnotationElement
     * @returns {Array<HTMLElement>} An array of section elements.
     */
    private _renderQuadrilaterals;
    /**
     * Render the annotation's HTML element(s).
     *
     * @public
     * @memberof AnnotationElement
     * @returns {HTMLElement|Array<HTMLElement>|undefined} A section element or
     *   an array of section elements.
     */
    public render(): HTMLElement | Array<HTMLElement> | undefined;
    /**
     * @private
     * @returns {Array}
     */
    private _getElementsByName;
    show(): void;
    hide(): void;
    getElementsToTriggerPopup(): HTMLElement | HTMLElement[] | undefined;
    addHighlightArea(): void;
}
export {};
