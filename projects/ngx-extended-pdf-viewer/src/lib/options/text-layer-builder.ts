import { PageViewport } from './pdf-page-view-port';
import { TextContent } from './pdf-viewer-application';

/**
 * The text layer builder provides text selection functionality for the PDF.
 * It does this by creating overlay divs over the PDF's text. These divs
 * contain text that matches the PDF text they are overlaying.
 */
export interface TextLayerBuilder {
  textContentItemsStr: any[];
  renderingDone: boolean;
  textDivs: any[];
  textDivProperties: WeakMap<object, any>;
  textLayerRenderTask: any;
  highlighter: any;
  accessibilityManager: any;
  isOffscreenCanvasSupported: boolean;
  div: HTMLDivElement;
  get numTextDivs(): number;
  /**
   * Renders the text layer.
   * @param {PageViewport} viewport
   */
  render(viewport: PageViewport): Promise<void>;
  hide(): void;
  show(): void;
  /**
   * Cancel rendering of the text layer.
   */
  cancel(): void;
  /**
   * @param {ReadableStream | TextContent} source
   */
  setTextContentSource(source: ReadableStream | TextContent): void;
}
