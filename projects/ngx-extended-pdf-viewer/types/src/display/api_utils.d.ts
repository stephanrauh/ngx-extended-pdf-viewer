export function deprecated(details: any): void;
export function getDataProp(val: any): Uint8Array<any>;
export function getFactoryUrlProp(val: any): string | null;
export function getUrlProp(val: any, baseHref: any): URL | null;
export function getWorkerSrc(src: any): any;
export function isNameProxy(v: any): boolean;
export function isRefProxy(v: any): boolean;
export function isSameOrigin(baseUrl: any, otherUrl: any): boolean;
export const isValidExplicitDest: (dest?: any) => boolean;
export class LoopbackPort {
    postMessage(obj: any, transfer: any): void;
    addEventListener(name: any, listener: any, options?: null): void;
    removeEventListener(name: any, listener: any): void;
    terminate(): void;
    #private;
}
export class StatTimer {
    times: any[];
    time(name: any): void;
    timeEnd(name: any): void;
    toString(): string;
    #private;
}
