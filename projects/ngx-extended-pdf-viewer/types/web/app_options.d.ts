export class AppOptions {
    static get(name: any): any;
    static getAll(kind?: null): any;
    static set(name: any, value: any): void;
    static setAll(options: any, init?: boolean): void;
    static remove(name: any): void;
}
export const compatibilityParams: any;
export namespace OptionKind {
    const BROWSER: number;
    const VIEWER: number;
    const API: number;
    const WORKER: number;
    const PREFERENCE: number;
}
