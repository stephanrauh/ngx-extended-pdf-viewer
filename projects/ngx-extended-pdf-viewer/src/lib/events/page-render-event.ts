import { PDFPageView } from '../options/pdf_page_view';

export interface PageRenderEvent {
  source: PDFPageView;
  pageNumber: number;
}
