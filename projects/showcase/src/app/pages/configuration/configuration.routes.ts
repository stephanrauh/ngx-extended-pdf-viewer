import { RangeRequestsPageComponent } from './range-requests/range-requests-page.component';
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
        path: 'range-requests',
        component: RangeRequestsPageComponent,
        data: {
          pageTitle: 'Range Requests',
        },
      },
    ],
  },
];
