import { GeneralPageComponent } from './general/general-page.component';
import { Route } from '@angular/router';
import { RouteGroupData } from '../../shared/types/route-data.types';

export const securityRoutes: Route[] = [
  {
    path: 'security',
    data: <RouteGroupData>{
      name: 'Security',
      key: 'security',
    },
    children: [
      {
        path: 'general',
        component: GeneralPageComponent,
        data: {
          pageTitle: 'General',
        },
      },
    ],
  },
];
