import { ChangeDetectorRef, Component, effect, input, model, OnDestroy } from '@angular/core';
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

  // #3135 modified by ngx-extended-pdf-viewer
  private eventBusAbortController: AbortController | null = null;
  // #3135 end of modification by ngx-extended-pdf-viewer

  constructor(notificationService: PDFNotificationService, private cdr: ChangeDetectorRef) {
    effect(() => {
      this.PDFViewerApplication = notificationService.onPDFJSInitSignal();
      if (this.PDFViewerApplication) {
        this.onPdfJsInit();
      }
    });
    this.onClick = () => {
      queueMicrotask(this.asyncWithCD(() => {
        const currentViewMode = this.pageViewMode();
        if (currentViewMode !== 'multiple' && currentViewMode !== 'infinite-scroll') {
          this.pageViewMode.set('multiple');
        }
        this.PDFViewerApplication?.eventBus.dispatch('switchscrollmode', { mode: ScrollMode.VERTICAL });
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

  public onPdfJsInit(): void {
    // #3135 modified by ngx-extended-pdf-viewer
    this.eventBusAbortController?.abort();
    this.eventBusAbortController = new AbortController();
    const opts = { signal: this.eventBusAbortController.signal };
    // #3135 end of modification by ngx-extended-pdf-viewer
    this.PDFViewerApplication?.eventBus.on('switchscrollmode', () => {
      queueMicrotask(this.asyncWithCD(() => {
        // scrollMode is read-only input, parent component updates it via binding
      }));
    }, opts);
  }

  public ngOnDestroy(): void {
    this.onClick = undefined;
    // #3135 modified by ngx-extended-pdf-viewer
    this.eventBusAbortController?.abort();
    // #3135 end of modification by ngx-extended-pdf-viewer
  }
}
