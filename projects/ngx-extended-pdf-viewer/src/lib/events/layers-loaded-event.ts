import { PDFPageView } from '../options/pdf_page_view';
export interface LayersLoadedEvent {
  source: PDFPageView;
  layersCount: number;
}
