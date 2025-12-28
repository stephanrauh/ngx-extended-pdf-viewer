import { ChangeDetectorRef, Component, effect, input } from '@angular/core';
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
        this.isSelected = mode === 9;

        // Focus management
        if (!wasSelected && this.isSelected) {
          // Dialog just opened
          this.focusManagement.moveFocusToDialog('editorHighlightParamsToolbar', 'Highlight editor toolbar opened', 'primaryEditorHighlight');
        } else if (wasSelected && !this.isSelected) {
          // Dialog just closed
          this.focusManagement.returnFocusToPrevious('Highlight editor toolbar closed');
        }

        // No manual change detection needed - signals handle this automatically
      }));
    });
  }

  public onClick = (event?: Event): void => {
    const currentMode = this.PDFViewerApplication?.pdfViewer.annotationEditorMode;
    this.PDFViewerApplication?.eventBus.dispatch('switchannotationeditormode', {
      source: this,
      mode: currentMode === AnnotationEditorType.HIGHLIGHT ? AnnotationEditorType.NONE : AnnotationEditorType.HIGHLIGHT,
      isFromKeyboard: (event as PointerEvent)?.detail === 0,
    });
    const positioningService = new PositioningService();
    positioningService.positionPopupBelowItsButton('primaryEditorHighlight', 'editorHighlightParamsToolbar');
  };
}
