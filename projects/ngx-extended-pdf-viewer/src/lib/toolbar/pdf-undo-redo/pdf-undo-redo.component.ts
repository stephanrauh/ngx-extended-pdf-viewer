import { ChangeDetectorRef, Component, effect, input, OnDestroy, ViewRef } from '@angular/core';
import { IPDFViewerApplication } from '../../options/pdf-viewer-application';
import { PDFNotificationService } from '../../pdf-notification-service';
import { ResponsiveVisibility } from '../../responsive-visibility';

/** The payload of pdf.js's `editingstateschanged` event (only the fields used here). */
interface EditingStatesChangedEvent {
  details: {
    hasSomethingToUndo?: boolean;
    hasSomethingToRedo?: boolean;
  };
}

/**
 * stephanrauh/pdf.js#15: undo and redo buttons for the annotation editor, so
 * touch users can undo without a keyboard. They send pdf.js's own
 * `editingaction` event, the same route Ctrl+Z / Ctrl+Y take. Unlike these
 * shortcuts, which only listen while an editor mode is active, the buttons
 * also work with no editor selected - pdf.js undoes and redoes in that mode
 * too - so they're only disabled when there's nothing to undo or redo.
 *
 * The buttons deliberately don't use the ids `undoButton` / `redoButton`:
 * the bleeding-edge pdf.js toolbar binds its own click handler to these, and
 * each click would undo twice.
 */
@Component({
    selector: 'pdf-undo-redo',
    templateUrl: './pdf-undo-redo.component.html',
    styleUrls: ['./pdf-undo-redo.component.css'],
    standalone: false
})
export class PdfUndoRedoComponent implements OnDestroy {
  public show = input<ResponsiveVisibility>(true);

  public disable = input<boolean>(false);

  public canUndo = false;

  public canRedo = false;

  private PDFViewerApplication: IPDFViewerApplication | undefined;

  private eventBusAbortController: AbortController | null = null;

  constructor(
    notificationService: PDFNotificationService,
    private readonly cdr: ChangeDetectorRef,
  ) {
    effect(() => {
      this.PDFViewerApplication = notificationService.onPDFJSInitSignal();
      if (this.PDFViewerApplication) {
        this.onPdfJsInit();
      }
    });
  }

  /**
   * Runs `callback` and re-renders this component. pdf.js event bus listeners
   * run outside Angular's zone, so nothing else triggers change detection.
   */
  private asyncWithCD(callback: () => void): () => void {
    return () => {
      callback();
      if (!(this.cdr as ViewRef).destroyed) {
        this.cdr.detectChanges();
      }
    };
  }

  private onPdfJsInit() {
    this.eventBusAbortController?.abort();
    this.eventBusAbortController = new AbortController();
    const opts = { signal: this.eventBusAbortController.signal };
    this.PDFViewerApplication?.eventBus.on(
      'editingstateschanged',
      ({ details }: EditingStatesChangedEvent) => {
        setTimeout(
          this.asyncWithCD(() => {
            if ('hasSomethingToUndo' in details) {
              this.canUndo = !!details.hasSomethingToUndo;
            }
            if ('hasSomethingToRedo' in details) {
              this.canRedo = !!details.hasSomethingToRedo;
            }
          }),
        );
      },
      opts,
    );
    // A new document comes with a new, empty undo history.
    this.PDFViewerApplication?.eventBus.on(
      'documentloaded',
      () => {
        setTimeout(
          this.asyncWithCD(() => {
            this.canUndo = false;
            this.canRedo = false;
          }),
        );
      },
      opts,
    );
  }

  public ngOnDestroy(): void {
    this.eventBusAbortController?.abort();
  }

  public onUndo = (): void => {
    this.PDFViewerApplication?.eventBus.dispatch('editingaction', { source: this, name: 'undo' });
  };

  public onRedo = (): void => {
    this.PDFViewerApplication?.eventBus.dispatch('editingaction', { source: this, name: 'redo' });
  };
}
