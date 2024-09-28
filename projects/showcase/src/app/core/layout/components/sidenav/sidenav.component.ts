import { Component, inject } from '@angular/core';
import { SidenavService } from '../../../../shared/services/sidenav.service';
import { NgClass } from '@angular/common';
import { CloseSidenavDirective } from '../../../directives/close-sidenav.directive';
import { VisibleOnOpenSidenavDirective } from '../../../directives/visible-on-open-sidenav.directive';

@Component({
  selector: 'pvs-sidenav',
  standalone: true,
  imports: [NgClass, CloseSidenavDirective, VisibleOnOpenSidenavDirective],
  templateUrl: './sidenav.component.html',
})
export class SidenavComponent {
  private sidenavService = inject(SidenavService);

  public sidenavIsOpen = this.sidenavService.isOpen;
}
