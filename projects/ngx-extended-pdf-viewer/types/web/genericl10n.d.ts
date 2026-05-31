export class GenericL10n extends L10n {
    /**
     * Generate the bundles for Fluent.
     * @param {String} defaultLang - The fallback language to use for
     *   translations.
     * @param {String} baseLang - The base language to use for translations.
     */
    static #generateBundles(defaultLang: string, baseLang: string): AsyncGenerator<any, void, unknown>;
    static #createBundle(lang: any, baseURL: any, paths: any): Promise<any>;
    static #getPaths(): Promise<{
        baseURL: any;
        paths: any;
    }>;
    static #generateBundlesFallback(lang: any): AsyncGenerator<any, void, unknown>;
    static #createBundleFallback(lang: any): Promise<any>;
    constructor(lang: any);
}
import { L10n } from "./l10n.js";
