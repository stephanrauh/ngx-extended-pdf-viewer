import { DecimalPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxExtendedPdfViewerModule, PageRenderEvent } from 'ngx-extended-pdf-viewer';
import { ContentPageComponent } from '../../../shared/components/content-page/content-page.component';
import { MarkdownContentComponent } from '../../../shared/components/markdown-content.component';
import { SplitViewComponent } from '../../../shared/components/split-view.component';
import { SetDefaultZoomLevelDirective } from '../../../shared/directives/set-default-zoom-level.directive';
import { SetMinifiedLibraryUsageDirective } from '../../../shared/directives/set-minified-library-usage.directive';
import { BROWSER_STORAGE } from '../../../shared/helper/browser-storage.token';

@Component({
  selector: 'pvs-basic-page',
  standalone: true,
  imports: [
    ContentPageComponent,
    NgxExtendedPdfViewerModule,
    MarkdownContentComponent,
    SetMinifiedLibraryUsageDirective,
    SplitViewComponent,
    FormsModule,
    DecimalPipe,
    SetDefaultZoomLevelDirective,
  ],
  template: `
    <pvs-content-page [demoTemplate]="demo">
      <pvs-markdown src="/assets/pages/basics/simple/text.md" />
    </pvs-content-page>

    <ng-template #demo>
      <pvs-split-view>
        <div class="mb-12">
          <h3>Note</h3>
          <p>There's a bug in the PDF file. See the annotation layer demo to see the bugfix.</p>
          <p>Copyright hint: the e-book has been published by James Boyle under a CC BY-NC-SA 3.0 on www.thepublicdomain.org</p>
          @if (renderTime) {
            <h3>Render Times</h3>
            <ul>
              <li>Time till page 5 showed: {{ renderTime | number: '1.0-2' }} ms</li>
              <li>Last rendering time: {{ currentTime | number: '1.0-2' }} ms</li>
            </ul>
          }
        </div>
        <div class="fieldset-group">
          <fieldset class="fieldset">
            <legend>Page and Label</legend>
            <div class="input-group">
              <label for="page-number">Page Number</label>
              <input id="page-number" type="number" [(ngModel)]="page" min="1" />

              <label for="page-label">Page Label</label>
              <input id="page-label" type="text" [(ngModel)]="pageLabel" />
            </div>
          </fieldset>

          <fieldset class="fieldset">
            <legend>Color Themes</legend>
            <div class="radio-group">
              <input id="dark-theme" type="radio" name="theme" [(ngModel)]="theme" value="dark" />
              <label for="dark-theme" type> Dark Theme </label>
            </div>
            <div class="radio-group">
              <input id="light-theme" type="radio" name="theme" [(ngModel)]="theme" value="light" />
              <label for="light-theme"> Light Theme</label>
            </div>
          </fieldset>

          <fieldset class="fieldset">
            <legend>Height</legend>
            <div class="radio-group">
              <input id="height-default" type="radio" name="height" [(ngModel)]="height" [value]="undefined" />
              <label for="height-default" type>[height]="undefined" (Default) </label>
            </div>
            <div class="radio-group">
              <input id="height-100" type="radio" name="height" [(ngModel)]="height" value="100%" />
              <label for="height-100" type>[height]="'100%'" </label>
            </div>
            <div class="radio-group">
              <input id="height-95" type="radio" name="height" [(ngModel)]="height" value="95%" />
              <label for="height-95" type>[height]="'95%'"</label>
            </div>
            <div class="radio-group">
              <input id="height-90vh" type="radio" name="height" [(ngModel)]="height" value="90vh" />
              <label for="height-90vh" type>[height]="'90vh'"</label>
            </div>
            <div class="radio-group">
              <input id="height-200px" type="radio" name="height" [(ngModel)]="height" value="200px" />
              <label for="height-200px" type>[height]="'200px'"</label>
            </div>
          </fieldset>
        </div>

        <ngx-extended-pdf-viewer
          slot="end"
          src="./assets/pdfs/The Public Domain - Enclosing the Commons of the Mind.pdf"
          [height]="height"
          [textLayer]="true"
          [showPresentationModeButton]="true"
          [(page)]="page"
          [(pageLabel)]="pageLabel"
          [theme]="theme"
          (updateFindMatchesCount)="onUpdateFindResult($event)"
          (pageRender)="onPageRender($event)"
          (pageRendered)="onPageRendered($event)"
          (pagesLoaded)="onPagesLoaded($event)"
          filenameForDownload="The Public Domain - Enclosing the Commons of the Mind.pdf"
          pvsSetMinifiedLibraryUsage
          pvsSetDefaultZoomLevel
        />
      </pvs-split-view>
    </ng-template>
  `,
})
export class BasicPageComponent {
  private localStorage = inject(BROWSER_STORAGE);

  private startTime: number | undefined;
  /** This attribute is only used on browser without localStorage (e.g. Brave on iOS) */
  private themeIfLocalStorageIsUnavailable = 'light';

  renderTime: number | undefined;
  currentTime: number | undefined;

  height = 'auto';
  page = 5;
  pageLabel = '';

  get theme(): string {
    try {
      if (this.localStorage) {
        return this.localStorage.getItem('ngx-extended-pdf-viewer.theme') || 'light';
      }
      return this.themeIfLocalStorageIsUnavailable;
    } catch (safariSecurityException) {
      // localStorage is not available on Safari
      return this.themeIfLocalStorageIsUnavailable;
    }
  }

  set theme(theme: string) {
    try {
      if (theme !== this.theme && this.localStorage) {
        this.localStorage.setItem('ngx-extended-pdf-viewer.theme', theme);
        return;
      }
      this.themeIfLocalStorageIsUnavailable = theme;
    } catch (safariSecurityException) {
      // localStorage is not available on Safari
      this.themeIfLocalStorageIsUnavailable = theme;
    }
  }

  onUpdateFindResult(event: any): void {
    console.log('updateFindMatchesCount ' + event.matches);
  }

  onPageRender(event: PageRenderEvent): void {
    this.startTime = performance.now();
    console.log('PageRender', event);
  }

  onPageRendered(event: PageRenderEvent): void {
    const endTime = performance.now();
    if (this.startTime) {
      if (event.pageNumber === 5) {
        this.renderTime = endTime - this.startTime;
      }

      this.currentTime = endTime - this.startTime;
    }
    console.log('PageRendered', event);
  }

  onPagesLoaded(event: any): void {
    console.log('PagesLoaded', event);
  }
}
