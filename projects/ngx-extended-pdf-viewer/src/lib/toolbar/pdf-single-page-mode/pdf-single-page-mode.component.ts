import { Component, EventEmitter, Input, OnDestroy, Output, effect } from '@angular/core';
import { ScrollMode } from '../../options/pdf-scroll-mode';
import { PageViewModeType, ScrollModeType } from '../../options/pdf-viewer';
import { IPDFViewerApplication } from '../../options/pdf-viewer-application';
import { PDFNotificationService } from '../../pdf-notification-service';
import { ResponsiveVisibility } from '../../responsive-visibility';

@Component({
    selector: 'pdf-single-page-mode',
    templateUrl: './pdf-single-page-mode.component.html',
    styleUrls: ['./pdf-single-page-mode.component.css'],
    standalone: false
})
export class PdfSinglePageModeComponent implements OnDestroy {
  @Input()
  public show: ResponsiveVisibility = true;

  @Input()
  public scrollMode!: ScrollModeType;

  @Input()
  public pageViewMode!: PageViewModeType;

  @Output()
  public pageViewModeChange = new EventEmitter<PageViewModeType>();

  public onClick?: () => void;

  private PDFViewerApplication: IPDFViewerApplication | undefined;

  constructor(notificationService: PDFNotificationService) {
    effect(() => {
      this.PDFViewerApplication = notificationService.onPDFJSInitSignal();
      if (this.PDFViewerApplication) {
        this.onPdfJsInit();
      }
    });

    this.onClick = () => {
      queueMicrotask(() => {
        this.PDFViewerApplication?.eventBus.dispatch('switchscrollmode', { mode: ScrollMode.PAGE });
      });
    };
  }

  public onPdfJsInit(): void {
    this.PDFViewerApplication?.eventBus.on('switchscrollmode', (event) => {
      queueMicrotask(() => {
        this.scrollMode = event.mode;
      });
    });
  }

  public ngOnDestroy(): void {
    this.onClick = undefined;
  }
}
