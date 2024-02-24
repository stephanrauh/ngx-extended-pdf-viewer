import { PDFPageView } from '../options/pdf_page_view';

export enum AnnotationEditorType {
  DISABLE = -1,
  NONE = 0,
  FREETEXT = 3,
  HIGHLIGHT = 9,
  STAMP = 13,
  INK = 15,
}
export interface AnnotationEditorEditorModeChangedEvent {
  source: PDFPageView;
  mode: 0 | 3 | 9 | 13 | 15; // 0 = none, 3 = texteditor, 9= highlight editor, 13 = stamp editor, 15 = inkeditor
}
