import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'pdf-toggle-secondary-toolbar',
  templateUrl: './pdf-toggle-secondary-toolbar.component.html',
  styleUrls: ['./pdf-toggle-secondary-toolbar.component.css']
})
export class PdfToggleSecondaryToolbarComponent implements OnInit {
  @Input()
  public showSecondaryToolbarButton = true;

  constructor() {}

  ngOnInit() {}
}
