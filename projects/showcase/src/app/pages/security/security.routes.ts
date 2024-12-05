import { Route } from '@angular/router';
import { RouteGroupData } from '../../shared/types/route-data.types';

export const securityRoutes: Route[] = [
  {
    path: '',
    data: <RouteGroupData>{
      name: 'Security',
      key: 'security',
    },
    children: [],
  },
];
