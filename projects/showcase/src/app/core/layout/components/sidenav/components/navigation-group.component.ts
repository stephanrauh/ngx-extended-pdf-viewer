import { Component, input } from '@angular/core';
import { isNavigationGroup, isNavigationTarget, NavigationGroup } from '../navigation-config.types';
import { NavigationTargetComponent } from './navigation-target.component';

@Component({
  selector: 'pvs-navigation-group',
  standalone: true,
  imports: [NavigationTargetComponent],
  template: `
    <li class="group">
      <input type="checkbox" [id]="group().key" class="hidden" />
      <div class="grid grid-cols-[1fr_minmax(0,auto)] font-semibold">
        <label [for]="group().key" class="cursor-pointer">{{ group().displayName }}</label>
        <span role="presentation" class="after:content-['+'] group-has-[:checked]:after:content-['-']"></span>
      </div>
      @for (child of group().children; track child) {
        <ol id="sidenav" class="ps-2 hidden group-has-[:checked]:block ">
          @if (isNavigationGroup(child)) {
            <pvs-navigation-group [group]="child" />
          } @else if (isNavigationTarget(child)) {
            <pvs-navigation-target [target]="child" />
          }
        </ol>
      }
    </li>
  `,
})
export class NavigationGroupComponent {
  group = input.required<NavigationGroup>();
  protected readonly isNavigationGroup = isNavigationGroup;
  protected readonly isNavigationTarget = isNavigationTarget;
}
