import { Component, computed, effect, input, OnDestroy, output, TemplateRef, viewChild } from '@angular/core';
import { PdfThumbnailDrawnEvent } from '../../../events/pdf-thumbnail-drawn-event';
import { IPDFViewerApplication } from '../../../options/pdf-viewer-application';
import { PDFNotificationService } from '../../../pdf-notification-service';
// #3111 modified by ngx-extended-pdf-viewer
// Updated to include new PDF.js v5.4.530+ properties
declare class PDFThumbnailView {
  anchor: HTMLAnchorElement;
  div: HTMLElement;
  ring: HTMLElement;
  canvasWidth: number;
  canvasHeight: number;
  image: HTMLImageElement;
  checkbox: HTMLInputElement;
}
// #3111 end of modification by ngx-extended-pdf-viewer

interface RenderCustomThumbnailEvent {
  pdfThumbnailView: PDFThumbnailView;
  linkService: PDFLinkService;
  id: number;
  container: HTMLDivElement;
  thumbPageTitlePromiseOrPageL10nArgs: string;
}

declare class PDFLinkService {
  public page: number;
  public pagesCount: number;
  public getAnchorUrl(targetUrl: string): string;
}

@Component({
    selector: 'pdf-sidebar-content',
    templateUrl: './pdf-sidebar-content.component.html',
    styleUrls: ['./pdf-sidebar-content.component.css'],
    standalone: false
})
export class PdfSidebarContentComponent implements OnDestroy {
  public customThumbnail = input<TemplateRef<any> | undefined>(undefined);

  public hideSidebarToolbar = input<boolean>(false);

  public mobileFriendlyZoomScale = input<number>(1.0);

  public defaultThumbnail = viewChild.required<TemplateRef<any>>('defaultThumbnail');

  private linkService: PDFLinkService | undefined;

  public thumbnailDrawn = output<PdfThumbnailDrawnEvent>();

  private PDFViewerApplication!: IPDFViewerApplication | undefined;

  // #3135 modified by ngx-extended-pdf-viewer
  private eventBusAbortController: AbortController | null = null;
  // #3135 end of modification by ngx-extended-pdf-viewer

  public top = computed(() => {
    let top = 0;
    if (!this.hideSidebarToolbar()) {
      top = 32 * this.mobileFriendlyZoomScale();
      if (top === 32) {
        top = 33; // prevent the border of the sidebar toolbar from being cut off
      }
    }
    return `${top}px`;
  });

  constructor(public notificationService: PDFNotificationService) {
    if (typeof window !== 'undefined') {
      effect(() => {
        this.PDFViewerApplication = notificationService.onPDFJSInitSignal();
        if (this.PDFViewerApplication) {
          // #3135 modified by ngx-extended-pdf-viewer
          this.eventBusAbortController?.abort();
          this.eventBusAbortController = new AbortController();
          const opts = { signal: this.eventBusAbortController.signal };
          // #3135 end of modification by ngx-extended-pdf-viewer
          this.PDFViewerApplication.eventBus.on('rendercustomthumbnail', this.createThumbnail.bind(this), opts);
        }
      });
    }
  }

  public ngOnDestroy(): void {
    this.linkService = undefined;
    // #3135 modified by ngx-extended-pdf-viewer
    this.eventBusAbortController?.abort();
    // #3135 end of modification by ngx-extended-pdf-viewer
  }

  private createThumbnail({
    pdfThumbnailView: _pdfThumbnailView, // #3111: Not used - PDF.js v5.4.530+ populates this after we append the element
    linkService,
    id,
    container,
    thumbPageTitlePromiseOrPageL10nArgs,
  }: RenderCustomThumbnailEvent): HTMLImageElement | undefined {
    this.linkService = linkService;
    const template = this.customThumbnail() ?? this.defaultThumbnail();
    const view = template.createEmbeddedView(null);
    const newElement = view.rootNodes[0] as HTMLElement;
    newElement.classList.remove('pdf-viewer-template');

    // #3111 modified by ngx-extended-pdf-viewer
    // PDF.js v5.4.530+ uses direct div structure without anchor wrapper
    // Add the thumbnail ID class (e.g., "thumbnail1") while keeping existing "thumbnail" class
    newElement.classList.add(`thumbnail${id}`);
    newElement.setAttribute('data-l10n-id', 'pdfjs-thumb-page-title');
    newElement.setAttribute('data-l10n-args', thumbPageTitlePromiseOrPageL10nArgs);

    this.replacePageNumberEverywhere(newElement, id.toString());

    // Handle click on the thumbnail div itself
    newElement.onclick = () => {
      linkService.page = id;
      return false;
    };

    // PDF.js will find this element and set pdfThumbnailView.div = this element
    // We don't need to set it here as PDF.js does it via querySelector(`.thumbnail${id}`)
    // #3111 end of modification

    // #3111 modified by ngx-extended-pdf-viewer
    // PDF.js v5.4.530+ will query for image and checkbox itself after the element is appended
    container.appendChild(newElement);
    // After appending, PDF.js will find this element by class `.thumbnail${id}` and set div/image/checkbox properties
    const img: HTMLImageElement | undefined = newElement.getElementsByTagName('img')[0];
    // #3111 end of modification by ngx-extended-pdf-viewer

    const thumbnailDrawnEvent: PdfThumbnailDrawnEvent = {
      thumbnail: newElement,
      container: container,
      pageId: id,
    };
    this.thumbnailDrawn.emit(thumbnailDrawnEvent);
    return img;
  }

  public onKeyDown(event: KeyboardEvent): void {
    if (event.code === 'ArrowDown') {
      if (this.linkService) {
        if (event.ctrlKey || event.metaKey) {
          this.linkService.page = this.linkService.pagesCount;
        } else if (this.linkService.page < this.linkService.pagesCount) {
          this.linkService.page = this.linkService.page + 1;
        }
        event.preventDefault();
      }
    } else if (event.code === 'ArrowUp') {
      if (this.linkService) {
        if (event.ctrlKey || event.metaKey) {
          this.linkService.page = 1;
        } else if (this.linkService.page > 1) {
          this.linkService.page = this.linkService.page - 1;
        }
        event.preventDefault();
      }
    }
  }

  private replacePageNumberEverywhere(element: Element, pageNumber: string): void {
    if (element.attributes) {
      Array.from(element.attributes).forEach((attr) => {
        if (attr.value.includes('PAGE_NUMBER')) {
          attr.value = attr.value.replace('PAGE_NUMBER', pageNumber);
        }
      });
    }

    element.childNodes.forEach((child) => {
      if (child.nodeType === Node.ELEMENT_NODE) {
        this.replacePageNumberEverywhere(child as Element, pageNumber);
      } else if (child.nodeType === Node.TEXT_NODE) {
        if (child.nodeValue?.includes('PAGE_NUMBER')) {
          child.nodeValue = child.nodeValue.replace('PAGE_NUMBER', pageNumber);
        }
      }
    });
  }
}
