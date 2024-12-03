import { Route } from '@angular/router';
import { RouteGroupData } from '../../shared/types/route-data.types';

export const customizationRoutes: Route[] = [
  {
    path: 'customization',
    data: <RouteGroupData>{
      key: 'customization',
      name: 'Customization',
    },
    children: [],
  },
];
