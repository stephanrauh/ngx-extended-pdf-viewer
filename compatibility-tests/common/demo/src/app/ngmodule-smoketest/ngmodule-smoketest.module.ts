import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { NgModuleSmoketestComponent } from './ngmodule-smoketest.component';

/**
 * NgModule-consumer compat test: a lazy-loaded NgModule declares a non-
 * standalone component that uses <ngx-extended-pdf-viewer>. If the library
 * breaks for NgModule consumers, this route fails to render.
 */
@NgModule({
  imports: [
    CommonModule,
    NgxExtendedPdfViewerModule,
    RouterModule.forChild([
      { path: '', component: NgModuleSmoketestComponent },
    ]),
  ],
  declarations: [NgModuleSmoketestComponent],
})
export class NgModuleSmoketestModule {}
