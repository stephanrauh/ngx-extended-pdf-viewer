import { Directive, HostBinding, inject } from '@angular/core';
import { SidebarService } from '../../shared/services/sidebar.service';

@Directive({
  selector: '[pvsBlockOnOpenSidebar]',
  standalone: true,
})
export class BlockOnOpenSidebarDirective {
  private sidebarService = inject(SidebarService);

  @HostBinding('class.max-lg:pointer-events-none') get pointerEvents() {
    return this.sidebarService.isOpen();
  }

  @HostBinding('attr.max-lg:tabindex') get tabIndex() {
    return this.sidebarService.isOpen() ? -1 : null;
  }

  @HostBinding('attr.max-lg:aria-hidden') get ariaHidden() {
    return this.sidebarService.isOpen();
  }
}
