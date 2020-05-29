import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'pdf-zoom-dropdown',
  templateUrl: './pdf-zoom-dropdown.component.html',
  styleUrls: ['./pdf-zoom-dropdown.component.css']
})
export class PdfZoomDropdownComponent implements OnInit {

  @ViewChild('sizeSelector') sizeSelector: any;

  constructor() { }

  ngOnInit() {
  }
}
