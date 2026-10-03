import { ChangeDetectorRef, Component, effect, input, OnDestroy, ViewRef } from '@angular/core';
import { PositioningService } from '../../dynamic-css/positioning.service';
import { AnnotationEditorEditorModeChangedEvent } from '../../events/annotation-editor-mode-changed-event';
import { FocusManagementService } from '../../focus-management.service';
import { AnnotationEditorType } from '../../options/editor-annotations';
import { IPDFViewerApplication } from '../../options/pdf-viewer-application';
import { PDFNotificationService } from '../../pdf-notification-service';
import { ResponsiveVisibility } from '../../responsive-visibility';

/**
 * stephanrauh/pdf.js#14: the eraser button. It erases parts of drawings and
 * free-hand highlights. The eraser only exists in the bleeding-edge bundle
 * (pdf.js 6.3 and up); the parent component doesn't render this button with
 * the stable bundle.
 */
@Component({
    selector: 'pdf-eraser-editor',
    templateUrl: './pdf-eraser-editor.component.html',
    styleUrls: ['./pdf-eraser-editor.component.css'],
    standalone: false
})
export class PdfEraserEditorComponent implements OnDestroy {
  public show = input<ResponsiveVisibility>(true);

  public disable = input<boolean>(false);

  public isSelected = false;

  private PDFViewerApplication: IPDFViewerApplication | undefined;

  private eventBusAbortController: AbortController | null = null;

  constructor(
    notificationService: PDFNotificationService,
    private readonly focusManagement: FocusManagementService,
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
   * Runs `callback` and re-renders this component. The callback is scheduled
   * from a pdf.js event bus listener, which runs outside Angular's zone (see
   * the Draw button for the details).
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
    this.PDFViewerApplication?.eventBus.on('annotationeditormodechanged', ({ mode }: AnnotationEditorEditorModeChangedEvent) => {
      setTimeout(this.asyncWithCD(() => {
        const wasSelected = this.isSelected;
        this.isSelected = mode === AnnotationEditorType.ERASER;

        if (!wasSelected && this.isSelected) {
          this.focusManagement.moveFocusToDialog('editorEraserParamsToolbar', 'Eraser toolbar opened', 'primaryEditorEraser');
        } else if (wasSelected && !this.isSelected) {
          this.focusManagement.returnFocusToPrevious('Eraser toolbar closed');
        }
      }));
    }, opts);
  }

  public ngOnDestroy(): void {
    this.eventBusAbortController?.abort();
  }

  public onClick = (event?: Event): void => {
    const currentMode = this.PDFViewerApplication?.pdfViewer.annotationEditorMode;
    this.PDFViewerApplication?.eventBus.dispatch('switchannotationeditormode', {
      source: this,
      mode: currentMode === AnnotationEditorType.ERASER ? AnnotationEditorType.NONE : AnnotationEditorType.ERASER,
      isFromKeyboard: (event as PointerEvent)?.detail === 0,
    });
    const positioningService = new PositioningService();
    positioningService.positionPopupBelowItsButton('primaryEditorEraser', 'editorEraserParamsToolbar');
  };
}
