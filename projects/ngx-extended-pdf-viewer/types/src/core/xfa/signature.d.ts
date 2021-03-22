export class SignatureNamespace {
    static signature(attributes: any): Signature;
    static [$buildXFAObject](name: any, attributes: any): any;
}
declare class Signature extends XFAObject {
    constructor(attributes: any);
}
import { $buildXFAObject } from "./namespaces.js";
import { XFAObject } from "./xfa_object.js";
export {};
