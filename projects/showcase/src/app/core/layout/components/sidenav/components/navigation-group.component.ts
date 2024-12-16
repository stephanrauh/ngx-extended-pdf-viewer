import { Component, computed, input } from '@angular/core';
import { isNavigationGroup, isNavigationTarget, NavigationGroup } from '../navigation-config.types';
import { NavigationTargetComponent } from './navigation-target.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'li[pvs-navigation-group]',
  standalone: true,
  imports: [NavigationTargetComponent, FormsModule],
  template: `
    <div class="group/item">
      <input type="checkbox" [id]="groupKey()" [(ngModel)]="isOpen" class="peer hidden" />
      <div class="grid grid-cols-[1fr_minmax(0,auto)] font-semibold">
        <label [for]="groupKey()" class="cursor-pointer">{{ group().displayName }}</label>
        <span [attr.data-open]="isOpen" role="presentation" class="after:content-['+'] data-[open='true']:after:content-['-']"></span>
      </div>
      <ol class="ps-2 hidden peer-checked:block">
        @for (child of group().children; track child) {
          @if (isNavigationGroup(child)) {
            <li pvs-navigation-group [group]="child"></li>
          } @else if (isNavigationTarget(child)) {
            <li pvs-navigation-target [target]="child"></li>
          }
        }
      </ol>
    </div>
  `,
  host: {
    class: '[&:not(:last-child)]:pb-4',
  },
})
export class NavigationGroupComponent {
  group = input.required<NavigationGroup>();
  groupKey = computed(() => this.group().key);
  isOpen = true;
  protected readonly isNavigationGroup = isNavigationGroup;
  protected readonly isNavigationTarget = isNavigationTarget;
}
