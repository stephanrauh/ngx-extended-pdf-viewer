import { Route } from '@angular/router';
import { RouteGroupData } from '../../shared/types/route-data.types';

export const viewingRoutes: Route[] = [
  {
    path: 'viewing',
    data: <RouteGroupData>{
      name: 'Viewing',
      key: 'viewing',
    },
    children: [],
  },
];
