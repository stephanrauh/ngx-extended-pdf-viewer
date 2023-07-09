import { Component, Input, OnInit } from '@angular/core';
import { getVersionSuffix, pdfDefaultOptions } from '../../options/pdf-default-options';
import { ResponsiveVisibility } from '../../responsive-visibility';

@Component({
  selector: 'pdf-editor',
  templateUrl: './pdf-editor.component.html',
  styleUrls: ['./pdf-editor.component.css'],
})
export class PdfEditorComponent implements OnInit {
  @Input()
  public showDrawEditor: ResponsiveVisibility = true;

  @Input()
  public showTextEditor: ResponsiveVisibility = true;

  @Input()
  public showStampEditor: ResponsiveVisibility = true;

  public pdfJsVersion = getVersionSuffix(pdfDefaultOptions.assetsFolder);

  public ngOnInit(): void {
    this.pdfJsVersion = getVersionSuffix(pdfDefaultOptions.assetsFolder);
  }
}
