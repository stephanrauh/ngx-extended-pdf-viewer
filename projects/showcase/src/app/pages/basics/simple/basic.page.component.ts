import { Component } from '@angular/core';
import { ContentPageComponent } from '../../../core/content-page/content-page.component';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { MarkdownContentComponent } from '../../../shared/components/markdown-content.component';

@Component({
  selector: 'pvs-basic-page',
  standalone: true,
  imports: [ContentPageComponent, NgxExtendedPdfViewerModule, MarkdownContentComponent],
  template: `
    <pvs-content-page [demoTemplate]="demo">
      <pvs-markdown src="/assets/pages/basics/simple/text.md" />
    </pvs-content-page>

    <ng-template #demo>
      <ngx-extended-pdf-viewer
        slot="viewer"
        [src]="'./assets/pdfs/The Public Domain - Enclosing the Commons of the Mind.pdf'"
        [zoom]="'auto'"
        [height]="'100%'"
        [minifiedJSLibraries]="false"
        [textLayer]="true"
        [showPresentationModeButton]="true"
        [page]="1"
        [filenameForDownload]="'The Public Domain - Enclosing the Commons of the Mind.pdf'"
      />
    </ng-template>
  `,
})
export class BasicPageComponent {}
