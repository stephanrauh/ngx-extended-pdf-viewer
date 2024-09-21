import { Component } from '@angular/core';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';

@Component({
  selector: 'pvs-example',
  standalone: true,
  imports: [
    NgxExtendedPdfViewerModule
  ],
  templateUrl: './example.component.html',
  styleUrl: './example.component.css'
})
export class ExampleComponent {

}
