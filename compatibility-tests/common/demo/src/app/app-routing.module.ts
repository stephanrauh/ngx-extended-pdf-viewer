import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgOnDestroyComponent } from './ng-on-destroy/ng-on-destroy.component';
import { SmoketestComponent } from './smoketest/smoketest.component';

const routes: Routes = [
  { path: 'smoketest', component: SmoketestComponent },
  { path: 'ng-on-destroy', component: NgOnDestroyComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
