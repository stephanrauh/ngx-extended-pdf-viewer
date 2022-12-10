import { IPDFViewerApplication } from '../options/pdf-viewer-application';
export interface AttachmentLoadedEvent {
  source: IPDFViewerApplication;
  attachmentsCount: number;
}
