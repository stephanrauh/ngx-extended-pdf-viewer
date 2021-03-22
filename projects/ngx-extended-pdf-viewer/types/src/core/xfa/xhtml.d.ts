export class XhtmlNamespace {
    static a(attributes: any): A;
    static b(attributes: any): B;
    static body(attributes: any): Body;
    static br(attributes: any): Br;
    static html(attributes: any): Html;
    static i(attributes: any): I;
    static li(attributes: any): Li;
    static ol(attributes: any): Ol;
    static p(attributes: any): P;
    static span(attributes: any): Span;
    static sub(attributes: any): Sub;
    static sup(attributes: any): Sup;
    static ul(attributes: any): Ul;
    static [$buildXFAObject](name: any, attributes: any): any;
}
declare class A extends XmlObject {
    constructor(attributes: any);
    href: any;
    style: any;
}
declare class B extends XmlObject {
    constructor(attributes: any);
    style: any;
}
declare class Body extends XmlObject {
    constructor(attributes: any);
    style: any;
}
declare class Br extends XmlObject {
    constructor(attributes: any);
    style: any;
}
declare class Html extends XmlObject {
    constructor(attributes: any);
    style: any;
}
declare class I extends XmlObject {
    constructor(attributes: any);
    style: any;
}
declare class Li extends XmlObject {
    constructor(attributes: any);
    style: any;
}
declare class Ol extends XmlObject {
    constructor(attributes: any);
    style: any;
}
declare class P extends XmlObject {
    constructor(attributes: any);
    style: any;
}
declare class Span extends XmlObject {
    constructor(attributes: any);
    style: any;
}
declare class Sub extends XmlObject {
    constructor(attributes: any);
    style: any;
}
declare class Sup extends XmlObject {
    constructor(attributes: any);
    style: any;
}
declare class Ul extends XmlObject {
    constructor(attributes: any);
    style: any;
}
import { $buildXFAObject } from "./namespaces.js";
import { XmlObject } from "./xfa_object.js";
export {};
