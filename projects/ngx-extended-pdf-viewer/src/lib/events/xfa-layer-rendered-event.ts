import { IPDFViewerApplication } from '../options/pdf-viewer-application';
export interface XfaLayerRenderedEvent {
  source: IPDFViewerApplication;
  pageNumber: number;
  error?: any;
  layer: unknown; // XfaLayerBuilder
}
