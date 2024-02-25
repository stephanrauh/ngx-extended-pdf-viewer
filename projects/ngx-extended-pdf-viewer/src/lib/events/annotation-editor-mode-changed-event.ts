import { AnnotationEditorTypeValue } from '../options/editor-annotations';
import { PDFPageView } from '../options/pdf_page_view';

export interface AnnotationEditorEditorModeChangedEvent {
  source: PDFPageView;
  mode: AnnotationEditorTypeValue; // 0 = none, 3 = texteditor, 9= highlight editor, 13 = stamp editor, 15 = inkeditor
}
