import { Component, inject } from '@angular/core';
import { SidebarService } from '../../../../shared/services/sidebar.service';
import { NgClass } from '@angular/common';
import { CloseSidebarDirective } from '../../../directives/close-sidebar.directive';
import { VisibleOnOpenSidenavDirective } from '../../../directives/visible-on-open-sidenav.directive';

@Component({
  selector: 'pvs-sidenav',
  standalone: true,
  imports: [NgClass, CloseSidebarDirective, VisibleOnOpenSidenavDirective],
  templateUrl: './sidenav.component.html',
})
export class SidenavComponent {
  private sidebarService = inject(SidebarService);

  public sidenavIsOpen = this.sidebarService.isOpen;
}
