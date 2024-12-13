import { AfterViewInit, Component, computed, DestroyRef, ElementRef, inject, OnDestroy, output, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { SearchResult } from './search-result.type';
import { debounceTime, distinctUntilChanged, fromEvent, Observable, switchMap, tap } from 'rxjs';
import { SearchService } from './search.service';
import { Router, RouterLink } from '@angular/router';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { SearchResultDirective } from './search-result.directive';
import { ActiveDescendantKeyManager } from '@angular/cdk/a11y';
import { WINDOW } from '../../shared/helper/window.token';

@Component({
  selector: 'pvs-search',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, SearchResultDirective],
  template: `
    <dialog #searchDialog class="bg-transparent">
      <div class="w-[750px] max-w-[90vw] bg-surface border-solid border-[1px] rounded p-2">
        <input
          [formControl]="searchControl"
          type="text"
          placeholder="Search documentation..."
          class="w-full px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-variant-light focus:border-transparent relative"
        />

        @if (hasResults()) {
          <div class="w-full mt-1 overflow-y-auto bg-white border rounded-md shadow-lg max-h-96 z-50">
            <ul>
              @for (result of searchResults(); track result.route) {
                <li pvsSearchResult [result]="result" class="group [&.active]:font-bold">
                  <a
                    [routerLink]="result.route"
                    class="block px-4 py-2 hover:bg-gray-50 border-b last:border-b-0 no-underline group-[&.active:not(:hover)]:bg-secondary-hover group-[&.active:not(:hover)]:text-on-secondary-hover hover:bg-secondary-variant-hover [&.active]:text-on-secondary-variant-hover"
                    (click)="clearSearch()"
                  >
                    <h4 class="text-sm font-medium group-[.active]:font-bold text-gray-900">{{ result.title }}</h4>
                    @if (result.snippet) {
                      <p [innerHTML]="result.snippet" class="mt-1 text-xs text-gray-600"></p>
                    }
                  </a>
                </li>
              }
            </ul>
          </div>
        }
      </div>
    </dialog>
  `,
  host: {
    class: 'relative w-72',
    role: 'search',
  },
})
export class SearchComponent implements AfterViewInit, OnDestroy {
  @ViewChildren(SearchResultDirective) results: QueryList<SearchResultDirective>;
  @ViewChild('searchDialog') dialog: ElementRef<HTMLDialogElement>;

  onClose = output();

  private searchService = inject(SearchService);
  private destroyRef = inject(DestroyRef);
  private window = inject(WINDOW);
  private router = inject(Router);
  private keyManager: ActiveDescendantKeyManager<SearchResultDirective>;

  searchControl = new FormControl('');

  private _searchResults: Observable<SearchResult[]> = this.searchControl.valueChanges.pipe(
    debounceTime(300),
    distinctUntilChanged(),
    switchMap((query) => this.searchService.search(query || '')),
    tap(() => {
      this.keyManager.setFirstItemActive();
    }),
    takeUntilDestroyed(),
  );

  searchResults = toSignal(this._searchResults);
  hasResults = computed(() => (this.searchResults()?.length ?? 0) > 0);

  clearSearch() {
    this.searchControl.setValue('');
  }

  private navigateToTheActiveItem(): void {
    const activeItemLink = this.keyManager.activeItem?.result?.route;
    if (!activeItemLink) {
      return;
    }

    this.router.navigate([activeItemLink]);
    this.onClose.emit();
  }

  ngAfterViewInit() {
    if (!this.dialog.nativeElement.open) {
      this.dialog.nativeElement.showModal?.();
    }

    this.keyManager = new ActiveDescendantKeyManager(this.results).withWrap();

    this.keyManager.change.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
      this.keyManager.activeItem?.scrollIntoView();
    });

    fromEvent<KeyboardEvent>(this.window, 'keydown')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((event) => {
        if (event.key === 'Escape') {
          this.clearSearch();
          return;
        }
        if (event.key === 'Enter') {
          this.navigateToTheActiveItem();
          return;
        }
        this.keyManager.onKeydown(event);
      });
  }

  closeSearchDialog() {
    this.dialog.nativeElement.close();
    this.onClose.emit();
  }

  ngOnDestroy(): void {
    this.closeSearchDialog();
  }
}
