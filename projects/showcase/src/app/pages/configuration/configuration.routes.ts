import { LinksPageComponent } from './links/links-page.component';
import { AuthenticationAndAuthorizationPageComponent } from './authentication-and-authorization/authentication-and-authorization-page.component';
import { RangeRequestsPageComponent } from './range-requests/range-requests-page.component';
import { Route } from '@angular/router';
import { RouteGroupData } from '../../shared/types/route-data.types';

export const configurationRoutes: Route[] = [
  {
    path: 'configuration',
    data: <RouteGroupData>{
      name: 'Configuration',
      key: 'configuration',
    },
    children: [{
        path: 'range-requests',
        component: RangeRequestsPageComponent,
        data: {
          pageTitle: 'Range Requests',
        },
      },
    {
      path: 'authentication-and-authorization',
      component: AuthenticationAndAuthorizationPageComponent,
      data: {
        pageTitle: 'Authentication and Authorization'
      }
    },
    {
      path: 'links',
      component: LinksPageComponent,
      data: {
        pageTitle: 'Links'
      }
    }
  ],
  },
];
