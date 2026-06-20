/**
 * Payload of the `annotationEditorEvent` output. It is emitted whenever the user
 * adds, edits, moves, resizes or removes an annotation with one of the built-in
 * editors (highlight, ink/draw, free text, image stamp, signature).
 *
 * ## Coordinates are normalized (0..1)
 *
 * For the position/size related events (`added`, `moved`, `sizeChanged`) the
 * `value` carries an `x`, `y`, `width` and `height`. These are **not** pixels and
 * **not** PDF points — they are fractions between 0 and 1, relative to the page
 * and measured from the **top-left** corner (x grows right, y grows down). That
 * is why you see "strange numbers less than one".
 *
 * - `moved` → `value: { x, y }` (interactive drag) or `value: { x, y, page }`
 *   plus `previousValue: { x, y, page }` (keyboard nudge / multi-select move).
 * - `sizeChanged` → `value: { x, y, width, height }` holding the dimensions
 *   *before* the resize. For the current rectangle read it from the live editor:
 *   `event.source.x / .y / .width / .height`.
 *
 * To convert these fractions:
 * - **to canvas pixels** (e.g. for a screenshot): multiply by the canvas width/height (no flip needed,
 *   both use a top-left origin). You can also hand the rectangle straight to
 *   `NgxExtendedPdfViewerService.getPageAsCanvas(page, scale, ..., cropBox)`.
 * - **to PDF user-space points** (bottom-left origin): use
 *   `pdfPage.getViewport({ scale }).convertToViewportRectangle(...)` or call
 *   `event.source.getRect(0, 0)`.
 *
 * See the "Coordinate systems" page of the showcase for a worked example.
 */
export interface AnnotationEditorEvent {
  source: any; // AnnotationEditor;
  type:
    | 'altTextChanged'
    | 'removed'
    | 'sizeChanged'
    | 'commit'
    | 'fontSizeChanged'
    | 'colorChanged'
    | 'thicknessChanged'
    | 'opacityChanged'
    | 'bezierPathChanged'
    | 'moved'
    | 'imageAdded'
    | 'added' // #3076 added by ngx-extended-pdf-viewer
    | 'commented' // # 3095 added by ngx-extended-pdf-viewer
    | 'commentRemoved' // # 3095 added by ngx-extended-pdf-viewer
    | 'drawingStarted' // #3136 added by ngx-extended-pdf-viewer
    | 'drawingStopped'; // #3136 added by ngx-extended-pdf-viewer
  editorType: string;
  /**
   * Event-specific payload. For `moved`/`sizeChanged`/`added` it holds normalized
   * 0..1 page-relative coordinates (top-left origin) — see the interface docs above.
   */
  value: any;
  previousValue?: any;
  id?: string; // #3076 added by ngx-extended-pdf-viewer - Temporary identifier for the annotation (changes every session)
  customId?: string; // #3225 added by ngx-extended-pdf-viewer - Stable, developer-supplied identifier that survives the save/restore round-trip (only present when you assigned one)
}
