import { Component, inject, signal } from '@angular/core';

import { SidenavComponent } from '../sidenav/sidenav.component';
import { SidenavService } from '../../../../shared/services/sidenav.service';
import { versions } from '../../../../shared/constants/versions';

@Component({
  selector: 'pvs-header',
  standalone: true,
  imports: [SidenavComponent],
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  private sidenavService = inject(SidenavService);

  public extendedPdfViewerVersion = versions.extendedPdfViewer;
  public angularVersion = versions.angular;
  public sidenavIsOpen = this.sidenavService.isOpen;

  public onOpenSidenav() {
    this.sidenavService.open();
  }
}
