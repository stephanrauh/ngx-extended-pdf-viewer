/**
 * Key/value storage for annotation data in forms.
 */
export class AnnotationStorage {
    _storage: Map<any, any>;
    _timeStamp: number;
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
    /**
     * @private
     */
    private _setModified;
    resetModified(): void;
    /**
     * PLEASE NOTE: Only intended for usage within the API itself.
     * @ignore
     */
    get serializable(): Map<any, any> | null;
    /**
     * PLEASE NOTE: Only intended for usage within the API itself.
     * @ignore
     */
    get lastModified(): string;
}
