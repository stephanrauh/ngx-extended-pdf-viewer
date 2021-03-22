export const $appendChild: unique symbol;
export const $childrenToHTML: unique symbol;
export const $clean: unique symbol;
export const $cleanup: unique symbol;
export const $clone: unique symbol;
export const $consumed: unique symbol;
export const $content: unique symbol;
export const $data: unique symbol;
export const $dump: unique symbol;
export const $extra: unique symbol;
export const $finalize: unique symbol;
export const $getAttributeIt: unique symbol;
export const $getChildren: unique symbol;
export const $getChildrenByClass: unique symbol;
export const $getChildrenByName: unique symbol;
export const $getChildrenByNameIt: unique symbol;
export const $getParent: unique symbol;
export const $getRealChildrenByNameIt: unique symbol;
export const $global: unique symbol;
export const $hasItem: unique symbol;
export const $hasSettableValue: unique symbol;
export const $indexOf: unique symbol;
export const $insertAt: unique symbol;
export const $isDataValue: unique symbol;
export const $isDescendent: unique symbol;
export const $isTransparent: unique symbol;
export const $namespaceId: unique symbol;
export const $nodeName: unique symbol;
export const $nsAttributes: unique symbol;
export const $onChild: unique symbol;
export const $onChildCheck: unique symbol;
export const $onText: unique symbol;
export const $removeChild: unique symbol;
export const $resolvePrototypes: unique symbol;
export const $setId: unique symbol;
export const $setSetAttributes: unique symbol;
export const $setValue: unique symbol;
export const $text: unique symbol;
export const $toHTML: unique symbol;
export const $uid: unique symbol;
export class ContentObject extends XFAObject {
    constructor(nsId: any, name: any);
}
export class IntegerObject extends ContentObject {
    constructor(nsId: any, name: any, defaultValue: any, validator: any);
    [_defaultValue]: any;
    [_validator]: any;
}
export class Option01 extends IntegerObject {
    constructor(nsId: any, name: any);
}
export class Option10 extends IntegerObject {
    constructor(nsId: any, name: any);
}
export class OptionObject extends ContentObject {
    constructor(nsId: any, name: any, options: any);
    [_options]: any;
}
export class StringObject extends ContentObject {
}
export class XFAAttribute {
    constructor(node: any, name: any, value: any);
    [$getParent](): any;
    [$isDataValue](): boolean;
    [$text](): any;
    [$isDescendent](parent: any): any;
    [_parent]: any;
    [$nodeName]: any;
    [$content]: any;
    [$consumed]: boolean;
}
export class XFAObject {
    static [_cloneAttribute](obj: any): any;
    constructor(nsId: any, name: any, hasChildren?: boolean);
    use: string | undefined;
    [$onChild](child: any): boolean;
    [$onChildCheck](child: any): boolean;
    [$setId](ids: any): void;
    [$appendChild](child: any): void;
    [$removeChild](child: any): void;
    [$hasSettableValue](): boolean;
    [$setValue](_: any): void;
    [$onText](_: any): void;
    [$finalize](): void;
    [$clean](builder: any): void;
    [$hasItem](): boolean;
    [$indexOf](child: any): any;
    [$insertAt](i: any, child: any): void;
    [$isTransparent](): boolean;
    [$lastAttribute](): string;
    [$text](): any;
    get [_attributeNames](): any;
    [$isDescendent](parent: any): boolean;
    [$getParent](): any;
    [$getChildren](name?: any): any;
    [$getChildren](name?: any): any;
    [$dump](): any;
    [$toHTML](): null;
    [$childrenToHTML]({ filter, include }: {
        filter?: any;
        include?: boolean | undefined;
    }): any[];
    [$setSetAttributes](attributes: any): void;
    /**
     * Get attribute names which have been set in the proto but not in this.
     */
    [_getUnsetAttributes](protoAttributes: any): any[];
    /**
     * Update the node with properties coming from a prototype and apply
     * this function recursivly to all children.
     */
    [$resolvePrototypes](ids: any, ancestors?: Set<any>): void;
    [_getPrototype](ids: any, ancestors: any): any;
    [_applyPrototype](proto: any, ids: any, ancestors: any): void;
    [$clone](): any;
    [$getChildrenByClass](name: any): any;
    [$getChildrenByName](name: any, allTransparent: any, first?: boolean): any[];
    [$getChildrenByNameIt](name: any, allTransparent: any, first?: boolean): Generator<any, void, any>;
    [$namespaceId]: any;
    [$nodeName]: any;
    [_hasChildren]: boolean;
    [_parent]: any;
    [_children]: any[];
    [$uid]: string;
    [_setAttributes]: Set<string> | undefined;
    [$content]: any;
}
export class XFAObjectArray {
    constructor(max?: number);
    push(child: any): boolean;
    isEmpty(): boolean;
    dump(): any;
    get children(): any[];
    clear(): void;
    [$clone](): XFAObjectArray;
    [_max]: number;
    [_children]: any[];
}
export class XmlObject extends XFAObject {
    constructor(nsId: any, name: any, attributes?: {});
    [$getAttributeIt](name: any, skipConsumed: any): Generator<any, void, any>;
    [$getRealChildrenByNameIt](name: any, allTransparent: any, skipConsumed: any): Generator<any, void, any>;
    [$isDataValue](): boolean | null;
    [_dataValue]: boolean | null;
    [_attributes]: Map<any, any>;
    [$consumed]: boolean;
}
declare const _defaultValue: unique symbol;
declare const _validator: unique symbol;
declare const _options: unique symbol;
declare const _parent: unique symbol;
declare const $lastAttribute: unique symbol;
declare const _attributeNames: unique symbol;
declare const _getUnsetAttributes: unique symbol;
declare const _getPrototype: unique symbol;
declare const _applyPrototype: unique symbol;
declare const _hasChildren: unique symbol;
declare const _children: unique symbol;
declare const _setAttributes: unique symbol;
declare const _cloneAttribute: unique symbol;
declare const _max: unique symbol;
declare const _dataValue: unique symbol;
declare const _attributes: unique symbol;
export {};
