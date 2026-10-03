/**
 * Regression test: verify that all expected annotation-editor-event types
 * are still dispatched in the mypdf.js source code.
 *
 * This test was added because editor events have been accidentally lost
 * multiple times during upstream pdf.js merges (v18→v22, v22→v23, etc.).
 * It reads the mypdf.js editor source files and checks for the presence
 * of each event type string in a dispatch("annotation-editor-event", ...) call.
 */
import * as fs from 'node:fs';
import * as path from 'node:path';

const editorDir = path.resolve(__dirname, '../../../../../mypdf.js/src/display/editor');
const mypdfjsAvailable = fs.existsSync(editorDir);

(mypdfjsAvailable ? describe : describe.skip)('annotation-editor-event regression test', () => {
  // Read all editor source files once
  const editorFiles = [
    'editor.js',
    'draw.js',
    'highlight.js',
    'freetext.js',
    'stamp.js',
    'signature.js',
    'comment.js',
    'annotation_editor_layer.js',
    'tools.js',
  ];

  let allSource: string;

  beforeAll(() => {
    allSource = editorFiles
      .map(f => {
        const filePath = path.join(editorDir, f);
        return fs.existsSync(filePath) ? fs.readFileSync(filePath, 'utf-8') : '';
      })
      .join('\n');
  });

  /**
   * Helper: assert that a dispatch("annotation-editor-event", { ... type: "X" ... })
   * pattern exists somewhere in the combined source.
   */
  function expectEventType(type: string) {
    // An event type reaches the dispatch in one of three shapes:
    //   inline      `type: "colorChanged"` in an object literal
    //   via helper  `_dispatchEditorEvent("colorChanged", …)`  (#2256)
    //   via a map   `stroke: "colorChanged"` in draw.js
    // The helper form was introduced to keep the modifications inside
    // Mozilla's methods one line long, so upstream merges stay manageable.
    const found =
      allSource.includes(`type: "${type}"`) ||
      new RegExp(`_dispatch\\w*Event\\(\\s*"${type}"`).test(allSource) ||
      new RegExp(`:\\s*"${type}",`).test(allSource);
    expect({ type, dispatched: found }).toEqual({ type, dispatched: true });
  }

  // ── Base class events (editor.js) — apply to ALL editor types ──
  it('should dispatch "commit" (base class)', () => expectEventType('commit'));
  it('should dispatch "removed" (base class)', () => expectEventType('removed'));
  it('should dispatch "moved" (base class)', () => expectEventType('moved'));
  it('should dispatch "sizeChanged" (base class)', () => expectEventType('sizeChanged'));
  it('should dispatch "altTextChanged" (base class)', () => expectEventType('altTextChanged'));

  // ── Drawing/Ink events (draw.js) ──
  it('should dispatch "colorChanged" (draw/highlight/freetext)', () => expectEventType('colorChanged'));
  it('should dispatch "thicknessChanged" (draw/highlight)', () => expectEventType('thicknessChanged'));
  it('should dispatch "opacityChanged" (draw)', () => expectEventType('opacityChanged'));
  it('should dispatch "bezierPathChanged" (draw/ink)', () => expectEventType('bezierPathChanged'));
  it('should dispatch "drawingStarted" (draw/highlight)', () => expectEventType('drawingStarted'));
  it('should dispatch "drawingStopped" (draw/highlight)', () => expectEventType('drawingStopped'));

  // ── "added" (editor.js base class since #3240; used to live in highlight.js) ──
  it('should dispatch "added" (base class)', () => expectEventType('added'));

  // ── FreeText events (freetext.js) ──
  it('should dispatch "fontSizeChanged" (freetext)', () => expectEventType('fontSizeChanged'));
  it('should dispatch "textChanged" (freetext, #3238)', () => expectEventType('textChanged'));

  // ── Stamp events (stamp.js) ──
  it('should dispatch "imageAdded" (stamp)', () => expectEventType('imageAdded'));

  // ── Signature events (signature.js) ──
  it('should dispatch "signatureAdded" (signature)', () => expectEventType('signatureAdded'));

  // ── Comment events (comment.js) ──
  it('should dispatch "commented" (comment)', () => expectEventType('commented'));
  it('should dispatch "commentRemoved" (comment)', () => expectEventType('commentRemoved'));

  // ── Sanity check: all dispatches use the correct event name ──
  it('should use "annotation-editor-event" as the event name', () => {
    expect(allSource).toContain('dispatch("annotation-editor-event"');
  });

  // ── Sanity check: most dispatches include an id field (ngx-extended-pdf-viewer requirement) ──
  it('should include id field in most event dispatches', () => {
    // Verify that id fields exist in the codebase (this.uid or editor.uid)
    const idFieldCount = (allSource.match(/id: (?:this|editor)\.uid/g) || []).length;
    expect(idFieldCount).toBeGreaterThan(0);
  });
});

/**
 * #3240 Restoring annotations with addEditorAnnotation() used to be noisy and to
 * leave the viewer in the editor mode of the last restored annotation. Like the
 * suite above, these are source-level regression tests: the modifications live in
 * the mypdf.js fork and have been lost in upstream merges before.
 */
(mypdfjsAvailable ? describe : describe.skip)('restoring annotations (#3240)', () => {
  const forkRoot = path.resolve(__dirname, '../../../../../mypdf.js');
  const read = (relativePath: string) => fs.readFileSync(path.join(forkRoot, relativePath), 'utf-8');

  let tools: string;
  let editor: string;
  let highlight: string;
  let pdfViewer: string;

  beforeAll(() => {
    tools = read('src/display/editor/tools.js');
    editor = read('src/display/editor/editor.js');
    highlight = read('src/display/editor/highlight.js');
    pdfViewer = read('web/pdf_viewer.js');
  });

  it('sends one "added" event per restored annotation, whatever its type', () => {
    // The event is built by the base class ...
    expect(editor).toContain('_dispatchAddedEvent()');
    expect(editor).toContain('this._dispatchEditorEvent("added"');
    // ... and sent for every editor the restore created.
    expect(tools).toContain('editor._dispatchAddedEvent();');
  });

  it('does not let the highlight editor announce a restored annotation twice', () => {
    expect(highlight).toContain('if (!this._uiManager?.isRestoringAnnotations) {');
    expect(tools).toContain('get isRestoringAnnotations()');
    // The flag has to be cleared even when a single annotation fails to restore.
    expect(tools).toContain('this.#isRestoringAnnotations = false;');
  });

  it('does not send a "moved" event for an annotation that was put back where it was', () => {
    expect(editor).toMatch(/if \(!this\.doNotMove\) \{\s*this\._onTranslated\(\);/);
  });

  it('leaves the editor mode alone: restored annotations are not selected', () => {
    expect(tools).toContain('selectNewEditors = true');
    expect(tools).toContain('if (selectNewEditors) {');
    // The viewer's restore path is the one that opts out.
    expect(pdfViewer).toContain('addSerializedEditor(data, true, true, false, false)');
  });

  it('does not let a restored annotation steal the focus', () => {
    // Focusing an editor selects it (AnnotationEditor.focusin), and selecting it
    // asks the toolbar to switch to that editor's mode.
    const layer = fs.readFileSync(path.join(forkRoot, 'src/display/editor/annotation_editor_layer.js'), 'utf-8');
    expect(layer).toContain('!this.#isEnabling && !this.#uiManager.isRestoringAnnotations');
  });

  it('awaits the temporary mode switch, so restoring twice in a row cannot interleave', () => {
    expect(tools).toContain('await this.updateMode(AnnotationEditorType.FREETEXT);');
    expect(tools).toContain('await this.updateMode(previousMode);');
  });

  it('skips an annotation it cannot restore instead of dropping the rest of the batch', () => {
    expect(tools).toContain('could not restore the annotation of type');
    expect(tools).not.toMatch(/const deserializedEditor = await layer\.deserialize\(editor\);\s*if \(!deserializedEditor\) \{\s*return;/);
  });
});

/**
 * #3237 A comment ("popup") attached to an annotation has to survive
 * getSerializedAnnotations() -> store -> addEditorAnnotation(). The mapping from
 * the serialized `popup` to the editor's comment was added for highlights and
 * stamps in #3113, but the free text editor never got it, and the highlight
 * editor dropped `isCopy` and `customId` while rebuilding its data object.
 */
(mypdfjsAvailable ? describe : describe.skip)('restoring the comment of an annotation (#3237)', () => {
  const editorDirPath = path.resolve(__dirname, '../../../../../mypdf.js/src/display/editor');
  const read = (file: string) => fs.readFileSync(path.join(editorDirPath, file), 'utf-8');

  // Every editor type that can carry a comment has to map the serialized
  // `popup` back to `comment` / `commentDate` before deserializing.
  it.each(['freetext.js', 'ink.js', 'stamp.js', 'highlight.js'])('maps popup -> comment in %s', (file) => {
    const source = read(file);
    expect(source).toContain('comment: (!popup?.deleted && popup?.contents) || null');
    expect(source).toContain('commentDate: (!popup?.deleted && popup?.date) || null');
  });

  it('keeps isCopy and customId when the highlight editor rebuilds its data', () => {
    // Without isCopy the restored comment is missing from the next export;
    // without customId the stable id of #3225 is lost.
    const source = read('highlight.js');
    expect(source).toContain('isCopy: data.isCopy');
    expect(source).toContain('customId: data.customId');
  });
});
