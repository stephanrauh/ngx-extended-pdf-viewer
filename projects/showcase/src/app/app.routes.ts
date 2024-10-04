import { Routes } from '@angular/router';
import { ExampleComponent } from './features/example/example.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'about',
  },
  {
    path: 'about',
    component: ExampleComponent,
    data: { pageTitle: 'About' },
  },
  {
    path: 'alternatives',
    component: ExampleComponent,
    data: {
      pageTitle: 'Alternatives',
    },
  },
  {
    path: 'browser-support',
    component: ExampleComponent,
    data: {
      pageTitle: 'Browser Support',
    },
  },
];
