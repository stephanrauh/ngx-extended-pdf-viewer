import { Directive, HostListener, inject } from '@angular/core';
import { SidenavService } from '../../shared/services/sidenav.service';

@Directive({
  selector: '[pvsCloseSidenav]',
  standalone: true,
})
export class CloseSidenavDirective {
  private sidenavService = inject(SidenavService);

  @HostListener('click') onClick() {
    this.sidenavService.close();
  }
}
