import { Routes } from '@angular/router';
import { ExampleComponent } from './features/example/example.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: ExampleComponent
  }
];
