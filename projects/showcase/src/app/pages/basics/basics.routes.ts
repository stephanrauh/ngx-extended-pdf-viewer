import { Route } from '@angular/router';
import { RouteData, RouteGroupData } from '../../shared/types/route-data.types';
import { BasicPageComponent } from './simple/basic.page.component';

export const basicsRoutes: Route[] = [
  {
    path: 'basics',
    data: <RouteGroupData>{
      key: 'basics',
      name: 'Basics',
    },
    children: [
      {
        path: 'simple',
        component: BasicPageComponent,
        data: <RouteData>{
          pageTitle: 'Simple Demo',
        },
      },
    ],
  },
];
