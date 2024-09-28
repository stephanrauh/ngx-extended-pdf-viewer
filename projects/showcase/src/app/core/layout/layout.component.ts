import { Component, inject } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { NgClass } from '@angular/common';
import { SidenavService } from '../../shared/services/sidenav.service';
import { CloseSidenavDirective } from '../directives/close-sidenav.directive';
import { VisibleOnOpenSidenavDirective } from '../directives/visible-on-open-sidenav.directive';

@Component({
  selector: 'pvs-layout',
  standalone: true,
  imports: [HeaderComponent, SidenavComponent, NgClass, CloseSidenavDirective, VisibleOnOpenSidenavDirective],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
})
export class LayoutComponent {
  private sidenavService = inject(SidenavService);
}
