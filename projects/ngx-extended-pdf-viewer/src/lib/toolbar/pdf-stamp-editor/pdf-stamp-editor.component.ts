import { Component, Input } from '@angular/core';
import { AnnotationEditorEditorModeChangedEvent } from '../../events/annotation-editor-mode-changed-event';
import { getVersionSuffix, pdfDefaultOptions } from '../../options/pdf-default-options';
import { IPDFViewerApplication } from '../../options/pdf-viewer-application';
import { PDFNotificationService } from '../../pdf-notification-service';
import { ResponsiveVisibility } from '../../responsive-visibility';

@Component({
  selector: 'pdf-stamp-editor',
  templateUrl: './pdf-stamp-editor.component.html',
  styleUrls: ['./pdf-stamp-editor.component.css'],
})
export class PdfStampEditorComponent {
  @Input()
  public show: ResponsiveVisibility = true;

  public isSelected = false;

  public get pdfJsVersion(): string {
    return getVersionSuffix(pdfDefaultOptions.assetsFolder);
  }

  constructor(private notificationService: PDFNotificationService) {
    const subscription = this.notificationService.onPDFJSInit.subscribe(() => {
      this.onPdfJsInit();
      subscription.unsubscribe();
    });
  }

  private onPdfJsInit() {
    const PDFViewerApplication: IPDFViewerApplication = (window as any).PDFViewerApplication;
    PDFViewerApplication.eventBus.on('annotationeditormodechanged', ({ mode }: AnnotationEditorEditorModeChangedEvent) => (this.isSelected = mode === 13));
  }

  public onClick(): void {
    const element = document.getElementById('editorStamp');

    var clickEvent = new MouseEvent('click', {
      view: window,
      bubbles: true,
      cancelable: true,
      detail: 1,
    });

    element?.dispatchEvent(clickEvent);
  }
}
