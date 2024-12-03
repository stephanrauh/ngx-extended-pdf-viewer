import { CSSRulesPageComponent } from './css-rules/css-rules-page.component';
import { Route } from '@angular/router';
import { RouteGroupData } from '../../shared/types/route-data.types';

export const customizationRoutes: Route[] = [
  {
    path: 'customization',
    data: <RouteGroupData>{
      key: 'customization',
      name: 'Customization',
    },
    children: [
      {
        path: 'css-rules',
        component: CSSRulesPageComponent,
        data: {
          pageTitle: 'CSS Rules',
        },
      },
    ],
  },
];
