import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxExtendedPdfViewerComponent } from './ngx-extended-pdf-viewer.component';
import { NgxExtendedPdfViewerService } from './ngx-extended-pdf-viewer.service';

@NgModule({
  imports: [CommonModule],
  declarations: [NgxExtendedPdfViewerComponent],
  providers: [NgxExtendedPdfViewerService],
  exports: [NgxExtendedPdfViewerComponent]
})
export class NgxExtendedPdfViewerModule {}
