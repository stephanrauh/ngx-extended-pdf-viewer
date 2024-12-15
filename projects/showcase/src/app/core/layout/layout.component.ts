import { Component } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { NgClass } from '@angular/common';
import { CloseSidebarDirective } from '../directives/close-sidebar.directive';
import { VisibleOnOpenSidebarDirective } from '../directives/visible-on-open-sidebar.directive';
import { BlockOnOpenSidebarDirective } from '../directives/block-on-open-sidebar.directive';
import { VersionSwitcherComponent } from './components/version-switcher/version-switcher.component';

@Component({
  selector: 'pvs-layout',
  standalone: true,
  imports: [
    HeaderComponent,
    SidenavComponent,
    NgClass,
    CloseSidebarDirective,
    VisibleOnOpenSidebarDirective,
    BlockOnOpenSidebarDirective,
    VersionSwitcherComponent,
  ],
  templateUrl: './layout.component.html',
})
export class LayoutComponent {}
