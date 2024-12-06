import { CustomPrintProgressPageComponent } from './custom-print-progress/custom-print-progress-page.component';
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
    children: [{
        path: 'print-api',
        component: PrintAPIPageComponent,
        data: {
          pageTitle: 'Print API',
        },
      },
    {
      path: 'custom-print-progress',
      component: CustomPrintProgressPageComponent,
      data: {
        pageTitle: 'Custom Print Progress'
      }
    }
  ],
  },
];
