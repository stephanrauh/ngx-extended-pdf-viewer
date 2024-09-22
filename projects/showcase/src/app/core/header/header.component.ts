import { Component, signal } from '@angular/core';
import { versions } from '../../shared/constants/versions';

@Component({
  selector: 'pvs-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  extendedPdfViewerVersion = versions.extendedPdfViewer;
  angularVersion = versions.angular;

  menuIsOpen = signal(false);
}
