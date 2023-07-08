import { Component } from '@angular/core';
import {
  FindResult,
  FindResultMatchesCount,
  FindState,
  IPDFViewerApplication,
  NgxExtendedPdfViewerService,
  pdfDefaultOptions,
} from 'ngx-extended-pdf-viewer';

@Component({
  selector: 'app-find',
  templateUrl: './find.component.html',
  styleUrls: ['./find.component.css'],
})
export class FindComponent {
  public _searchtext = '';

  public highlightAll = false;
  public matchCase = false;
  public wholeWord = false;
  public matchDiacritics = false;

  public currentMatchNumber: number | undefined;

  public totalMatches: number | undefined;

  public findState: FindState | undefined;
  public type: string | undefined;
  public matchesLength: any[] | undefined;
  public matches: any[] | undefined;
  public direction: 'forward' | 'backward' | undefined;
  public pagesWithMatch: number = 0;
  public totalNumberOfMatchingCharacters: number = 0;

  public get findStateText(): string {
    switch (this.findState) {
      case FindState.FOUND:
        return 'found';
      case FindState.NOT_FOUND:
        return 'not found';
      case FindState.PENDING:
        return 'pending';
      case FindState.WRAPPED:
        return 'wrapped';
    }
    return '';
  }

  public get searchtext(): string {
    return this._searchtext;
  }

  public set searchtext(text: string) {
    this._searchtext = text;
    this.find();
  }

  private find() {
    if (!this._searchtext) {
      this.findState = undefined;
      this.currentMatchNumber = undefined;
      this.totalMatches = undefined;
    }
    this.ngxExtendedPdfViewerService.find(this._searchtext, {
      highlightAll: this.highlightAll,
      matchCase: this.matchCase,
      wholeWords: this.wholeWord,
      matchDiacritics: this.matchDiacritics,
    });
  }

  constructor(
    private ngxExtendedPdfViewerService: NgxExtendedPdfViewerService
  ) {
    if (window.location.search.includes('bleeding-edge')) {
      pdfDefaultOptions.assetsFolder = 'bleeding-edge';
    }
  }

  public updateFindState(result: FindState) {
    this.findState = result;
  }

  public updateFindMatchesCount(result: FindResultMatchesCount) {
    this.currentMatchNumber = result.current;
    this.totalMatches = result.total;
    this._searchtext = result.query;
    this.highlightAll = result.highlightAll;
    this.matchCase = result.caseSensitive;
    this.wholeWord = result.entireWord;
    this.matchDiacritics = result.matchDiacritics;
    this.matches = result.matches;
    this.matchesLength = result.matchesLength;
    this.type = result.type;
    this.direction = result.findPrevious ? 'backward' : 'forward';
    this.pagesWithMatch = this.matchesLength.filter(
      (page) => page.length > 0
    ).length;
    this.totalNumberOfMatchingCharacters = this.matchesLength
      .filter((page) => page.length > 0)
      .flatMap((page) => page as number[])
      .reduce((a, b) => a + b, 0);
  }

  public onCheckboxClicked() {
    this.ngxExtendedPdfViewerService.find(this._searchtext, {
      highlightAll: this.highlightAll,
      matchCase: this.matchCase,
      wholeWords: this.wholeWord,
      matchDiacritics: this.matchDiacritics,
    });
  }

  public findNext(): void {
    this.ngxExtendedPdfViewerService.findNext();
  }

  public findPrevious(): void {
    this.ngxExtendedPdfViewerService.findPrevious();
  }
}
