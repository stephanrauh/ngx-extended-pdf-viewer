import { RouteGroupData } from '../../shared/types/route-data.types';
import { Route } from '@angular/router';
import { PDFViewerPageComponent } from './pdf-viewer/pdf-viewer-page.component';
import { ShowcasePageComponent } from './showcase/showcase-page.component';
import { ContributorsPageComponent } from './contributors/contributors-page.component';

export const contributingRoutes: Route[] = [
  {
    path: 'contributing',
    data: <RouteGroupData>{
      name: 'Contributing',
      key: 'contributing',
    },
    children: [
      {
        path: 'pdf-viewer',
        component: PDFViewerPageComponent,
        data: {
          pageTitle: 'PDF Viewer',
        },
      },
      {
        path: 'showcase',
        component: ShowcasePageComponent,
        data: {
          pageTitle: 'Showcase',
        },
      },
      {
        path: 'contributors',
        component: ContributorsPageComponent,
        data: {
          pageTitle: 'Contributors',
        },
      },
    ],
  },
];
