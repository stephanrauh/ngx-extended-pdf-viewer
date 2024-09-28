import { Directive, HostBinding, inject } from '@angular/core';
import { SidenavService } from '../../shared/services/sidenav.service';

@Directive({
  selector: '[pvsVisibleOnOpenSidenav]',
  standalone: true,
})
export class VisibleOnOpenSidenavDirective {
  private sidenavService = inject(SidenavService);

  @HostBinding('class.hidden') get isHidden() {
    return !this.sidenavService.isOpen();
  }
}
