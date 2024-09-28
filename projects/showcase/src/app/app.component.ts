import { Component, effect, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LayoutComponent } from './core/layout/layout.component';
import { DOCUMENT } from '@angular/common';
import { SidenavService } from './shared/services/sidenav.service';
import { WINDOW } from './shared/helper/window.token';

@Component({
  selector: 'pvs-root',
  standalone: true,
  imports: [RouterOutlet, LayoutComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  private document = inject(DOCUMENT);
  private window = inject(WINDOW);

  private sidenavService = inject(SidenavService);

  constructor() {
    effect(() => {
      const isOpen = this.sidenavService.isOpen();
      if (isOpen) {
        const scrollbarWidth = this.calculateBodyScrollbarWidth();
        this.document.body.style.setProperty('--scrollbar-width', `${scrollbarWidth}px`);
        this.document.body.classList.add('blocked-scroll');
        return;
      }
      this.document.body.classList.remove('blocked-scroll');
    });
  }

  private calculateBodyScrollbarWidth() {
    if (!this.window) {
      return 0;
    }
    return this.window?.innerWidth - this.document.documentElement.offsetWidth;
  }
}
