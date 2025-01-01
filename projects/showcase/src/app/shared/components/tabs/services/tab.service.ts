import { inject, Injectable, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TAB_GROUP } from '../tab-group.token';

@Injectable()
export class TabService {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private readonly groupName = inject(TAB_GROUP);

  private readonly _activeTabKey = signal('');
  readonly activeTabKey = this._activeTabKey.asReadonly();

  constructor() {
    // Subscribe to query param changes
    this.route.queryParams.pipe(takeUntilDestroyed()).subscribe((params) => {
      const tabKey = params[`tab_${this.groupName}`];
      if (tabKey) {
        this._activeTabKey.set(tabKey);
      }
    });
  }

  onChangeTab(tab: string) {
    this._activeTabKey.set(tab);

    // Update query params while preserving other params
    const queryParams = { ...this.route.snapshot.queryParams };
    queryParams[`tab_${this.groupName}`] = tab;

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams,
      queryParamsHandling: 'merge',
    });
  }
}
