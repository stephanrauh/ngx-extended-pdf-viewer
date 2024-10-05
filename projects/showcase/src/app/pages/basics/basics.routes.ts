import { Route } from '@angular/router';
import { RouteData } from '../../shared/types/route-data.types';
import { ContentPageComponent } from '../../core/content-page/content-page.component';

export const basicsRoutes: Route[] = [
  {
    path: 'basics',
    children: [
      {
        path: 'simple',
        component: ContentPageComponent,
        data: <RouteData>{
          pageTitle: 'Simple Demo',
          content: [],
        },
      },
    ],
  },
];
