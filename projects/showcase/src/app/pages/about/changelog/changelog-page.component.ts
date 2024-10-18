import { Component } from '@angular/core';
import { ContentPageComponent } from '../../../shared/components/content-page/content-page.component';
import { MarkdownContentComponent } from '../../../shared/components/markdown-content.component';

@Component({
  selector: 'pvs-changelog-page',
  standalone: true,
  imports: [ContentPageComponent, MarkdownContentComponent],
  template: `<h1>Changelog</h1>`,
  styles: ``,
})
export class ChangelogPageComponent {}
