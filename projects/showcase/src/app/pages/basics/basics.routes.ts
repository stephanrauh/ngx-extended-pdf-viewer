import { AttributesPageComponent } from './attributes/attributes-page.component';
import { EventsPageComponent } from './events/events-page.component';
import { UrlSourcePageComponent } from './file-sources/url/url-source-page.component';
import { Route } from '@angular/router';
import { RouteData, RouteGroupData } from '../../shared/types/route-data.types';
import { BasicPageComponent } from './simple/basic.page.component';
import { GettingStartedPageComponent } from './getting-started/getting-started-page.component';
import { DefaultOptionsPageComponent } from './default-options/default-options-page.component';
import { BLOBsPageComponent } from './file-sources/blobs/blobs-page.component';
import { Base64PageComponent } from './file-sources/base64/base64-page.component';

export const basicsRoutes: Route[] = [
  {
    path: 'basics',
    data: <RouteGroupData>{
      key: 'basics',
      name: 'Basics',
    },
    children: [
      {
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
        data: <RouteGroupData>{
          name: 'File Sources',
          key: 'file-sources',
        },
        children: [
          {
            path: 'url',
            component: UrlSourcePageComponent,
            data: {
              pageTitle: 'URL',
            },
          },
          {
            path: 'blobs',
            component: BLOBsPageComponent,
            data: {
              pageTitle: 'BLOBs',
            },
          },
          {
            path: 'base64',
            component: Base64PageComponent,
            data: {
              pageTitle: 'Base64',
            },
          },
        ],
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
          pageTitle: 'Attributes',
        },
      },
      {
        path: 'events',
        component: EventsPageComponent,
        data: {
          pageTitle: 'Events',
        },
      },
    ],
  },
];
