import { FormDataType } from '../ngx-extended-pdf-viewer.component';
import { PDFPageView } from '../options/pdf_page_view';

export interface AnnotationLayerRenderedEvent {
  source: PDFPageView;
  pageNumber: number;
  error?: any;
  initialFormDataStoredInThePDF?: FormDataType;
}
