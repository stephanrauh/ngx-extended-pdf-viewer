import { DefaultOptionsPageComponent } from './default-options/default-options-page.component';
import { Route } from '@angular/router';
import { RouteGroupData } from '../../shared/types/route-data.types';

export const configurationRoutes: Route[] = [
  {
    path: 'configuration',
    data: <RouteGroupData>{
      name: 'Configuration',
      key: 'configuration',
    },
    children: [
      {
        path: 'default-options',
        component: DefaultOptionsPageComponent,
        data: {
          pageTitle: 'Default Options',
        },
      },
    ],
  },
];
