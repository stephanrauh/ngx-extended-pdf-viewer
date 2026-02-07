import { Component, input, effect, OnDestroy } from '@angular/core';
import { HandtoolChanged } from '../../events/handtool-changed';
import { IPDFViewerApplication } from '../../options/pdf-viewer-application';
import { PDFNotificationService } from '../../pdf-notification-service';
import { ResponsiveVisibility } from '../../responsive-visibility';
import { PdfCursorTools } from './../../options/pdf-cursor-tools';

@Component({
    selector: 'pdf-select-tool',
    templateUrl: './pdf-select-tool.component.html',
    styleUrls: ['./pdf-select-tool.component.css'],
    standalone: false
})
export class PdfSelectToolComponent implements OnDestroy {
  public showSelectToolButton = input<ResponsiveVisibility>(true);

  public isSelected = true;

  public handTool = input(false);

  private PDFViewerApplication: IPDFViewerApplication | undefined;

  // #3135 modified by ngx-extended-pdf-viewer
  private eventBusAbortController: AbortController | null = null;
  // #3135 end of modification by ngx-extended-pdf-viewer

  constructor(notificationService: PDFNotificationService) {
    effect(() => {
      this.PDFViewerApplication = notificationService.onPDFJSInitSignal();
      if (this.PDFViewerApplication) {
        this.onPdfJsInit();
      }
    });

    effect(() => {
      this.isSelected = !this.handTool();
    });
  }

  private onPdfJsInit() {
    // #3135 modified by ngx-extended-pdf-viewer
    this.eventBusAbortController?.abort();
    this.eventBusAbortController = new AbortController();
    const opts = { signal: this.eventBusAbortController.signal };
    // #3135 end of modification by ngx-extended-pdf-viewer
    this.PDFViewerApplication?.eventBus.on('cursortoolchanged', ({ tool }: HandtoolChanged) => (this.isSelected = tool === PdfCursorTools.SELECT), opts);
  }

  // #3135 modified by ngx-extended-pdf-viewer
  public ngOnDestroy(): void {
    this.eventBusAbortController?.abort();
  }
  // #3135 end of modification by ngx-extended-pdf-viewer

  public onClick = (): void => {
    this.PDFViewerApplication?.eventBus.dispatch('switchcursortool', { tool: PdfCursorTools.SELECT });
  };
}
