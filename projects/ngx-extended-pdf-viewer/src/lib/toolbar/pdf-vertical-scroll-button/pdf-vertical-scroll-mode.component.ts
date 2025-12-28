import { Component, effect, input, model, OnDestroy } from '@angular/core';
import { ScrollMode } from '../../options/pdf-scroll-mode';
import { PageViewModeType, ScrollModeType } from '../../options/pdf-viewer';
import { IPDFViewerApplication } from '../../options/pdf-viewer-application';
import { PDFNotificationService } from '../../pdf-notification-service';
import { ResponsiveVisibility } from '../../responsive-visibility';

@Component({
    selector: 'pdf-vertical-scroll-mode',
    templateUrl: './pdf-vertical-scroll-mode.component.html',
    styleUrls: ['./pdf-vertical-scroll-mode.component.css'],
    standalone: false
})
export class PdfVerticalScrollModeComponent implements OnDestroy {
  public show = input<ResponsiveVisibility>(true);

  public scrollMode = input.required<ScrollModeType>();

  public pageViewMode = model.required<PageViewModeType>();

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
        const currentViewMode = this.pageViewMode();
        if (currentViewMode !== 'multiple' && currentViewMode !== 'infinite-scroll') {
          this.pageViewMode.set('multiple');
        }
        this.PDFViewerApplication?.eventBus.dispatch('switchscrollmode', { mode: ScrollMode.VERTICAL });
      });
    };
  }

  public onPdfJsInit(): void {
    this.PDFViewerApplication?.eventBus.on('switchscrollmode', () => {
      queueMicrotask(() => {
        // scrollMode is read-only input, parent component updates it via binding
      });
    });
  }

  public ngOnDestroy(): void {
    this.onClick = undefined;
  }
}
