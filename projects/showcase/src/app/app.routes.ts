import { Routes } from '@angular/router';
import { aboutRoutes } from './pages/about/about.routes';
import { basicsRoutes } from './pages/basics/basics.routes';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'about',
  },
  ...aboutRoutes,
  ...basicsRoutes,
];
