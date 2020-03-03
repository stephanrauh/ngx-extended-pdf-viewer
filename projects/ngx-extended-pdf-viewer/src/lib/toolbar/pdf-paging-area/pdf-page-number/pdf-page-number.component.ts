import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'pdf-page-number',
  templateUrl: './pdf-page-number.component.html',
  styleUrls: ['./pdf-page-number.component.css']
})
export class PdfPageNumberComponent implements OnInit {
  @Input()
  public showPagingButtons = true;

  constructor() {}

  ngOnInit() {}
}
