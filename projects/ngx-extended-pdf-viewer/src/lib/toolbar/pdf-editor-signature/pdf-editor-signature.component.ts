import { ChangeDetectorRef, Component, effect, Input } from '@angular/core';
import { PositioningService } from '../../dynamic-css/positioning.service';
import { AnnotationEditorEditorModeChangedEvent } from '../../events/annotation-editor-mode-changed-event';
import { FocusManagementService } from '../../focus-management.service';
import { AnnotationEditorType } from '../../options/editor-annotations';
import { IPDFViewerApplication } from '../../options/pdf-viewer-application';
import { PDFNotificationService } from '../../pdf-notification-service';
import { ResponsiveVisibility } from '../../responsive-visibility';

@Component({
  selector: 'pdf-editor-signature',
  templateUrl: './pdf-editor-signature.component.html',
  styleUrl: './pdf-editor-signature.component.css',
})
export class PdfEditorSignatureComponent {
  @Input()
  public show: ResponsiveVisibility = true;

  public isSelected = false;

  private PDFViewerApplication: IPDFViewerApplication | undefined;

  constructor(
    notificationService: PDFNotificationService,
    private readonly cdr: ChangeDetectorRef,
    private focusManagement: FocusManagementService,
  ) {
    effect(() => {
      this.PDFViewerApplication = notificationService.onPDFJSInitSignal();
      if (this.PDFViewerApplication) {
        this.onPdfJsInit();
      }
    });
  }

  private onPdfJsInit() {
    this.PDFViewerApplication?.eventBus.on('annotationeditormodechanged', ({ mode }: AnnotationEditorEditorModeChangedEvent) => {
      setTimeout(() => {
        const wasSelected = this.isSelected;
        this.isSelected = mode === AnnotationEditorType.SIGNATURE;

        // Focus management
        if (!wasSelected && this.isSelected) {
          // Dialog just opened
          this.focusManagement.moveFocusToDialog('editorSignatureParamsToolbar', 'Signature editor toolbar opened', 'primaryEditorSignatureButton');
        } else if (wasSelected && !this.isSelected) {
          // Dialog just closed
          this.focusManagement.returnFocusToPrevious('Signature editor toolbar closed');
        }

        this.cdr.detectChanges();
      });
    });
  }

  public onClick(event: PointerEvent): void {
    const currentMode = this.PDFViewerApplication?.pdfViewer.annotationEditorMode;
    this.PDFViewerApplication?.eventBus.dispatch('switchannotationeditormode', {
      source: this,
      mode: currentMode === AnnotationEditorType.SIGNATURE ? AnnotationEditorType.NONE : AnnotationEditorType.SIGNATURE,
      isFromKeyboard: event.detail === 0,
    });
    const positioningService = new PositioningService();
    positioningService.positionPopupBelowItsButton('primaryEditorSignatureButton', 'editorSignatureParamsToolbar');
  }
}
