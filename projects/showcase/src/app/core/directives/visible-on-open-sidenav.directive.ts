import { computed, Directive, effect, HostBinding, inject } from '@angular/core';
import { SidenavService } from '../../shared/services/sidenav.service';

@Directive({
  selector: '[pvsVisibleOnOpenSidenav]',
  standalone: true,
})
export class VisibleOnOpenSidenavDirective {
  private sidenavService = inject(SidenavService);
  @HostBinding('class.hidden') isHidden = true;

  constructor() {
    effect(() => {
      const isOpen = this.sidenavService.isOpen();
      this.isHidden = !isOpen;
    });
  }
}
