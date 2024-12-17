import { Component, inject, input } from '@angular/core';
import { NavigationTarget } from '../navigation-config.types';
import { Event, NavigationStart, Router, RouterEvent, RouterLink, RouterLinkActive } from '@angular/router';
import { filter } from 'rxjs/operators';
import { SidebarService } from '../../../../../shared/services/sidebar.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NgClass } from '@angular/common';

@Component({
  selector: 'li[pvs-navigation-target]',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgClass],
  template: `
    <a
      [ngClass]="{ 'ps-2': !isTopLevelTarget(), 'cursor-pointer font-semibold': isTopLevelTarget() }"
      [routerLink]="target().link"
      [routerLinkActive]="['text-primary-light', 'dark:text-primary-dark', 'border-s-2', 'border-primary-light', 'dark:border-primary-dark']"
      >{{ target().displayName }}</a
    >
  `,
  host: {
    class: 'pt-1 ',
  },
})
export class NavigationTargetComponent {
  private router = inject(Router);
  private sidebarService = inject(SidebarService);
  target = input.required<NavigationTarget>();
  isTopLevelTarget = input<boolean>(false);

  constructor() {
    this.router.events
      .pipe(
        filter(() => this.sidebarService.isOpen()),
        filter((e: Event | RouterEvent): e is RouterEvent => e instanceof NavigationStart),
        takeUntilDestroyed(),
      )
      .subscribe((event) => {
        this.sidebarService.close();
      });
  }
}
