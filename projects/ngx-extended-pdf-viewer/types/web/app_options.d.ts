export class AppOptions {
    static get(name: any): any;
    static getAll(kind?: null, defaultOnly?: boolean): any;
    static set(name: any, value: any): void;
    static setAll(options: any, init?: boolean): void;
    static remove(name: any): void;
}
export namespace OptionKind {
    let BROWSER: number;
    let VIEWER: number;
    let API: number;
    let WORKER: number;
    let PREFERENCE: number;
}
