import { Component } from '@angular/core';
import { pdfDefaultOptions } from 'ngx-extended-pdf-viewer';

@Component({
  selector: 'app-zapfdingbats',
  templateUrl: './zapfdingbats.component.html',
  styleUrls: ['./zapfdingbats.component.css'],
})
export class ZapfdingbatsComponent {
  public src!: string;
  public caption!: string;
  public counter=0;
  constructor() {
    if (window.location.search.includes('bleeding-edge')) {
      pdfDefaultOptions.assetsFolder = 'bleeding-edge';
    }
    this.switchSrc();
  }

  public switchSrc(): void {
    this.counter++;
    if (this.counter % 2 === 1) {
      this.src = 'assets/pdfs/ZapfDingbats.pdf';
      this.caption="the portuguese textbook";
    } else {
      this.src = 'assets/pdfs/Portugues-para-principiantes-1538054164.pdf';
      this.caption = "ZapfDingBats.pdf";
    }
  }
}
