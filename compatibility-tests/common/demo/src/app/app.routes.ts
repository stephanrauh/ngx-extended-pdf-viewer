import { Routes } from '@angular/router';

/**
 * Three routes, three things to compat-verify:
 * - `/smoketest`                  — NgModule consumer  (lazy-loaded NgModule)
 * - `/standalone-smoketest`       — Standalone consumer
 * - `/ng-on-destroy`              — Lifecycle compat (mount/unmount/remount)
 */
export const APP_ROUTES: Routes = [
  {
    path: 'smoketest',
    loadChildren: () =>
      import('./ngmodule-smoketest/ngmodule-smoketest.module').then(
        (m) => m.NgModuleSmoketestModule,
      ),
  },
  {
    path: 'standalone-smoketest',
    loadComponent: () =>
      import('./standalone-smoketest/standalone-smoketest.component').then(
        (m) => m.StandaloneSmoketestComponent,
      ),
  },
  {
    path: 'ng-on-destroy',
    loadComponent: () =>
      import('./ng-on-destroy/ng-on-destroy.component').then(
        (m) => m.NgOnDestroyComponent,
      ),
  },
  { path: '', redirectTo: 'standalone-smoketest', pathMatch: 'full' },
];
