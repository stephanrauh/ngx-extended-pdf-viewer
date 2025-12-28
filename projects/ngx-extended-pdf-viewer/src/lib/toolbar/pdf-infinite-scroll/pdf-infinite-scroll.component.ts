import { ChangeDetectorRef, Component, effect, input, model, OnDestroy } from '@angular/core';
import { ScrollMode } from '../../options/pdf-scroll-mode';
import { PageViewModeType, ScrollModeType } from '../../options/pdf-viewer';
import { IPDFViewerApplication } from '../../options/pdf-viewer-application';
import { PDFNotificationService } from '../../pdf-notification-service';
import { ResponsiveVisibility } from '../../responsive-visibility';

@Component({
    selector: 'pdf-infinite-scroll',
    templateUrl: './pdf-infinite-scroll.component.html',
    styleUrls: ['./pdf-infinite-scroll.component.css'],
    standalone: false
})
export class PdfInfiniteScrollComponent implements OnDestroy {
  public show = input<ResponsiveVisibility>(true);

  public pageViewMode = model.required<PageViewModeType>();

  public scrollMode = input.required<ScrollModeType>();

  public onClick?: () => void;

  private PDFViewerApplication: IPDFViewerApplication | undefined;

  constructor(public notificationService: PDFNotificationService, private cdr: ChangeDetectorRef) {
    effect(() => {
      this.PDFViewerApplication = notificationService.onPDFJSInitSignal();
    });
    this.onClick = () => {
      queueMicrotask(this.asyncWithCD(() => {
        const currentViewMode = this.pageViewMode();
        const currentScrollMode = this.scrollMode();
        if (currentViewMode === 'infinite-scroll') {
          this.pageViewMode.set('multiple');
        } else {
          if (currentScrollMode !== ScrollModeType.wrapped && currentScrollMode !== ScrollModeType.vertical) {
            this.PDFViewerApplication?.eventBus.dispatch('switchscrollmode', { mode: ScrollMode.VERTICAL });
          }
          this.pageViewMode.set('infinite-scroll');
        }
      }));
    };
  }

  private isZoneless(): boolean {
    const Zone = (globalThis as any).Zone;
    return typeof Zone === 'undefined' || !Zone?.current;
  }

  private asyncWithCD(callback: () => void): () => void {
    return () => {
      callback();
      if (this.isZoneless()) {
        this.cdr.detectChanges();
      }
    };
  }

  public ngOnDestroy(): void {
    this.onClick = undefined;
  }
}
