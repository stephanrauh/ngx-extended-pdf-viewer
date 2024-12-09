import { Component, inject } from '@angular/core';
import { FindOptions, FindResultMatchesCount, FindState, NgxExtendedPdfViewerModule, NgxExtendedPdfViewerService } from 'ngx-extended-pdf-viewer';
import { SplitViewComponent } from '../../../shared/components/split-view.component';
import { SetMinifiedLibraryUsageDirective } from '../../../shared/directives/set-minified-library-usage.directive';
import { ContentPageComponent } from '../../../shared/components/content-page/content-page.component';
import { MarkdownContentComponent } from '../../../shared/components/markdown-content.component';
import { FormsModule } from '@angular/forms';
import { ButtonDirective } from '../../../core/directives/button.directive';

@Component({
  selector: 'pvs-find-programmatically-page',
  standalone: true,
  imports: [
    ContentPageComponent,
    MarkdownContentComponent,
    NgxExtendedPdfViewerModule,
    SplitViewComponent,
    SetMinifiedLibraryUsageDirective,
    FormsModule,
    ButtonDirective,
  ],
  template: `<pvs-content-page [demoTemplate]="demo">
    <pvs-markdown src="/assets/pages/finding/find-programmatically/text.md" />
    <ng-template #demo>
      <pvs-split-view [stickyEnd]="true">
        <ul class="list-disc">
          <li>
            The demo is a bit slow because the example document is huge. This, in turn, allows you to watch the find result events, demonstrating the
            asynchronous nature of the find API.
          </li>
          <li>I've chosen a portuguese text because this language has many special characters (such as ã, ç, and ê).</li>
        </ul>
        <div class="grid grid-cols-[1fr_1fr] gap-4">
          <!-- Primary Search Controller -->
          <div>
            <div class="mb-4 grid gap-1">
              <h3 class="font-bold">User find controller</h3>
              <p class="text-sm">(using the API influences the UI, as you can see in the find bar)</p>
              <p>CSS class of the search results: <code class="bg-gray-100 px-1 py-0.5 rounded">highlight</code></p>
            </div>

            <div class="fieldset-group">
              <fieldset class="fieldset">
                <div class="input-group">
                  <label for="search-term">Search term</label>
                  <input id="search-term" type="text" [(ngModel)]="primaryControls.searchText" class="p-2 bg-gray-100" (keyup)="onPrimaryControlChange()" />
                </div>
              </fieldset>

              <fieldset class="fieldset">
                <div class="checkbox-group">
                  <input id="highlight-all" type="checkbox" [(ngModel)]="primaryControls.highlightAll" (change)="onPrimaryControlChange()" />
                  <label for="highlight-all">Highlight all</label>
                </div>

                <div class="checkbox-group">
                  <input id="match-case" type="checkbox" [(ngModel)]="primaryControls.matchCase" (change)="onPrimaryControlChange()" />
                  <label for="match-case">Match case</label>
                </div>

                <div class="checkbox-group">
                  <input
                    id="whole-word"
                    type="checkbox"
                    [(ngModel)]="primaryControls.wholeWords"
                    (change)="onPrimaryControlChange()"
                    [disabled]="primaryControls.regexp"
                  />
                  <label for="whole-word">Whole word</label>
                </div>

                <div class="checkbox-group">
                  <input
                    id="match-diacritics"
                    type="checkbox"
                    [(ngModel)]="primaryControls.matchDiacritics"
                    (change)="onPrimaryControlChange()"
                    [disabled]="primaryControls.regexp"
                  />
                  <label for="match-diacritics"> Match diacritics <span class="text-sm ml-4">(try licao to find lição)</span> </label>
                </div>

                <div class="checkbox-group">
                  <input
                    id="multiple-words"
                    type="checkbox"
                    [(ngModel)]="primaryControls.findMultiple"
                    (change)="onPrimaryControlChange()"
                    [disabled]="primaryControls.regexp"
                  />
                  <label for="multiple-words">Multiple words (separated by space)</label>
                </div>

                <div class="checkbox-group">
                  <input id="match-regexp" type="checkbox" [(ngModel)]="primaryControls.regexp" (change)="onPrimaryControlChange()" />
                  <label for="match-regexp"> Match regular expression <span class="text-sm ml-4">(try (?<=\\s)([A-z]+ough))</span> </label>
                </div>

                <div class="checkbox-group">
                  <input id="dont-scroll" type="checkbox" [(ngModel)]="primaryControls.dontScrollIntoView" (change)="onPrimaryControlChange()" />
                  <label for="dont-scroll">Don't scroll the find result into view</label>
                </div>
              </fieldset>

              <div class="flex gap-4 mt-2 mb-4">
                <button pvsButton (click)="findNext(false)">Next</button>
                <button pvsButton (click)="findPrevious(false)">Previous</button>
              </div>
            </div>
          </div>

          <!-- Secondary Search Controller -->
          <div>
            <div class="mb-4 grid gap-1">
              <h3 class="font-bold">Secondary find controller</h3>
              <p class="text-sm">(only available in the API)</p>
              <p>CSS class of the search results: <code class="bg-gray-100 px-1 py-0.5 rounded">customHighlight</code></p>
            </div>

            <div class="fieldset-group">
              <fieldset class="fieldset">
                <div class="input-group">
                  <label for="search-term2">Search term</label>
                  <input id="search-term2" type="text" [(ngModel)]="secondaryControls.searchText" class="p-2 bg-gray-100" (keyup)="onPrimaryControlChange()" />
                </div>
              </fieldset>

              <fieldset class="fieldset">
                <div class="checkbox-group">
                  <input id="highlight-all2" type="checkbox" [(ngModel)]="secondaryControls.highlightAll" (change)="onSecondaryControlChange()" />
                  <label for="highlight-all2">Highlight all</label>
                </div>

                <div class="checkbox-group">
                  <input id="match-case2" type="checkbox" [(ngModel)]="secondaryControls.matchCase" (change)="onSecondaryControlChange()" />
                  <label for="match-case2">Match case</label>
                </div>

                <div class="checkbox-group">
                  <input
                    id="whole-word2"
                    type="checkbox"
                    [(ngModel)]="secondaryControls.wholeWords"
                    (change)="onSecondaryControlChange()"
                    [disabled]="secondaryControls.regexp"
                  />
                  <label for="whole-word2">Whole word</label>
                </div>

                <div class="checkbox-group">
                  <input
                    id="match-diacritics2"
                    type="checkbox"
                    [(ngModel)]="secondaryControls.matchDiacritics"
                    (change)="onSecondaryControlChange()"
                    [disabled]="secondaryControls.regexp"
                  />
                  <label for="match-diacritics2"> Match diacritics <span class="text-sm ml-4">(try licao to find lição)</span> </label>
                </div>

                <div class="checkbox-group">
                  <input
                    id="multiple-words2"
                    type="checkbox"
                    [(ngModel)]="secondaryControls.findMultiple"
                    (change)="onSecondaryControlChange()"
                    [disabled]="secondaryControls.regexp"
                  />
                  <label for="multiple-words2">Multiple words (separated by space)</label>
                </div>

                <div class="checkbox-group">
                  <input id="match-regexp2" type="checkbox" [(ngModel)]="secondaryControls.regexp" (change)="onSecondaryControlChange()" />
                  <label for="match-regexp2"> Match regular expression <span class="text-sm ml-4">(try nasalized|nasalization)</span> </label>
                </div>

                <div class="checkbox-group">
                  <input id="dont-scroll2" type="checkbox" [(ngModel)]="secondaryControls.dontScrollIntoView" (change)="onSecondaryControlChange()" />
                  <label for="dont-scroll2">Don't scroll the find result into view</label>
                </div>
              </fieldset>

              <div class="flex gap-4 mt-2 mb-4">
                <button pvsButton (click)="findNext(true)">Next</button>
                <button pvsButton (click)="findPrevious(true)">Previous</button>
              </div>
            </div>
          </div>
        </div>
        <div class="grid">
          @if (pagesWithResult.length > 0) {
            <div>
              <small>
                <span>{{ findStateText }} on page {{ pagesWithResult.join(', ') }}</span>
              </small>
            </div>
          }
          @if (totalMatches && totalMatches > 0) {
            <div>
              <small>
                <span>Selected: Result {{ currentMatchNumber }} of {{ totalMatches }} </span>
              </small>
            </div>
          }
        </div>

        <ngx-extended-pdf-viewer
          slot="end"
          src="/assets/pdfs/Portugues-para-principiantes-1538054164.pdf"
          zoom="auto"
          [textLayer]="true"
          [showPresentationModeButton]="true"
          (updateFindMatchesCount)="updateFindMatchesCount($event)"
          (updateFindState)="updateFindState($event)"
          [handTool]="false"
          [showHandToolButton]="true"
          [showFindRegexp]="true"
          pvsSetMinifiedLibraryUsage
        />
      </pvs-split-view>
    </ng-template>
  </pvs-content-page>`,
})
export class FindProgrammaticallyPageComponent {
  private ngxExtendedPdfViewerService = inject(NgxExtendedPdfViewerService);

  findState?: FindState;
  currentMatchNumber?: number;
  totalMatches?: number;
  pagesWithResult: number[] = [];

  primaryControls: Required<FindOptions> & { searchText: string } = {
    searchText: 'Brazilian',
    highlightAll: true,
    matchCase: false,
    wholeWords: false,
    matchDiacritics: false,
    findMultiple: false,
    regexp: false,
    dontScrollIntoView: false,
    useSecondaryFindcontroller: false,
  };

  // Secondary search controls
  secondaryControls: Required<FindOptions> & { searchText: string } = {
    searchText: 'Portuguese',
    highlightAll: true,
    matchCase: false,
    wholeWords: false,
    matchDiacritics: false,
    findMultiple: false,
    regexp: false,
    dontScrollIntoView: false,
    useSecondaryFindcontroller: true,
  };

  get findStateText(): string {
    switch (this.findState) {
      case FindState.FOUND:
        return 'found';
      case FindState.NOT_FOUND:
        return 'not found';
      case FindState.PENDING:
        return 'pending';
      case FindState.WRAPPED:
        return 'wrapped';
      default:
        return '';
    }
  }

  updateFindState(findState: FindState) {
    this.findState = findState;
  }

  updateFindMatchesCount(result: FindResultMatchesCount) {
    this.currentMatchNumber = result.current;
    this.totalMatches = result.total;
  }

  async onPrimaryControlChange(): Promise<void> {
    const { searchText, ...findOptions } = this.primaryControls;
    await this.find(searchText, findOptions);
  }

  async onSecondaryControlChange(): Promise<void> {
    const { searchText, ...findOptions } = this.secondaryControls;
    await this.find(searchText, findOptions);
  }

  async findNext(useSecondaryFindController: boolean): Promise<void> {
    if (!this.findState) {
      if (!useSecondaryFindController) {
        await this.onPrimaryControlChange();
        return;
      }
      await this.onSecondaryControlChange();

      return;
    }
    this.ngxExtendedPdfViewerService.findNext(useSecondaryFindController);
  }

  async findPrevious(useSecondaryFindController: boolean): Promise<void> {
    if (!this.findState) {
      if (!useSecondaryFindController) {
        await this.onPrimaryControlChange();
        return;
      }
      await this.onSecondaryControlChange();

      return;
    }
    this.ngxExtendedPdfViewerService.findPrevious(useSecondaryFindController);
  }

  private async find(searchText: string, findOptions: FindOptions): Promise<void> {
    this.pagesWithResult = [];

    const text = findOptions.findMultiple ? searchText.split(' ') : searchText;
    const numberOfResultsPromises = this.ngxExtendedPdfViewerService.find(text, findOptions);

    if (!numberOfResultsPromises) {
      return;
    }

    const promises = numberOfResultsPromises.map((promise, index) => promise.then((numberOfResultsPerPage) => ({ index, numberOfResultsPerPage })));

    while (promises.length) {
      const { index, numberOfResultsPerPage } = await Promise.race(promises);

      if (numberOfResultsPerPage > 0 && !this.pagesWithResult.includes(index)) {
        this.pagesWithResult = [...this.pagesWithResult, index];
      }

      const promiseIndex = promises.findIndex((p) => p.then((result) => result.index === index));
      promises.splice(promiseIndex, 1);
    }
  }
}
