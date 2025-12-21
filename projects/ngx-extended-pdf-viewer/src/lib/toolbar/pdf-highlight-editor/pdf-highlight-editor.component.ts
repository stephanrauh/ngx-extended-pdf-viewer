import { ChangeDetectorRef, Component, Input, effect } from '@angular/core';
import { PositioningService } from '../../dynamic-css/positioning.service';
import { AnnotationEditorEditorModeChangedEvent } from '../../events/annotation-editor-mode-changed-event';
import { FocusManagementService } from '../../focus-management.service';
import { AnnotationEditorType } from '../../options/editor-annotations';
import { IPDFViewerApplication } from '../../options/pdf-viewer-application';
import { PDFNotificationService } from '../../pdf-notification-service';
import { ResponsiveVisibility } from '../../responsive-visibility';

@Component({
    selector: 'pdf-highlight-editor',
    templateUrl: './pdf-highlight-editor.component.html',
    styleUrls: ['./pdf-highlight-editor.component.css'],
    standalone: false
})
export class PdfHighlightEditorComponent {
  @Input()
  public show: ResponsiveVisibility = true;

  public isSelected = false;

  private PDFViewerApplication: IPDFViewerApplication | undefined;

  constructor(
    notificationService: PDFNotificationService,
    private cdr: ChangeDetectorRef,
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
        this.isSelected = mode === 9;

        // Focus management
        if (!wasSelected && this.isSelected) {
          // Dialog just opened
          this.focusManagement.moveFocusToDialog('editorHighlightParamsToolbar', 'Highlight editor toolbar opened', 'primaryEditorHighlight');
        } else if (wasSelected && !this.isSelected) {
          // Dialog just closed
          this.focusManagement.returnFocusToPrevious('Highlight editor toolbar closed');
        }

        this.cdr.detectChanges();
      });
    });
  }

  public onClick(event?: Event): void {
    const currentMode = this.PDFViewerApplication?.pdfViewer.annotationEditorMode;
    this.PDFViewerApplication?.eventBus.dispatch('switchannotationeditormode', {
      source: this,
      mode: currentMode === AnnotationEditorType.HIGHLIGHT ? AnnotationEditorType.NONE : AnnotationEditorType.HIGHLIGHT,
      isFromKeyboard: (event as PointerEvent)?.detail === 0,
    });
    const positioningService = new PositioningService();
    positioningService.positionPopupBelowItsButton('primaryEditorHighlight', 'editorHighlightParamsToolbar');
  }
}
