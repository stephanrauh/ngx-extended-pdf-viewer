export type IL10n = import("./interfaces.js").IL10n;
export type PDFDocumentProxy = import("../src/display/api.js").PDFDocumentProxy;
export type PDFDocumentLoadingTask = import("../src/display/api.js").PDFDocumentLoadingTask;
export namespace PDFViewerApplication {
    export { printPdf };
    export { PDFPrintServiceFactory };
    export let ngxConsole: NgxConsole;
    export { ServiceWorkerOptions as serviceWorkerOptions };
}
import { NgxConsole } from "../external/ngx-logger/ngx-console.js";
declare namespace ServiceWorkerOptions {
    let showUnverifiedSignatures: boolean;
}
export {};
