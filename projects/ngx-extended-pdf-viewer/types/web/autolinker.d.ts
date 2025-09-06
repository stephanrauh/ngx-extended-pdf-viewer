export class Autolinker {
    static #index: number;
    static #regex: any;
    static findLinks(text: any): {
        url: string;
        index: any;
        length: any;
    }[];
    static processLinks(pdfPageView: any): ({
        borderStyle: null;
        rect: any;
        quadPoints?: undefined;
        id: string;
        unsafeUrl: any;
        url: any;
        annotationType: number;
        rotation: number;
    } | {
        borderStyle: null;
        quadPoints: any[];
        rect: number[];
        id: string;
        unsafeUrl: any;
        url: any;
        annotationType: number;
        rotation: number;
    })[];
}
