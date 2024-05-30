import { Component, EventEmitter, Input, NgZone, Output, effect } from '@angular/core';
import { ScrollMode } from '../../options/pdf-scroll-mode';
import { PageViewModeType, ScrollModeType } from '../../options/pdf-viewer';
import { IPDFViewerApplication } from '../../options/pdf-viewer-application';
import { PDFNotificationService } from '../../pdf-notification-service';
import { ResponsiveVisibility } from '../../responsive-visibility';

@Component({
  selector: 'pdf-single-page-mode',
  templateUrl: './pdf-single-page-mode.component.html',
  styleUrls: ['./pdf-single-page-mode.component.css'],
})
export class PdfSinglePageModeComponent {
  @Input()
  public show: ResponsiveVisibility = true;

  @Input()
  public scrollMode: ScrollModeType;

  @Input()
  public pageViewMode: PageViewModeType;

  @Output()
  public pageViewModeChange = new EventEmitter<PageViewModeType>();

  public onClick: () => void;

  constructor(private notificationService: PDFNotificationService, private ngZone: NgZone) {
    effect(() => {
      if (notificationService.onPDFJSInitSignal()) {
        this.onPdfJsInit();
      }
    });

    this.onClick = () => {
      ngZone.run(() => {
        const PDFViewerApplication: IPDFViewerApplication = (window as any).PDFViewerApplication;
        PDFViewerApplication.eventBus.dispatch('switchscrollmode', { mode: ScrollMode.PAGE });
      });
    };
  }

  public onPdfJsInit(): void {
    const PDFViewerApplication: IPDFViewerApplication = (window as any).PDFViewerApplication;
    PDFViewerApplication.eventBus.on('switchscrollmode', (event) => {
      this.ngZone.run(() => {
        this.scrollMode = event.mode;
      });
    });
  }
}
