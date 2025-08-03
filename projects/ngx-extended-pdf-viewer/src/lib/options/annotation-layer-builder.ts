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
  annotationStorage?: AnnotationStorage | undefined;
  /**
   * - Path for image resources, mainly
   * for annotation icons. Include trailing slash.
   */
  imageResourcesPath?: string | undefined;
  renderForms: boolean;
  linkService: any; // IPDFLinkService;
  downloadManager?: any /*import('./interfaces').IDownloadManager */ | undefined;
  enableScripting?: boolean | undefined;
  hasJSActionsPromise?: Promise<boolean> | undefined;
  fieldObjectsPromise?:
    | Promise<{
        [x: string]: Object[];
      } | null>
    | undefined;
  annotationCanvasMap?: Map<string, HTMLCanvasElement> | undefined;
  accessibilityManager?: any /*import('./text_accessibility.js').TextAccessibilityManager */ | undefined;
  annotationEditorUIManager?: any /* import('../src/pdf').AnnotationEditorUIManager */ | undefined;
  onAppend?: Function | undefined;
};

export type AnnotationLayerBuilderRenderOptions = {
  viewport: PageViewport;
  /**
   * - The default value is "display".
   */
  intent?: string | undefined;
  structTreeLayer?: any /* import('./struct_tree_layer_builder.js').StructTreeLayerBuilder */ | undefined;
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
