import { Component } from '@angular/core';
import { ContentPageComponent } from '../../../core/content-page/content-page.component';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { MarkdownContentComponent } from '../../../shared/components/markdown-content.component';

@Component({
  selector: 'pvs-basic-page',
  standalone: true,
  imports: [ContentPageComponent, NgxExtendedPdfViewerModule, MarkdownContentComponent],
  template: `
    <pvs-content-page>
      <pvs-markdown src="/assets/pages/basics/simple/text.md" />

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
    </pvs-content-page>
  `,
})
export class BasicPageComponent {}
