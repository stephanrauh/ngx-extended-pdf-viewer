import { Component, inject, input } from '@angular/core';
import { MarkdownComponent } from 'ngx-markdown';
import { BaseHrefService } from '../services/base-href.service';

@Component({
  selector: 'pvs-markdown',
  standalone: true,
  imports: [MarkdownComponent],
  template: ` <markdown [src]="prefix + src()" [data]="data()"></markdown> `,
})
export class MarkdownContentComponent {
  src = input<string>();
  data = input<string>();

  public prefix = '';

  private baseHrefService = inject(BaseHrefService);

  public constructor() {
    this.prefix = this.baseHrefService.getBaseHref();
  }
}
