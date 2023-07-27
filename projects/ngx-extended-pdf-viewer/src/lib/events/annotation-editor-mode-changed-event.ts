import { PDFPageView } from '../options/pdf_page_view';

export interface AnnotationEditorEditorModeChangedEvent {
  source: PDFPageView;
  mode: 0 | 3 | 13 | 15; // 0 = none, 3 = texteditor, 13 = stamp editor, 15 = inkeditor
}
