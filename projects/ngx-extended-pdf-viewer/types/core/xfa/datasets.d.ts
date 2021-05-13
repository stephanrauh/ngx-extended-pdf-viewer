export class DatasetsNamespace {
    static datasets(attributes: any): Datasets;
    static data(attributes: any): Data;
    static [$buildXFAObject](name: any, attributes: any): any;
}
declare class Datasets extends XFAObject {
    constructor(attributes: any);
    data: any;
    Signature: any;
}
declare class Data extends XmlObject {
    constructor(attributes: any);
}
import { $buildXFAObject } from "./namespaces.js";
import { XFAObject } from "./xfa_object.js";
import { XmlObject } from "./xfa_object.js";
export {};
