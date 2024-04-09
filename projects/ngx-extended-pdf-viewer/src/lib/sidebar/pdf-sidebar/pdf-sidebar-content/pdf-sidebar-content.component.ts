import { Component, EventEmitter, Input, OnDestroy, Output, TemplateRef, ViewChild } from '@angular/core';
import { PdfThumbnailDrawnEvent } from '../../../events/pdf-thumbnail-drawn-event';
declare class PDFThumbnailView {
  anchor: HTMLAnchorElement;
  div: HTMLElement;
  ring: HTMLElement;
  canvasWidth: number;
  canvasHeight: number;
}

declare class PDFLinkService {
  public page: number;
  public pagesCount: number;
  public getAnchorUrl(targetUrl: string): string;
}

const THUMBNAIL_CANVAS_BORDER_WIDTH = 1; // one pixel

@Component({
  selector: 'pdf-sidebar-content',
  templateUrl: './pdf-sidebar-content.component.html',
  styleUrls: ['./pdf-sidebar-content.component.css'],
})
export class PdfSidebarContentComponent implements OnDestroy {
  @Input()
  public customThumbnail: TemplateRef<any> | undefined;

  @Input()
  public hideSidebarToolbar = false;

  @Input()
  public mobileFriendlyZoomScale = 1.0;

  @ViewChild('defaultThumbnail', { read: TemplateRef })
  public defaultThumbnail!: TemplateRef<any>;

  private linkService: PDFLinkService | undefined;

  @Output()
  public thumbnailDrawn = new EventEmitter<PdfThumbnailDrawnEvent>();

  public get top(): string {
    let top = 0;
    if (!this.hideSidebarToolbar) {
      top = 32 * this.mobileFriendlyZoomScale;
      if (top === 32) {
        top = 33; // prevent the border of the sidebar toolbar from being cut off
      }
    }
    return `${top}px`;
  }

  constructor() {
    if (typeof window !== 'undefined') {
      (window as any).pdfThumbnailGeneratorReady = () => this.pdfThumbnailGeneratorReady();
      (window as any).pdfThumbnailGenerator = (
        pdfThumbnailView: PDFThumbnailView,
        linkService: any,
        id: number,
        container: HTMLDivElement,
        thumbPageTitlePromiseOrPageL10nArgs: string
      ) => this.createThumbnail(pdfThumbnailView, linkService, id, container, thumbPageTitlePromiseOrPageL10nArgs);
    }
  }

  public ngOnDestroy(): void {
    this.linkService = undefined;
  }

  public pdfThumbnailGeneratorReady(): boolean {
    if (!this.defaultThumbnail) {
      return false;
    }
    const t = this.defaultThumbnail.elementRef.nativeElement as HTMLElement;
    return !!t && !!t.innerHTML && t.innerHTML.length > 0;
  }

  private createThumbnail(
    pdfThumbnailView: PDFThumbnailView,
    linkService: PDFLinkService,
    id: number,
    container: HTMLDivElement,
    thumbPageTitlePromiseOrPageL10nArgs: string
  ): HTMLImageElement | undefined {
    this.linkService = linkService;
    const template = this.customThumbnail ?? this.defaultThumbnail;
    const view = template.createEmbeddedView(null);
    const newElement = view.rootNodes[0] as HTMLElement;
    newElement.classList.remove('pdf-viewer-template');

    const anchor = newElement as HTMLAnchorElement;
    anchor.href = linkService.getAnchorUrl(`#page=${id}`);

    anchor.setAttribute('data-l10n-id', 'pdfjs-thumb-page-title');
    anchor.setAttribute('data-l10n-args', thumbPageTitlePromiseOrPageL10nArgs);

    this.replacePageNuberEverywhere(newElement, id.toString());

    anchor.onclick = () => {
      linkService.page = id;
      return false;
    };
    pdfThumbnailView.anchor = anchor;

    const img: HTMLImageElement | undefined = newElement.getElementsByTagName('img')[0];
    pdfThumbnailView.div = newElement.getElementsByClassName('thumbnail')[0] as HTMLElement;

    container.appendChild(newElement);

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

  private replacePageNuberEverywhere(element: Element, pageNumber: string): void {
    if (element.attributes) {
      Array.from(element.attributes).forEach((attr) => {
        if (attr.value.includes('PAGE_NUMBER')) {
          attr.value = attr.value.replace('PAGE_NUMBER', pageNumber);
        }
      });
    }

    element.childNodes.forEach((child) => {
      if (child.nodeType === Node.ELEMENT_NODE) {
        this.replacePageNuberEverywhere(child as Element, pageNumber);
      } else if (child.nodeType === Node.TEXT_NODE) {
        if (child.nodeValue?.includes('PAGE_NUMBER')) {
          child.nodeValue = child.nodeValue.replace('PAGE_NUMBER', pageNumber);
        }
      }
    });
  }
}
