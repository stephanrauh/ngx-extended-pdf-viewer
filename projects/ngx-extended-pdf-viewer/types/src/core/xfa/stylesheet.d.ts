export class StylesheetNamespace {
    static stylesheet(attributes: any): Stylesheet;
    static [$buildXFAObject](name: any, attributes: any): any;
}
declare class Stylesheet extends XFAObject {
    constructor(attributes: any);
}
import { $buildXFAObject } from "./namespaces.js";
import { XFAObject } from "./xfa_object.js";
export {};
