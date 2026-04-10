import { Component, effect, input, OnDestroy } from '@angular/core';
import { HandtoolChanged } from '../../events/handtool-changed';
import { IPDFViewerApplication } from '../../options/pdf-viewer-application';
import { PDFNotificationService } from '../../pdf-notification-service';
import { ResponsiveVisibility } from '../../responsive-visibility';
import { PdfCursorTools } from './../../options/pdf-cursor-tools';

// #3140 added by ngx-extended-pdf-viewer
@Component({
    selector: 'pdf-page-flip-tool',
    templateUrl: './pdf-page-flip-tool.component.html',
    styleUrls: ['./pdf-page-flip-tool.component.css'],
    standalone: false
})
export class PdfPageFlipToolComponent implements OnDestroy {
  public showPageFlipButton = input<ResponsiveVisibility>(false);

  public disable = input<boolean>(false);

  private PDFViewerApplication: IPDFViewerApplication | undefined;

  public isSelected = false;

  private eventBusAbortController: AbortController | null = null;

  constructor(notificationService: PDFNotificationService) {
    effect(() => {
      this.PDFViewerApplication = notificationService.onPDFJSInitSignal();
      if (this.PDFViewerApplication) {
        this.onPdfJsInit();
      }
    });
  }

  private onPdfJsInit() {
    this.eventBusAbortController?.abort();
    this.eventBusAbortController = new AbortController();
    const opts = { signal: this.eventBusAbortController.signal };
    this.PDFViewerApplication?.eventBus.on('cursortoolchanged', ({ tool }: HandtoolChanged) => (this.isSelected = tool === PdfCursorTools.PAGE_FLIP), opts);
    // #3140: Read current tool state — may have missed the initial cursortoolchanged event
    const activeTool = (this.PDFViewerApplication as any)?.pdfCursorTools?.activeTool;
    if (activeTool !== undefined) {
      this.isSelected = activeTool === PdfCursorTools.PAGE_FLIP;
    }
  }

  public ngOnDestroy(): void {
    this.eventBusAbortController?.abort();
  }

  public onClick = (): void => {
    this.PDFViewerApplication?.eventBus.dispatch('switchcursortool', { tool: PdfCursorTools.PAGE_FLIP });
  };
}
// #3140 end of addition by ngx-extended-pdf-viewer
