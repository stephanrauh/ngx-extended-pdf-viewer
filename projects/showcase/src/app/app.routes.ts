import { Routes } from '@angular/router';
import { ContentPageComponent } from './core/content-page/content-page.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'about',
  },
  {
    path: 'about',
    component: ContentPageComponent,
    data: {
      pageTitle: 'About',
      contentSrc: '/assets/pages/about/intro.md',
    },
  },
  {
    path: 'alternatives',
    component: ContentPageComponent,
    data: {
      pageTitle: 'Alternatives',
      contentSrc: '',
    },
  },
  {
    path: 'browser-support',
    component: ContentPageComponent,
    data: {
      pageTitle: 'Browser Support',
      contentSrc: '',
    },
  },
];
