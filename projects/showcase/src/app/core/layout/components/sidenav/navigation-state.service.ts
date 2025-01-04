import { computed, inject, Injectable, signal } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { SESSION_STORAGE } from '../../../../shared/helper/session-storage.token';
import { navigationConfig } from './navigation-config';
import { isNavigationGroup, isNavigationTarget, NavigationEntry } from './navigation-config.types';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class NavigationStateService {
  private router = inject(Router);
  private sessionStorage = inject(SESSION_STORAGE);
  private readonly STORAGE_KEY = 'showcase.navigation.openGroups';
  private pathToAncestorsMap: Map<string, Set<string>>;
  private _openGroups = signal<Set<string>>(this.loadOpenGroupsFromSession());
  openGroups = computed(() => this._openGroups());

  constructor() {
    this.pathToAncestorsMap = this.buildPathAncestorsMap(navigationConfig);
    this.router.events.pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd)).subscribe(() => {
      const storedGroups = this.loadOpenGroupsFromSession();
      if (storedGroups.size === 0) {
        this.expandActiveRoute();
        return;
      }
      this._openGroups.set(storedGroups);
    });
  }

  toggleGroup(key: string): void {
    const currentOpenGroups = new Set(this._openGroups());

    if (currentOpenGroups.has(key)) {
      currentOpenGroups.delete(key);
    } else {
      currentOpenGroups.add(key);
    }

    this._openGroups.set(currentOpenGroups);
    this.saveOpenGroupsToSession(currentOpenGroups);
  }

  private loadOpenGroupsFromSession(): Set<string> {
    if (!this.sessionStorage) {
      return new Set<string>();
    }
    try {
      const storedValue = this.sessionStorage.getItem(this.STORAGE_KEY);
      return storedValue ? new Set(JSON.parse(storedValue)) : new Set<string>();
    } catch {
      return new Set<string>();
    }
  }

  private saveOpenGroupsToSession(groups: Set<string>): void {
    if (!this.sessionStorage) {
      return;
    }

    try {
      this.sessionStorage.setItem(this.STORAGE_KEY, JSON.stringify(Array.from(groups)));
    } catch {
      // Silently fail if something goes wrong
    }
  }

  private buildPathAncestorsMap(entries: NavigationEntry[], currentPath: string[] = [], ancestorGroups: string[] = []): Map<string, Set<string>> {
    const map = new Map<string, Set<string>>();

    for (const entry of entries) {
      if (isNavigationGroup(entry)) {
        const newAncestors = [...ancestorGroups, entry.key];

        const childMap = this.buildPathAncestorsMap(entry.children, currentPath, newAncestors);

        childMap.forEach((value, key) => map.set(key, value));
        continue;
      }

      if (isNavigationTarget(entry) && entry.link) {
        const path = entry.link.join('/');
        map.set(path, new Set(ancestorGroups));
      }
    }

    return map;
  }

  private expandActiveRoute(): void {
    const urlPath = this.router.routerState.snapshot.url.split('?')[0];
    const cleanPath = urlPath
      .split('/')
      .filter((segment) => segment)
      .join('/');

    const ancestorGroups = this.pathToAncestorsMap.get(cleanPath) ?? new Set<string>();

    this._openGroups.set(ancestorGroups);
    this.saveOpenGroupsToSession(ancestorGroups);
  }
}
