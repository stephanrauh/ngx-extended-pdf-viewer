import { Component, Input } from '@angular/core';
import { HandtoolChanged } from '../../events/handtool-changed';
import { IPDFViewerApplication } from '../../options/pdf-viewer-application';
import { PDFNotificationService } from '../../pdf-notification-service';
import { ResponsiveVisibility } from '../../responsive-visibility';
import { PdfCursorTools } from './../../options/pdf-cursor-tools';

@Component({
  selector: 'pdf-hand-tool',
  templateUrl: './pdf-hand-tool.component.html',
  styleUrls: ['./pdf-hand-tool.component.css'],
})
export class PdfHandToolComponent {
  @Input()
  public showHandToolButton: ResponsiveVisibility = true;

  public isSelected = false;

  constructor(private notificationService: PDFNotificationService) {
    const subscription = this.notificationService.onPDFJSInit.subscribe(() => {
      this.onPdfJsInit();
      subscription.unsubscribe();
    });
  }

  private onPdfJsInit() {
    const PDFViewerApplication: IPDFViewerApplication = (window as any).PDFViewerApplication;
    PDFViewerApplication.eventBus.on('cursortoolchanged', ({ tool }: HandtoolChanged) => (this.isSelected = tool === PdfCursorTools.HAND));
  }

  public onClick(): void {
    const PDFViewerApplication: IPDFViewerApplication = (window as any).PDFViewerApplication;
    PDFViewerApplication.eventBus.dispatch('switchcursortool', { tool: PdfCursorTools.HAND });
  }
}
