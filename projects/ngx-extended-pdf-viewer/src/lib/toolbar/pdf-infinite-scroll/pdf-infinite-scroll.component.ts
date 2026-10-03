import { ChangeDetectorRef, Component, effect, input, model, OnDestroy, ViewRef } from '@angular/core';
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

  // #2818 modified by ngx-extended-pdf-viewer
  public disable = input<boolean>(false);
  // #2818 end of modification by ngx-extended-pdf-viewer

  public pageViewMode = model.required<PageViewModeType>();

  public scrollMode = input.required<ScrollModeType>();

  public onClick?: (() => void) | undefined;

  private PDFViewerApplication: IPDFViewerApplication | undefined;

  constructor(public notificationService: PDFNotificationService, private readonly cdr: ChangeDetectorRef) {
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

  /**
   * Runs `callback` and re-renders this component.
   *
   * The callback is scheduled from a pdf.js event bus listener, which runs
   * outside Angular's zone, so neither zone.js nor a signal write schedules a
   * change detection run for us - the button kept showing the previous state
   * until an unrelated click happened to trigger one. The view can already be
   * destroyed by the time a queued callback runs, and `detectChanges()` throws
   * on a destroyed view, so that case is skipped.
   */
  private asyncWithCD(callback: () => void): () => void {
    return () => {
      callback();
      if (!(this.cdr as ViewRef).destroyed) {
        this.cdr.detectChanges();
      }
    };
  }

  public ngOnDestroy(): void {
    this.onClick = undefined;
  }
}
