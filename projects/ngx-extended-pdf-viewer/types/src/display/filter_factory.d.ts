export class BaseFilterFactory {
    addFilter(maps: any): string;
    addHCMFilter(fgColor: any, bgColor: any): string;
    addAlphaFilter(map: any): string;
    addLuminosityFilter(map: any): string;
    addKnockoutFilter(alpha?: number): string;
    addHighlightHCMFilter(filterName: any, fgColor: any, bgColor: any, newFgColor: any, newBgColor: any): string;
    /**
     * Create a filter for the selection of text, given colors.
     * @param {string} fgColor
     * @param {string} bgColor
     * @returns {string}
     */
    addSelectionHCMFilter(fgColor: string, bgColor: string): string;
    /**
     * Create a filter for the selection of text.
     * @returns {string}
     */
    addSelectionFilter(): string;
    /**
     * @param {object} [pageColors]
     * @param {string} [pageColors.background]
     * @param {string} [pageColors.foreground]
     * @returns {Record<string, string> | null}
     */
    createSelectionStyle(pageColors?: {
        background?: string | undefined;
        foreground?: string | undefined;
    }): Record<string, string> | null;
    destroy(keepHCM?: boolean): void;
}
