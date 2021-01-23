export function createDefaultAppearance({ fontSize, fontName, fontColor }: {
    fontSize: any;
    fontName: any;
    fontColor: any;
}): string;
export function parseDefaultAppearance(str: any): {
    fontSize: number;
    fontName: any;
    fontColor: Uint8ClampedArray;
};
