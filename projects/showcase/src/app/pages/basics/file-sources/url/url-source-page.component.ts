import { Component, inject } from '@angular/core';
import { ContentPageComponent } from '../../../../shared/components/content-page/content-page.component';
import { MarkdownContentComponent } from '../../../../shared/components/markdown-content.component';
import { DOCUMENT } from '@angular/common';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SetMinifiedLibraryUsageDirective } from '../../../../shared/directives/set-minified-library-usage.directive';
import { SplitViewComponent } from '../../../../shared/components/split-view.component';
import { isBrowser } from '../../../../shared/helper/utilities';
import { SetDefaultViewerHeightDirective } from '../../../../shared/directives/set-default-viewer-height.directive';
import { SetDefaultZoomLevelDirective } from '../../../../shared/directives/set-default-zoom-level.directive';

@Component({
  selector: 'pvs-file-sources-page',
  standalone: true,
  imports: [
    ContentPageComponent,
    MarkdownContentComponent,
    NgxExtendedPdfViewerModule,
    ReactiveFormsModule,
    SetMinifiedLibraryUsageDirective,
    SplitViewComponent,
    FormsModule,
    SetDefaultViewerHeightDirective,
    SetDefaultZoomLevelDirective,
  ],
  template: `<pvs-content-page [demoTemplate]="demo">
    <pvs-markdown src="/assets/pages/basics/file-sources/url/text.md" />
    <pvs-markdown src="/assets/pages/basics/file-sources/shared.md" />

    <ng-template #demo>
      <pvs-split-view>
        <div class="fieldset-group">
          <fieldset class="fieldset">
            <div class="input-group">
              <label for="file-source">Source</label>
              <select id="file-source" [(ngModel)]="source">
                <option [value]="undefined">no document</option>
                @if (!bookMode) {
                  <option value="/assets/pdfs/Introduction.pdf">/assets/pdfs/Introduction.pdf</option>
                }
                @if (!bookMode) {
                  <option value="/assets/pdfs/pdf-sample.pdf">/assets/pdfs/pdf-sample.pdf</option>
                }
                <option value="/assets/pdfs/GraalVM Dictionary Bytecode, Interpreters, C1 Compiler, C2 Compiler, CPUs, and More.pdf">
                  /assets/pdfs/GraalVM Dictionary....pdf
                </option>
                <option value="/assets/pdfs/What About GraalVM.pdf">/assets/What About GraalVM.pdf</option>
                <option [value]="url">new URL('{{ url.toString() }}')</option>
              </select>

              <label for="drag-and-drop">Enable dragging and dropping files to the PDF viewer</label>
              <input id="drag-and-drop" type="checkbox" [(ngModel)]="dragAndDrop" />

              <label for="book-mode">Book Mode (doesn't work with some documents)</label>
              <input id="book-mode" type="checkbox" [(ngModel)]="bookMode" />
            </div>
          </fieldset>
        </div>

        <ngx-extended-pdf-viewer
          slot="end"
          [(src)]="source"
          [enableDragAndDrop]="dragAndDrop"
          [pageViewMode]="bookMode ? 'book' : 'multiple'"
          pvsSetMinifiedLibraryUsage
          pvsSetDefaultViewerHeight
          pvsSetDefaultZoomLevel
        />
      </pvs-split-view>
    </ng-template>
  </pvs-content-page>`,
})
export class UrlSourcePageComponent {
  source = '/assets/pdfs/GraalVM Dictionary Bytecode, Interpreters, C1 Compiler, C2 Compiler, CPUs, and More.pdf';
  dragAndDrop = true;
  bookMode = false;
  url = new URL(`${isBrowser() ? inject(DOCUMENT).baseURI : 'http://localhost:4200'}/assets/pdfs/GraalVM.pdf`);
}
