import { Component } from '@angular/core';
import { ContentPageComponent } from '../../../shared/components/content-page/content-page.component';
import { MarkdownContentComponent } from '../../../shared/components/markdown-content.component';

@Component({
  selector: 'pvs-loading-page',
  standalone: true,
  imports: [ContentPageComponent, MarkdownContentComponent],
  template: `<pvs-content-page>
    <pvs-markdown src="/assets/pages/basics/loading/text.md" />
  </pvs-content-page>`,
})
export class LoadingPageComponent {}
