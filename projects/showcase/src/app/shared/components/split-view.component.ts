import { Component, input } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'pvs-split-view',
  standalone: true,
  imports: [NgClass],
  template: ` <div class="grid grid-cols-[1fr_2fr] gap-8 h-full">
    <div [ngClass]="{ 'sticky top-content-begin self-start': stickyStart() }">
      <ng-content />
    </div>
    <div [ngClass]="{ 'sticky top-content-begin self-start': stickyEnd() }">
      <ng-content select="[slot='end']" />
    </div>
  </div>`,
})
export class SplitViewComponent {
  stickyStart = input<boolean>(false);
  stickyEnd = input<boolean>(false);
}
