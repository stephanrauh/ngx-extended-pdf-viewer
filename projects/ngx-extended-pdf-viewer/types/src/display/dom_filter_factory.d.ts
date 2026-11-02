/**
 * FilterFactory aims to create some SVG filters we can use when drawing an
 * image (or whatever) on a canvas.
 * Filters aren't applied with ctx.putImageData because it just overwrites the
 * underlying pixels.
 * With these filters, it's possible for example to apply some transfer maps on
 * an image without the need to apply them on the pixel arrays: the renderer
 * does the magic for us.
 */
export class DOMFilterFactory extends BaseFilterFactory {
    constructor({ docId, ownerDocument }: {
        docId: any;
        ownerDocument?: Document | undefined;
    });
    addFilter(maps: any): any;
    addHCMFilter(fgColor: any, bgColor: any): any;
    addAlphaFilter(map: any): any;
    addLuminosityFilter(map: any): any;
    addKnockoutFilter(alpha?: number): any;
    addHighlightHCMFilter(filterName: any, fgColor: any, bgColor: any, newFgColor: any, newBgColor: any): any;
    #private;
}
import { BaseFilterFactory } from "./filter_factory.js";
