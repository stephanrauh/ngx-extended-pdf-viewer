import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NgxExtendedPdfViewerModule } from 'projects/ngx-extended-pdf-viewer/src/public_api';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, NgxExtendedPdfViewerModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
