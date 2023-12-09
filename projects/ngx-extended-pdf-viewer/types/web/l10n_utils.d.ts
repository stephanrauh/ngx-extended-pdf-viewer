export type IL10n = import("./interfaces").IL10n;
export namespace NullL10n {
    function getLanguage(): any;
    function getDirection(): any;
    function get(ids: any, args: null | undefined, fallback: any): Promise<any>;
    function translate(element: any): Promise<any>;
    function pause(): any;
    function resume(): any;
}
