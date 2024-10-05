import { Routes } from '@angular/router';
import { ContentPageComponent } from './core/content-page/content-page.component';
import { Content } from './shared/types/content.types';

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
      content: <Content[]>[
        {
          type: 'markdown',
          src: '/assets/pages/about/intro/text.md',
        },
      ],
    },
  },
  {
    path: 'alternatives',
    component: ContentPageComponent,
    data: {
      pageTitle: 'Alternatives',
      content: <Content[]>[
        {
          type: 'markdown',
          src: '/assets/pages/about/alternatives/text.md',
        },
      ],
    },
  },
  {
    path: 'browser-support',
    component: ContentPageComponent,
    data: {
      pageTitle: 'Browser Support',
      content: <Content[]>[
        {
          type: 'markdown',
          src: '/assets/pages/about/browser-support/text.md',
        },
      ],
    },
  },
];
