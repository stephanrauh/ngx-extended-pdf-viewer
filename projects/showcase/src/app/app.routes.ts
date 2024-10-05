import { Routes } from '@angular/router';
import { aboutRoutes } from './pages/about/about.routes';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'about',
  },
  ...aboutRoutes,
];
