import { Route } from '@angular/router';
import { RouteGroupData } from '../../shared/types/route-data.types';

export const printingRoutes: Route[] = [
  {
    path: 'printing',
    data: <RouteGroupData>{
      key: 'printing',
      name: 'Forms',
    },
    children: [],
  },
];
