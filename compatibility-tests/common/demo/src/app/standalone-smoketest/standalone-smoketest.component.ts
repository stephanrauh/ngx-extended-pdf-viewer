import { Component } from '@angular/core';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';

/**
 * Standalone-consumer compat test: a standalone component imports
 * NgxExtendedPdfViewerModule directly. If the library breaks for standalone
 * consumers, this route fails to render.
 */
@Component({
  selector: 'app-standalone-smoketest',
  standalone: true,
  imports: [NgxExtendedPdfViewerModule],
  templateUrl: './standalone-smoketest.component.html',
})
export class StandaloneSmoketestComponent {
  public page = 1;
}
