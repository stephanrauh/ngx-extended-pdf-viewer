import { ChangeDetectorRef, Component, Input, effect } from '@angular/core';
import { PositioningService } from '../../dynamic-css/positioning.service';
import { AnnotationEditorEditorModeChangedEvent } from '../../events/annotation-editor-mode-changed-event';
import { FocusManagementService } from '../../focus-management.service';
import { AnnotationEditorType } from '../../options/editor-annotations';
import { getVersionSuffix, pdfDefaultOptions } from '../../options/pdf-default-options';
import { IPDFViewerApplication } from '../../options/pdf-viewer-application';
import { PDFNotificationService } from '../../pdf-notification-service';
import { ResponsiveVisibility } from '../../responsive-visibility';

@Component({
    selector: 'pdf-stamp-editor',
    templateUrl: './pdf-stamp-editor.component.html',
    styleUrls: ['./pdf-stamp-editor.component.css'],
    standalone: false
})
export class PdfStampEditorComponent {
  @Input()
  public show: ResponsiveVisibility = true;

  public isSelected = false;

  private PDFViewerApplication: IPDFViewerApplication | undefined;

  public get pdfJsVersion(): string {
    return getVersionSuffix(pdfDefaultOptions.assetsFolder);
  }

  constructor(
    notificationService: PDFNotificationService,
    private cdr: ChangeDetectorRef,
    private positioningService: PositioningService,
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
        this.isSelected = mode === 13;

        // Focus management
        if (!wasSelected && this.isSelected) {
          // Dialog just opened
          this.focusManagement.moveFocusToDialog('editorStampParamsToolbar', 'Stamp editor toolbar opened', 'primaryEditorStamp');
        } else if (wasSelected && !this.isSelected) {
          // Dialog just closed
          this.focusManagement.returnFocusToPrevious('Stamp editor toolbar closed');
        }

        this.cdr.detectChanges();
      });
    });
  }

  public onClick(event: PointerEvent): void {
    const currentMode = this.PDFViewerApplication?.pdfViewer.annotationEditorMode;
    this.PDFViewerApplication?.eventBus.dispatch('switchannotationeditormode', {
      source: this,
      mode: currentMode === AnnotationEditorType.STAMP ? AnnotationEditorType.NONE : AnnotationEditorType.STAMP,
      isFromKeyboard: event.detail === 0,
    });
    const positioningService = new PositioningService();
    positioningService.positionPopupBelowItsButton('primaryEditorStamp', 'editorStampParamsToolbar');
  }
}
