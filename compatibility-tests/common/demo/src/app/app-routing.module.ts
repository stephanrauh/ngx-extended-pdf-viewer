import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgOnDestroyComponent } from './ng-on-destroy/ng-on-destroy.component';
import { SmoketestComponent } from './smoketest/smoketest.component';
import { AbsoluteAssetsPathComponent } from './absolute-asset-path/absolute-asset-path.component';
import { StandardFontsAndCmapsComponent } from './standard-fonts-and-cmaps/standard-fonts-and-cmaps.component';
import { IndexComponent } from './index/index.component';
import { FindComponent } from './find/find.component';
import { ZapfdingbatsComponent } from './zapfdingbats/zapfdingbats.component';

const routes: Routes = [
  { path: 'absolute-asset-path', component: AbsoluteAssetsPathComponent},
  { path: 'ng-on-destroy', component: NgOnDestroyComponent },
  { path: 'smoketest', component: SmoketestComponent },
  { path: 'standard-fonts-and-cmaps', component: StandardFontsAndCmapsComponent},
  { path: 'find', component: FindComponent},
  { path: 'zapfdingbats', component: ZapfdingbatsComponent},
  { path: '', component: IndexComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
