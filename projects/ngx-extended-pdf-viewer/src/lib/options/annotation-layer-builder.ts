/*
 * @property {HTMLDivElement} pageDiv
 * @property {PDFPageProxy} pdfPage
 * @property {AnnotationStorage} [annotationStorage]
 * @property {string} [imageResourcesPath] - Path for image resources, mainly
 *   for annotation icons. Include trailing slash.
 * @property {boolean} renderForms
 * @property {IPDFLinkService} linkService
 * @property {IDownloadManager} downloadManager
 * @property {IL10n} l10n - Localization service.
 * @property {boolean} [enableScripting]
 * @property {Promise<boolean>} [hasJSActionsPromise]
 * @property {Promise<Object<string, Array<Object>> | null>}
 *   [fieldObjectsPromise]
 * @property {Map<string, HTMLCanvasElement>} [annotationCanvasMap]
 * @property {TextAccessibilityManager} [accessibilityManager]
 */

import { AnnotationStorage } from './pdf-annotation-storage';
import { PDFPageProxy } from './pdf-viewer-application';

export interface AnnotationLayerBuilder {
  pageDiv: HTMLDivElement;
  pdfPage: PDFPageProxy;
  annotationStorage: AnnotationStorage;
  imageResourcesPath: string;
  renderForms: boolean;
  enableScripting: boolean;
  annotationCanvasMap: Map<string, HTMLCanvasElement>;
}
