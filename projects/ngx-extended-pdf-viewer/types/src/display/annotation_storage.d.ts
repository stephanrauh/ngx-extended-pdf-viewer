/**
 * Key/value storage for annotation data in forms.
 */
export class AnnotationStorage {
    /**
     * PLEASE NOTE: Only intended for usage within the API itself.
     * @ignore
     */
    static getHash(map: any): string;
    _storage: Map<any, any>;
    _modified: boolean;
    onSetModified: any;
    onResetModified: any;
    /**
     * Get the value for a given key if it exists, or return the default value.
     *
     * @public
     * @memberof AnnotationStorage
     * @param {string} key
     * @param {string} fieldName name of the input field
     * @param {Object} defaultValue
     * @returns {Object}
     */
    public getValue(key: string, fieldname: any, defaultValue: Object, radioButtonField?: undefined): Object;
    /**
     * Get the value for a given key.
     *
     * @public
     * @memberof AnnotationStorage
     * @param {string} key
     * @returns {Object}
     */
    public getRawValue(key: string): Object;
    /**
     * Remove a value from the storage.
     * @param {string} key
     */
    removeKey(key: string): void;
    /**
     * Set the value for a given key
     *
     * @public
     * @memberof AnnotationStorage
     * @param {string} key
     * @param {string} fieldName name of the input field
     * @param {Object} value
     */
    public setValue(key: string, fieldname: any, value: Object, radioButtonField?: undefined, isDefaultValue?: boolean): void;
    getAll(): any;
    get size(): number;
    resetModified(): void;
    /**
     * @returns {PrintAnnotationStorage}
     */
    get print(): PrintAnnotationStorage;
    /**
     * PLEASE NOTE: Only intended for usage within the API itself.
     * @ignore
     */
    get serializable(): Map<any, any> | null;
    #private;
}
/**
 * A special `AnnotationStorage` for use during printing, where the serializable
 * data is *frozen* upon initialization, to prevent scripting from modifying its
 * contents. (Necessary since printing is triggered synchronously in browsers.)
 */
export class PrintAnnotationStorage extends AnnotationStorage {
    constructor(parent: any);
    /**
     * PLEASE NOTE: Only intended for usage within the API itself.
     * @ignore
     */
    get serializable(): null;
    #private;
}
