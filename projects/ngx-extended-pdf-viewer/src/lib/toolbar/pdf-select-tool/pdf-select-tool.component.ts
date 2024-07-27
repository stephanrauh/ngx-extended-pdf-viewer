import { Component, Input, effect } from '@angular/core';
import { HandtoolChanged } from '../../events/handtool-changed';
import { IPDFViewerApplication } from '../../options/pdf-viewer-application';
import { PDFNotificationService } from '../../pdf-notification-service';
import { ResponsiveVisibility } from '../../responsive-visibility';
import { PdfCursorTools } from './../../options/pdf-cursor-tools';

@Component({
  selector: 'pdf-select-tool',
  templateUrl: './pdf-select-tool.component.html',
  styleUrls: ['./pdf-select-tool.component.css'],
})
export class PdfSelectToolComponent {
  @Input()
  public showSelectToolButton: ResponsiveVisibility = true;

  public isSelected = true;

  @Input()
  public set handTool(value: boolean) {
    this.isSelected = !value;
  }

  private PDFViewerApplication: IPDFViewerApplication | undefined;

  constructor(notificationService: PDFNotificationService) {
    effect(() => {
      this.PDFViewerApplication = notificationService.onPDFJSInitSignal();
      if (this.PDFViewerApplication) {
        this.onPdfJsInit();
      }
    });
  }

  private onPdfJsInit() {
    this.PDFViewerApplication?.eventBus.on('cursortoolchanged', ({ tool }: HandtoolChanged) => (this.isSelected = tool === PdfCursorTools.SELECT));
  }

  public onClick(): void {
    this.PDFViewerApplication?.eventBus.dispatch('switchcursortool', { tool: PdfCursorTools.SELECT });
  }
}
