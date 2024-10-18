import { Route } from '@angular/router';
import { RouteData, RouteGroupData } from '../../shared/types/route-data.types';
import { IntroductionPageComponent } from './intro/introduction-page.component';
import { AlternativesPageComponent } from './alternatives/alternatives.page.component';
import { BrowserSupportPageComponent } from './browser-support/browser-support-page.component';
import { TroubleshootingPageComponent } from './troubleshooting/troubleshooting-page.component';
import { ChangelogPageComponent } from './changelog/changelog-page.component';

export const aboutRoutes: Route[] = [
  {
    path: '',
    data: <RouteGroupData>{
      name: 'About',
      key: 'about',
    },
    children: [
      {
        path: 'about',
        component: IntroductionPageComponent,
        data: <RouteData>{
          pageTitle: 'Introduction',
        },
      },
      {
        path: 'alternatives',
        component: AlternativesPageComponent,
        data: {
          pageTitle: 'Alternatives',
        },
      },
      {
        path: 'browser-support',
        component: BrowserSupportPageComponent,
        data: {
          pageTitle: 'Browser Support',
        },
      },
      {
        path: 'troubleshooting',
        component: TroubleshootingPageComponent,
        data: {
          pageTitle: 'Troubleshooting',
        },
      },
      {
        path: 'changelog',
        component: ChangelogPageComponent,
        data: {
          pageTitle: 'Changelog',
        },
      },
    ],
  },
];
