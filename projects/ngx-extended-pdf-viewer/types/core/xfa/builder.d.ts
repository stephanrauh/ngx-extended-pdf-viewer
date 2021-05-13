export class Builder {
    _namespaceStack: any[];
    _namespacePrefixes: Map<any, any>;
    _namespaces: Map<any, any>;
    _nextNsId: number;
    _currentNamespace: UnknownNamespace;
    buildRoot(ids: any): Root;
    build({ nsPrefix, name, attributes, namespace, prefixes }: {
        nsPrefix: any;
        name: any;
        attributes: any;
        namespace: any;
        prefixes: any;
    }): any;
    _searchNamespace(nsName: any): any;
    _addNamespacePrefix(prefixes: any): void;
    _getNamespaceToUse(prefix: any): any;
    clean(data: any): void;
}
import { UnknownNamespace } from "./unknown.js";
declare class Root extends XFAObject {
    constructor(ids: any);
    element: any;
    [_ids]: any;
}
import { XFAObject } from "./xfa_object.js";
declare const _ids: unique symbol;
export {};
