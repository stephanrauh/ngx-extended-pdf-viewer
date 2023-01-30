import { PDFOutlineViewer } from '../options/pdf_outline_viewer';

export interface OutlineLoadedEvent {
  source: PDFOutlineViewer;
  outlineCount: number;
  currentOutlineItemPromise: Promise<boolean>;
}
