import { Component, inject } from '@angular/core';

import { SidenavComponent } from '../sidenav/sidenav.component';
import { SidebarService } from '../../../../shared/services/sidebar.service';
import { versions } from '../../../../shared/constants/versions';

@Component({
  selector: 'pvs-header',
  standalone: true,
  imports: [SidenavComponent],
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  private sidebarService = inject(SidebarService);

  public extendedPdfViewerVersion = versions.extendedPdfViewer;
  public angularVersion = versions.angular;
  public sidenavIsOpen = this.sidebarService.isOpen;

  public toggleSidebar() {
    this.sidebarService.toggle();
  }
}
