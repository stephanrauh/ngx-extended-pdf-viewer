import { Component, Input, effect } from '@angular/core';
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

  @Input()
  public set handTool(value: boolean) {
    this.isSelected = value;
  }

  public isSelected = false;

  constructor(private notificationService: PDFNotificationService) {
    effect(() => {
      if (notificationService.onPDFJSInitSignal()) {
        this.onPdfJsInit();
      }
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
