import { Component } from '@angular/core';
import { ContentPageComponent } from '../../../core/content-page/content-page.component';
import { MarkdownContentComponent } from '../../../shared/components/markdown-content.component';

@Component({
  selector: 'pvs-browser-support-page',
  standalone: true,
  imports: [ContentPageComponent, MarkdownContentComponent],
  template: ` <pvs-content-page> <pvs-markdown src="/assets/pages/about/browser-support/text.md" /> </pvs-content-page> `,
})
export class BrowserSupportPageComponent {}
