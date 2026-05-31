/**
 * Configuration for {@linkcode DrawLayerBuilder}.
 */
export type DrawLayerBuilderOptions = {
    /**
     *   Zero-based page index.
     */
    pageIndex: number;
    /**
     * Text layer element (optional).
     */
    textLayer?: Element | null | undefined;
    /**
     * Filter factory used to style selections (optional).
     */
    filterFactory?: Object | null | undefined;
    /**
     * Page foreground/background colors for HCM (optional).
     */
    pageColors?: Object | null | undefined;
};
export type DrawLayerBuilderRenderOptions = {
    /**
     * - The default value is "display".
     */
    intent?: string | undefined;
};
/**
 * @typedef DrawLayerBuilderOptions
 *   Configuration for {@linkcode DrawLayerBuilder}.
 * @property {number} pageIndex
 *   Zero-based page index.
 * @property {Element | null} [textLayer]
 *   Text layer element (optional).
 * @property {Object | null} [filterFactory]
 *   Filter factory used to style selections (optional).
 * @property {Object | null} [pageColors]
 *   Page foreground/background colors for HCM (optional).
 */
/**
 * @typedef {Object} DrawLayerBuilderRenderOptions
 * @property {string} [intent] - The default value is "display".
 */
export class DrawLayerBuilder {
    /**
     * @param {DrawLayerBuilderOptions} options
     *   Configuration.
     * @returns
     *   Instance.
     */
    constructor(options: DrawLayerBuilderOptions);
    pageIndex: number;
    textLayer: Element | null;
    filterFactory: Object | null;
    pageColors: Object | null;
    /**
     * @param {DrawLayerBuilderRenderOptions} options
     * @returns {Promise<void>}
     */
    render({ intent }: DrawLayerBuilderRenderOptions): Promise<void>;
    cancel(): void;
    _cancelled: boolean | undefined;
    setParent(parent: any): void;
    getDrawLayer(): null;
    #private;
}
