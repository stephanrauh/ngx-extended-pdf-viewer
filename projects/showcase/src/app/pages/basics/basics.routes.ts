import { AttributesPageComponent } from './attributes/attributes-page.component';
import { FileSourcesPageComponent } from './file-sources/file-sources-page.component';
import { Route } from '@angular/router';
import { RouteData, RouteGroupData } from '../../shared/types/route-data.types';
import { BasicPageComponent } from './simple/basic.page.component';
import { GettingStartedPageComponent } from './getting-started/getting-started-page.component';
import { DefaultOptionsPageComponent } from './default-options/default-options-page.component';

export const basicsRoutes: Route[] = [
  {
    path: 'basics',
    data: <RouteGroupData>{
      key: 'basics',
      name: 'Basics',
    },
    children: [{
        path: 'getting-started',
        component: GettingStartedPageComponent,
        data: <RouteData>{
          pageTitle: 'Getting Started',
        },
      },
      {
        path: 'simple',
        component: BasicPageComponent,
        data: <RouteData>{
          pageTitle: 'Simple Demo',
        },
      },
      {
        path: 'file-sources',
        component: FileSourcesPageComponent,
        data: {
          pageTitle: 'File Sources',
        },
      },
      {
        path: 'default-options',
        component: DefaultOptionsPageComponent,
        data: {
          pageTitle: 'Default Options',
        },
      },
    {
      path: 'attributes',
      component: AttributesPageComponent,
      data: {
        pageTitle: 'Attributes'
      }
    }
  ],
  },
];
