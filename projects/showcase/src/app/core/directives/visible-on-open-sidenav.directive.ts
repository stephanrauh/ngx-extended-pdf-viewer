import { Directive, HostBinding, inject } from '@angular/core';
import { SidebarService } from '../../shared/services/sidebar.service';

@Directive({
  selector: '[pvsVisibleOnOpenSidebar]',
  standalone: true,
})
export class VisibleOnOpenSidenavDirective {
  private sidebarService = inject(SidebarService);

  @HostBinding('class.sidebar-open') get isHidden() {
    return this.sidebarService.isOpen();
  }
}
