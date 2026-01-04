import { isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  effect,
  ElementRef,
  HostListener,
  Inject,
  input,
  OnDestroy,
  output,
  PLATFORM_ID,
  TemplateRef,
} from '@angular/core';
import { NgxExtendedPdfViewerService } from '../../ngx-extended-pdf-viewer.service';
import { IPDFViewerApplication } from '../../options/pdf-viewer-application';
import { PdfShyButtonService } from '../../toolbar/pdf-shy-button/pdf-shy-button-service';
import { PDFNotificationService } from './../../pdf-notification-service';

@Component({
    selector: 'pdf-secondary-toolbar',
    templateUrl: './pdf-secondary-toolbar.component.html',
    styleUrls: ['./pdf-secondary-toolbar.component.css'],
    standalone: false
})
export class PdfSecondaryToolbarComponent implements AfterViewInit, OnDestroy {
  public customSecondaryToolbar = input<TemplateRef<any> | undefined>(undefined);

  public secondaryToolbarTop = input<any>(undefined);

  public mobileFriendlyZoomScale = input.required<number>();

  public localizationInitialized = input.required<boolean>();

  public spreadChange = output<'off' | 'even' | 'odd'>();

  public disablePreviousPage = true;

  public disableNextPage = true;

  public get secondaryToolbarMaxHeight(): string {
    if (typeof window === 'undefined') {
      return 'auto';
    }
    const topValue = this.secondaryToolbarTop() || '33px';
    const topPx = parseFloat(topValue.toString());
    const scale = this.mobileFriendlyZoomScale();

    // Find the nearest .zoom container
    const secondaryToolbar = this.element.nativeElement.querySelector('#secondaryToolbar');
    const zoomContainer = secondaryToolbar?.closest('.zoom') as HTMLElement;
    const containerHeight = zoomContainer?.clientHeight || window.innerHeight;

    // Calculate available space in the container, then convert to unscaled coordinates
    // since the parent has transform: scale() applied
    const availableHeight = containerHeight - topPx - 20; // 20px for margins and spacing
    const unscaledMaxHeight = availableHeight / scale;
    return `${unscaledMaxHeight}px`;
  }

  private classMutationObserver: MutationObserver | undefined;

  private PDFViewerApplication: IPDFViewerApplication | undefined;

  constructor(
    private element: ElementRef,
    public notificationService: PDFNotificationService,
    @Inject(PLATFORM_ID) private platformId: Object,
    public pdfShyButtonService: PdfShyButtonService,
    private ngxExtendedPdfViewerService: NgxExtendedPdfViewerService,
    private cdr: ChangeDetectorRef
  ) {
    effect(() => {
      this.PDFViewerApplication = notificationService.onPDFJSInitSignal();
      if (this.PDFViewerApplication) {
        this.onPdfJsInit();
      }
    });

    // Replace ngOnChanges with effect - check visibility when any input changes
    effect(() => {
      // Track all inputs to trigger on any change
      this.customSecondaryToolbar();
      this.secondaryToolbarTop();
      this.mobileFriendlyZoomScale();
      this.localizationInitialized();

      // Same logic as ngOnChanges
      setTimeout(this.asyncWithCD(() => this.checkVisibility()));
    });
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
    this.PDFViewerApplication?.eventBus.on('pagechanging', () => {
      this.updateUIState();
    });
    this.PDFViewerApplication?.eventBus.on('pagerendered', () => {
      this.updateUIState();
    });
  }

  public updateUIState(): void {
    setTimeout(this.asyncWithCD(() => {
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
    }));
  }

  public onSpreadChange(newSpread: 'off' | 'odd' | 'even'): void {
    this.spreadChange.emit(newSpread);
  }

  @HostListener('window:resize')
  public onResize() {
    setTimeout(this.asyncWithCD(() => this.checkVisibility()));
  }

  public ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      const targetNode = this.element.nativeElement as HTMLElement;

      const config = { attributes: true, childList: true, subtree: true };

      this.classMutationObserver = new MutationObserver((mutationList: MutationRecord[], _observer) => {
        for (const mutation of mutationList) {
          if (mutation.type === 'attributes') {
            if (mutation.attributeName === 'class') {
              this.asyncWithCD(() => this.checkVisibility())();
              break;
            }
          } else if (mutation.type === 'childList') {
            this.asyncWithCD(() => this.checkVisibility())();
            break;
          }
        }
      });

      this.classMutationObserver.observe(targetNode, config);

      // Perform initial visibility check after view is initialized
      setTimeout(this.asyncWithCD(() => this.checkVisibility()), 0);
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

    this.ngxExtendedPdfViewerService.secondaryMenuIsEmpty.set(visibleButtons === 0);
  }

  private checkVisibilityRecursively(e: HTMLElement): number {
    if (typeof window === 'undefined') {
      // server-side rendering
      return 0;
    }
    // Only check inline styles and CSS classes, NOT computed styles
    // because the secondary toolbar is hidden by default (it's a popup)
    // and all children inherit display:none from the parent
    if (e.style.display === 'none') {
      return 0;
    }
    if (e.classList.contains('hidden')) {
      return 0;
    }
    if (e.classList.contains('invisible')) {
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
