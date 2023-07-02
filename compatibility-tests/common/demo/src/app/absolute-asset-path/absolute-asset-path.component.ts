import { ChangeDetectionStrategy, Component } from '@angular/core';
import { pdfDefaultOptions } from 'ngx-extended-pdf-viewer';

@Component({
  selector: 'absolute-asset-path',
  templateUrl: './absolute-asset-path.component.html',
  styleUrls: ['./absolute-asset-path.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AbsoluteAssetsPathComponent {
  public visible = false;

  constructor() {
    pdfDefaultOptions.assetsFolder = 'http://localhost:4200/assets';
    if (window.location.search.includes('bleeding-edge')) {
      pdfDefaultOptions.assetsFolder = 'http://localhost:4200/bleeding-edge';
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
