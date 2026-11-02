export class BaseCanvasFactory {
    constructor({ enableHWA }: {
        enableHWA?: boolean | undefined;
    });
    create(width: any, height: any): {
        canvas: void;
        context: any;
    };
    reset({ canvas }: {
        canvas: any;
    }, width: any, height: any): void;
    destroy(canvasAndContext: any): void;
    getNoAlphaContext(canvas: any): any;
    /**
     * @ignore
     */
    _createCanvas(width: any, height: any): void;
    #private;
}
