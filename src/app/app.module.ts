import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatFormFieldModule,
  MatTooltipModule,
  MatInputModule,
  MatSelectModule,
  MatDialogModule
} from '@angular/material';
import { MatTabsModule } from '@angular/material';

import { AppComponent } from './app.component';
import {
  NgxExtendedPdfViewerModule
} from 'projects/ngx-extended-pdf-viewer/src/public_api';
import { FormsModule } from '@angular/forms';
import { ModalDialogComponent } from './modal-dialog/modal-dialog.component';

@NgModule({
  declarations: [AppComponent, ModalDialogComponent],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    NgxExtendedPdfViewerModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTabsModule,
    MatTooltipModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [ModalDialogComponent]
})
export class AppModule {}
