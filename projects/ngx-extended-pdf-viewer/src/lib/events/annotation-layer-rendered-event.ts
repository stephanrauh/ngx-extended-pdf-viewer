import { IPDFViewerApplication } from './../options/pdf-viewer-application';
export interface AnnotationLayerRenderedEvent {
  source: IPDFViewerApplication;
  pageNumber: number;
  error?: any;
}
