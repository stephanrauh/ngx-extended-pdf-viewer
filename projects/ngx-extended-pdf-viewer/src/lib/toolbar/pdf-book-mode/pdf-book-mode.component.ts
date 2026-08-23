import { ChangeDetectorRef, Component, input, model, OnDestroy, ViewRef } from '@angular/core';
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

  // #2818 modified by ngx-extended-pdf-viewer
  public disable = input<boolean>(false);
  // #2818 end of modification by ngx-extended-pdf-viewer

  public pageViewMode = model.required<PageViewModeType>();

  public scrollMode = input.required<ScrollModeType>();

  public onClick?: (() => void) | undefined;

  constructor(private readonly cdr: ChangeDetectorRef) {
    this.onClick = () => {
      setTimeout(this.asyncWithCD(() => {
        this.pageViewMode.set('book');
      }));
    };
  }

  /**
   * Runs `callback` and re-renders this component.
   *
   * The callback is scheduled from a pdf.js event bus listener, which runs
   * outside Angular's zone, so neither zone.js nor a signal write schedules a
   * change detection run for us - the button kept showing the previous state
   * until an unrelated click happened to trigger one. The view can already be
   * destroyed by the time a queued callback runs, and `detectChanges()` throws
   * on a destroyed view, so that case is skipped.
   */
  private asyncWithCD(callback: () => void): () => void {
    return () => {
      callback();
      if (!(this.cdr as ViewRef).destroyed) {
        this.cdr.detectChanges();
      }
    };
  }

  public ngOnDestroy(): void {
    this.onClick = undefined;
  }
}
