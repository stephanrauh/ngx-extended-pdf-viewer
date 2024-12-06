import { CheckboxesAndRadiobuttonsPageComponent } from './checkboxes-and-radiobuttons/checkboxes-and-radiobuttons-page.component';
import { DisplayingFormsPageComponent } from './displaying-forms/displaying-forms-page.component';
import { Route } from '@angular/router';
import { RouteGroupData } from '../../shared/types/route-data.types';

export const formsRoutes: Route[] = [
  {
    path: 'forms',
    data: <RouteGroupData>{
      key: 'forms',
      name: 'Forms',
    },
    children: [{
        path: 'displaying-forms',
        component: DisplayingFormsPageComponent,
        data: {
          pageTitle: 'Displaying Forms',
        },
      },
    {
      path: 'checkboxes-and-radiobuttons',
      component: CheckboxesAndRadiobuttonsPageComponent,
      data: {
        pageTitle: 'Checkboxes and Radiobuttons'
      }
    }
  ],
  },
];
