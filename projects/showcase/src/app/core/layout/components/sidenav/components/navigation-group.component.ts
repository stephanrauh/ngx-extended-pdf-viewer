import { Component, input } from '@angular/core';
import { isNavigationGroup, isNavigationTarget, NavigationGroup } from '../navigation-config.types';
import { NavigationTargetComponent } from './navigation-target.component';

@Component({
  selector: 'pvs-navigation-group',
  standalone: true,
  imports: [NavigationTargetComponent],
  template: `
    <li>
      <button type="button">{{ group().displayName }}</button>
      @for (child of group().children; track child) {
        <ol id="sidenav" class="ps-4">
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
