import { Component, Input, OnInit } from '@angular/core';
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
export class PdfStampEditorComponent implements OnInit {
  @Input()
  public show: ResponsiveVisibility = true;

  public isSelected = false;

  public pdfJsVersion = getVersionSuffix(pdfDefaultOptions.assetsFolder);

  constructor(private notificationService: PDFNotificationService) {
    const subscription = this.notificationService.onPDFJSInit.subscribe(() => {
      this.onPdfJsInit();
      subscription.unsubscribe();
    });
  }

  public ngOnInit(): void {
    this.pdfJsVersion = getVersionSuffix(pdfDefaultOptions.assetsFolder);
  }

  private onPdfJsInit() {
    const PDFViewerApplication: IPDFViewerApplication = (window as any).PDFViewerApplication;
    PDFViewerApplication.eventBus.on('annotationeditormodechanged', ({ mode }: AnnotationEditorEditorModeChangedEvent) => (this.isSelected = mode === 13));
  }

  public onClick(): void {
    document.getElementById('editorStamp')?.click();
    // const PDFViewerApplication: IPDFViewerApplication = (window as any).PDFViewerApplication;
    // PDFViewerApplication.eventBus.dispatch('annotationeditormodechanged', { mode: 13 });
  }
}
