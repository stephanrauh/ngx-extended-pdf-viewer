import { Component, effect, input, OnDestroy } from '@angular/core';
import { HandtoolChanged } from '../../events/handtool-changed';
import { IPDFViewerApplication } from '../../options/pdf-viewer-application';
import { PDFNotificationService } from '../../pdf-notification-service';
import { ResponsiveVisibility } from '../../responsive-visibility';
import { PdfCursorTools } from './../../options/pdf-cursor-tools';

@Component({
    selector: 'pdf-hand-tool',
    templateUrl: './pdf-hand-tool.component.html',
    styleUrls: ['./pdf-hand-tool.component.css'],
    standalone: false
})
export class PdfHandToolComponent implements OnDestroy {
  public showHandToolButton = input<ResponsiveVisibility>(true);

  public handTool = input<boolean>(false);

  private PDFViewerApplication: IPDFViewerApplication | undefined;

  public isSelected = false;

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

    // Effect to sync handTool input to isSelected
    effect(() => {
      this.isSelected = this.handTool();
    });
  }

  private onPdfJsInit() {
    // #3135 modified by ngx-extended-pdf-viewer
    this.eventBusAbortController?.abort();
    this.eventBusAbortController = new AbortController();
    const opts = { signal: this.eventBusAbortController.signal };
    // #3135 end of modification by ngx-extended-pdf-viewer
    this.PDFViewerApplication?.eventBus.on('cursortoolchanged', ({ tool }: HandtoolChanged) => (this.isSelected = tool === PdfCursorTools.HAND), opts);
  }

  // #3135 modified by ngx-extended-pdf-viewer
  public ngOnDestroy(): void {
    this.eventBusAbortController?.abort();
  }
  // #3135 end of modification by ngx-extended-pdf-viewer

  public onClick = (): void => {
    this.PDFViewerApplication?.eventBus.dispatch('switchcursortool', { tool: PdfCursorTools.HAND });
  };
}
