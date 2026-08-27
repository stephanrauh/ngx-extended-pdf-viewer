export enum AnnotationMode {
  DISABLE = 0,
  ENABLE = 1,
  ENABLE_FORMS = 2,
  ENABLE_STORAGE = 3,
}

export enum AnnotationEditorType {
  DISABLE = -1,
  NONE = 0,
  FREETEXT = 3,
  HIGHLIGHT = 9,
  STAMP = 13,
  INK = 15,
  POPUP = 16,
  SIGNATURE = 101,
  COMMENT = 102,
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
  HIGHLIGHT_THICKNESS: 32,
  HIGHLIGHT_FREE: 33,
  HIGHLIGHT_SHOW_ALL: 34,
  HIGHLIGHT_DEFAULT_COLOR: 35,
  DRAW_STEP: 41,
};

export type AnnotationEditorTypeValue = -1 | 0 | 3 | 9 | 13 | 15 | 16;

/**
 * #3237 The comment (a.k.a. popup) attached to an annotation. Every editor type can carry one:
 * `getSerializedAnnotations()` returns it, and `addEditorAnnotation()` restores it.
 */
export type AnnotationPopup = {
  /** the text of the comment */
  contents: string;
  /** `true` if the user deleted the comment of an annotation that already was in the PDF file */
  deleted?: boolean;
  /** the position of the popup, in PDF user space: [left, bottom, right, top] */
  rect?: Array<number>;
  /** the time the comment was written, as an ISO string; restored unchanged, so a round-trip keeps the original timestamp */
  date?: string;
};

/**
 * #3236 Where an annotation ends up: `rect` and `rotation`.
 *
 * `rect` is the box the annotation occupies, `[left, bottom, right, top]`, measured from the
 * bottom left corner of the page. Drawings are the exception - a drawing sits where its points
 * are, so its `rect` is ignored (which is why an empty one seems to work until you add an
 * annotation of any other type).
 *
 * **`rotation` does not turn the annotation by N degrees.** It says which way up the page was when
 * you measured the coordinates you are passing in - counting both the rotation stored in the
 * document and the rotation the user applied with the rotate buttons. Pass the wrong value and the
 * annotation lands in the wrong *place*, often off the page, rather than tilted.
 *
 * You don't have to think about any of this to save your users' annotations and load them back:
 * `getSerializedAnnotations()` and `addEditorAnnotation()` agree with each other, rotated pages
 * included. It matters when you calculate annotations yourself, and `rotation: 0` covers you as
 * long as your pages are upright and nobody rotates them.
 *
 * Scanned documents are where it bites, because many are stored sideways and turned upright by the
 * file itself - so the page you see is not the page your coordinates are measured on. If one
 * misbehaves, draw an annotation on it by hand, export it, and match what you see there.
 */
export type InkPaths = {
  lines: Array<Array<number>>; // Array of bezier curve arrays
  points: Array<Array<number>>; // Array of raw point arrays
};

export type InkEditorAnnotation = {
  annotationType: 15;
  color: Array<number>; // an array of three integer numbers
  thickness: number;
  opacity: number;
  paths: InkPaths;
  pageIndex: number;
  // [left, bottom, right, top] - ignored for drawings: a drawing sits where its `paths` are (#3236)
  rect: Array<number>;
  rotation: 0 | 90 | 180 | 270; // in degrees - which way up the page was when you measured, see above
  isCopy?: boolean;
  id?: string; // #3076 added by ngx-extended-pdf-viewer - temporary, changes every session; do not persist it
  customId?: string; // #3225 added by ngx-extended-pdf-viewer - your own stable id (e.g. a UUID); set it before storing and it survives addEditorAnnotation()
  popup?: AnnotationPopup; // #3237 added by ngx-extended-pdf-viewer - the comment attached to this annotation
};

export type FreeTextEditorAnnotation = {
  annotationType: 3;
  color: Array<number>; // an array of three integer numbers
  fontSize: number;
  value: string;
  pageIndex: number;
  rect: Array<number>; // rect[1] is the y position; rect[2] is the x position - required, this is what puts the text on the page
  rotation: 0 | 90 | 180 | 270; // in degrees - which way up the page was when you measured, see the note above InkPaths (#3236)
  isCopy?: boolean;
  id?: string; // #3076 added by ngx-extended-pdf-viewer - temporary, changes every session; do not persist it
  customId?: string; // #3225 added by ngx-extended-pdf-viewer - your own stable id (e.g. a UUID); set it before storing and it survives addEditorAnnotation()
  popup?: AnnotationPopup; // #3237 added by ngx-extended-pdf-viewer - the comment attached to this annotation
};

export type StampEditorAnnotation = {
  annotationType: 13;
  pageIndex: number;
  bitmapUrl: string | Blob;
  rect: Array<number>; // [left, bottom, right, top] - required, this is what puts the annotation on the page
  rotation: 0 | 90 | 180 | 270; // in degrees - which way up the page was when you measured, see the note above InkPaths (#3236)
  isCopy?: boolean;
  id?: string; // #3076 added by ngx-extended-pdf-viewer - temporary, changes every session; do not persist it
  customId?: string; // #3225 added by ngx-extended-pdf-viewer - your own stable id (e.g. a UUID); set it before storing and it survives addEditorAnnotation()
  popup?: AnnotationPopup; // #3237 added by ngx-extended-pdf-viewer - the comment attached to this annotation
};

export type HighlightEditorAnnotation = {
  annotationType: 9;
  color: Array<number>; // an array of three integer numbers
  opacity: number;
  thickness: number;
  boxes?: Array<{ x: number; y: number; width: number; height: number }>; // page-relative coords (0-1 range)
  quadPoints?: any; // Object with numeric keys containing text bounds
  outlines?: Array<Array<number>>; // Array of coordinate arrays for highlight shapes
  pageIndex: number;
  // [left, bottom, right, top] - required: the shape comes from `quadPoints` / `outlines`, but this
  // box is what puts the highlight on the page
  rect: Array<number>;
  rotation: 0 | 90 | 180 | 270; // in degrees - which way up the page was when you measured, see the note above InkPaths (#3236)
  isCopy?: boolean;
  id?: string; // #3076 added by ngx-extended-pdf-viewer - temporary, changes every session; do not persist it
  customId?: string; // #3225 added by ngx-extended-pdf-viewer - your own stable id (e.g. a UUID); set it before storing and it survives addEditorAnnotation()
  popup?: AnnotationPopup; // #3237 added by ngx-extended-pdf-viewer - the comment attached to this annotation
};

export type PopupEditorAnnotation = {
  annotationType: 16;
  content: string;
  pageIndex: number;
  rect: Array<number>; // [left, bottom, right, top] - required, this is what puts the annotation on the page
  rotation: 0 | 90 | 180 | 270; // in degrees - which way up the page was when you measured, see the note above InkPaths (#3236)
  isCopy?: boolean;
  id?: string; // #3076 added by ngx-extended-pdf-viewer - temporary, changes every session; do not persist it
  customId?: string; // #3225 added by ngx-extended-pdf-viewer - your own stable id (e.g. a UUID); set it before storing and it survives addEditorAnnotation()
  popup?: AnnotationPopup; // #3237 added by ngx-extended-pdf-viewer - the comment attached to this annotation
};

export type EditorAnnotation = InkEditorAnnotation | FreeTextEditorAnnotation | StampEditorAnnotation | HighlightEditorAnnotation | PopupEditorAnnotation;
