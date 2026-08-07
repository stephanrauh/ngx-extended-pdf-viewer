import { Component, input } from '@angular/core';
import { ResponsiveVisibility } from '../../responsive-visibility';

// #3257 modified by ngx-extended-pdf-viewer
/**
 * Digital signature properties panel (pdf.js 6.2).
 *
 * PDF.js looks the elements below up by id in `getViewerConfiguration()` and
 * `digital_signature_properties_manager.js` fills them at runtime: it unhides
 * `#signatureProperties` when the document contains signatures, writes the
 * summary into `#signaturePropertiesBanner` and one card per signature into
 * `#signaturePropertiesList`. So this component only has to render the markup
 * with the exact ids - there is no Angular-side logic to add.
 */
// #3257 end of modification by ngx-extended-pdf-viewer
@Component({
  selector: 'pdf-signature-properties',
  templateUrl: './pdf-signature-properties.component.html',
  standalone: false,
})
export class PdfSignaturePropertiesComponent {
  public show = input<ResponsiveVisibility>(true);
}
