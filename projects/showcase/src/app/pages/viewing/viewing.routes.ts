import { PresentationModePageComponent } from './presentation-mode/presentation-mode-page.component';
import { Route } from '@angular/router';
import { RouteGroupData } from '../../shared/types/route-data.types';

export const viewingRoutes: Route[] = [
  {
    path: 'viewing',
    data: <RouteGroupData>{
      name: 'Viewing',
      key: 'viewing',
    },
    children: [
      {
        path: 'presentation-mode',
        component: PresentationModePageComponent,
        data: {
          pageTitle: 'Presentation / Fullscreen Mode',
        },
      },
    ],
  },
];
