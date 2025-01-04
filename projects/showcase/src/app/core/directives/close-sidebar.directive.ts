import { Directive, HostListener, inject } from '@angular/core';
import { SidebarService } from '../../shared/services/sidebar.service';

@Directive({
  selector: '[pvsCloseSidebar]',
  standalone: true,
})
export class CloseSidebarDirective {
  private sidebarService = inject(SidebarService);

  @HostListener('click') onClick() {
    this.sidebarService.close();
  }
}
