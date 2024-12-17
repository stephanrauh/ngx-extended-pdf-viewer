import { Component } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { CloseSidebarDirective } from '../directives/close-sidebar.directive';
import { VisibleOnOpenSidebarDirective } from '../directives/visible-on-open-sidebar.directive';
import { BlockOnOpenSidebarDirective } from '../directives/block-on-open-sidebar.directive';
import { VersionSwitcherComponent } from './components/version-switcher/version-switcher.component';
import { ThemeSwitcherComponent } from './components/theme-switcher/theme-switcher.component';

@Component({
  selector: 'pvs-layout',
  standalone: true,
  imports: [
    HeaderComponent,
    SidenavComponent,
    CloseSidebarDirective,
    VisibleOnOpenSidebarDirective,
    BlockOnOpenSidebarDirective,
    VersionSwitcherComponent,
    ThemeSwitcherComponent,
  ],
  templateUrl: './layout.component.html',
})
export class LayoutComponent {}
