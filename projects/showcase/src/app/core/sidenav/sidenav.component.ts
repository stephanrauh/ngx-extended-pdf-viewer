import { Component, inject } from '@angular/core';
import { SidenavService } from '../../shared/services/sidenav.service';

@Component({
  selector: 'pvs-sidenav',
  standalone: true,
  imports: [],
  templateUrl: './sidenav.component.html',
})
export class SidenavComponent {
  private sidenavService = inject(SidenavService);

  public sidenavIsOpen = this.sidenavService.isOpen;

  public onClose() {
    this.sidenavService.close();
  }
}
