import { ChangeDetectorRef, Component, effect, input } from '@angular/core';
import { PositioningService } from '../../dynamic-css/positioning.service';
import { AnnotationEditorEditorModeChangedEvent } from '../../events/annotation-editor-mode-changed-event';
import { FocusManagementService } from '../../focus-management.service';
import { AnnotationEditorType } from '../../options/editor-annotations';
import { IPDFViewerApplication } from '../../options/pdf-viewer-application';
import { PDFNotificationService } from '../../pdf-notification-service';
import { ResponsiveVisibility } from '../../responsive-visibility';

@Component({
    selector: 'pdf-comment-editor',
    templateUrl: './pdf-comment-editor.component.html',
    styleUrls: ['./pdf-comment-editor.component.css'],
    standalone: false
})
export class PdfCommentEditorComponent {
  public show = input<ResponsiveVisibility>(true);

  public isSelected = false;
  private PDFViewerApplication: IPDFViewerApplication | undefined;

  constructor(
    notificationService: PDFNotificationService,
    private focusManagement: FocusManagementService,
    private cdr: ChangeDetectorRef,
  ) {
    effect(() => {
      this.PDFViewerApplication = notificationService.onPDFJSInitSignal();
      if (this.PDFViewerApplication) {
        this.onPdfJsInit();
      }
    });
  }

  private isZoneless(): boolean {
    const Zone = (globalThis as any).Zone;
    return typeof Zone === 'undefined' || !Zone?.current;
  }

  private asyncWithCD(callback: () => void): () => void {
    return () => {
      callback();
      if (this.isZoneless()) {
        this.cdr.detectChanges();
      }
    };
  }

  private onPdfJsInit() {
    this.PDFViewerApplication?.eventBus.on('annotationeditormodechanged', ({ mode }: AnnotationEditorEditorModeChangedEvent) => {
      setTimeout(this.asyncWithCD(() => {
        const wasSelected = this.isSelected;
        this.isSelected = mode === AnnotationEditorType.POPUP;

        // Focus management
        if (!wasSelected && this.isSelected) {
          // Dialog just opened
          this.focusManagement.moveFocusToDialog('editorCommentParamsToolbar', 'Comment editor toolbar opened', 'editorCommentButton');
        } else if (wasSelected && !this.isSelected) {
          // Dialog just closed
          this.focusManagement.returnFocusToPrevious('Comment editor toolbar closed');
        }

        // No manual change detection needed - signals handle this automatically
      }));
    });
  }

  public onClick = (event?: Event): void => {
    const currentMode = this.PDFViewerApplication?.pdfViewer.annotationEditorMode;
    this.PDFViewerApplication?.eventBus.dispatch('switchannotationeditormode', {
      source: this,
      mode: currentMode === AnnotationEditorType.POPUP ? AnnotationEditorType.NONE : AnnotationEditorType.POPUP,
      isFromKeyboard: (event as PointerEvent)?.detail === 0,
    });

    // Position the comment sidebar
    const positioningService = new PositioningService();
    positioningService.positionPopupBelowItsButton('editorCommentButton', 'editorCommentParamsToolbar');
  };
}
