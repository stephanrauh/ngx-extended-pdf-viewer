export class StructTreePage {
    constructor(structTreeRoot: any, pageDict: any);
    root: any;
    xref: any;
    rootDict: any;
    pageDict: any;
    nodes: any[];
    /**
     * Collect all the objects (i.e. tag) that are part of the page and return a
     * map of the structure element id to the object reference.
     * @param {Ref} pageRef
     * @returns {Map<number, Ref>}
     */
    collectObjects(pageRef: Ref): Map<number, Ref>;
    parse(pageRef: any): void;
    addNode(dict: any, map: any, level?: number): any;
    addTopLevelNode(dict: any, element: any): boolean;
    /**
     * Convert the tree structure into a simplified object literal that can
     * be sent to the main thread.
     * @returns {Object}
     */
    get serializable(): Object;
}
export class StructTreeRoot {
    static canCreateStructureTree({ catalogRef, pdfManager, newAnnotationsByPage, }: {
        catalogRef: any;
        pdfManager: any;
        newAnnotationsByPage: any;
    }): Promise<boolean>;
    static createStructureTree({ newAnnotationsByPage, xref, catalogRef, pdfManager, changes, }: {
        newAnnotationsByPage: any;
        xref: any;
        catalogRef: any;
        pdfManager: any;
        changes: any;
    }): Promise<void>;
    static #writeKids({ newAnnotationsByPage, structTreeRootRef, structTreeRoot, kids, nums, xref, pdfManager, changes, cache, }: {
        newAnnotationsByPage: any;
        structTreeRootRef: any;
        structTreeRoot: any;
        kids: any;
        nums: any;
        xref: any;
        pdfManager: any;
        changes: any;
        cache: any;
    }): Promise<number>;
    static #writeProperties(tagDict: any, { type, title, lang, alt, expanded, actualText }: {
        type: any;
        title: any;
        lang: any;
        alt: any;
        expanded: any;
        actualText: any;
    }): void;
    static #collectParents({ elements, xref, pageDict, numberTree }: {
        elements: any;
        xref: any;
        pageDict: any;
        numberTree: any;
    }): void;
    static #updateParentTag({ structTreeParent, tagDict, newTagRef, structTreeRootRef, fallbackKids, xref, cache, }: {
        structTreeParent: any;
        tagDict: any;
        newTagRef: any;
        structTreeRootRef: any;
        fallbackKids: any;
        xref: any;
        cache: any;
    }): Promise<void>;
    constructor(xref: any, rootDict: any, rootRef: any);
    kidRefToPosition: undefined;
    parentTree: null;
    roleMap: Map<any, any>;
    structParentIds: null;
    xref: any;
    dict: any;
    ref: Ref | null;
    getKidPosition(kidRef: any): any;
    addAnnotationIdToPage(pageRef: any, id: any): void;
    canUpdateStructTree({ pdfManager, newAnnotationsByPage }: {
        pdfManager: any;
        newAnnotationsByPage: any;
    }): Promise<boolean>;
    updateStructureTree({ newAnnotationsByPage, pdfManager, changes }: {
        newAnnotationsByPage: any;
        pdfManager: any;
        changes: any;
    }): Promise<void>;
    #private;
}
import { Ref } from "./primitives.js";
