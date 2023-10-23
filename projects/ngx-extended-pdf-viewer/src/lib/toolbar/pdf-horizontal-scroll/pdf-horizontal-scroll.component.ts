import { Component, EventEmitter, Input, NgZone, Output } from '@angular/core';
import { take } from 'rxjs/operators';
import { ScrollMode } from '../../options/pdf-scroll-mode';
import { PageViewModeType, ScrollModeType } from '../../options/pdf-viewer';
import { IPDFViewerApplication } from '../../options/pdf-viewer-application';
import { PDFNotificationService } from '../../pdf-notification-service';
import { ResponsiveVisibility } from '../../responsive-visibility';

@Component({
  selector: 'pdf-horizontal-scroll',
  templateUrl: './pdf-horizontal-scroll.component.html',
  styleUrls: ['./pdf-horizontal-scroll.component.css'],
})
export class PdfHorizontalScrollComponent {
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
    this.notificationService.onPDFJSInit.pipe(take(1)).subscribe(() => {
      this.onPdfJsInit();
    });
    const emitter = this.pageViewModeChange;
    this.onClick = () => {
      setTimeout(() => {
        if (this.pageViewMode !== 'multiple' && this.pageViewMode !== 'infinite-scroll') {
          emitter.emit('multiple');
        }
        const PDFViewerApplication: IPDFViewerApplication = (window as any).PDFViewerApplication;
        PDFViewerApplication.eventBus.dispatch('switchscrollmode', { mode: ScrollMode.HORIZONTAL });
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
