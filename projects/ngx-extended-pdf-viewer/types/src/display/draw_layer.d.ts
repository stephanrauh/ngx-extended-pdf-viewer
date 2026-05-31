/**
 * Configuration for {@linkcode DrawLayer}.
 */
export type DrawLayerOptions = {
    /**
     * Filter factory used to style selections (optional).
     */
    filterFactory?: Object | null | undefined;
    /**
     * Page foreground/background colors for HCM (optional).
     */
    pageColors?: Object | null | undefined;
    /**
     *   Zero-based page index.
     */
    pageIndex: number;
    /**
     * Text layer element (optional).
     */
    textLayer?: Element | null | undefined;
};
/**
 * Result of {@linkcode normalizeEdgeBoundary}.
 */
export type EdgeBoundaryResult = {
    /**
     *   Normalized container.
     */
    container: Node;
    /**
     *   Normalized offset.
     */
    offset: number;
};
/**
 * Result of {@linkcode SelectionRotator}.
 */
export type SelectionRotatorResult = {
    /**
     *   Rotated X coordinate.
     */
    x: number;
    /**
     *   Rotated Y coordinate.
     */
    y: number;
    /**
     *   Rotated width.
     */
    width: number;
    /**
     *   Rotated height.
     */
    height: number;
};
/**
 * Rotate the coordinates of a rectangle according to the position of the
 * text layer in the viewport.
 */
export type SelectionRotator = (x: number, y: number, width: number, height: number) => SelectionRotatorResult;
/**
 * Data related to the selection for a text layer.
 */
export type TextLayerSelectionData = {
    /**
     *   Draw layer associated with the text layer.
     */
    drawLayer: DrawLayer;
    /**
     * Node (SVG path element) used to draw the selection.
     */
    path?: SVGPathElement | null | undefined;
    /**
     * Node (div element) used to display the selection.
     */
    selectionDiv?: HTMLDivElement | null | undefined;
};
/**
 * Manage the SVGs drawn on top of the page canvas.
 * It's important to have them directly on top of the canvas because we want to
 * be able to use mix-blend-mode for some of them.
 */
export class DrawLayer {
    static #id: number;
    static #selectionId: number;
    /** @type {AbortController | null} */
    static #selectionChangeAC: AbortController | null;
    /** @type {Set<HTMLDivElement>} */
    static #selections: Set<HTMLDivElement>;
    /** @type {boolean} */
    static #isSelecting: boolean;
    /** @type {Set<Element>} */
    static #textLayerSet: Set<Element>;
    /** @type {WeakMap<Element, TextLayerSelectionData>} */
    static #textLayers: WeakMap<Element, TextLayerSelectionData>;
    /**
     * Clean up the selection for a text layer.
     *
     * @param {Element} textLayer
     *   Text layer.
     * @returns {undefined}
     *   Nothing.
     */
    static #cleanupTextLayerSelection(textLayer: Element): undefined;
    /**
     * @returns {boolean}
     *   Whether there is a non-collapsed document selection.
     */
    static #hasSelection(): boolean;
    /**
     * @returns {Array<Element>}
     *   Connected text layers sorted in document order.
     */
    static #getOrderedTextLayers(): Array<Element>;
    /**
     * Handle `selectionchange` to update the selection display for text layers.
     * We want to display the selection in a separate layer on top of the text
     * layer because the text layer has `mix-blend-mode: multiply` and we want
     * the selection to have a different blend mode.
     *
     * @returns {undefined}
     *   Nothing.
     */
    static #selectionChange(): undefined;
    static get _svgFactory(): any;
    static #setBox(element: any, [x, y, width, height]: [any, any, any, any]): void;
    /**
     * @param {DrawLayerOptions} options
     *   Configuration.
     * @returns
     *   Instance.
     */
    constructor({ filterFactory, pageColors, pageIndex, textLayer, }: DrawLayerOptions);
    pageIndex: number;
    setParent(parent: any): void;
    draw(properties: any, isPathUpdatable?: boolean, hasClip?: boolean): {
        id: number;
        clipPathId: string;
    };
    drawOutline(properties: any, mustRemoveSelfIntersections: any): number;
    finalizeDraw(id: any, properties: any): void;
    updateProperties(elementOrId: any, properties: any): void;
    updateParent(id: any, layer: any): void;
    remove(id: any): void;
    destroy(): void;
    #private;
}
