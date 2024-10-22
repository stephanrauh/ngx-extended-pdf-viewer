import { Route } from '@angular/router';
import { RouteGroupData } from '../../shared/types/route-data.types';

export const configurationRoutes: Route[] = [
  {
    path: 'configuration',
    data: <RouteGroupData>{
      name: 'Configuration',
      key: 'configuration',
    },
    children: [],
  },
];
