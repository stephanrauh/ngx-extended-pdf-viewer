import { Component, Input, TemplateRef, AfterContentInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'pdf-sidebar',
  templateUrl: './pdf-sidebar.component.html',
  styleUrls: ['./pdf-sidebar.component.css'],
})
export class PdfSidebarComponent {
  @Input()
  public sidebarPositionTop: number;

  @Input()
  public showSidebarButton = true;

  @Input()
  public customSidebar: TemplateRef<any>;

  @Input()
  public customThumbnail: TemplateRef<any>;

  constructor() {
  }
}
