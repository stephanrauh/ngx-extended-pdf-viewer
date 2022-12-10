import { IPDFViewerApplication } from '../options/pdf-viewer-application';
export interface AnnotationEditorLayerRenderedEvent {
  source: IPDFViewerApplication;
  pageNumber: number;
  error?: any;
}
