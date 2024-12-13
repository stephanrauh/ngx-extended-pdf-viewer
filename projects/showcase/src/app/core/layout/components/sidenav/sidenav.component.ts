import { Component, inject, WritableSignal } from '@angular/core';
import { SidebarService } from '../../../../shared/services/sidebar.service';
import { CloseSidebarDirective } from '../../../directives/close-sidebar.directive';
import { navigationConfig } from './navigation-config';
import { NavigationGroupComponent } from './components/navigation-group.component';
import { isNavigationGroup, isNavigationTarget } from './navigation-config.types';
import { NavigationTargetComponent } from './components/navigation-target.component';
import { CdkTrapFocus } from '@angular/cdk/a11y';
import { IS_SEARCH_DIALOG_OPEN } from '../../../../shared/helper/is-search-dialog-open.token';

@Component({
  selector: 'pvs-sidenav',
  standalone: true,
  imports: [CloseSidebarDirective, NavigationGroupComponent, NavigationTargetComponent, CdkTrapFocus],
  templateUrl: './sidenav.component.html',
})
export class SidenavComponent {
  private sidebarService = inject(SidebarService);
  isSearchDialogOpen: WritableSignal<boolean> = inject(IS_SEARCH_DIALOG_OPEN);

  sidenavIsOpen = this.sidebarService.isOpen;
  navigationEntries = navigationConfig;
  protected readonly isNavigationGroup = isNavigationGroup;
  protected readonly isNavigationTarget = isNavigationTarget;

  toggleSearchDialog(event: MouseEvent): void {
    event.stopPropagation();
    this.isSearchDialogOpen.update((isOpen) => !isOpen);
  }
}
