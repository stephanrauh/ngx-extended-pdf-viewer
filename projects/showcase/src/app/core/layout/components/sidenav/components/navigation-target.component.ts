import { Component, input } from '@angular/core';
import { NavigationTarget } from '../navigation-config.types';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'pvs-navigation-target',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <li>
      <a [routerLink]="target().link" routerLinkActive="text-secondary-variant-light">{{ target().displayName }}</a>
    </li>
  `,
  styles: ``,
})
export class NavigationTargetComponent {
  target = input.required<NavigationTarget>();
}
