import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'pdf-zoom-toolbar',
  templateUrl: './pdf-zoom-toolbar.component.html',
  styleUrls: ['./pdf-zoom-toolbar.component.css']
})
export class PdfZoomToolbarComponent {

  @Input()
  public showZoomButtons = true;

  @Input()
  public zoomLevels = ['auto', 'page-actual', 'page-fit', 'page-width', 0.5, 0.75, 1, 1.25, 1.5, 2, 3, 4];
}
