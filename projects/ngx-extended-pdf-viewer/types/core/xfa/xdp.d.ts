export class XdpNamespace {
    static xdp(attributes: any): Xdp;
    static [$buildXFAObject](name: any, attributes: any): any;
}
declare class Xdp extends XFAObject {
    constructor(attributes: any);
    uuid: any;
    timeStamp: any;
    config: any;
    connectionSet: any;
    datasets: any;
    localeSet: any;
    stylesheet: XFAObjectArray;
    template: any;
}
import { $buildXFAObject } from "./namespaces.js";
import { XFAObject } from "./xfa_object.js";
import { XFAObjectArray } from "./xfa_object.js";
export {};
