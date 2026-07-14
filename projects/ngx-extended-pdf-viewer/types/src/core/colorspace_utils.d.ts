export class ColorSpaceUtils {
    static parse({ cs, xref, resources, pdfFunctionFactory, globalColorSpaceCache, localColorSpaceCache, asyncIfNotCached, }: {
        cs: any;
        xref: any;
        resources?: null | undefined;
        pdfFunctionFactory: any;
        globalColorSpaceCache: any;
        localColorSpaceCache: any;
        asyncIfNotCached?: boolean | undefined;
    }): any;
    /**
     * NOTE: This method should *only* be invoked from `this.#parse`,
     *       when parsing "sub" ColorSpaces.
     */
    static #subParse(cs: any, options: any): any;
    static #parse(cs: any, options: any): any;
    static get gray(): any;
    static get rgb(): any;
    static get rgba(): any;
    static get cmyk(): any;
}
