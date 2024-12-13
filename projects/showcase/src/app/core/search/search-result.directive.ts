import { Directive, ElementRef, inject, Input, signal } from '@angular/core';
import { Highlightable } from '@angular/cdk/a11y';
import { SearchResult } from './search-result.type';

@Directive({
  selector: '[pvsSearchResult]',
  standalone: true,
  host: {
    '[class.active]': 'isActive',
  },
})
export class SearchResultDirective implements Highlightable {
  @Input() result?: SearchResult;
  @Input() disabled = false;

  private readonly elementRef = inject(ElementRef<HTMLLIElement>);
  private _isActive = signal(false);

  protected get isActive() {
    return this._isActive();
  }

  setActiveStyles(): void {
    this._isActive.set(true);
  }

  setInactiveStyles(): void {
    this._isActive.set(false);
  }

  getLabel(): string {
    return this.result?.title ?? '';
  }

  scrollIntoView(): void {
    this.elementRef?.nativeElement.scrollIntoView({ block: 'nearest' });
  }
}
