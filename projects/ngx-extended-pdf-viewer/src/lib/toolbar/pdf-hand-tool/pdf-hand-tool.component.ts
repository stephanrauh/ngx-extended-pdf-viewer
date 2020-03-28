import { PdfCursorTools } from './../../options/pdf-cursor-tools';
import { Component, Input } from '@angular/core';
import { IPDFViewerApplication } from '../../options/pdf-viewer-application';
import { PDFNotificationService } from '../../pdf-notification-service';
import { HandtoolChanged } from '../../events/handtool-changed';

@Component({
  selector: 'pdf-hand-tool',
  templateUrl: './pdf-hand-tool.component.html',
  styleUrls: ['./pdf-hand-tool.component.css']
})
export class PdfHandToolComponent {
  @Input()
  public showHandToolButton = true;

  public isSelected = false;

  constructor(private notificationService: PDFNotificationService) {
    const subscription = this.notificationService.onPDFJSInit.subscribe(() => {
      this.onPdfJsInit();
      subscription.unsubscribe();
    });
  }

  private onPdfJsInit() {
    const PDFViewerApplication: IPDFViewerApplication = (window as any).PDFViewerApplication;
    PDFViewerApplication.eventBus.on('cursortoolchanged',
      ({ tool }: HandtoolChanged) => (this.isSelected = tool === PdfCursorTools.HAND));
  }

  public onClick(): void {
    const PDFViewerApplication: IPDFViewerApplication = (window as any).PDFViewerApplication;
    PDFViewerApplication.eventBus.dispatch('switchcursortool', { tool: PdfCursorTools.HAND });
  }
}
