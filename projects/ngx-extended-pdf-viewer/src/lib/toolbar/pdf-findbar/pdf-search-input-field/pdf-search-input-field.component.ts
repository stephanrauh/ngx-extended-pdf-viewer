import { Component } from '@angular/core';
import { PdfFindbarService } from './../pdf-findbar-service';

@Component({
  selector: 'pdf-search-input-field',
  templateUrl: './pdf-search-input-field.component.html',
  styleUrls: ['./pdf-search-input-field.component.css'],
})
export class PdfSearchInputFieldComponent {
  constructor(public pdfFindbarService: PdfFindbarService) {}
}
