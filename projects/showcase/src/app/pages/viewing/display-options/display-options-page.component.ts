import { Component } from '@angular/core';
import { NgxExtendedPdfViewerModule, PageViewModeType, ScrollModeType } from 'ngx-extended-pdf-viewer';
import { SplitViewComponent } from '../../../shared/components/split-view.component';
import { SetMinifiedLibraryUsageDirective } from '../../../shared/directives/set-minified-library-usage.directive';
import { ContentPageComponent } from '../../../shared/components/content-page/content-page.component';
import { MarkdownContentComponent } from '../../../shared/components/markdown-content.component';
import { FormsModule } from '@angular/forms';
import { SetDefaultViewerHeightDirective } from '../../../shared/directives/set-default-viewer-height.directive';
import { SetDefaultZoomLevelDirective } from '../../../shared/directives/set-default-zoom-level.directive';

@Component({
  selector: 'pvs-display-options-page',
  standalone: true,
  imports: [
    ContentPageComponent,
    MarkdownContentComponent,
    NgxExtendedPdfViewerModule,
    SplitViewComponent,
    SetMinifiedLibraryUsageDirective,
    FormsModule,
    SetDefaultViewerHeightDirective,
    SetDefaultZoomLevelDirective,
  ],
  template: `<pvs-content-page [demoTemplate]="demo">
    <pvs-markdown src="/assets/pages/viewing/display-options/text.md" />
    <ng-template #demo>
      <pvs-split-view [stickyEnd]="true">
        <div>
          Book mode and single-page mode don't look too impressive with the default zoom setting of 30%. However, this zoom setting enables you to see the
          effect of <code>scrollMode="2"</code>
          (i.e. wrapped).
        </div>
        <div class="fieldset-group">
          <fieldset class="fieldset">
            <legend>Borders</legend>
            <div class="checkbox-group">
              <input id="show-borders" type="checkbox" [(ngModel)]="showBorders" />
              <label for="show-borders">showBorders</label>
            </div>
          </fieldset>

          <fieldset class="fieldset">
            <legend>Scroll mode</legend>
            <div class="radio-group">
              <input id="vertical" type="radio" name="scrollMode" [(ngModel)]="scrollMode" [value]="0" />
              <label for="vertical">0 (vertical) (default)</label>
            </div>

            <div class="radio-group">
              <input id="horizontal" type="radio" name="scrollMode" [(ngModel)]="scrollMode" [value]="1" />
              <label for="horizontal">1 (horizontal)</label>
            </div>

            <div class="radio-group">
              <input id="wrapped" type="radio" name="scrollMode" [(ngModel)]="scrollMode" [value]="2" />
              <label for="wrapped">2 (wrapped)</label>
            </div>

            <div class="radio-group">
              <input id="single-page" type="radio" name="scrollMode" [(ngModel)]="scrollMode" [value]="3" />
              <label for="single-page">3 (single-page view)</label>
            </div>
          </fieldset>

          <fieldset class="fieldset">
            <legend>Spread</legend>
            <div class="radio-group">
              <input
                id="spread-off"
                type="radio"
                name="spread"
                [(ngModel)]="spread"
                value="off"
                [disabled]="scrollMode === 1 || scrollMode === 2 || pageViewMode === 'book'"
              />
              <label for="spread-off">off (default)</label>
            </div>

            <div class="radio-group">
              <input
                id="spread-odd"
                type="radio"
                name="spread"
                [(ngModel)]="spread"
                value="odd"
                [disabled]="scrollMode === 1 || scrollMode === 2 || pageViewMode === 'book'"
              />
              <label for="spread-odd">odd</label>
            </div>

            <div class="radio-group">
              <input
                id="spread-even"
                type="radio"
                name="spread"
                [(ngModel)]="spread"
                value="even"
                [disabled]="scrollMode === 1 || scrollMode === 2 || pageViewMode === 'book'"
              />
              <label for="spread-even">even</label>
            </div>
          </fieldset>

          <fieldset class="fieldset">
            <legend>Page View Mode</legend>
            <div class="radio-group">
              <input id="single" type="radio" name="pageViewMode" [(ngModel)]="pageViewMode" value="single" />
              <label for="single">single</label>
            </div>

            <div class="radio-group">
              <input id="book" type="radio" name="pageViewMode" [(ngModel)]="pageViewMode" value="book" />
              <label for="book">book</label>
            </div>

            <div class="radio-group">
              <input id="multiple" type="radio" name="pageViewMode" [(ngModel)]="pageViewMode" value="multiple" />
              <label for="multiple">multiple (default)</label>
            </div>

            <div class="radio-group">
              <input id="infinite" type="radio" name="pageViewMode" [(ngModel)]="pageViewMode" value="infinite-scroll" />
              <label for="infinite">infinite scroll</label>
            </div>
          </fieldset>
        </div>

        <ngx-extended-pdf-viewer
          slot="end"
          src="/assets/pdfs/codpaste-teachingpack.pdf"
          [textLayer]="true"
          [showPresentationModeButton]="true"
          [showBorders]="showBorders"
          [(scrollMode)]="scrollMode"
          [(pageViewMode)]="pageViewMode"
          [(spread)]="spread"
          showVerticalScrollButton="always-visible"
          showHorizontalScrollButton="always-visible"
          showWrappedScrollButton="always-visible"
          showSpreadButton="always-visible"
          showInfiniteScrollButton="always-visible"
          showBookModeButton="always-visible"
          showSinglePageModeButton="always-visible"
          pvsSetMinifiedLibraryUsage
          pvsSetDefaultViewerHeight
          pvsSetDefaultZoomLevel
        />
      </pvs-split-view>
    </ng-template>
  </pvs-content-page>`,
})
export class DisplayOptionsPageComponent {
  showBorders = false;
  scrollMode = ScrollModeType.horizontal;
  pageViewMode: PageViewModeType = 'multiple';
  spread: 'off' | 'odd' | 'even' = 'off';
}
