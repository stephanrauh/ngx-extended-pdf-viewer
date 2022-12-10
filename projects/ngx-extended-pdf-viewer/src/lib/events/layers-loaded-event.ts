import { IPDFViewerApplication } from '../options/pdf-viewer-application';
export interface LayersLoadedEvent {
  source: IPDFViewerApplication;
  layersCount: number;
}
