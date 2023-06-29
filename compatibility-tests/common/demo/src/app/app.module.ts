import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ExamplePdfViewerComponent } from './example-pdf-viewer/example-pdf-viewer.component';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { AppRoutingModule } from './app-routing.module';
import { SmoketestComponent } from './smoketest/smoketest.component';
import { NgOnDestroyComponent } from './ng-on-destroy/ng-on-destroy.component';

@NgModule({
  declarations: [
    AppComponent,
    ExamplePdfViewerComponent,
    SmoketestComponent,
    NgOnDestroyComponent
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
