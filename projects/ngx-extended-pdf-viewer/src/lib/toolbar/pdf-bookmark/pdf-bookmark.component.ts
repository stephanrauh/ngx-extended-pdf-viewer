import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'pdf-bookmark',
  templateUrl: './pdf-bookmark.component.html',
  styleUrls: ['./pdf-bookmark.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PdfBookmarkComponent {

  @Input()
  public showBookmarkButton: boolean;
}
