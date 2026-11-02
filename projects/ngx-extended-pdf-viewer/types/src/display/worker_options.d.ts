export class GlobalWorkerOptions {
    static #port: null;
    static #rendererPorts: any[];
    static #rendererSrc: string;
    static #src: string;
    /**
     * @param {Array<Worker>} val - Caller-owned workers, one document per worker.
     *   Uses `rendererSrc` when no supplied worker is available.
     */
    static set rendererPorts(val: Array<Worker>);
    /**
     * @type {Array<Worker>}
     */
    static get rendererPorts(): Array<Worker>;
    /**
     * @param {string} val - A string containing the path and
     *   filename of the renderer worker file.
     *
     *   NOTE: The `rendererSrc` option must be set in order to render pages in a
     *         worker thread, unless `rendererPorts` contains an unused worker;
     *         otherwise, rendering falls back to the main-thread.
     */
    static set rendererSrc(val: string);
    /**
     * @type {string}
     */
    static get rendererSrc(): string;
    /**
     * @param {Worker | null} val - Defines global port for worker process.
     *   Overrides the `workerSrc` option.
     */
    static set workerPort(val: Worker | null);
    /**
     * @type {Worker | null}
     */
    static get workerPort(): Worker | null;
    /**
     * @param {string} val - A string containing the path and filename of
     *   the worker file.
     *
     *   NOTE: The `workerSrc` option should always be set, in order to prevent
     *         any issues when using the PDF.js library.
     */
    static set workerSrc(val: string);
    /**
     * @type {string}
     */
    static get workerSrc(): string;
}
