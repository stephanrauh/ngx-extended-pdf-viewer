import { Component, input } from '@angular/core';
import { MarkdownComponent } from 'ngx-markdown';

@Component({
  selector: 'pvs-markdown',
  standalone: true,
  imports: [MarkdownComponent],
  template: ` <markdown [src]="src()" [data]="data()"></markdown> `,
})
export class MarkdownContentComponent {
  src = input<string>();
  data = input<string>();
}
