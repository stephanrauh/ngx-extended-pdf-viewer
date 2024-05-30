import { ChangeDetectorRef, Component, Input, effect } from '@angular/core';
import { AnnotationEditorEditorModeChangedEvent } from '../../events/annotation-editor-mode-changed-event';
import { IPDFViewerApplication } from '../../options/pdf-viewer-application';
import { PDFNotificationService } from '../../pdf-notification-service';
import { ResponsiveVisibility } from '../../responsive-visibility';

@Component({
  selector: 'pdf-draw-editor',
  templateUrl: './pdf-draw-editor.component.html',
  styleUrls: ['./pdf-draw-editor.component.css'],
})
export class PdfDrawEditorComponent {
  @Input()
  public show: ResponsiveVisibility = true;

  public isSelected = false;

  constructor(private notificationService: PDFNotificationService, private cdr: ChangeDetectorRef) {
    effect(() => {
      if (notificationService.onPDFJSInitSignal()) {
        this.onPdfJsInit();
      }
    });
  }

  private onPdfJsInit() {
    const PDFViewerApplication: IPDFViewerApplication = (window as any).PDFViewerApplication;
    PDFViewerApplication.eventBus.on('annotationeditormodechanged', ({ mode }: AnnotationEditorEditorModeChangedEvent) => {
      setTimeout(() => {
        this.isSelected = mode === 15;
        this.cdr.detectChanges();
      });
    });
  }

  public onClick(): void {
    document.getElementById('editorInk')?.click();
  }
}
