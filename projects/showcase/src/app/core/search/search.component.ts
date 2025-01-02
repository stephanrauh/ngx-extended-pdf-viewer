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
    <dialog #searchDialog class="bg-transparent backdrop:bg-black/50 backdrop:backdrop-blur-md">
      <div
        class="w-[750px] max-w-[90vw] bg-surface text-on-surface dark:bg-surface-dark dark:text-on-surface-dark border-solid border-[1px] rounded p-2"
        (document:click)="onClickOutside($event)"
        #searchWrapper
      >
        <input
          [formControl]="searchControl"
          type="text"
          placeholder="Search documentation..."
          class="w-full px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 bg-surface text-on-background dark:bg-surface-dark dark:text-on-surface-dark focus:ring-primary-variant-light dark:focus:ring-primary-variant-dark focus:border-transparent relative"
        />

        @if (hasResults()) {
          <div class="w-full mt-1 overflow-y-auto bg-white border rounded-md shadow-lg max-h-96 z-50">
            <ul>
              @for (result of searchResults(); track result.route) {
                <li pvsSearchResult [result]="result" class="group [&.active]:font-bold">
                  <a
                    [routerLink]="result.route"
                    class="block border-b px-4 py-2 bg-surface text-on-background dark:bg-surface-dark dark:text-on-surface-dark last:border-b-0 no-underline group-[&.active:not(:hover)]:bg-secondary-hover dark:group-[&.active:not(:hover)]:bg-secondary-hover-dark dark:group-[&.active:not(:hover)]:text-on-secondary-hover-dark  hover:bg-secondary-variant-hover dark:hover:bg-secondary-variant-hover-dark  dark:[&.active]:text-on-secondary-hover-dark"
                    (click)="clearSearch()"
                  >
                    <h4
                      class="text-sm font-medium group-[.active]:font-bold text-primary-variant-light dark:text-primary-variant-dark dark:group-[.active]:text-on-primary-hover-dark dark:group-[:hover]:text-on-primary-hover-dark group-[.active]:underline group-[:hover]:underline"
                    >
                      {{ result.title }}
                    </h4>
                    @if (result.snippet) {
                      <p [innerHTML]="result.snippet" class="mt-1 text-xs"></p>
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
  @ViewChild('searchWrapper') searchWrapper: ElementRef<HTMLDialogElement>;

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

  onClickOutside($event: PointerEvent | MouseEvent) {
    if ($event.target instanceof HTMLElement && !this.searchWrapper.nativeElement.contains($event.target)) {
      this.closeSearchDialog();
    }
  }

  private navigateToTheActiveItem(): void {
    const activeItemLink = this.keyManager.activeItem?.result?.route;
    if (!activeItemLink) {
      return;
    }

    this.router.navigate([activeItemLink]);
    this.onClose.emit();
  }

  ngOnDestroy(): void {
    this.closeSearchDialog();
  }
}
