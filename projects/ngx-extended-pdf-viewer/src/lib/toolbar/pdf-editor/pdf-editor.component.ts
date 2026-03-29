import { Component, input } from '@angular/core';
import { ResponsiveVisibility } from '../../responsive-visibility';

@Component({
    selector: 'pdf-editor',
    templateUrl: './pdf-editor.component.html',
    styleUrls: ['./pdf-editor.component.css'],
    standalone: false
})
export class PdfEditorComponent {
  public showCommentEditor = input<ResponsiveVisibility>(true);

  public showDrawEditor = input<ResponsiveVisibility>(true);

  public showHighlightEditor = input<ResponsiveVisibility>(true);

  public showTextEditor = input<ResponsiveVisibility>(true);

  public showSignatureEditor = input<ResponsiveVisibility>(true);

  public showStampEditor = input<ResponsiveVisibility>(true);

  // #2818 modified by ngx-extended-pdf-viewer
  public disableCommentEditor = input<boolean>(false);
  public disableDrawEditor = input<boolean>(false);
  public disableHighlightEditor = input<boolean>(false);
  public disableTextEditor = input<boolean>(false);
  public disableSignatureEditor = input<boolean>(false);
  public disableStampEditor = input<boolean>(false);
  // #2818 end of modification by ngx-extended-pdf-viewer
}
