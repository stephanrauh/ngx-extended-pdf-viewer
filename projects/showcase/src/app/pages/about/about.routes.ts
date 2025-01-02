import { ShowcasePageComponent } from './contributing/showcase/showcase-page.component';
import { PDFViewerPageComponent } from './contributing/pdf-viewer/pdf-viewer-page.component';
import { Route } from '@angular/router';
import { RouteData, RouteGroupData } from '../../shared/types/route-data.types';
import { IntroductionPageComponent } from './intro/introduction-page.component';
import { AlternativesPageComponent } from './alternatives/alternatives.page.component';
import { BrowserSupportPageComponent } from './browser-support/browser-support-page.component';
import { TroubleshootingPageComponent } from './troubleshooting/troubleshooting-page.component';
import { ChangelogPageComponent } from './changelog/changelog-page.component';
import { ContributorsPageComponent } from './contributing/contributors/contributors-page.component';

export const aboutRoutes: Route[] = [
  {
    path: 'about',
    data: <RouteGroupData>{
      name: 'About',
      key: 'about',
    },
    children: [
      {
        path: 'introduction',
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
  {
    path: 'contributing',
    data: <RouteGroupData>{
      name: 'Contributing',
      key: 'contributing',
    },
    children: [
      {
        path: 'pdf-viewer',
        component: PDFViewerPageComponent,
        data: {
          pageTitle: 'PDF Viewer',
        },
      },
      {
        path: 'showcase',
        component: ShowcasePageComponent,
        data: {
          pageTitle: 'Showcase',
        },
      },
      {
        path: 'contributors',
        component: ContributorsPageComponent,
        data: {
          pageTitle: 'Contributors',
        },
      },
    ],
  },
];
