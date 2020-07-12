import { Component, Input, TemplateRef, AfterContentInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

declare class PDFThumbnailView {
  anchor: HTMLAnchorElement;
  div: HTMLElement;
  ring: HTMLElement;
  canvasWidth: number;
  canvasHeight: number;
}

const THUMBNAIL_CANVAS_BORDER_WIDTH = 1; // px
@Component({
  selector: 'pdf-sidebar',
  templateUrl: './pdf-sidebar.component.html',
  styleUrls: ['./pdf-sidebar.component.css'],
})
export class PdfSidebarComponent {
  @Input()
  public sidebarPositionTop: number;

  @Input()
  public showSidebarButton = true;

  @Input()
  public customThumbnail: TemplateRef<any>;

  @ViewChild('thumbnailViewTemplate')
  public thumbnailViewTemplate: ElementRef;

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

  public pdfThumbnailGeneratorReady(): boolean {
    const t = this.thumbnailViewTemplate.nativeElement as HTMLElement;
    return !!t && !!t.innerHTML && t.innerHTML.length > 0;
  }

  public createThumbnail(pdfThumbnailView: PDFThumbnailView, linkService: any, id: string, container: HTMLDivElement, thumbPageTitlePromise: Promise<string>) {
    const template = this.thumbnailViewTemplate;
    // get the inner HTML without the attributes and classes added by Angular
    const inner = template.nativeElement.innerHTML
      .replaceAll(/_ng\w+-\w+-\w+=""/g, '')
      .replaceAll(/ng-\w+-\w+/g, '')
      .replace(/<!--[\s\S]*?-->/g, '');

    const borderAdjustment = 2 * THUMBNAIL_CANVAS_BORDER_WIDTH;

    const widthOfRing = pdfThumbnailView.canvasWidth + borderAdjustment + 'px';
    const heightOfRing = pdfThumbnailView.canvasHeight + borderAdjustment + 'px';

    const newHtml = inner.replace('WIDTH_OF_RING', widthOfRing).replace('HEIGHT_OF_RING', heightOfRing);
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
    pdfThumbnailView.div = newElement;

    container.appendChild(newElement);
  }

  private createElementFromHTML(htmlString): HTMLElement {
    const div = document.createElement('div');
    div.innerHTML = htmlString.trim();

    // Change this to div.childNodes to support multiple top-level nodes
    return div.firstChild as HTMLElement;
  }
}
