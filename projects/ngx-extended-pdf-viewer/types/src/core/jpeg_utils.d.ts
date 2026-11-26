export function findNextFileMarker(data: any, view: any, currentPos: any, startPos?: any): {
    invalid: any;
    marker: any;
    offset: any;
} | null;
export function getJpegImageInfo(data: any, colorTransform?: number): {
    width: number;
    height: number;
    exifStart: number;
    exifEnd: number;
} | null;
declare const JpegError_base: any;
export class JpegError extends JpegError_base {
    [x: string]: any;
    constructor(msg: any);
}
export function readDataBlock(data: any, view: any, offset: any): {
    appData: any;
    oldOffset: any;
    newOffset: any;
};
export {};
