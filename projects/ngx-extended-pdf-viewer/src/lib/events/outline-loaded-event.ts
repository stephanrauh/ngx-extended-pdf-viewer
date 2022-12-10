import { IPDFViewerApplication } from '../options/pdf-viewer-application';
export interface OutlineLoadedEvent {
  source: IPDFViewerApplication;
  outlineCount: number;
  currentOutlineItemPromise: Promise<boolean>;
}
