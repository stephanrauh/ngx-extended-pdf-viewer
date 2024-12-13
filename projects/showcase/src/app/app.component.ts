import { Component, effect, inject, OnInit, WritableSignal } from '@angular/core';
import { NavigationEnd, NavigationSkipped, Router, RouterOutlet } from '@angular/router';
import { LayoutComponent } from './core/layout/layout.component';
import { DOCUMENT } from '@angular/common';
import { SidebarService } from './shared/services/sidebar.service';
import { WINDOW } from './shared/helper/window.token';
import { IS_SEARCH_DIALOG_OPEN } from './shared/helper/is-search-dialog-open.token';
import { SearchComponent } from './core/search/search.component';
import { filter } from 'rxjs/operators';
import { map } from 'rxjs';
import { isBrowser } from './shared/helper/utilities';

@Component({
  selector: 'pvs-root',
  standalone: true,
  imports: [RouterOutlet, LayoutComponent, SearchComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  private document = inject(DOCUMENT);
  private window = inject(WINDOW);

  private sidebarService = inject(SidebarService);
  private router = inject(Router);

  displaySearchDialog: WritableSignal<boolean> = inject(IS_SEARCH_DIALOG_OPEN);

  constructor() {
    effect(() => {
      const isOpen = this.sidebarService.isOpen();
      if (!isOpen) {
        return;
      }
      const scrollbarWidth = this.calculateBodyScrollbarWidth();
      this.document.body.style.setProperty('--scrollbar-width', `${scrollbarWidth}px`);
    });
  }

  ngOnInit() {
    this.router.events.pipe(filter((event) => event instanceof NavigationSkipped)).subscribe(() => {
      this.displaySearchDialog.set(false);
    });

    this.router.events
      .pipe(
        filter((e): e is NavigationEnd => e instanceof NavigationEnd),
        map((event) => event.urlAfterRedirects),
      )
      .subscribe(() => {
        this.displaySearchDialog.set(false);
      });
  }

  focusFirstHeading(): void {
    if (!isBrowser()) {
      return;
    }

    const main = this.document.querySelector<HTMLHeadingElement>('main');
    main?.focus();
  }

  private calculateBodyScrollbarWidth() {
    if (!this.window) {
      return 0;
    }
    return this.window?.innerWidth - this.document.documentElement.offsetWidth;
  }
}
