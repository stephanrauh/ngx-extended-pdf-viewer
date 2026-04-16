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
import { PageViewport } from './pdf-page-view-port';
import { PDFPageProxy } from './pdf-viewer-application';

export type AnnotationLayerBuilderOptions = {
  pdfPage: PDFPageProxy;
  annotationStorage?: AnnotationStorage;
  /**
   * - Path for image resources, mainly
   * for annotation icons. Include trailing slash.
   */
  imageResourcesPath?: string;
  renderForms: boolean;
  linkService: any; // IPDFLinkService;
  downloadManager?: any /*import('./interfaces').IDownloadManager */;
  enableScripting?: boolean;
  hasJSActionsPromise?: Promise<boolean>;
  fieldObjectsPromise?: Promise<{
    [x: string]: Object[];
  } | null>;
  annotationCanvasMap?: Map<string, HTMLCanvasElement>;
  accessibilityManager?: any /*import('./text_accessibility.js').TextAccessibilityManager */;
  annotationEditorUIManager?: any /* import('../src/pdf').AnnotationEditorUIManager */;
  onAppend?: Function;
};

export type AnnotationLayerBuilderRenderOptions = {
  viewport: PageViewport;
  /**
   * - The default value is "display".
   */
  intent?: string;
  structTreeLayer?: any /* import('./struct_tree_layer_builder.js').StructTreeLayerBuilder */;
};

export interface AnnotationLayerBuilder {
  pageDiv: HTMLDivElement;
  pdfPage: PDFPageProxy;
  annotationStorage: AnnotationStorage;
  imageResourcesPath: string;
  renderForms: boolean;
  enableScripting: boolean;
  annotationCanvasMap: Map<string, HTMLCanvasElement>;
  render({ viewport, intent, structTreeLayer }: AnnotationLayerBuilderRenderOptions): Promise<void>;
}
