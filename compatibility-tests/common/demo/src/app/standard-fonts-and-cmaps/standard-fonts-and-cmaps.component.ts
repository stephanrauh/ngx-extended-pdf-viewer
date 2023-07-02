import { ChangeDetectionStrategy, Component } from '@angular/core';
import { pdfDefaultOptions } from 'ngx-extended-pdf-viewer';

@Component({
  selector: 'standard-fonts-and-cmaps',
  templateUrl: './standard-fonts-and-cmaps.component.html',
  styleUrls: ['./standard-fonts-and-cmaps.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StandardFontsAndCmapsComponent {
  public visible = false;

  constructor() {
    if (window.location.search.includes('bleeding-edge')) {
      pdfDefaultOptions.assetsFolder = 'bleeding-edge';
    }
  }

  public hide(): void {
    this.visible = false;
  }

  public show(): void {
    this.visible = true;
  }

  public toggle(): void {
    this.visible = true;
    setTimeout(() => (this.visible = false), 0);
  }
}
