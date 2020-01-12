import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'pdf-zoom-toolbar',
  templateUrl: './pdf-zoom-toolbar.component.html',
  styleUrls: ['./pdf-zoom-toolbar.component.css']
})
export class PdfZoomToolbarComponent {
  @Input()
  public showZoomButtons: boolean;

  @Output()
  public zoomChange = new EventEmitter<string | number | undefined>();

  public emitZoomChange(event: string | number | undefined): void {
    debugger;
    this.zoomChange.emit(event);
  }


}
