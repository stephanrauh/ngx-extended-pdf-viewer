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
    filterFactory?: object | null | undefined;
    /**
     * Page foreground/background colors for HCM (optional).
     */
    pageColors?: object | null | undefined;
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
 * @property {object | null} [filterFactory]
 *   Filter factory used to style selections (optional).
 * @property {object | null} [pageColors]
 *   Page foreground/background colors for HCM (optional).
 */
/**
 * @typedef {object} DrawLayerBuilderRenderOptions
 * @property {string} [intent] - The default value is "display".
 */
export class DrawLayerBuilder {
    /**
     * @param {DrawLayerBuilderOptions} options
     *   Configuration.
     */
    constructor(options: DrawLayerBuilderOptions);
    pageIndex: number;
    textLayer: Element | null;
    filterFactory: object | null;
    pageColors: object | null;
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
