import { Component, OnInit, ViewChild, Output, EventEmitter, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'pdf-zoom-dropdown',
  templateUrl: './pdf-zoom-dropdown.component.html',
  styleUrls: ['./pdf-zoom-dropdown.component.css'],
})
export class PdfZoomDropdownComponent implements OnInit {

  @ViewChild('sizeSelector') sizeSelector: any;

  @Output()
  public zoomChange = new EventEmitter<string | number | undefined>();

  constructor() { }

  ngOnInit() {
  }

  public emitZoomChange(): void {
    const selectedIndex = this.sizeSelector.nativeElement.selectedIndex;
    if (selectedIndex || selectedIndex === 0) {
      const s = this.sizeSelector.nativeElement.options[selectedIndex] as HTMLOptionElement;
      let value: number | string = s.label;

      if (value.endsWith('%')) {
        value = Number(value.replace('%', ''));
      } else {
        value = s.value;
      }
      this.zoomChange.emit(value);
    }
  }


}
