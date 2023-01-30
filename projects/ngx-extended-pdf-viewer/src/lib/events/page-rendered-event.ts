import { PDFPageView } from '../options/pdf_page_view';

export interface PageRenderedEvent {
  source: PDFPageView;
  pageNumber: number;
  cssTransform: boolean;
}
