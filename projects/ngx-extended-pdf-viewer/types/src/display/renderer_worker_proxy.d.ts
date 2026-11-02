export type RendererWorkerParameters = {
    /**
     * - Caller-owned worker; never terminated here.
     */
    port?: Worker | undefined;
    /**
     * - Logging level from {@link VerbosityLevel}.
     */
    verbosity?: number | undefined;
    /**
     * - Allow hardware acceleration.
     */
    enableHWA?: boolean | undefined;
    /**
     * - Initialize WebGPU.
     */
    enableWebGPU?: boolean | undefined;
};
/**
 * @typedef {object} RendererWorkerParameters
 * @property {Worker} [port] - Caller-owned worker; never terminated here.
 * @property {number} [verbosity] - Logging level from {@link VerbosityLevel}.
 * @property {boolean} [enableHWA] - Allow hardware acceleration.
 * @property {boolean} [enableWebGPU] - Initialize WebGPU.
 */
/**
 * Manages a document's renderer worker and render tasks.
 * @param {RendererWorkerParameters} params
 */
export class RendererWorker {
    static #connectionId: number;
    static #usedPorts: WeakSet<object>;
    /**
     * Whether worker rendering is configured and browser prerequisites are met.
     * @type {boolean}
     */
    static get isAvailable(): boolean;
    /**
     * @param {object} params
     * @param {Array<Worker>} [params.ports] - Supplied workers; selects the first
     *   unused one.
     * @param {number} [params.verbosity] - Logging level.
     * @param {boolean} [params.enableHWA] - Allow hardware acceleration.
     * @param {boolean} [params.enableWebGPU] - Initialize WebGPU.
     * @returns {RendererWorker}
     */
    static create({ ports, ...params }?: {
        ports?: Worker[] | undefined;
        verbosity?: number | undefined;
        enableHWA?: boolean | undefined;
        enableWebGPU?: boolean | undefined;
    }): RendererWorker;
    constructor({ port, verbosity, enableHWA, enableWebGPU, cspPolicyService, }?: {
        port?: null | undefined;
        verbosity?: number | undefined;
        enableHWA?: boolean | undefined;
        enableWebGPU?: boolean | undefined;
        cspPolicyService?: null | undefined;
    });
    destroyed: boolean;
    verbosity: number;
    /**
     * Resolves when ready; rejects on failed or aborted startup.
     * @type {Promise<void>}
     */
    get promise(): Promise<void>;
    /**
     * The worker's message handler, or null.
     * @type {MessageHandler | null}
     */
    get messageHandler(): MessageHandler | null;
    /**
     * The supplied renderer worker, or `null`.
     * @type {Worker | null}
     */
    get port(): Worker | null;
    destroy(): void;
    /**
     * Send a request that rejects on worker destruction.
     * @returns {Promise<any>}
     */
    sendWithPromise(action: any, data: any): Promise<any>;
    sendCommonObj(id: any, type: any, data: any): void;
    sendObj(id: any, pageProxyId: any, type: any, data: any): void;
    cleanup(keepLoadedFonts: any): void;
    cleanupPage(pageProxyId: any): void;
    /**
     * @returns {WorkerRenderTask | null} Null to use main-thread rendering.
     */
    createRenderTask({ pageProxyId, operatorList, params, pageColors, canvasFactory, annotationCanvasMap, onFrame, onError, }: {
        pageProxyId: any;
        operatorList: any;
        params: any;
        pageColors: any;
        canvasFactory: any;
        annotationCanvasMap: any;
        onFrame: any;
        onError: any;
    }): WorkerRenderTask | null;
    #private;
}
import { MessageHandler } from "../shared/message_handler.js";
/**
 * Renders through the worker and draws returned frames.
 */
declare class WorkerRenderTask {
    constructor({ rendererWorker, renderTasks, canvas, canvasFactory, annotationCanvasMap, operatorListState, initParams, onFrame, onError, }: {
        rendererWorker: any;
        renderTasks: any;
        canvas: any;
        canvasFactory: any;
        annotationCanvasMap: any;
        operatorListState: any;
        initParams: any;
        onFrame: any;
        onError: any;
    });
    imageCoordinates: null;
    recordedBBoxes: null;
    /**
     * @returns {Promise<boolean>} False to use main-thread rendering.
     */
    initialize(transparency: any, optionalContentConfig: any): Promise<boolean>;
    /**
     * @returns {Promise<number>} The next operator index.
     */
    executeOperatorList(operatorList: any, operatorListIdx: any, operationsFilter: any): Promise<number>;
    cancel(): void;
    drawFrame(frame: any): void;
    #private;
}
export {};
