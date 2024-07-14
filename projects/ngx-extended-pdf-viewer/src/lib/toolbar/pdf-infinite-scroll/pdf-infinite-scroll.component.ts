import { Component, effect, EventEmitter, Input, NgZone, Output } from '@angular/core';
import { ScrollMode } from '../../options/pdf-scroll-mode';
import { PageViewModeType, ScrollModeType } from '../../options/pdf-viewer';
import { IPDFViewerApplication } from '../../options/pdf-viewer-application';
import { PDFNotificationService } from '../../pdf-notification-service';
import { ResponsiveVisibility } from '../../responsive-visibility';

@Component({
  selector: 'pdf-infinite-scroll',
  templateUrl: './pdf-infinite-scroll.component.html',
  styleUrls: ['./pdf-infinite-scroll.component.css'],
})
export class PdfInfiniteScrollComponent {
  @Input()
  public show: ResponsiveVisibility = true;

  @Input()
  public pageViewMode: PageViewModeType;

  @Input()
  public scrollMode: ScrollModeType;

  @Output()
  public pageViewModeChange = new EventEmitter<PageViewModeType>();

  public onClick: () => void;

  private PDFViewerApplication: IPDFViewerApplication | undefined;

  constructor(private ngZone: NgZone, public notificationService: PDFNotificationService) {
    effect(() => {
      this.PDFViewerApplication = notificationService.onPDFJSInitSignal();
    });
    const emitter = this.pageViewModeChange;
    this.onClick = () => {
      this.ngZone.run(() => {
        if (this.pageViewMode === 'infinite-scroll') {
          emitter.emit('multiple');
        } else {
          if (this.scrollMode !== ScrollModeType.wrapped && this.scrollMode !== ScrollModeType.vertical) {
            this.PDFViewerApplication?.eventBus.dispatch('switchscrollmode', { mode: ScrollMode.VERTICAL });
          }
          emitter.emit('infinite-scroll');
        }
      });
    };
  }
}
