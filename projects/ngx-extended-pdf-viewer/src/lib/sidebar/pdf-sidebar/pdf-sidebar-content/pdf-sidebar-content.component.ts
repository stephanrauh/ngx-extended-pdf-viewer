import { Component, ElementRef, EventEmitter, Input, OnDestroy, Output, TemplateRef, ViewChild } from '@angular/core';
import { TrustedTypesWindow } from 'trusted-types/lib';
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

  @ViewChild('thumbnailViewTemplate')
  public thumbnailViewTemplate: ElementRef;

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
        thumbPageTitlePromise: Promise<string>
      ) => this.createThumbnail(pdfThumbnailView, linkService, id, container, thumbPageTitlePromise);
    }
  }

  public ngOnDestroy(): void {
    this.linkService = undefined;
  }

  public pdfThumbnailGeneratorReady(): boolean {
    if (!this.thumbnailViewTemplate) {
      return false;
    }
    const t = this.thumbnailViewTemplate.nativeElement as HTMLElement;
    return !!t && !!t.innerHTML && t.innerHTML.length > 0;
  }

  private createThumbnail(
    pdfThumbnailView: PDFThumbnailView,
    linkService: PDFLinkService,
    id: number,
    container: HTMLDivElement,
    thumbPageTitlePromise: Promise<string>
  ): HTMLImageElement | undefined {
    this.linkService = linkService;
    const template = this.thumbnailViewTemplate;
    // get the inner HTML without the attributes and classes added by Angular
    const inner = template.nativeElement.innerHTML
      .split(/_ng\w+-\w+-\w+=""/g)
      .join('')
      .split(/ng-\w+-\w+/g)
      .join('')
      .split(/<!--[\s\S]*?-->/g)
      .join('');

    const borderAdjustment = 2 * THUMBNAIL_CANVAS_BORDER_WIDTH;

    const widthOfRing = `${pdfThumbnailView.canvasWidth + borderAdjustment}px`;
    const heightOfRing = `${pdfThumbnailView.canvasHeight + borderAdjustment}px`;

    const newHtml = inner.split('WIDTH_OF_RING').join(widthOfRing).split('HEIGHT_OF_RING').join(heightOfRing).split('PAGE_NUMBER').join(id);
    const newElement = this.createElementFromHTML(newHtml);
    newElement.classList.remove('pdf-viewer-template');

    const anchor = newElement as HTMLAnchorElement;
    anchor.href = linkService.getAnchorUrl(`#page=${id}`);
    thumbPageTitlePromise.then((msg) => {
      anchor.title = msg;
    });
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

  private getTrustedHtml(html: string) {
    if (typeof window === 'undefined') {
      // server-side rendering
      return html;
    }
    const ttWindow = window as unknown as TrustedTypesWindow;
    if (ttWindow.trustedTypes) {
      // Create a policy that can create TrustedHTML values
      // after sanitizing the input strings with DOMPurify library.
      const sanitizer = ttWindow.trustedTypes.createPolicy('foo', {
        createHTML: (input) => input,
      });

      return sanitizer.createHTML(html) as unknown as any; // Puts the sanitized value into the DOM.
    } else {
      return html;
    }
  }

  private createElementFromHTML(htmlString): HTMLElement {
    const div = document.createElement('div');
    const trustedHtml = this.getTrustedHtml(htmlString.trim());
    div.innerHTML = trustedHtml;

    // Change this to div.childNodes to support multiple top-level nodes
    return div.firstChild as HTMLElement;
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
}
