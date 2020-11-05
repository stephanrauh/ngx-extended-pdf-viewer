import { Component, OnInit, ViewChild, Output, EventEmitter, Input, AfterViewInit, ElementRef } from '@angular/core';

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
    this._zoomLevels = levels.map((l) => this.valueToZoomLevel(l));
  }


  @ViewChild('sizeSelector') sizeSelector: any;

  constructor(private element: ElementRef) {}

  ngOnInit() {
    const callback = (e) => {
      document.removeEventListener('localized', callback);
    };

    document.addEventListener('localized', callback);
  }

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

  /**
   * Increase the width of the zoom dropdown DOM element if, and only if, it's
   * too narrow to fit the *longest* of the localized strings.
   * @private
  async _adjustScaleWidth() {
    const { items, l10n } = this;

    const predefinedValuesPromise = Promise.all([
      l10n.get("page_scale_auto", null, "Automatic Zoom"),
      l10n.get("page_scale_actual", null, "Actual Size"),
      l10n.get("page_scale_fit", null, "Page Fit"),
      l10n.get("page_scale_width", null, "Page Width"),
    ]);

    // The temporary canvas is used to measure text length in the DOM.
    let canvas = document.createElement("canvas");
    if (
      typeof PDFJSDev === "undefined" ||
      PDFJSDev.test("MOZCENTRAL || GENERIC")
    ) {
      canvas.mozOpaque = true;
    }
    let ctx = canvas.getContext("2d", { alpha: false });

    await animationStarted;
    const { fontSize, fontFamily } = getComputedStyle(items.scaleSelect);
    ctx.font = `${fontSize} ${fontFamily}`;

    let maxWidth = 0;
    for (const predefinedValue of await predefinedValuesPromise) {
      const { width } = ctx.measureText(predefinedValue);
      if (width > maxWidth) {
        maxWidth = width;
      }
    }
    const overflow = SCALE_SELECT_WIDTH - SCALE_SELECT_CONTAINER_WIDTH;
    maxWidth += 10 + 1.5 * overflow;

    if (maxWidth > SCALE_SELECT_CONTAINER_WIDTH) {
      items.scaleSelect.style.width = `${maxWidth + overflow}px`;
      items.scaleSelectContainer.style.width = `${maxWidth}px`;
    }
    // Zeroing the width and height cause Firefox to release graphics resources
    // immediately, which can greatly reduce memory consumption.
    canvas.width = 0;
    canvas.height = 0;
    canvas = ctx = null;
  }
*/
}
