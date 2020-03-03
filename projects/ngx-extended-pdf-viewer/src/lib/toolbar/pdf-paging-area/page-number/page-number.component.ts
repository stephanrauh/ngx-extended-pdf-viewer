import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'page-number',
  templateUrl: './page-number.component.html',
  styleUrls: ['./page-number.component.css']
})
export class PageNumberComponent implements OnInit {
  @Input()
  public showPagingButtons = true;

  constructor() {}

  ngOnInit() {}
}
