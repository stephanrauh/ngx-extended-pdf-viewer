import { Route } from '@angular/router';
import { ContentPageComponent } from '../../core/content-page/content-page.component';
import { RouteData, RouteGroupData } from '../../shared/types/route-data.types';

export const aboutRoutes: Route[] = [
  {
    path: '',
    data: <RouteGroupData>{
      name: 'About',
      key: 'about',
    },
    children: [
      {
        path: 'about',
        component: ContentPageComponent,
        data: <RouteData>{
          pageTitle: 'About',
          content: [
            {
              type: 'markdown',
              src: '/assets/pages/about/intro/text.md',
            },
          ],
        },
      },
      {
        path: 'alternatives',
        component: ContentPageComponent,
        data: {
          pageTitle: 'Alternatives',
          content: [
            {
              type: 'markdown',
              src: '/assets/pages/about/alternatives/text.md',
            },
          ],
        },
      },
      {
        path: 'browser-support',
        component: ContentPageComponent,
        data: {
          pageTitle: 'Browser Support',
          content: [
            {
              type: 'markdown',
              src: '/assets/pages/about/browser-support/text.md',
            },
          ],
        },
      },
    ],
  },
];
