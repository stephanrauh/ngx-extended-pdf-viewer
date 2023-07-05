export type PDFDocumentProxy = import("../src/display/api").PDFDocumentProxy;
export type EventBus = import("./event_utils").EventBus;
export type IPDFLinkService = import("./interfaces").IPDFLinkService;
export type PDFFindControllerOptions = {
    /**
     * - The navigation/linking service.
     */
    linkService: IPDFLinkService;
    /**
     * - The application event bus.
     */
    eventBus: EventBus;
    /**
     * - True if the matches
     * count must be updated on progress or only when the last page is reached.
     * The default value is `true`.
     */
    updateMatchesCountOnProgress?: boolean | undefined;
};
export namespace FindState {
    const FOUND: number;
    const NOT_FOUND: number;
    const WRAPPED: number;
    const PENDING: number;
}
/**
 * @typedef {Object} PDFFindControllerOptions
 * @property {IPDFLinkService} linkService - The navigation/linking service.
 * @property {EventBus} eventBus - The application event bus.
 * @property {boolean} [updateMatchesCountOnProgress] - True if the matches
 *   count must be updated on progress or only when the last page is reached.
 *   The default value is `true`.
 */
/**
 * Provides search functionality to find a given string in a PDF document.
 */
export class PDFFindController {
    /**
     * @param {PDFFindControllerOptions} options
     */
    constructor({ linkService, eventBus, updateMatchesCountOnProgress, pageViewMode }: PDFFindControllerOptions);
    _linkService: import("./interfaces").IPDFLinkService;
    _eventBus: import("./event_utils").EventBus;
    _pageViewMode: any;
    /**
     * Callback used to check if a `pageNumber` is currently visible.
     * @type {function}
     */
    onIsPageVisible: Function;
    get highlightMatches(): boolean | undefined;
    get pageMatches(): any[] | undefined;
    get pageMatchesLength(): any[] | undefined;
    get selected(): {
        pageIdx: number;
        matchIdx: number;
    } | undefined;
    get state(): null;
    /**
     * Set a reference to the PDF document in order to search it.
     * Note that searching is not possible if this method is not called.
     *
     * @param {PDFDocumentProxy} pdfDocument - The PDF document to search.
     */
    setDocument(pdfDocument: PDFDocumentProxy): void;
    _pdfDocument: import("../src/display/api").PDFDocumentProxy | null | undefined;
    _dirtyMatch: boolean | undefined;
    _findTimeout: any;
    _highlightMatches: boolean | undefined;
    /**
     * @typedef {Object} PDFFindControllerScrollMatchIntoViewParams
     * @property {HTMLElement} element
     * @property {number} selectedLeft
     * @property {number} pageIndex
     * @property {number} matchIndex
     */
    /**
     * Scroll the current match into view.
     * @param {PDFFindControllerScrollMatchIntoViewParams}
     */
    scrollMatchIntoView({ element, selectedLeft, pageIndex, matchIndex, }: {
        element: HTMLElement;
        selectedLeft: number;
        pageIndex: number;
        matchIndex: number;
    }): void;
    _scrollMatches: boolean | undefined;
    _pageMatches: any[] | undefined;
    _pageMatchesLength: any[] | undefined;
    _selected: {
        pageIdx: number;
        matchIdx: number;
    } | undefined;
    _offset: {
        pageIdx: null;
        matchIdx: null;
        wrapped: boolean;
    } | undefined;
    _extractTextPromises: any[] | undefined;
    _pageContents: any[] | undefined;
    _pageDiffs: any[] | undefined;
    _hasDiacritics: any[] | undefined;
    _matchesCountTotal: number | undefined;
    _pagesToSearch: number | null | undefined;
    _pendingFindMatches: Set<any> | undefined;
    _resumePageIdx: any;
    _firstPageCapability: any;
    _rawQuery: any;
    #private;
}
