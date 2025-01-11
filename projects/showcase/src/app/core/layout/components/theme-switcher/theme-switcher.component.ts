import { Component, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { BROWSER_STORAGE } from '../../../../shared/helper/browser-storage.token';

@Component({
  selector: 'pvs-theme-switcher',
  standalone: true,
  imports: [],
  template: `<button
    (click)="toggleTheme()"
    class="p-2 rounded-lg bg-surface hover:bg-surface-hover  dark:bg-surface-dark dark:hover:bg-surface-dark-hover transition-colors duration-200 border"
    [attr.aria-label]="useDarkTheme ? 'Switch to light theme' : 'Switch to dark theme'"
  >
    <!-- Sun icon (for dark mode) -->
    <svg class="hidden dark:block w-5 h-5 text-yellow-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
      />
    </svg>

    <!-- Moon icon (for light mode) -->
    <svg class="block dark:hidden w-5 h-5 text-primary-light" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
      />
    </svg>
  </button>`,
  styles: ``,
})
export class ThemeSwitcherComponent {
  private document = inject(DOCUMENT);
  private localStorage = inject(BROWSER_STORAGE);
  useDarkTheme = false;

  constructor() {
    const theme = this.localStorage?.getItem('showcase.theme');
    this.useDarkTheme = theme === 'dark';
    this.document.body.classList.toggle('dark', this.useDarkTheme);
  }

  toggleTheme(): void {
    this.useDarkTheme = !this.useDarkTheme;
    this.document.body.classList.toggle('dark', this.useDarkTheme);
    this.localStorage?.setItem('showcase.theme', this.useDarkTheme ? 'dark' : 'light');
  }
}
