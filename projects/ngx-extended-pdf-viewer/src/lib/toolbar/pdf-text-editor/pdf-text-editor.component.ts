import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { AnnotationEditorEditorModeChangedEvent } from '../../events/annotation-editor-mode-changed-event';
import { IPDFViewerApplication } from '../../options/pdf-viewer-application';
import { PDFNotificationService } from '../../pdf-notification-service';
import { ResponsiveVisibility } from '../../responsive-visibility';

@Component({
  selector: 'pdf-text-editor',
  templateUrl: './pdf-text-editor.component.html',
  styleUrls: ['./pdf-text-editor.component.css'],
})
export class PdfTextEditorComponent {
  @Input()
  public show: ResponsiveVisibility = true;

  public isSelected = false;

  constructor(private notificationService: PDFNotificationService, private cdr: ChangeDetectorRef) {
    const subscription = this.notificationService.onPDFJSInit.subscribe(() => {
      this.onPdfJsInit();
      subscription.unsubscribe();
    });
  }

  private onPdfJsInit() {
    const PDFViewerApplication: IPDFViewerApplication = (window as any).PDFViewerApplication;
    PDFViewerApplication.eventBus.on('annotationeditormodechanged', ({ mode }: AnnotationEditorEditorModeChangedEvent) => {
      setTimeout(() => {
        this.isSelected = mode === 3;
        this.cdr.detectChanges();
      });
    });
  }

  public onClick(): void {
    document.getElementById('editorFreeText')?.click();
  }
}
