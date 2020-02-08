import { Component, OnInit } from '@angular/core';
import { PdfFindbarService } from '../../pdf-findbar-service';

@Component({
  selector: 'pdf-find-entire-phrase',
  templateUrl: './pdf-find-entire-phrase.component.html',
  styleUrls: ['./pdf-find-entire-phrase.component.css']
})
export class PdfFindMultipleSearchTextsComponent implements OnInit {

  constructor(public pdfFindbarService: PdfFindbarService) {}

  ngOnInit() {}
}
