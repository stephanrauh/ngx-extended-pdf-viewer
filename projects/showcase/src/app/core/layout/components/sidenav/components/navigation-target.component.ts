import { Component, input } from '@angular/core';
import { NavigationTarget } from '../navigation-config.types';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'pvs-navigation-target',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <li>
      <a class="ps-2" [routerLink]="target().link" [routerLinkActive]="['text-secondary-variant-light', 'border-s', 'border-secondary-variant-light']">{{
        target().displayName
      }}</a>
    </li>
  `,
})
export class NavigationTargetComponent {
  target = input.required<NavigationTarget>();
}
