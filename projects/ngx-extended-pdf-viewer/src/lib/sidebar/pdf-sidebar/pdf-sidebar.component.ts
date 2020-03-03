import { Component, Input } from '@angular/core';

@Component({
  selector: 'pdf-sidebar',
  templateUrl: './pdf-sidebar.component.html',
  styleUrls: ['./pdf-sidebar.component.css']
})
export class PdfSidebarComponent {
  @Input()
  public sidebarPositionTop: number;

  @Input()
  public showSidebarButton = true;
}
