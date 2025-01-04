import { EditorAPIPageComponent } from './editor-api/editor-api-page.component';
import { NavigationAPIPageComponent } from './navigation-api/navigation-api-page.component';
import { ScrollingAPIPageComponent } from './scrolling-api/scrolling-api-page.component';
import { ServerSideRenderingPageComponent } from './server-side-rendering/server-side-rendering-page.component';
import { UnverifiedSignaturesPageComponent } from './unverified-signatures/unverified-signatures-page.component';
import { ReadingMetadataPageComponent } from './reading-metadata/reading-metadata-page.component';
import { ContentSecurityPolicyPageComponent } from './content-security-policy/content-security-policy-page.component';
import { FilteringConsoleLogPageComponent } from './filtering-console.log/filtering-console.log-page.component';
import { Route } from '@angular/router';
import { RouteGroupData } from '../../shared/types/route-data.types';

export const developerExperienceRoutes: Route[] = [
  {
    path: 'developer-experience',
    data: <RouteGroupData>{
      name: 'Developer Experience',
      key: 'developer-experience',
    },
    children: [
      {
        path: 'filtering-console-log',
        component: FilteringConsoleLogPageComponent,
        data: {
          pageTitle: 'Filtering console.log',
        },
      },
      {
        path: 'content-security-policy',
        component: ContentSecurityPolicyPageComponent,
        data: {
          pageTitle: 'Content Security Policy (CSP)',
        },
      },
      {
        path: 'reading-metadata',
        component: ReadingMetadataPageComponent,
        data: {
          pageTitle: 'Reading Metadata',
        },
      },
      {
        path: 'unverified-signatures',
        component: UnverifiedSignaturesPageComponent,
        data: {
          pageTitle: 'Unverified Signatures',
        },
      },
      {
        path: 'server-side-rendering',
        component: ServerSideRenderingPageComponent,
        data: {
          pageTitle: 'Server-Side Rendering',
        },
      },
      {
        path: 'scrolling-api',
        component: ScrollingAPIPageComponent,
        data: {
          pageTitle: 'Scrolling API',
        },
      },
      {
        path: 'navigation-api',
        component: NavigationAPIPageComponent,
        data: {
          pageTitle: 'Navigation API',
        },
      },
      {
        path: 'editor-api',
        component: EditorAPIPageComponent,
        data: {
          pageTitle: 'Editor API',
        },
      },
    ],
  },
];
