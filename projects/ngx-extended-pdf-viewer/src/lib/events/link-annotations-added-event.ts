import { PDFPageView } from '../options/pdf_page_view';

export interface LinkAnnotationsAddedEvent {
  source: PDFPageView;
  pageNumber: number;
  error?: any;
}
