import { ChangeDetectorRef, Component, input, model, OnDestroy } from '@angular/core';
import { PageViewModeType, ScrollModeType } from '../../options/pdf-viewer';
import { ResponsiveVisibility } from '../../responsive-visibility';

@Component({
    selector: 'pdf-book-mode',
    templateUrl: './pdf-book-mode.component.html',
    styleUrls: ['./pdf-book-mode.component.css'],
    standalone: false
})
export class PdfBookModeComponent implements OnDestroy {
  public show = input<ResponsiveVisibility>(true);

  public pageViewMode = model.required<PageViewModeType>();

  public scrollMode = input.required<ScrollModeType>();

  public onClick?: () => void;

  constructor(private cdr: ChangeDetectorRef) {
    this.onClick = () => {
      setTimeout(this.asyncWithCD(() => {
        this.pageViewMode.set('book');
      }));
    };
  }

  private isZoneless(): boolean {
    const Zone = (globalThis as any).Zone;
    return typeof Zone === 'undefined' || !Zone?.current;
  }

  private asyncWithCD(callback: () => void): () => void {
    return () => {
      callback();
      if (this.isZoneless()) {
        this.cdr.detectChanges();
      }
    };
  }

  public ngOnDestroy(): void {
    this.onClick = undefined;
  }
}
