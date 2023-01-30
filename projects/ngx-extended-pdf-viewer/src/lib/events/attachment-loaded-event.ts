import { PDFAttachmentViewer } from '../options/pdf_attachment_viewer';
export interface AttachmentLoadedEvent {
  source: PDFAttachmentViewer;
  attachmentsCount: number;
}
