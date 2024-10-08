import { Component, inject } from '@angular/core';
import { SidebarService } from '../../../../shared/services/sidebar.service';
import { NgClass } from '@angular/common';
import { CloseSidebarDirective } from '../../../directives/close-sidebar.directive';
import { VisibleOnOpenSidebarDirective } from '../../../directives/visible-on-open-sidebar.directive';
import { navigationConfig } from './navigation-config';
import { NavigationGroupComponent } from './components/navigation-group.component';
import { isNavigationGroup, isNavigationTarget } from './navigation-config.types';
import { NavigationTargetComponent } from './components/navigation-target.component';
import { CdkTrapFocus } from '@angular/cdk/a11y';

@Component({
  selector: 'pvs-sidenav',
  standalone: true,
  imports: [NgClass, CloseSidebarDirective, VisibleOnOpenSidebarDirective, NavigationGroupComponent, NavigationTargetComponent, CdkTrapFocus],
  templateUrl: './sidenav.component.html',
})
export class SidenavComponent {
  private sidebarService = inject(SidebarService);

  public sidenavIsOpen = this.sidebarService.isOpen;
  public navigationEntries = navigationConfig;
  protected readonly isNavigationGroup = isNavigationGroup;
  protected readonly isNavigationTarget = isNavigationTarget;
}
