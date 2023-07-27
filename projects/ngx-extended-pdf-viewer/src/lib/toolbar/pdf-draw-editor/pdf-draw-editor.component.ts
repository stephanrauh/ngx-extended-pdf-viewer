import { Component, Input, OnInit } from '@angular/core';
import { AnnotationEditorEditorModeChangedEvent } from '../../events/annotation-editor-mode-changed-event';
import { getVersionSuffix, pdfDefaultOptions } from '../../options/pdf-default-options';
import { IPDFViewerApplication } from '../../options/pdf-viewer-application';
import { PDFNotificationService } from '../../pdf-notification-service';
import { ResponsiveVisibility } from '../../responsive-visibility';

@Component({
  selector: 'pdf-draw-editor',
  templateUrl: './pdf-draw-editor.component.html',
  styleUrls: ['./pdf-draw-editor.component.css'],
})
export class PdfDrawEditorComponent implements OnInit {
  @Input()
  public show: ResponsiveVisibility = true;

  public pdfJsVersion = getVersionSuffix(pdfDefaultOptions.assetsFolder);

  public ngOnInit(): void {
    this.pdfJsVersion = getVersionSuffix(pdfDefaultOptions.assetsFolder);
  }

  public isSelected = false;

  constructor(private notificationService: PDFNotificationService) {
    const subscription = this.notificationService.onPDFJSInit.subscribe(() => {
      this.onPdfJsInit();
      subscription.unsubscribe();
    });
  }

  private onPdfJsInit() {
    const PDFViewerApplication: IPDFViewerApplication = (window as any).PDFViewerApplication;
    PDFViewerApplication.eventBus.on('annotationeditormodechanged', ({ mode }: AnnotationEditorEditorModeChangedEvent) => (this.isSelected = mode === 15));
  }

  public onClick(): void {
    document.getElementById('editorInk')?.click();
    // const PDFViewerApplication: IPDFViewerApplication = (window as any).PDFViewerApplication;
    // PDFViewerApplication.eventBus.dispatch('annotationeditormodechanged', { mode: 15 });
  }
}
