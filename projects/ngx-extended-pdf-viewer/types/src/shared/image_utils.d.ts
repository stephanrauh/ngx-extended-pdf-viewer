export function convertBlackAndWhiteToRGBA({ src, srcPos, dest, width, height, nonBlackColor, inverseDecode, }: {
    src: any;
    srcPos?: number | undefined;
    dest: any;
    width: any;
    height: any;
    nonBlackColor?: number | undefined;
    inverseDecode?: boolean | undefined;
}): {
    srcPos: number;
    destPos: number;
};
export function convertRGBToRGBA({ src, srcPos, dest, destPos, width, height, }: {
    src: any;
    srcPos?: number | undefined;
    dest: any;
    destPos?: number | undefined;
    width: any;
    height: any;
}): {
    srcPos: number;
    destPos: number;
};
export function convertToRGBA(params: any): {
    srcPos: number;
    destPos: number;
} | null;
export function grayToRGBA(src: any, dest: any): void;
