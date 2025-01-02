import { Component, signal } from '@angular/core';
import { MarkdownContentComponent } from '../../../../shared/components/markdown-content.component';
import { Contributor } from './contributor.type';
import { of } from 'rxjs';
import { contributors } from './contributors.data';
import { ContributorComponent } from './contributor.component';

@Component({
  selector: 'pvs-contributors-page',
  standalone: true,
  imports: [MarkdownContentComponent, ContributorComponent],
  template: ` <pvs-markdown src="/assets/pages/about/contributing/contributors/text.md" />
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
      @for (contributor of contributors(); track contributor.login) {
        <pvs-contributor [contributor]="contributor" />
      }
    </div>`,
})
export class ContributorsPageComponent {
  contributors = signal<Contributor[]>(contributors);
  protected readonly of = of;
}
