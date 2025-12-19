import { Component, Input } from '@angular/core';
import { ResponsiveVisibility } from '../../responsive-visibility';

@Component({
    selector: 'pdf-editor',
    templateUrl: './pdf-editor.component.html',
    styleUrls: ['./pdf-editor.component.css'],
    standalone: false
})
export class PdfEditorComponent {
  @Input()
  public showCommentEditor: ResponsiveVisibility = true;

  @Input()
  public showDrawEditor: ResponsiveVisibility = true;

  @Input()
  public showHighlightEditor: ResponsiveVisibility = true;

  @Input()
  public showTextEditor: ResponsiveVisibility = true;

  @Input()
  public showSignatureEditor: ResponsiveVisibility = true;

  @Input()
  public showStampEditor: ResponsiveVisibility = true;
}
