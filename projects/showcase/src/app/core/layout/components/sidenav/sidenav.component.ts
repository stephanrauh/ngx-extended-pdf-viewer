import { CdkTrapFocus } from '@angular/cdk/a11y';
import { Component, computed, inject, WritableSignal } from '@angular/core';
import { IS_APPLE } from '../../../../shared/helper/is-apple.token';
import { IS_SEARCH_DIALOG_OPEN } from '../../../../shared/helper/is-search-dialog-open.token';
import { SidebarService } from '../../../../shared/services/sidebar.service';
import { CloseSidebarDirective } from '../../../directives/close-sidebar.directive';
import { NavigationGroupComponent } from './components/navigation-group.component';
import { NavigationTargetComponent } from './components/navigation-target.component';
import { navigationConfig } from './navigation-config';
import { isNavigationGroup, isNavigationTarget } from './navigation-config.types';

@Component({
  selector: 'pvs-sidenav',
  standalone: true,
  imports: [CloseSidebarDirective, NavigationGroupComponent, NavigationTargetComponent, CdkTrapFocus],
  templateUrl: './sidenav.component.html',
  host: {
    '(keydown)': 'onKeydown($event)',
  },
})
export class SidenavComponent {
  private sidebarService = inject(SidebarService);
  isSearchDialogOpen: WritableSignal<boolean> = inject(IS_SEARCH_DIALOG_OPEN);

  isApple = inject(IS_APPLE);
  shortCutText = computed(() => (this.isApple() ? '⌘K' : 'Ctrl+K'));

  sidenavIsOpen = this.sidebarService.isOpen;
  navigationEntries = navigationConfig;
  protected readonly isNavigationGroup = isNavigationGroup;
  protected readonly isNavigationTarget = isNavigationTarget;

  toggleSearchDialog(event?: MouseEvent): void {
    if (event) {
      event.stopPropagation();
    }
    this.isSearchDialogOpen.update((isOpen) => !isOpen);
  }

  onKeydown(event: KeyboardEvent): void {
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
      event.stopPropagation();
      this.toggleSearchDialog();
    }
  }
}
