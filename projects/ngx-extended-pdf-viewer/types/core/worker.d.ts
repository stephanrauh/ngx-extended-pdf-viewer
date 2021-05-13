export class WorkerMessageHandler {
    static setup(handler: any, port: any): void;
    static createDocumentHandler(docParams: any, port: any): string;
    static initializeFromPort(port: any): void;
}
export class WorkerTask {
    constructor(name: any);
    name: any;
    terminated: boolean;
    _capability: import("../shared/util.js").PromiseCapability;
    get finished(): Promise<any>;
    finish(): void;
    terminate(): void;
    ensureNotTerminated(): void;
}
