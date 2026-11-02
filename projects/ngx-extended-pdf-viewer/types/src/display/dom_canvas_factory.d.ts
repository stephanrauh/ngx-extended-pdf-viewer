export class DOMCanvasFactory extends BaseCanvasFactory {
    constructor({ ownerDocument, enableHWA }: {
        ownerDocument?: Document | undefined;
        enableHWA?: boolean | undefined;
    });
    _document: Document;
    /**
     * @ignore
     */
    _createCanvas(width: any, height: any): HTMLCanvasElement;
}
import { BaseCanvasFactory } from "./canvas_factory.js";
