import { Component } from '@angular/core';
import { MarkdownContentComponent } from '../../../shared/components/markdown-content.component';

@Component({
  selector: 'pvs-showcase-page',
  standalone: true,
  imports: [MarkdownContentComponent],
  template: `<pvs-markdown src="/assets/pages/contributing/showcase/text.md" />`,
})
export class ShowcasePageComponent {}
