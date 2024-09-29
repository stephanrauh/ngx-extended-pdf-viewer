import { Directive, HostBinding, inject } from '@angular/core';
import { SidebarService } from '../../shared/services/sidebar.service';

@Directive({
  selector: '[pvsVisibleOnOpenSidebar]',
  standalone: true,
})
export class VisibleOnOpenSidebarDirective {
  private sidebarService = inject(SidebarService);

  @HostBinding('class.sidebar-open') get isHidden() {
    return this.sidebarService.isOpen();
  }
}
