export class Annotation {
    constructor(params: any);
    _streams: any[];
    data: {
        annotationFlags: number;
        borderStyle: AnnotationBorderStyle;
        color: Uint8ClampedArray;
        contents: string;
        hasAppearance: boolean;
        id: any;
        modificationDate: string;
        rect: any;
        subtype: any;
    };
    _fallbackFontDict: any;
    /**
     * @private
     */
    private _hasFlag;
    /**
     * @private
     */
    private _isViewable;
    /**
     * @private
     */
    private _isPrintable;
    isHidden(annotationStorage: any): any;
    /**
     * @type {boolean}
     */
    get viewable(): boolean;
    /**
     * @type {boolean}
     */
    get printable(): boolean;
    /**
     * Set the contents.
     *
     * @public
     * @memberof Annotation
     * @param {string} contents - Text to display for the annotation or, if the
     *                            type of annotation does not display text, a
     *                            description of the annotation's contents
     */
    public setContents(contents: string): void;
    contents: string;
    /**
     * Set the modification date.
     *
     * @public
     * @memberof Annotation
     * @param {string} modificationDate - PDF date string that indicates when the
     *                                    annotation was last modified
     */
    public setModificationDate(modificationDate: string): void;
    modificationDate: string;
    /**
     * Set the flags.
     *
     * @public
     * @memberof Annotation
     * @param {number} flags - Unsigned 32-bit integer specifying annotation
     *                         characteristics
     * @see {@link shared/util.js}
     */
    public setFlags(flags: number): void;
    flags: number;
    /**
     * Check if a provided flag is set.
     *
     * @public
     * @memberof Annotation
     * @param {number} flag - Hexadecimal representation for an annotation
     *                        characteristic
     * @returns {boolean}
     * @see {@link shared/util.js}
     */
    public hasFlag(flag: number): boolean;
    /**
     * Set the rectangle.
     *
     * @public
     * @memberof Annotation
     * @param {Array} rectangle - The rectangle array with exactly four entries
     */
    public setRectangle(rectangle: any[]): void;
    rectangle: any;
    /**
     * Set the color and take care of color space conversion.
     * The default value is black, in RGB color space.
     *
     * @public
     * @memberof Annotation
     * @param {Array} color - The color array containing either 0
     *                        (transparent), 1 (grayscale), 3 (RGB) or
     *                        4 (CMYK) elements
     */
    public setColor(color: any[]): void;
    color: Uint8ClampedArray;
    /**
     * Set the border style (as AnnotationBorderStyle object).
     *
     * @public
     * @memberof Annotation
     * @param {Dict} borderStyle - The border style dictionary
     */
    public setBorderStyle(borderStyle: any): void;
    borderStyle: AnnotationBorderStyle;
    /**
     * Set the (normal) appearance.
     *
     * @public
     * @memberof Annotation
     * @param {Dict} dict - The annotation's data dictionary
     */
    public setAppearance(dict: any): void;
    appearance: any;
    loadResources(keys: any): any;
    getOperatorList(evaluator: any, task: any, renderForms: any, annotationStorage: any): any;
    save(evaluator: any, task: any, annotationStorage: any): Promise<any>;
    /**
     * Get field data for usage in JS sandbox.
     *
     * Field object is defined here:
     * https://www.adobe.com/content/dam/acom/en/devnet/acrobat/pdfs/js_api_reference.pdf#page=16
     *
     * @public
     * @memberof Annotation
     * @returns {Object | null}
     */
    public getFieldObject(): any | null;
    /**
     * Reset the annotation.
     *
     * This involves resetting the various streams that are either cached on the
     * annotation instance or created during its construction.
     *
     * @public
     * @memberof Annotation
     */
    public reset(): void;
    /**
     * Construct the (fully qualified) field name from the (partial) field
     * names of the field and its ancestors.
     *
     * @private
     * @memberof Annotation
     * @param {Dict} dict - Complete widget annotation dictionary
     * @returns {string}
     */
    private _constructFieldName;
}
/**
 * Contains all data regarding an annotation's border style.
 */
export class AnnotationBorderStyle {
    width: number;
    style: number;
    dashArray: number[];
    horizontalCornerRadius: number;
    verticalCornerRadius: number;
    /**
     * Set the width.
     *
     * @public
     * @memberof AnnotationBorderStyle
     * @param {number} width - The width.
     * @param {Array} rect - The annotation `Rect` entry.
     */
    public setWidth(width: number, rect?: any[]): void;
    /**
     * Set the style.
     *
     * @public
     * @memberof AnnotationBorderStyle
     * @param {Name} style - The annotation style.
     * @see {@link shared/util.js}
     */
    public setStyle(style: any): void;
    /**
     * Set the dash array.
     *
     * @public
     * @memberof AnnotationBorderStyle
     * @param {Array} dashArray - The dash array with at least one element
     */
    public setDashArray(dashArray: any[]): void;
    /**
     * Set the horizontal corner radius (from a Border dictionary).
     *
     * @public
     * @memberof AnnotationBorderStyle
     * @param {number} radius - The horizontal corner radius.
     */
    public setHorizontalCornerRadius(radius: number): void;
    /**
     * Set the vertical corner radius (from a Border dictionary).
     *
     * @public
     * @memberof AnnotationBorderStyle
     * @param {number} radius - The vertical corner radius.
     */
    public setVerticalCornerRadius(radius: number): void;
}
export class AnnotationFactory {
    /**
     * Create an `Annotation` object of the correct type for the given reference
     * to an annotation dictionary. This yields a promise that is resolved when
     * the `Annotation` object is constructed.
     *
     * @param {XRef} xref
     * @param {Object} ref
     * @param {PDFManager} pdfManager
     * @param {Object} idFactory
     * @param {boolean} collectFields
     * @returns {Promise} A promise that is resolved with an {Annotation}
     *   instance.
     */
    static create(xref: any, ref: any, pdfManager: any, idFactory: any, collectFields: boolean): Promise<any>;
    /**
     * @private
     */
    private static _create;
}
export function getQuadPoints(dict: any, rect: any): {
    x: any;
    y: any;
}[][];
export class MarkupAnnotation extends Annotation {
    constructor(parameters: any);
    /**
     * Set the creation date.
     *
     * @public
     * @memberof MarkupAnnotation
     * @param {string} creationDate - PDF date string that indicates when the
     *                                annotation was originally created
     */
    public setCreationDate(creationDate: string): void;
    creationDate: string;
    _setDefaultAppearance({ xref, extra, strokeColor, fillColor, blendMode, pointsCallback, }: {
        xref: any;
        extra: any;
        strokeColor: any;
        fillColor: any;
        blendMode: any;
        pointsCallback: any;
    }): void;
}
