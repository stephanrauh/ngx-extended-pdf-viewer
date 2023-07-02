import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ExamplePdfViewerComponent } from './example-pdf-viewer/example-pdf-viewer.component';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { AppRoutingModule } from './app-routing.module';
import { SmoketestComponent } from './smoketest/smoketest.component';
import { NgOnDestroyComponent } from './ng-on-destroy/ng-on-destroy.component';
import { AbsoluteAssetsPathComponent } from './absolute-asset-path/absolute-asset-path.component';
import { StandardFontsAndCmapsComponent } from './standard-fonts-and-cmaps/standard-fonts-and-cmaps.component';
import { IndexComponent } from './index/index.component';

@NgModule({
  declarations: [
    AppComponent,
    AbsoluteAssetsPathComponent,
    ExamplePdfViewerComponent,
    NgOnDestroyComponent,
    SmoketestComponent,
    StandardFontsAndCmapsComponent,
    IndexComponent,
  ],
  imports: [
    BrowserModule,
    NgxExtendedPdfViewerModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
