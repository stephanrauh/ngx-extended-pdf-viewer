import { Component, EventEmitter, Input, OnDestroy, Output, effect } from '@angular/core';
import { ScrollMode } from '../../options/pdf-scroll-mode';
import { PageViewModeType, ScrollModeType } from '../../options/pdf-viewer';
import { IPDFViewerApplication } from '../../options/pdf-viewer-application';
import { PDFNotificationService } from '../../pdf-notification-service';
import { ResponsiveVisibility } from '../../responsive-visibility';

@Component({
  selector: 'pdf-wrapped-scroll-mode',
  templateUrl: './pdf-wrapped-scroll-mode.component.html',
  styleUrls: ['./pdf-wrapped-scroll-mode.component.css'],
})
export class PdfWrappedScrollModeComponent implements OnDestroy {
  @Input()
  public show: ResponsiveVisibility = true;

  @Input()
  public scrollMode: ScrollModeType;

  @Input()
  public pageViewMode: PageViewModeType;

  @Output()
  public pageViewModeChange = new EventEmitter<PageViewModeType>();

  public onClick?: () => void;

  private PDFViewerApplication: IPDFViewerApplication | undefined;

  constructor(private notificationService: PDFNotificationService) {
    effect(() => {
      this.PDFViewerApplication = notificationService.onPDFJSInitSignal();
      if (this.PDFViewerApplication) {
        this.onPdfJsInit();
      }
    });
    const emitter = this.pageViewModeChange;
    this.onClick = () => {
      queueMicrotask(() => {
        if (this.pageViewMode !== 'multiple' && this.pageViewMode !== 'infinite-scroll') {
          emitter.emit('multiple');
        }
        this.PDFViewerApplication?.eventBus.dispatch('switchscrollmode', { mode: ScrollMode.WRAPPED });
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
