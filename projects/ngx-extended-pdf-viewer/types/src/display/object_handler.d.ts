export class ObjectHandler {
    constructor({ messageHandler, commonObjs, fontLoader, pageCache, pdfBug, shouldCreatePageObjs, }: {
        messageHandler: any;
        commonObjs: any;
        fontLoader: any;
        pageCache: any;
        pdfBug?: boolean | undefined;
        shouldCreatePageObjs?: boolean | undefined;
    });
    messageHandler: any;
    commonObjs: any;
    fontLoader: any;
    pageCache: any;
    pdfBug: boolean;
    shouldCreatePageObjs: boolean;
    resolveCommonObject(id: any, type: any, exportedData: any): any;
    /**
     * @returns {boolean} Whether the object was stored.
     */
    resolveObject(id: any, pageProxyId: any, type: any, exportedData: any): boolean;
}
