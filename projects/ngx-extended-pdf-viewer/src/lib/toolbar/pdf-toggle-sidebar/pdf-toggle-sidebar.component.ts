import { Component, Input } from '@angular/core';

@Component({
  selector: 'pdf-toggle-sidebar',
  templateUrl: './pdf-toggle-sidebar.component.html',
  styleUrls: ['./pdf-toggle-sidebar.component.css'],
})
export class PdfToggleSidebarComponent {
  @Input()
  public showSidebarButton = true;
}
