import { Component, inject } from '@angular/core';

import { SidebarService } from '../../../../shared/services/sidebar.service';
import { versions } from '../../../../shared/constants/versions';

@Component({
  selector: 'pvs-header',
  standalone: true,
  imports: [],
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
