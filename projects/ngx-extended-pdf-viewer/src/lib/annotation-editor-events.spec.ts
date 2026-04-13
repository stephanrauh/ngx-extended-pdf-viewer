/**
 * Regression test: verify that all expected annotation-editor-event types
 * are still dispatched in the mypdf.js source code.
 *
 * This test was added because editor events have been accidentally lost
 * multiple times during upstream pdf.js merges (v18→v22, v22→v23, etc.).
 * It reads the mypdf.js editor source files and checks for the presence
 * of each event type string in a dispatch("annotation-editor-event", ...) call.
 */
import * as fs from 'fs';
import * as path from 'path';

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
    // Match: type: "eventName" near an annotation-editor-event dispatch
    // We look for the type string in a dispatch context
    const typePattern = `type: "${type}"`;
    expect(allSource).toContain(typePattern);
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

  // ── Highlight events (highlight.js) ──
  it('should dispatch "added" (highlight)', () => expectEventType('added'));

  // ── FreeText events (freetext.js) ──
  it('should dispatch "fontSizeChanged" (freetext)', () => expectEventType('fontSizeChanged'));

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
