import { Component, computed, inject } from '@angular/core';
import { NgxExtendedPdfViewerModule, PDFNotificationService, PdfThumbnailDrawnEvent } from 'ngx-extended-pdf-viewer';
import { SplitViewComponent } from '../../../shared/components/split-view.component';
import { SetMinifiedLibraryUsageDirective } from '../../../shared/directives/set-minified-library-usage.directive';
import { ContentPageComponent } from '../../../shared/components/content-page/content-page.component';
import { MarkdownContentComponent } from '../../../shared/components/markdown-content.component';
import { SetDefaultViewerHeightDirective } from '../../../shared/directives/set-default-viewer-height.directive';
import { SetDefaultZoomLevelDirective } from '../../../shared/directives/set-default-zoom-level.directive';

@Component({
  selector: 'pvs-thumbnails-page',
  standalone: true,
  imports: [
    ContentPageComponent,
    MarkdownContentComponent,
    NgxExtendedPdfViewerModule,
    SplitViewComponent,
    SetMinifiedLibraryUsageDirective,
    SetDefaultViewerHeightDirective,
    SetDefaultZoomLevelDirective,
  ],
  template: `<pvs-content-page [demoTemplate]="demo">
    <pvs-markdown src="/assets/pages/customization/thumbnails/text.md" />
    <ng-template #demo>
      <pvs-split-view>
        <ngx-extended-pdf-viewer
          slot="end"
          src="/assets/pdfs/stluciadance.com.pdf"
          (pageChange)="onPageChange($event)"
          (thumbnailDrawn)="onThumbnailDrawn($event)"
          [textLayer]="true"
          [showPresentationModeButton]="true"
          [customThumbnail]="radiobuttonThumbnail"
          [rotation]="rotation"
          [showBorders]="false"
          [activeSidebarView]="1"
          [sidebarVisible]="false"
          pvsSetMinifiedLibraryUsage
          pvsSetDefaultViewerHeight
          pvsSetDefaultZoomLevel
        />
      </pvs-split-view>

      <ng-template #radiobuttonThumbnail>
        <a class="pdf-viewer-template">
          <div class="thumbnail" data-page-number="PAGE_NUMBER" style="border: none">
            <input
              id="thumbnail-cbx-PAGE_NUMBER"
              data-page-number="PAGE_NUMBER"
              class="thumbnail-radiobutton"
              type="radio"
              style="top: 100px; right: 25px; position: relative; transform: scale(1.5)"
            />
            <div class="thumbnail-text"></div>
            <div class="image-container" style="width: var(--thumbnail-width); height: var(--thumbnail-height)">
              <img class="thumbnailImage" />
            </div>
            <div
              style="margin-top: -30px;margin-left: auto;margin-right: auto;text-align: center;width: 25px;height: 25px;border-radius: 50%;background-color: blue;
          color: white;line-height: 25px;"
            >
              #PAGE_NUMBER
            </div>
          </div>
        </a>
      </ng-template>
    </ng-template>
  </pvs-content-page>`,
  styles: `
    .thumbnail-radiobutton {
      top: -76px;
      right: 10px;
      position: relative;
    }

    .thumbnailSelectionRing {
      display: contents;
      background-color: blue;
    }

    .thumbnail-text {
      position: relative;
      top: 50%;
      left: 14%;
      transform: rotate(-45deg);
      z-index: 1;
      color: black;
      font-size: 120%;
    }

    .pdf-js-version-3-7 .thumbnail-text {
      left: 10px;
      top: 70px;
    }
  `,
})
export class ThumbnailsPageComponent {
  private notificationService = inject(PDFNotificationService);
  private PDFViewerApplication = computed(() => this.notificationService.onPDFJSInitSignal());

  rotation: 0 | 180 = 0;

  onPageChange(page: number | undefined): void {
    setTimeout(() => {
      const radiobuttons = document.getElementsByClassName('thumbnail-radiobutton');
      if (radiobuttons) {
        for (let i = 1; i <= radiobuttons.length; i++) {
          const cbx = radiobuttons.item(i - 1) as HTMLInputElement;
          cbx.checked = cbx.getAttribute('data-page-number') === String(page);
        }
      }
    });
  }

  onThumbnailDrawn(thumbnailEvent: PdfThumbnailDrawnEvent): void {
    console.log('Thumbnail drawn ' + thumbnailEvent);
    const thumbnail = thumbnailEvent.thumbnail;
    const page = thumbnailEvent.pageId;

    if (page === this.PDFViewerApplication()?.page) {
      const radiobutton = thumbnail.querySelector('input.thumbnail-radiobutton');
      if (radiobutton instanceof HTMLInputElement) {
        radiobutton.checked = true;
      }
    }

    const overlay = thumbnail.querySelector('.image-container') as HTMLElement;
    if (!overlay) {
      return;
    }

    let type: string;
    if (page <= 2) {
      overlay.style.backgroundColor = '#0000FF40';
      type = 'title page';
    } else if (page === 3 || page === 4) {
      overlay.style.backgroundColor = '#00FF0040';
      type = 'table of contents';
    } else {
      overlay.style.backgroundColor = '#FF000040';
      type = 'ready for review';
    }
    const textNode = thumbnail.querySelector('.thumbnail-text') as HTMLDivElement;
    if (textNode) {
      textNode.innerText = type;
    }

    overlay.ondblclick = () => {
      this.rotation = this.rotation ? 0 : 180;
    };
  }
}
