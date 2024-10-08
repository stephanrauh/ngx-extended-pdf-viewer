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

  extendedPdfViewerVersion = versions.extendedPdfViewer;
  angularVersion = versions.angular;
  sidenavIsOpen = this.sidebarService.isOpen;

  toggleSidebar() {
    this.sidebarService.toggle();
  }
}
