import { Component, input } from '@angular/core';
import { MarkdownComponent } from 'ngx-markdown';

@Component({
  selector: 'pvs-markdown',
  standalone: true,
  imports: [MarkdownComponent],
  template: ` <markdown [src]="src()"></markdown> `,
})
export class MarkdownContentComponent {
  src = input.required<string>();
}
