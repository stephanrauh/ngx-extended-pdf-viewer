import { Routes } from '@angular/router';
import { aboutRoutes } from './pages/about/about.routes';
import { basicsRoutes } from './pages/basics/basics.routes';
import { configurationRoutes } from './pages/configuration/configuration.routes';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'about',
  },
  ...aboutRoutes,
  ...basicsRoutes,
  ...configurationRoutes,
];
