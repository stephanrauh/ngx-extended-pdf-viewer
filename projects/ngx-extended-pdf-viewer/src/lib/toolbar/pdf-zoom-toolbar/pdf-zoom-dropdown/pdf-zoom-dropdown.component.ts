import { Component, OnInit, ViewChild, Output, EventEmitter, Input } from '@angular/core';

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
})
export class PdfZoomDropdownComponent implements OnInit {
  public _zoomLevels: Array<ZoomLevel> = [];
  // ['auto', 'page-actual', 'page-fit', 'page-width', 0.5, 0.75, 1, 1.25, 1.5, 2, 3, 4];

  @Input()
  public set zoomLevels(levels: Array<string | number>) {
    console.log(levels);
    this._zoomLevels = levels.map((l) => this.valueToZoomLevel(l));
    console.log(this._zoomLevels);
  }

  @ViewChild('sizeSelector') sizeSelector: any;

  constructor() {}

  ngOnInit() {}

  private valueToZoomLevel(value: string | number): ZoomLevel {
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
        dataL10nId: 'page_scale_' + v.replace('page-', ''),
        dataL10nArgs: undefined,
        displayValue: v,
      };
    }
    const percentage = Math.round(numericalValue * 100);
    return {
      id: `scale_${percentage}`,
      value: String(numericalValue),
      dataL10nId: 'page_scale_percent',
      dataL10nArgs: `{ "scale": ${percentage} }`,
      displayValue: String(percentage) + '%',
    };
  }

  private snakeToCamel(str: string) {
    // idea found here: https://hisk.io/javascript-snake-to-camel/
    return str.replace(/([-_][a-z])/g, (group) => group.toUpperCase().replace('-', '').replace('_', ''));
  }
}
