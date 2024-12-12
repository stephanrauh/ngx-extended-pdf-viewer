import { Component, computed, input } from '@angular/core';
import { isNavigationGroup, isNavigationTarget, NavigationGroup } from '../navigation-config.types';
import { NavigationTargetComponent } from './navigation-target.component';

@Component({
  selector: 'li[pvs-navigation-group]',
  standalone: true,
  imports: [NavigationTargetComponent],
  template: `
    <input type="checkbox" [id]="groupKey()" checked class="hidden" />
    <div class="grid grid-cols-[1fr_minmax(0,auto)] font-semibold">
      <label [for]="group().key" class="cursor-pointer">{{ group().displayName }}</label>
      <span role="presentation" class="after:content-['+'] group-has-[:checked]:after:content-['-']"></span>
    </div>
    <ol class="ps-2 hidden group-has-[:checked]:block ">
      @for (child of group().children; track child) {
        @if (isNavigationGroup(child)) {
          <li pvs-navigation-group [group]="child"></li>
        } @else if (isNavigationTarget(child)) {
          <li pvs-navigation-target [target]="child"></li>
        }
      }
    </ol>
  `,
  host: {
    class: 'group [&:not(:last-child)]:pb-4',
  },
})
export class NavigationGroupComponent {
  group = input.required<NavigationGroup>();
  groupKey = computed(() => this.group().key);
  protected readonly isNavigationGroup = isNavigationGroup;
  protected readonly isNavigationTarget = isNavigationTarget;
}
