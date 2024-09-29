import { Component, inject } from '@angular/core';
import { SidebarService } from '../../../../shared/services/sidebar.service';
import { NgClass } from '@angular/common';
import { CloseSidebarDirective } from '../../../directives/close-sidebar.directive';
import { VisibleOnOpenSidebarDirective } from '../../../directives/visible-on-open-sidebar.directive';

@Component({
  selector: 'pvs-sidenav',
  standalone: true,
  imports: [NgClass, CloseSidebarDirective, VisibleOnOpenSidebarDirective],
  templateUrl: './sidenav.component.html',
})
export class SidenavComponent {
  private sidebarService = inject(SidebarService);

  public sidenavIsOpen = this.sidebarService.isOpen;
}
