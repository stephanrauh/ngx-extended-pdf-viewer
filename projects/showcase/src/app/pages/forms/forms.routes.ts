import { XFAFormsPageComponent } from './xfa-forms/xfa-forms-page.component';
import { DownloadingPageComponent } from './downloading/downloading-page.component';
import { AccessingRawDataPageComponent } from './accessing-raw-data/accessing-raw-data-page.component';
import { DefaultValuesPageComponent } from './default-values/default-values-page.component';
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
          pageTitle: 'Checkboxes and Radiobuttons',
        },
      },
      {
        path: 'default-values',
        component: DefaultValuesPageComponent,
        data: {
          pageTitle: 'Default Values',
        },
      },
      {
        path: 'accessing-raw-data',
        component: AccessingRawDataPageComponent,
        data: {
          pageTitle: 'Accessing Raw Data',
        },
      },
      {
        path: 'dowloading',
        component: DownloadingPageComponent,
        data: {
          pageTitle: 'Dowloading',
        },
      },
    {
      path: 'xfa-forms',
      component: XFAFormsPageComponent,
      data: {
        pageTitle: 'XFA Forms'
      }
    }
  ],
  },
];
