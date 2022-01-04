import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'pdf-sidebar-toolbar',
  templateUrl: './pdf-sidebar-toolbar.component.html',
  styleUrls: ['./pdf-sidebar-toolbar.component.css']
})
export class PdfSidebarToolbarComponent implements OnInit {


  @Input()
  public mobileFriendlyZoomScale = 1;

  constructor() { }

  ngOnInit() {
  }

}
