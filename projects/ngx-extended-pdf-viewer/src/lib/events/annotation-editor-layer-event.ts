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
 * These raw `x`/`y`/`width`/`height` are stored in whatever rotation the page had
 * when the annotation was added (for 90°/270° the axes are swapped and `y` is the
 * bottom edge). For a rotation-independent rectangle in the page's un-rotated
 * frame — e.g. to take a screenshot — read `event.source.normalizedPageRect`
 * instead, and hand it straight to
 * `NgxExtendedPdfViewerService.getPageAsCanvas(page, scale, ..., cropBox)`.
 *
 * To convert these fractions:
 * - **to canvas pixels** (e.g. for a screenshot): multiply by the canvas width/height (no flip needed,
 *   both use a top-left origin). Prefer `event.source.normalizedPageRect` as the
 *   `cropBox` so rotated pages work too.
 * - **to PDF user-space points** (bottom-left origin): use
 *   `pdfPage.getViewport({ scale }).convertToViewportRectangle(...)` or call
 *   `event.source.getRect(0, 0)`.
 *
 * See the "Coordinate systems" page of the showcase for a worked example.
 */
/**
 * A rectangle in normalized 0..1 coordinates with a top-left origin.
 */
export interface NormalizedRect {
  x: number;
  y: number;
  width: number;
  height: number;
}

/**
 * The subset of the underlying pdf.js `AnnotationEditor` instance that is useful
 * from application code (`event.source`). It is not an exhaustive type — the
 * index signature keeps every other editor property reachable — but it surfaces
 * the members you are most likely to read, with IntelliSense.
 */
export interface AnnotationEditorSource {
  /**
   * The editor's bounding box in the page's **un-rotated** coordinate space,
   * as normalized 0..1 fractions with a top-left origin. This is the value to
   * pass as the `cropBox` of
   * `NgxExtendedPdfViewerService.getPageAsCanvas()` / `getPageAsImage()`.
   *
   * Prefer this over the raw `x`/`y`/`width`/`height` below: those are stored in
   * whatever rotation the page had when the annotation was added (for 90°/270°
   * the axes are swapped and `y` is the bottom edge), so they only line up with
   * the page when the annotation was added un-rotated. `normalizedPageRect` is
   * rotation-independent.
   */
  normalizedPageRect: NormalizedRect;
  /** Left edge, normalized — in the add-time rotation frame (see `normalizedPageRect`). */
  x: number;
  /** Top/bottom edge, normalized — in the add-time rotation frame (see `normalizedPageRect`). */
  y: number;
  /** Width, normalized — in the add-time rotation frame (see `normalizedPageRect`). */
  width: number;
  /** Height, normalized — in the add-time rotation frame (see `normalizedPageRect`). */
  height: number;
  /** The editor's rectangle in PDF user-space points (bottom-left origin). */
  getRect(tx: number, ty: number): [number, number, number, number];
  [key: string]: any;
}

export interface AnnotationEditorEvent {
  source: AnnotationEditorSource; // the underlying pdf.js AnnotationEditor
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
