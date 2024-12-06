import { PrintAPIPageComponent } from './print-api/print-api-page.component';
import { Route } from '@angular/router';
import { RouteGroupData } from '../../shared/types/route-data.types';

export const printingRoutes: Route[] = [
  {
    path: 'printing',
    data: <RouteGroupData>{
      key: 'printing',
      name: 'Forms',
    },
    children: [
      {
        path: 'print-api',
        component: PrintAPIPageComponent,
        data: {
          pageTitle: 'Print API',
        },
      },
    ],
  },
];
