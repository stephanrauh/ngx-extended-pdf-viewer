import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';

import { AppComponent } from './app.component';
import { NgxExtendedPdfViewerModule } from 'projects/ngx-extended-pdf-viewer/src/public_api';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserAnimationsModule, BrowserModule, NgxExtendedPdfViewerModule, MatButtonModule, MatTabsModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
