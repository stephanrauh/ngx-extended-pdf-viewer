import { Component } from '@angular/core';

@Component({
  selector: 'pvs-split-view',
  standalone: true,
  imports: [],
  template: ` <div class="grid lg:grid-cols-[1fr_3fr] gap-8 h-full">
    <div>
      <ng-content />
    </div>
    <div>
      <ng-content select="[slot='end']" />
    </div>
  </div>`,
})
export class SplitViewComponent {}
