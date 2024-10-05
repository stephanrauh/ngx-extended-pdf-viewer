import { NavigationEntry } from './navigation-config.types';

export const navigationConfig: NavigationEntry[] = [
  {
    type: 'group',
    displayName: 'About',
    key: 'about',
    children: [
      {
        type: 'target',
        displayName: 'What is ngx-extended-pdf-viewer?',
        link: 'about',
      },
      {
        type: 'target',
        displayName: 'Alternatives',
        link: 'alternatives',
      },
      {
        type: 'target',
        displayName: 'Browser Support',
        link: 'browser-support',
      },
    ],
  },
  {
    type: 'group',
    displayName: 'Basics',
    key: 'basics',
    children: [
      {
        type: 'target',
        displayName: 'Simple Demo',
        link: 'basics/simple',
      },
    ],
  },
];
