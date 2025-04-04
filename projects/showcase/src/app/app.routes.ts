import { Routes } from '@angular/router';
import { aboutRoutes } from './pages/about/about.routes';
import { basicsRoutes } from './pages/basics/basics.routes';
import { configurationRoutes } from './pages/configuration/configuration.routes';
import { customizationRoutes } from './pages/customization/customization.routes';
import { securityRoutes } from './pages/security/security.routes';
import { exportingRoutes } from './pages/exporting/exporting.routes';
import { viewingRoutes } from './pages/viewing/viewing.routes';
import { formsRoutes } from './pages/forms/forms.routes';
import { printingRoutes } from './pages/printing/printing.routes';
import { findingRoutes } from './pages/finding/finding.routes';
import { developerExperienceRoutes } from './pages/developer-experience/developer-experience.routes';
import { contributingRoutes } from './pages/contributing/contributing.routes';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'about/introduction',
  },
  ...aboutRoutes,
  ...basicsRoutes,
  ...contributingRoutes,
  ...configurationRoutes,
  ...viewingRoutes,
  ...findingRoutes,
  ...customizationRoutes,
  ...formsRoutes,
  ...printingRoutes,
  ...securityRoutes,
  ...exportingRoutes,
  ...developerExperienceRoutes,
];
