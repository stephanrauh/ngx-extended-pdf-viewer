import { Component } from '@angular/core';
import { MarkdownContentComponent } from '../../../../shared/components/markdown-content.component';

@Component({
  selector: 'pvs-contributors-page',
  standalone: true,
  imports: [MarkdownContentComponent],
  template: `<pvs-markdown src="/assets/pages/about/contributing/contributors/text.md" />`,
})
export class ContributorsPageComponent {}
