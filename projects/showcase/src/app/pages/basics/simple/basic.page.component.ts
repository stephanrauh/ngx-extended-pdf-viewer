import { Component } from '@angular/core';
import { ContentPageComponent } from '../../../shared/components/content-page/content-page.component';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { MarkdownContentComponent } from '../../../shared/components/markdown-content.component';
import { SetMinifiedLibraryUsageDirective } from '../../../shared/directives/set-minified-library-usage.directive';
import { SplitViewComponent } from '../../../shared/components/split-view.component';

@Component({
  selector: 'pvs-basic-page',
  standalone: true,
  imports: [ContentPageComponent, NgxExtendedPdfViewerModule, MarkdownContentComponent, SetMinifiedLibraryUsageDirective, SplitViewComponent],
  template: `
    <pvs-content-page [demoTemplate]="demo">
      <pvs-markdown src="/assets/pages/basics/simple/text.md" />
    </pvs-content-page>

    <ng-template #demo>
      <pvs-split-view [stickyEnd]="true">
        <ngx-extended-pdf-viewer
          slot="end"
          [src]="'./assets/pdfs/The Public Domain - Enclosing the Commons of the Mind.pdf'"
          [zoom]="'auto'"
          [height]="'100%'"
          [textLayer]="true"
          [showPresentationModeButton]="true"
          [page]="1"
          [filenameForDownload]="'The Public Domain - Enclosing the Commons of the Mind.pdf'"
          pvsSetMinifiedLibraryUsage
        />
      </pvs-split-view>
    </ng-template>
  `,
})
export class BasicPageComponent {}
