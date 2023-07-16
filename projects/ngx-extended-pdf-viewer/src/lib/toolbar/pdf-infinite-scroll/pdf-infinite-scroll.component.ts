import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PageViewModeType } from '../../options/pdf-viewer';

@Component({
  selector: 'pdf-infinite-scroll',
  templateUrl: './pdf-infinite-scroll.component.html',
  styleUrls: ['./pdf-infinite-scroll.component.css'],
})
export class PdfInfiniteScrollComponent {
  @Input()
  public pageViewMode: PageViewModeType;

  @Output()
  public pageViewModeChange = new EventEmitter<PageViewModeType>();

  public onClick(): void {
    this.pageViewModeChange.emit('infinite-scroll');
  }
}
