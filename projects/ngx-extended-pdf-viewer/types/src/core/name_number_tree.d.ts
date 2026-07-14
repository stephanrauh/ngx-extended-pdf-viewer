export class NameTree extends NameOrNumberTree {
    constructor(root: any, xref: any);
}
export class NumberTree extends NameOrNumberTree {
    constructor(root: any, xref: any);
}
/**
 * A NameTree/NumberTree is like a Dict but has some advantageous properties,
 * see the specification (7.9.6 and 7.9.7) for additional details.
 * TODO: implement all the Dict functions and make this more efficient.
 */
declare class NameOrNumberTree {
    constructor(root: any, xref: any, type: any);
    root: any;
    xref: any;
    _type: any;
    getAll(isRaw?: boolean): Map<any, any>;
    getRaw(key: any): any;
    get(key: any): any;
}
export {};
