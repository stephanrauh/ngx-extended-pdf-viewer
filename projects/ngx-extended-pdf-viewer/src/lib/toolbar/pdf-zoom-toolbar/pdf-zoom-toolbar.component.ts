import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'pdf-zoom-toolbar',
  templateUrl: './pdf-zoom-toolbar.component.html',
  styleUrls: ['./pdf-zoom-toolbar.component.css']
})
export class PdfZoomToolbarComponent {
  @Input()
  public showZoomButtons = true;
}
