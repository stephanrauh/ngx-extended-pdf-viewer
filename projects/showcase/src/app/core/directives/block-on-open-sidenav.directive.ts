import { Directive, HostBinding, inject } from '@angular/core';
import { SidenavService } from '../../shared/services/sidenav.service';

@Directive({
  selector: '[pvsBlockOnOpenSidenav]',
  standalone: true,
})
export class BlockOnOpenSidenavDirective {
  private sidenavService = inject(SidenavService);

  @HostBinding('class.pointer-events-none') get pointerEvents() {
    return this.sidenavService.isOpen();
  }

  @HostBinding('attr.tabindex') get tabIndex() {
    return this.sidenavService.isOpen() ? -1 : null;
  }

  @HostBinding('attr.aria-hidden') get ariaHidden() {
    return this.sidenavService.isOpen();
  }
}
