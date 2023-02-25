import { Component, Input } from '@angular/core';
import { ResponsiveVisibility } from '../../responsive-visibility';

@Component({
  selector: 'pdf-toggle-sidebar',
  templateUrl: './pdf-toggle-sidebar.component.html',
  styleUrls: ['./pdf-toggle-sidebar.component.css'],
})
export class PdfToggleSidebarComponent {
  @Input()
  public showSidebarButton: ResponsiveVisibility = true;
}
