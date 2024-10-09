import { Component, inject } from '@angular/core';
import { ContentPageComponent } from '../../../shared/components/content-page/content-page.component';
import { NgxExtendedPdfViewerModule, PageRenderEvent } from 'ngx-extended-pdf-viewer';
import { MarkdownContentComponent } from '../../../shared/components/markdown-content.component';
import { SetMinifiedLibraryUsageDirective } from '../../../shared/directives/set-minified-library-usage.directive';
import { SplitViewComponent } from '../../../shared/components/split-view.component';
import { BROWSER_STORAGE } from '../../../shared/helper/browser-storage.token';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'pvs-basic-page',
  standalone: true,
  imports: [ContentPageComponent, NgxExtendedPdfViewerModule, MarkdownContentComponent, SetMinifiedLibraryUsageDirective, SplitViewComponent, FormsModule],
  template: `
    <pvs-content-page [demoTemplate]="demo">
      <pvs-markdown src="/assets/pages/basics/simple/text.md" />
    </pvs-content-page>

    <ng-template #demo>
      <pvs-split-view [stickyEnd]="true">
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
          zoom="auto"
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
        />
      </pvs-split-view>
    </ng-template>
  `,
})
export class BasicPageComponent {
  private localStorage = inject(BROWSER_STORAGE);

  private startTime: number | undefined;
  private renderTime: number | undefined;
  /** This attribute is only used on browser without localStorage (e.g. Brave on iOS) */
  private themeIfLocalStorageIsUnavailable = 'light';

  public height = 'auto';
  public page = 5;
  public pageLabel = '';

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
    if (event.pageNumber === 5 && this.startTime) {
      const endTime = performance.now();
      this.renderTime = endTime - this.startTime;
    }
    console.log('PageRendered', event);
  }

  onPagesLoaded(event: any): void {
    console.log('PagesLoaded', event);
  }
}
