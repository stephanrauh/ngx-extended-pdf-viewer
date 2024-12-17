import { Component, computed, input } from '@angular/core';
import { isNavigationGroup, isNavigationTarget, NavigationGroup } from '../navigation-config.types';
import { NavigationTargetComponent } from './navigation-target.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'li[pvs-navigation-group]',
  standalone: true,
  imports: [NavigationTargetComponent, FormsModule],
  template: `
    <input type="checkbox" [id]="groupKey()" [(ngModel)]="isOpen" class="peer hidden" />
    <div class="grid grid-cols-[1fr_minmax(0,auto)] font-semibold">
      <label [for]="groupKey()" class="cursor-pointer">{{ group().displayName }}</label>
      <span [attr.data-open]="isOpen" role="presentation" class="after:content-['+'] data-[open='true']:after:content-['-']"></span>
    </div>
    <ul class="ps-2 hidden peer-checked:block">
      @for (child of group().children; track child) {
        @if (isNavigationGroup(child)) {
          <li pvs-navigation-group [group]="child" tabindex="0"></li>
        } @else if (isNavigationTarget(child)) {
          <li pvs-navigation-target [target]="child"></li>
        }
      }
    </ul>
  `,
  host: {
    class: '[&:not(:last-child)]:pb-4',
    '(keydown.enter)': 'onEnter($event)',
  },
})
export class NavigationGroupComponent {
  group = input.required<NavigationGroup>();
  groupKey = computed(() => this.group().key);
  isOpen = true;
  protected readonly isNavigationGroup = isNavigationGroup;
  protected readonly isNavigationTarget = isNavigationTarget;

  onEnter(event: KeyboardEvent) {
    event.stopPropagation();
    this.isOpen = !this.isOpen;
  }
}
