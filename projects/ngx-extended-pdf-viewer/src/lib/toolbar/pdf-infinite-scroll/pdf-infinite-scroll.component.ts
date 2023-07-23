import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ScrollMode } from '../../options/pdf-scroll-mode';
import { PageViewModeType, ScrollModeType } from '../../options/pdf-viewer';
import { IPDFViewerApplication } from '../../options/pdf-viewer-application';
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

  constructor() {
    const emitter = this.pageViewModeChange;
    this.onClick = () => {
      setTimeout(() => {
        if (this.pageViewMode === 'infinite-scroll') {
          this.pageViewMode = 'multiple';
          emitter.emit('multiple');
        } else {
          const PDFViewerApplication: IPDFViewerApplication = (window as any).PDFViewerApplication;
          if (this.scrollMode !== ScrollModeType.wrapped && this.scrollMode !== ScrollModeType.vertical) {
            PDFViewerApplication.eventBus.dispatch('switchscrollmode', { mode: ScrollMode.VERTICAL });
          }
          emitter.emit('infinite-scroll');
          this.pageViewMode = 'infinite-scroll';
        }
      });
    };
  }
}
