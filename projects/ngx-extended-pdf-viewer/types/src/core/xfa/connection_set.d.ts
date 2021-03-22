export class ConnectionSetNamespace {
    static connectionSet(attrs: any): ConnectionSet;
    static effectiveInputPolicy(attrs: any): EffectiveInputPolicy;
    static effectiveOutputPolicy(attrs: any): EffectiveOutputPolicy;
    static operation(attrs: any): Operation;
    static rootElement(attrs: any): RootElement;
    static soapAction(attrs: any): SoapAction;
    static soapAddress(attrs: any): SoapAddress;
    static uri(attrs: any): Uri;
    static wsdlAddress(attrs: any): WsdlAddress;
    static wsdlConnection(attrs: any): WsdlConnection;
    static xmlConnection(attrs: any): XmlConnection;
    static xsdConnection(attrs: any): XsdConnection;
    static [$buildXFAObject](name: any, attributes: any): any;
}
declare class ConnectionSet extends XFAObject {
    constructor(attributes: any);
    wsdlConnection: XFAObjectArray;
    xmlConnection: XFAObjectArray;
    xsdConnection: XFAObjectArray;
}
declare class EffectiveInputPolicy extends XFAObject {
    constructor(attributes: any);
    id: any;
    name: any;
    usehref: any;
}
declare class EffectiveOutputPolicy extends XFAObject {
    constructor(attributes: any);
    id: any;
    name: any;
    usehref: any;
}
declare class Operation extends StringObject {
    constructor(attributes: any);
    id: any;
    input: any;
    name: any;
    output: any;
    usehref: any;
}
declare class RootElement extends StringObject {
    constructor(attributes: any);
    id: any;
    name: any;
    usehref: any;
}
declare class SoapAction extends StringObject {
    constructor(attributes: any);
    id: any;
    name: any;
    usehref: any;
}
declare class SoapAddress extends StringObject {
    constructor(attributes: any);
    id: any;
    name: any;
    usehref: any;
}
declare class Uri extends StringObject {
    constructor(attributes: any);
    id: any;
    name: any;
    usehref: any;
}
declare class WsdlAddress extends StringObject {
    constructor(attributes: any);
    id: any;
    name: any;
    usehref: any;
}
declare class WsdlConnection extends XFAObject {
    constructor(attributes: any);
    dataDescription: any;
    name: any;
    effectiveInputPolicy: any;
    effectiveOutputPolicy: any;
    operation: any;
    soapAction: any;
    soapAddress: any;
    wsdlAddress: any;
}
declare class XmlConnection extends XFAObject {
    constructor(attributes: any);
    dataDescription: any;
    name: any;
    uri: any;
}
declare class XsdConnection extends XFAObject {
    constructor(attributes: any);
    dataDescription: any;
    name: any;
    rootElement: any;
    uri: any;
}
import { $buildXFAObject } from "./namespaces.js";
import { XFAObject } from "./xfa_object.js";
import { XFAObjectArray } from "./xfa_object.js";
import { StringObject } from "./xfa_object.js";
export {};
