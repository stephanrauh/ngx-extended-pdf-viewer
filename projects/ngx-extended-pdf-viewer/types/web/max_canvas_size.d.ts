export class MaxCanvasSize {
    static maxWidth: null;
    static maxHeight: null;
    static maxArea: null;
    static determineMaxArea(): Promise<4096 | null>;
    static determineMaxWidth(): Promise<null>;
    static determineMaxHeight(): Promise<null>;
    static determineMaxDimensions(): Promise<null>;
    static reduceToMaxCanvasSize(width: any, height: any): Promise<number>;
}
