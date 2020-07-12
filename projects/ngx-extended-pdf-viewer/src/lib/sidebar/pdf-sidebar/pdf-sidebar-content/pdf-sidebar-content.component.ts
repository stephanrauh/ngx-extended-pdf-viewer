import { Component, Input, TemplateRef, ViewChild, ElementRef, OnDestroy } from '@angular/core';

declare class PDFThumbnailView {
  anchor: HTMLAnchorElement;
  div: HTMLElement;
  ring: HTMLElement;
  canvasWidth: number;
  canvasHeight: number;
}

declare class PDFLinkService {
  public page: string;
  public pagesCount: number;
  public getAnchorUrl(targetUrl: string): string;
}

const THUMBNAIL_CANVAS_BORDER_WIDTH = 1; // px

@Component({
  selector: 'pdf-sidebar-content',
  templateUrl: './pdf-sidebar-content.component.html',
  styleUrls: ['./pdf-sidebar-content.component.css'],
})
export class PdfSidebarContentComponent implements OnDestroy {
  @Input()
  public customThumbnail: TemplateRef<any>;

  @ViewChild('thumbnailViewTemplate')
  public thumbnailViewTemplate: ElementRef;

  private linkService: PDFLinkService;

  constructor() {
    (window as any).pdfThumbnailGeneratorReady = () => this.pdfThumbnailGeneratorReady();
    (window as any).pdfThumbnailGenerator = (
      pdfThumbnailView: PDFThumbnailView,
      linkService: any,
      id: string,
      container: HTMLDivElement,
      thumbPageTitlePromise: Promise<string>
    ) => this.createThumbnail(pdfThumbnailView, linkService, id, container, thumbPageTitlePromise);
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

  public createThumbnail(
    pdfThumbnailView: PDFThumbnailView,
    linkService: PDFLinkService,
    id: string,
    container: HTMLDivElement,
    thumbPageTitlePromise: Promise<string>
  ) {
    this.linkService = linkService;
    const template = this.thumbnailViewTemplate;
    // get the inner HTML without the attributes and classes added by Angular
    const inner = template.nativeElement.innerHTML
      .replaceAll(/_ng\w+-\w+-\w+=""/g, '')
      .replaceAll(/ng-\w+-\w+/g, '')
      .replace(/<!--[\s\S]*?-->/g, '');

    const borderAdjustment = 2 * THUMBNAIL_CANVAS_BORDER_WIDTH;

    const widthOfRing = pdfThumbnailView.canvasWidth + borderAdjustment + 'px';
    const heightOfRing = pdfThumbnailView.canvasHeight + borderAdjustment + 'px';

    const newHtml = inner.replace('WIDTH_OF_RING', widthOfRing).replace('HEIGHT_OF_RING', heightOfRing).replaceAll('PAGE_NUMBER', id);
    const newElement = this.createElementFromHTML(newHtml);
    newElement.classList.remove('pdf-viewer-template');

    const anchor = newElement as HTMLAnchorElement;
    anchor.href = linkService.getAnchorUrl('#page=' + id);
    thumbPageTitlePromise.then((msg) => {
      anchor.title = msg;
    });
    anchor.onclick = function () {
      linkService.page = id;
      return false;
    };
    pdfThumbnailView.anchor = anchor;

    const ring = newElement.getElementsByClassName('image-container')[0] as HTMLElement;
    pdfThumbnailView.ring = ring;
    pdfThumbnailView.div = newElement.getElementsByClassName('thumbnail')[0] as HTMLElement;

    container.appendChild(newElement);
  }

  private createElementFromHTML(htmlString): HTMLElement {
    const div = document.createElement('div');
    div.innerHTML = htmlString.trim();

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
