import { Component, effect, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LayoutComponent } from './core/layout/layout.component';
import { DOCUMENT } from '@angular/common';
import { SidenavService } from './shared/services/sidenav.service';

@Component({
  selector: 'pvs-root',
  standalone: true,
  imports: [RouterOutlet, LayoutComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  private document = inject(DOCUMENT);
  private sidenavService = inject(SidenavService);

  constructor() {
    effect(() => {
      const isOpen = this.sidenavService.isOpen();
      if (isOpen) {
        this.document.body.classList.add('overflow-hidden');
        return;
      }
      this.document.body.classList.remove('overflow-hidden');
    });
  }
}
