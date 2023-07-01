import { PDFPageView } from '../options/pdf_page_view';

export interface AnnotationEditorEditorModeChangedEvent {
  source: PDFPageView;
  mode: 0 | 3 | 15; // 0 = none, 3 = texteditor, 15 = inkeditor
}
