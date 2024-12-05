import { Route } from '@angular/router';
import { RouteGroupData } from '../../shared/types/route-data.types';

export const exportingRoutes: Route[] = [
  {
    path: 'exporting',
    data: <RouteGroupData>{
      name: 'Exporting',
      key: 'exporting',
    },
    children: [],
  },
];
