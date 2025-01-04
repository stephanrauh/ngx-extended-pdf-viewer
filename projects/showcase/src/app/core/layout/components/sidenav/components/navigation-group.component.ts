import { Component, computed, inject, input } from '@angular/core';
import { isNavigationGroup, isNavigationTarget, NavigationGroup } from '../navigation-config.types';
import { NavigationTargetComponent } from './navigation-target.component';
import { FormsModule } from '@angular/forms';
import { NavigationStateService } from '../navigation-state.service';

@Component({
  selector: 'li[pvs-navigation-group]',
  standalone: true,
  imports: [NavigationTargetComponent, FormsModule],
  template: `
    <input type="checkbox" [id]="groupKey()" [checked]="isOpenSignal()" (change)="toggleGroup()" class="peer hidden" />
    <div class="grid grid-cols-[1fr_minmax(0,auto)] font-semibold">
      <label [for]="groupKey()" class="cursor-pointer">{{ group().displayName }}</label>
      <label
        [for]="groupKey()"
        [attr.data-open]="isOpenSignal()"
        role="presentation"
        class="after:content-['+'] data-[open='true']:after:content-['-'] cursor-pointer"
      ></label>
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
    class: '[&:not(:last-child)]:pb-4 [&:not(#mainList>*)]:pb-0 [&:not(#mainList>*)]:ps-2 [&:not(#mainList>*)]:pt-1',
    '(keydown.enter)': 'onEnter($event)',
  },
})
export class NavigationGroupComponent {
  private navigationStateService = inject(NavigationStateService);

  group = input.required<NavigationGroup>();
  groupKey = computed(() => this.group().key);

  isOpenSignal = computed(() => this.navigationStateService.openGroups().has(this.groupKey()));

  protected readonly isNavigationGroup = isNavigationGroup;
  protected readonly isNavigationTarget = isNavigationTarget;

  onEnter(event: KeyboardEvent) {
    event.stopPropagation();
    this.toggleGroup();
  }

  toggleGroup(): void {
    this.navigationStateService.toggleGroup(this.groupKey());
  }
}
