export enum AnnotationMode {
  DISABLE = 0,
  ENABLE = 1,
  ENABLE_FORMS = 2,
  ENABLE_STORAGE = 3
};

export enum AnnotationEditorType {
  DISABLE = -1,
  NONE = 0,
  FREETEXT = 3,
  HIGHLIGHT = 9,
  STAMP = 13,
  INK = 15,
}

export const AnnotationEditorParamsType = {
  RESIZE: 1,
  CREATE: 2,
  FREETEXT_SIZE: 11,
  FREETEXT_COLOR: 12,
  FREETEXT_OPACITY: 13,
  INK_COLOR: 21,
  INK_THICKNESS: 22,
  INK_OPACITY: 23,
  HIGHLIGHT_COLOR: 31,
  HIGHLIGHT_DEFAULT_COLOR: 32,
  HIGHLIGHT_THICKNESS: 33,
  HIGHLIGHT_FREE: 34,
  HIGHLIGHT_SHOW_ALL: 35,
};

export type AnnotationEditorTypeValue = -1 | 0 | 3 | 9 | 13 | 15;

export type BezierPath = {
  bezier: Array<number>;
  points: Array<number>;
};

export type InkEditorAnnotation = {
  annotationType: 15;
  color: Array<number>; // an array of three integer numbers
  thickness: number;
  opacity: number;
  paths: Array<BezierPath>;
  pageIndex: number;
  rect: Array<number>; // [left, bottom, right, top]
  rotation: 0 | 90 | 180 | 270; // in degrees
};

export type FreeTextEditorAnnotation = {
  annotationType: 3;
  color: Array<number>; // an array of three integer numbers
  fontSize: number;
  value: string;
  pageIndex: number;
  rect: Array<number>; // rect[1] is the y position; rect[2] is the x position
  rotation: 0 | 90 | 180 | 270; // in degrees
};

export type StampEditorAnnotation = {
  annotationType: 13;
  pageIndex: number;
  bitmapUrl: string | Blob;
  rect: Array<number>; // [left, bottom, right, top]
  rotation: 0 | 90 | 180 | 270; // in degrees
};

export type HighlightEditorAnnotation = {
  annotationType: 9;
  color: Array<number>; // an array of three integer numbers
  rect: Array<number>; // [left, bottom, right, top]
  pageIndex: number;
  rotation: 0 | 90 | 180 | 270; // in degrees
};

export type EditorAnnotation = InkEditorAnnotation | FreeTextEditorAnnotation | StampEditorAnnotation | HighlightEditorAnnotation;
