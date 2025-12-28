import { ChangeDetectorRef, Component, input, effect } from '@angular/core';
import { PositioningService } from '../../dynamic-css/positioning.service';
import { AnnotationEditorEditorModeChangedEvent } from '../../events/annotation-editor-mode-changed-event';
import { FocusManagementService } from '../../focus-management.service';
import { AnnotationEditorType } from '../../options/editor-annotations';
import { IPDFViewerApplication } from '../../options/pdf-viewer-application';
import { PDFNotificationService } from '../../pdf-notification-service';
import { ResponsiveVisibility } from '../../responsive-visibility';

@Component({
    selector: 'pdf-text-editor',
    templateUrl: './pdf-text-editor.component.html',
    styleUrls: ['./pdf-text-editor.component.css'],
    standalone: false
})
export class PdfTextEditorComponent {
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
        this.isSelected = mode === 3;

        // Focus management
        if (!wasSelected && this.isSelected) {
          // Dialog just opened
          this.focusManagement.moveFocusToDialog('editorFreeTextParamsToolbar', 'Text editor toolbar opened', 'primaryEditorFreeText');
        } else if (wasSelected && !this.isSelected) {
          // Dialog just closed
          this.focusManagement.returnFocusToPrevious('Text editor toolbar closed');
        }
      }));
    });
  }

  public onClick = (event?: Event): void => {
    const currentMode = this.PDFViewerApplication?.pdfViewer.annotationEditorMode;
    this.PDFViewerApplication?.eventBus.dispatch('switchannotationeditormode', {
      source: this,
      mode: currentMode === AnnotationEditorType.FREETEXT ? AnnotationEditorType.NONE : AnnotationEditorType.FREETEXT,
      isFromKeyboard: (event as PointerEvent)?.detail === 0,
    });
    const positioningService = new PositioningService();
    positioningService.positionPopupBelowItsButton('primaryEditorFreeText', 'editorFreeTextParamsToolbar');
  }
}
