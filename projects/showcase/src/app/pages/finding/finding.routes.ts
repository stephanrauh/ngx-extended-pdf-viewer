import { FindProgrammaticallyPageComponent } from './find-programmatically/find-programmatically-page.component';
import { Route } from '@angular/router';
import { RouteGroupData } from '../../shared/types/route-data.types';

export const findingRoutes: Route[] = [
  {
    path: 'finding',
    data: <RouteGroupData>{
      name: 'Finding',
      key: 'finding',
    },
    children: [
      {
        path: 'find-programmatically',
        component: FindProgrammaticallyPageComponent,
        data: {
          pageTitle: 'Find Programmatically',
        },
      },
    ],
  },
];
