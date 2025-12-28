import { ChangeDetectorRef, Component, effect, input, model, OnDestroy } from '@angular/core';
import { ScrollMode } from '../../options/pdf-scroll-mode';
import { PageViewModeType, ScrollModeType } from '../../options/pdf-viewer';
import { IPDFViewerApplication } from '../../options/pdf-viewer-application';
import { PDFNotificationService } from '../../pdf-notification-service';
import { ResponsiveVisibility } from '../../responsive-visibility';

@Component({
    selector: 'pdf-horizontal-scroll',
    templateUrl: './pdf-horizontal-scroll.component.html',
    styleUrls: ['./pdf-horizontal-scroll.component.css'],
    standalone: false
})
export class PdfHorizontalScrollComponent implements OnDestroy {
  public show = input<ResponsiveVisibility>(true);

  public scrollMode = input.required<ScrollModeType>();

  public pageViewMode = model.required<PageViewModeType>();

  public onClick?: () => void;

  private PDFViewerApplication: IPDFViewerApplication | undefined;

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
        this.PDFViewerApplication?.eventBus.dispatch('switchscrollmode', { mode: ScrollMode.HORIZONTAL });
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
    this.PDFViewerApplication?.eventBus.on('switchscrollmode', () => {
      queueMicrotask(this.asyncWithCD(() => {
        // scrollMode is read-only input, so we don't update it
        // The parent component will update it via binding
      }));
    });
  }

  public ngOnDestroy(): void {
    this.onClick = undefined;
  }
}
