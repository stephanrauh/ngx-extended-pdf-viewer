import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'pdf-toggle-sidebar',
  templateUrl: './pdf-toggle-sidebar.component.html',
  styleUrls: ['./pdf-toggle-sidebar.component.css']
})
export class PdfToggleSidebarComponent implements OnInit {
  @Input()
  public showSidebarButton = true;

  constructor() {}

  ngOnInit() {}
}
