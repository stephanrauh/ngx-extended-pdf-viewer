import { Component, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { BROWSER_STORAGE } from '../../../../shared/helper/browser-storage.token';

@Component({
  selector: 'pvs-theme-switcher',
  standalone: true,
  imports: [],
  template: `<button (click)="toggleDarkTheme()">Switch Theme</button>`,
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

  toggleDarkTheme(): void {
    this.useDarkTheme = !this.useDarkTheme;
    this.document.body.classList.toggle('dark', this.useDarkTheme);
    this.localStorage?.setItem('showcase.theme', this.useDarkTheme ? 'dark' : 'light');
  }
}
