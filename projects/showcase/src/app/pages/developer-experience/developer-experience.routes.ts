import { Route } from '@angular/router';
import { RouteGroupData } from '../../shared/types/route-data.types';

export const developerExperienceRoutes: Route[] = [
  {
    path: 'developer-experience',
    data: <RouteGroupData>{
      name: 'Developer Experience',
      key: 'developer-experience',
    },
    children: [],
  },
];
