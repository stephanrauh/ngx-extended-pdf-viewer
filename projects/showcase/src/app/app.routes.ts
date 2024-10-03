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
  },
  {
    path: 'alternatives',
    component: ExampleComponent,
  },
  {
    path: 'browser-support',
    component: ExampleComponent,
  },
];
