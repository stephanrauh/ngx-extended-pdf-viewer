import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'pdf-find-button',
  templateUrl: './pdf-find-button.component.html',
  styleUrls: ['./pdf-find-button.component.css']
})
export class PdfFindButtonComponent implements OnInit {
  @Input()
  public showFindButton: boolean | undefined = undefined;

  @Input()
  public textLayer: boolean | undefined = undefined;

  constructor() { }

  ngOnInit() {
  }

}
