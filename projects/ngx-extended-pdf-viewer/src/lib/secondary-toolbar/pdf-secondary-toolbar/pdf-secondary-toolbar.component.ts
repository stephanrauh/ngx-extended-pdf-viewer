import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
  TemplateRef,
  ElementRef,
  HostListener,
  AfterViewInit,
} from '@angular/core';
import { take } from 'rxjs/operators';
import { IPDFViewerApplication } from '../../options/pdf-viewer-application';
import { PDFNotificationService } from './../../pdf-notification-service';

@Component({
  selector: 'pdf-secondary-toolbar',
  templateUrl: './pdf-secondary-toolbar.component.html',
  styleUrls: ['./pdf-secondary-toolbar.component.css'],
})
export class PdfSecondaryToolbarComponent implements OnInit, OnChanges, AfterViewInit {
  @Input()
  public customSecondaryToolbar: TemplateRef<any>;

  @Input()
  public secondaryToolbarTop;

  @Input()
  public mobileFriendlyZoomScale: number;

  @Input()
  public showPresentationModeButton = true;

  @Input()
  public showOpenFileButton = true;

  @Input()
  public showPrintButton = true;

  @Input()
  public showDownloadButton = true;

  @Input()
  public showBookmarkButton = true;

  @Input()
  public showPagingButtons = true;

  @Input()
  public showRotateButton = true;

  @Input()
  public showHandToolButton = true;

  @Input()
  public showScrollingButton = true;

  @Input()
  public showSpreadButton = true;

  @Input()
  public showPropertiesButton = true;

  @Output()
  public spreadChange = new EventEmitter<'off' | 'even' | 'odd'>();

  @Output()
  public secondaryMenuIsEmpty = new EventEmitter<boolean>();

  public disablePreviousPage = true;

  public disableNextPage = true;

  public showPageScrollMode = false;

  constructor(private element: ElementRef, public notificationService: PDFNotificationService) {
    const version = notificationService.pdfjsVersion;
    this.showPageScrollMode = version >= '2.12';
    this.notificationService.onPDFJSInit.pipe(take(1)).subscribe(() => {
      this.onPdfJsInit();
    });
  }

  public onPdfJsInit(): void {
    const PDFViewerApplication: IPDFViewerApplication = (window as any).PDFViewerApplication;
    PDFViewerApplication.eventBus.on('pagechanging', () => {
      this.updateUIState();
    });
    PDFViewerApplication.eventBus.on('pagerendered', () => {
      this.updateUIState();
    });
  }

  public updateUIState(): void {
    setTimeout(() => {
      const PDFViewerApplication: IPDFViewerApplication = (window as any).PDFViewerApplication;
      const currentPage = PDFViewerApplication.pdfViewer.currentPageNumber;
      const previousButton = document.getElementById('previousPage') as HTMLButtonElement;
      if (previousButton) {
        this.disablePreviousPage = Number(currentPage) <= 1;
        previousButton.disabled = this.disablePreviousPage;
      }
      const nextButton = document.getElementById('nextPage') as HTMLButtonElement;
      if (nextButton) {
        this.disableNextPage = currentPage === PDFViewerApplication.pagesCount;
        nextButton.disabled = this.disableNextPage;
      }
    });
  }

  public onSpreadChange(newSpread: 'off' | 'odd' | 'even' ): void {
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
    setTimeout(() => this.checkVisibility());
  }

  public ngOnInit() {
    setTimeout(() => this.checkVisibility());
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
    this.secondaryMenuIsEmpty.emit(visibleButtons === 0);
  }

  private checkVisibilityRecursively(e: HTMLElement): number {
    if (typeof window === 'undefined') {
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
    if (children && children.length) {
      for (let i = 0; i < children.length && count === 0; i++) {
        const child = children.item(i);
        if (child && child instanceof HTMLElement) {
          count += this.checkVisibilityRecursively(child);
        }
      }
    }
    return count;
  }

  public previousPage(): void {
    const PDFViewerApplication: IPDFViewerApplication = (window as any).PDFViewerApplication;
    PDFViewerApplication.eventBus.dispatch('previouspage');
  }

  public nextPage(): void {
    const PDFViewerApplication: IPDFViewerApplication = (window as any).PDFViewerApplication;
    PDFViewerApplication.eventBus.dispatch('nextpage');
  }
}
