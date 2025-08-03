/**
 * Key/value storage for annotation data in forms.
 */
export interface AnnotationStorage {
  onSetModified: any;
  onResetModified: any;
  onAnnotationEditor: any;
  /**
   * Get the value for a given key if it exists, or return the default value.
   * @param {string} key
   * @param {string} fieldName name of the input field
   * @param {Object} defaultValue
   * @returns {Object}
   */
  getValue(key: string, fieldname: any, defaultValue: Object, radioButtonField?: undefined): Object;
  /**
   * Get the value for a given key.
   * @param {string} key
   * @returns {Object}
   */
  getRawValue(key: string): Object;
  /**
   * Remove a value from the storage.
   * @param {string} key
   */
  remove(key: string): void;
  /**
   * Set the value for a given key
   * @param {string} key
   * @param {Object} value
   */
  setValue(key: string, value: Object): void;
  /**
   * Check if the storage contains the given key.
   * @param {string} key
   * @returns {boolean}
   */
  has(key: string): boolean;
  /**
   * @returns {Object | null}
   */
  getAll(): Object | null;
  /**
   * @param {Object} obj
   */
  setAll(obj: Object): void;
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
}
/**
 * A special `AnnotationStorage` for use during printing, where the serializable
 * data is *frozen* upon initialization, to prevent scripting from modifying its
 * contents. (Necessary since printing is triggered synchronously in browsers.)
 */
export interface PrintAnnotationStorage extends AnnotationStorage {
  /**
   * PLEASE NOTE: Only intended for usage within the API itself.
   * @ignore
   */
  get serializable(): null;
}
