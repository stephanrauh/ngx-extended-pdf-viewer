import { Component } from '@angular/core';
import { MarkdownContentComponent } from '../../../shared/components/markdown-content.component';

@Component({
  selector: 'pvs-changelog-page',
  standalone: true,
  imports: [MarkdownContentComponent],
  template: `
    <h1>Changelog</h1>
    <pvs-markdown src="/assets/extended-pdf-viewer/changelog/changelog.md" />
  `,
  styles: ``,
})
export class ChangelogPageComponent {}
