import { Component, Input, ViewChild } from '@angular/core';
import { ResponsiveVisibility } from '../../../responsive-visibility';

interface ZoomLevel {
  id: string;
  dataL10nId: string;
  dataL10nArgs: string | undefined;
  value: string;
  displayValue: string;
}
@Component({
    selector: 'pdf-zoom-dropdown',
    templateUrl: './pdf-zoom-dropdown.component.html',
    styleUrls: ['./pdf-zoom-dropdown.component.css'],
    standalone: false
})
export class PdfZoomDropdownComponent {
  @Input()
  public showZoomDropdown: ResponsiveVisibility = true;
  public _zoomLevels: Array<ZoomLevel> = [];

  @Input()
  public set zoomLevels(levels: Array<string | number>) {
    this._zoomLevels = levels.map((l) => this.valueToZoomLevel(l));
  }

  @ViewChild('sizeSelector') sizeSelector: any;

  constructor() {}

  private valueToZoomLevel(value: string | number): ZoomLevel {
    // const new TranslatePipe().transform('pdfjs-page-scale-percent', '{ $scale } %');

    if (value.toString().endsWith('%')) {
      value = value.toString().replace('%', '');
      value = Number(value) / 100;
    }
    const numericalValue = Number(value);
    if (!numericalValue) {
      const v = String(value);
      return {
        id: this.snakeToCamel(value + 'Option'),
        value: v,
        dataL10nId: 'pdfjs-page-scale-' + v.replace('page-', ''),
        dataL10nArgs: undefined,
        displayValue: v,
      };
    }
    const percentage = Math.round(numericalValue * 100);
    return {
      id: `scale_${percentage}`,
      value: String(numericalValue),
      dataL10nId: 'pdfjs-page-scale-percent',
      dataL10nArgs: JSON.stringify({ scale: percentage }),
      displayValue: '',
    };
  }

  private snakeToCamel(str: string) {
    // idea found here: https://hisk.io/javascript-snake-to-camel/
    return str.replace(/([-_][a-z])/g, (group) => group.toUpperCase().replace('-', '').replace('_', ''));
  }
}
