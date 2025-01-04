import { Component } from '@angular/core';
import { MarkdownContentComponent } from '../../../shared/components/markdown-content.component';

@Component({
  selector: 'pvs-pdf-viewer-page',
  standalone: true,
  imports: [MarkdownContentComponent],
  template: `<pvs-markdown src="/assets/pages/contributing/pdf-viewer/text.md" />`,
})
export class PDFViewerPageComponent {}
