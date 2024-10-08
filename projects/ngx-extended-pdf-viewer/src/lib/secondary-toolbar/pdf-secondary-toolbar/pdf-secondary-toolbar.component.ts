import { isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Inject,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  PLATFORM_ID,
  SimpleChanges,
  TemplateRef,
  effect,
} from '@angular/core';
import { NgxExtendedPdfViewerService } from '../../ngx-extended-pdf-viewer.service';
import { IPDFViewerApplication } from '../../options/pdf-viewer-application';
import { PdfShyButtonService } from '../../toolbar/pdf-shy-button/pdf-shy-button-service';
import { PDFNotificationService } from './../../pdf-notification-service';

@Component({
  selector: 'pdf-secondary-toolbar',
  templateUrl: './pdf-secondary-toolbar.component.html',
  styleUrls: ['./pdf-secondary-toolbar.component.css'],
})
export class PdfSecondaryToolbarComponent implements OnChanges, AfterViewInit, OnDestroy {
  @Input()
  public customSecondaryToolbar: TemplateRef<any> | undefined;

  @Input()
  public secondaryToolbarTop;

  @Input()
  public mobileFriendlyZoomScale: number;

  @Input()
  public localizationInitialized: boolean;

  @Output()
  public spreadChange = new EventEmitter<'off' | 'even' | 'odd'>();

  public disablePreviousPage = true;

  public disableNextPage = true;

  private classMutationObserver: MutationObserver | undefined;

  private PDFViewerApplication: IPDFViewerApplication | undefined;

  constructor(
    private element: ElementRef,
    public notificationService: PDFNotificationService,
    @Inject(PLATFORM_ID) private platformId: Object,
    public pdfShyButtonService: PdfShyButtonService,
    private ngxExtendedPdfViewerService: NgxExtendedPdfViewerService
  ) {
    effect(() => {
      this.PDFViewerApplication = notificationService.onPDFJSInitSignal();
      if (this.PDFViewerApplication) {
        this.onPdfJsInit();
      }
    });
  }

  public onPdfJsInit(): void {
    this.PDFViewerApplication?.eventBus.on('pagechanging', () => {
      this.updateUIState();
    });
    this.PDFViewerApplication?.eventBus.on('pagerendered', () => {
      this.updateUIState();
    });
  }

  public updateUIState(): void {
    setTimeout(() => {
      const currentPage = this.PDFViewerApplication?.pdfViewer.currentPageNumber;
      const previousButton = document.getElementById('previousPage') as HTMLButtonElement;
      if (previousButton) {
        this.disablePreviousPage = Number(currentPage) <= 1;
        previousButton.disabled = this.disablePreviousPage;
      }
      const nextButton = document.getElementById('nextPage') as HTMLButtonElement;
      if (nextButton) {
        this.disableNextPage = currentPage === this.PDFViewerApplication?.pagesCount;
        nextButton.disabled = this.disableNextPage;
      }
    });
  }

  public onSpreadChange(newSpread: 'off' | 'odd' | 'even'): void {
    this.spreadChange.emit(newSpread);
  }

  public ngOnChanges(changes: SimpleChanges): void {
    setTimeout(() => this.checkVisibility());
  }

  @HostListener('window:resize')
  public onResize() {
    setTimeout(() => this.checkVisibility());
  }

  public ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      const targetNode = this.element.nativeElement as HTMLElement;

      const config = { attributes: true, childList: true, subtree: true };

      this.classMutationObserver = new MutationObserver((mutationList: MutationRecord[], observer) => {
        for (const mutation of mutationList) {
          if (mutation.type === 'attributes') {
            if (mutation.attributeName === 'class') {
              this.checkVisibility();
              break;
            }
          } else if (mutation.type === 'childList') {
            this.checkVisibility();
            break;
          }
        }
      });

      this.classMutationObserver.observe(targetNode, config);
    }
  }

  public ngOnDestroy(): void {
    if (this.classMutationObserver) {
      this.classMutationObserver.disconnect();
      this.classMutationObserver = undefined;
    }
  }

  public checkVisibility(): void {
    let visibleButtons = 0;
    const e = this.element.nativeElement as HTMLElement;
    const f = e.children.item(0);
    if (f) {
      const g = f.children.item(0);
      if (g && g instanceof HTMLElement) {
        visibleButtons = this.checkVisibilityRecursively(g);
      }
    }
    this.ngxExtendedPdfViewerService.secondaryMenuIsEmpty = visibleButtons === 0;
  }

  private checkVisibilityRecursively(e: HTMLElement): number {
    if (typeof window === 'undefined') {
      // server-side rendering
      return 0;
    }
    if (e.style.display === 'none') {
      return 0;
    }
    if (e.classList.contains('hidden')) {
      return 0;
    }
    if (e.classList.contains('invisible')) {
      return 0;
    }

    const style = window.getComputedStyle(e);
    if (style.display === 'none') {
      return 0;
    }

    if (e instanceof HTMLButtonElement || e instanceof HTMLAnchorElement) {
      return 1;
    }
    let count = 0;
    const children = e.children;
    if (children?.length) {
      for (let i = 0; i < children.length && count === 0; i++) {
        const child = children.item(i);
        if (child && child instanceof HTMLElement) {
          count += this.checkVisibilityRecursively(child);
        }
      }
    }
    return count;
  }

  public onClick(
    htmlevent: Event,
    action: undefined | ((htmlevent: Event, secondaryToolbar: boolean) => void),
    eventBusName?: string,
    closeOnClick?: boolean
  ): void {
    const origin = htmlevent.target as HTMLElement;
    origin?.classList.add('toggled');
    if (action) {
      action.call(this, htmlevent, true);
      htmlevent.preventDefault();
    } else if (eventBusName) {
      this.PDFViewerApplication?.eventBus.dispatch(eventBusName);
      htmlevent.preventDefault();
    }
    if (closeOnClick) {
      this.PDFViewerApplication?.secondaryToolbar.close();
    }
  }
}
