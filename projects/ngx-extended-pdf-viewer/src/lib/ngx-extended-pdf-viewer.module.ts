// tslint:disable:max-line-length
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DynamicCssComponent } from './dynamic-css/dynamic-css.component';
import { NgxExtendedPdfViewerComponent } from './ngx-extended-pdf-viewer.component';
import { NgxExtendedPdfViewerService } from './ngx-extended-pdf-viewer.service';
import { NgxKeyboardManagerService } from './ngx-keyboard-manager.service';
import { NgxConsole } from './options/ngx-console';
import { PdfAltTextDialogComponent } from './pdf-dialog/pdf-alt-text-dialog/pdf-alt-text-dialog.component';
import { PdfDocumentPropertiesDialogComponent } from './pdf-dialog/pdf-document-properties-dialog/pdf-document-properties-dialog.component';
import { PdfErrorMessageComponent } from './pdf-dialog/pdf-error-message/pdf-error-message.component';
import { PdfPasswordDialogComponent } from './pdf-dialog/pdf-password-dialog/pdf-password-dialog.component';
import { PdfPreparePrintingDialogComponent } from './pdf-dialog/pdf-prepare-printing-dialog/pdf-prepare-printing-dialog.component';
import { PdfDummyComponentsComponent } from './pdf-dummy-components/pdf-dummy-components.component';
import { NegativeResponsiveCSSClassPipe, ResponsiveCSSClassPipe } from './responsive-visibility';
import { PdfSecondaryToolbarComponent } from './secondary-toolbar/pdf-secondary-toolbar/pdf-secondary-toolbar.component';
import { PdfSidebarContentComponent } from './sidebar/pdf-sidebar/pdf-sidebar-content/pdf-sidebar-content.component';
import { PdfSidebarToolbarComponent } from './sidebar/pdf-sidebar/pdf-sidebar-toolbar/pdf-sidebar-toolbar.component';
import { PdfSidebarComponent } from './sidebar/pdf-sidebar/pdf-sidebar.component';
import { PdfAcroformDefaultThemeComponent } from './theme/acroform-default-theme/pdf-acroform-default-theme.component';
import { PdfDarkThemeComponent } from './theme/pdf-dark-theme/pdf-dark-theme.component';
import { PdfLightThemeComponent } from './theme/pdf-light-theme/pdf-light-theme.component';
import { PdfBookModeComponent } from './toolbar/pdf-book-mode/pdf-book-mode.component';
import { PdfContextMenuComponent } from './toolbar/pdf-context-menu/pdf-context-menu.component';
import { PdfDocumentPropertiesComponent } from './toolbar/pdf-document-properties/pdf-document-properties.component';
import { PdfDownloadComponent } from './toolbar/pdf-download/pdf-download.component';
import { PdfDrawEditorComponent } from './toolbar/pdf-draw-editor/pdf-draw-editor.component';
import { PdfEditorComponent } from './toolbar/pdf-editor/pdf-editor.component';
import { PdfEvenSpreadComponent } from './toolbar/pdf-even-spread/pdf-even-spread.component';
import { PdfFindButtonComponent } from './toolbar/pdf-find-button/pdf-find-button.component';
import { PdfFindInputAreaComponent } from './toolbar/pdf-findbar/pdf-find-input-area/pdf-find-input-area.component';
import { PdfFindNextComponent } from './toolbar/pdf-findbar/pdf-find-next/pdf-find-next.component';
import { PdfFindPreviousComponent } from './toolbar/pdf-findbar/pdf-find-previous/pdf-find-previous.component';
import { PdfFindbarMessageContainerComponent } from './toolbar/pdf-findbar/pdf-findbar-message-container/pdf-findbar-message-container.component';
import { PdfFindHighlightAllComponent } from './toolbar/pdf-findbar/pdf-findbar-options-one-container/pdf-find-highlight-all/pdf-find-highlight-all.component';
import { PdfFindMatchCaseComponent } from './toolbar/pdf-findbar/pdf-findbar-options-one-container/pdf-find-match-case/pdf-find-match-case.component';
import { PdfFindResultsCountComponent } from './toolbar/pdf-findbar/pdf-findbar-options-three-container/pdf-find-results-count/pdf-find-results-count.component';
import { PdfFindEntireWordComponent } from './toolbar/pdf-findbar/pdf-findbar-options-two-container/pdf-find-entire-word/pdf-find-entire-word.component';
import { PdfMatchDiacriticsComponent } from './toolbar/pdf-findbar/pdf-findbar-options-two-container/pdf-match-diacritics/pdf-match-diacritics.component';
import { PdfFindbarComponent } from './toolbar/pdf-findbar/pdf-findbar.component';
import { PdfSearchInputFieldComponent } from './toolbar/pdf-findbar/pdf-search-input-field/pdf-search-input-field.component';
import { PdfHandToolComponent } from './toolbar/pdf-hand-tool/pdf-hand-tool.component';
import { PdfHighlightEditorComponent } from './toolbar/pdf-highlight-editor/pdf-highlight-editor.component';
import { PdfHorizontalScrollComponent } from './toolbar/pdf-horizontal-scroll/pdf-horizontal-scroll.component';
import { PdfInfiniteScrollComponent } from './toolbar/pdf-infinite-scroll/pdf-infinite-scroll.component';
import { PdfNoSpreadComponent } from './toolbar/pdf-no-spread/pdf-no-spread.component';
import { PdfOddSpreadComponent } from './toolbar/pdf-odd-spread/pdf-odd-spread.component';
import { PdfOpenFileComponent } from './toolbar/pdf-open-file/pdf-open-file.component';
import { PdfFirstPageComponent } from './toolbar/pdf-paging-area/pdf-first-page/pdf-first-page.component';
import { PdfLastPageComponent } from './toolbar/pdf-paging-area/pdf-last-page/pdf-last-page.component';
import { PdfNextPageComponent } from './toolbar/pdf-paging-area/pdf-next-page/pdf-next-page.component';
import { PdfPageNumberComponent } from './toolbar/pdf-paging-area/pdf-page-number/pdf-page-number.component';
import { PdfPagingAreaComponent } from './toolbar/pdf-paging-area/pdf-paging-area.component';
import { PdfPreviousPageComponent } from './toolbar/pdf-paging-area/pdf-previous-page/pdf-previous-page.component';
import { PdfPresentationModeComponent } from './toolbar/pdf-presentation-mode/pdf-presentation-mode.component';
import { PdfPrintComponent } from './toolbar/pdf-print/pdf-print.component';
import { PdfRotatePageCcwComponent } from './toolbar/pdf-rotate-page-ccw/pdf-rotate-page-ccw.component';
import { PdfRotatePageCwComponent } from './toolbar/pdf-rotate-page-cw/pdf-rotate-page-cw.component';
import { PdfRotatePageComponent } from './toolbar/pdf-rotate-page/pdf-rotate-page.component';
import { PdfSelectToolComponent } from './toolbar/pdf-select-tool/pdf-select-tool.component';
import { PdfShyButtonComponent } from './toolbar/pdf-shy-button/pdf-shy-button.component';
import { PdfSinglePageModeComponent } from './toolbar/pdf-single-page-mode/pdf-single-page-mode.component';
import { PdfStampEditorComponent } from './toolbar/pdf-stamp-editor/pdf-stamp-editor.component';
import { PdfTextEditorComponent } from './toolbar/pdf-text-editor/pdf-text-editor.component';
import { PdfToggleSecondaryToolbarComponent } from './toolbar/pdf-toggle-secondary-toolbar/pdf-toggle-secondary-toolbar.component';
import { PdfToggleSidebarComponent } from './toolbar/pdf-toggle-sidebar/pdf-toggle-sidebar.component';
import { PdfToolbarComponent } from './toolbar/pdf-toolbar/pdf-toolbar.component';
import { PdfVerticalScrollModeComponent } from './toolbar/pdf-vertical-scroll-button/pdf-vertical-scroll-mode.component';
import { PdfWrappedScrollModeComponent } from './toolbar/pdf-wrapped-scroll-mode/pdf-wrapped-scroll-mode.component';
import { PdfZoomDropdownComponent } from './toolbar/pdf-zoom-toolbar/pdf-zoom-dropdown/pdf-zoom-dropdown.component';
import { PdfZoomInComponent } from './toolbar/pdf-zoom-toolbar/pdf-zoom-in/pdf-zoom-in.component';
import { PdfZoomOutComponent } from './toolbar/pdf-zoom-toolbar/pdf-zoom-out/pdf-zoom-out.component';
import { PdfZoomToolbarComponent } from './toolbar/pdf-zoom-toolbar/pdf-zoom-toolbar.component';
import { TranslatePipe } from './translate.pipe';

if (new Date().getTime() === 0) {
  new NgxConsole().log('');
}

if (!Promise['allSettled']) {
  if (!!window['Zone'] && !window['__zone_symbol__Promise.allSettled']) {
    console.error(
      "Please update zone.js to version 0.10.3 or higher. Otherwise, you'll run the slow ECMAScript 5 version even on modern browser that can run the fast ESMAScript 2015 version."
    );
  }
}

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [
    DynamicCssComponent,
    NegativeResponsiveCSSClassPipe,
    NgxExtendedPdfViewerComponent,
    PdfAcroformDefaultThemeComponent,
    PdfBookModeComponent,
    PdfContextMenuComponent,
    PdfDarkThemeComponent,
    PdfDrawEditorComponent,
    PdfAltTextDialogComponent,
    PdfDocumentPropertiesComponent,
    PdfDocumentPropertiesDialogComponent,
    PdfDownloadComponent,
    PdfDummyComponentsComponent,
    PdfEditorComponent,
    PdfErrorMessageComponent,
    PdfEvenSpreadComponent,
    PdfFindbarComponent,
    PdfFindbarMessageContainerComponent,
    PdfFindButtonComponent,
    PdfFindEntireWordComponent,
    PdfFindHighlightAllComponent,
    PdfFindInputAreaComponent,
    PdfFindMatchCaseComponent,
    PdfFindNextComponent,
    PdfFindPreviousComponent,
    PdfFindResultsCountComponent,
    PdfFirstPageComponent,
    PdfHandToolComponent,
    PdfHighlightEditorComponent,
    PdfHorizontalScrollComponent,
    PdfInfiniteScrollComponent,
    PdfLastPageComponent,
    PdfLightThemeComponent,
    PdfMatchDiacriticsComponent,
    PdfNextPageComponent,
    PdfNoSpreadComponent,
    PdfOddSpreadComponent,
    PdfOpenFileComponent,
    PdfPageNumberComponent,
    PdfPagingAreaComponent,
    PdfPasswordDialogComponent,
    PdfPreparePrintingDialogComponent,
    PdfPresentationModeComponent,
    PdfPreviousPageComponent,
    PdfPrintComponent,
    PdfRotatePageComponent,
    PdfRotatePageCwComponent,
    PdfRotatePageCcwComponent,
    PdfSearchInputFieldComponent,
    PdfSecondaryToolbarComponent,
    PdfSelectToolComponent,
    PdfShyButtonComponent,
    PdfSidebarComponent,
    PdfSidebarContentComponent,
    PdfSidebarToolbarComponent,
    PdfSinglePageModeComponent,
    PdfStampEditorComponent,
    PdfTextEditorComponent,
    PdfToggleSecondaryToolbarComponent,
    PdfToggleSidebarComponent,
    PdfToolbarComponent,
    PdfVerticalScrollModeComponent,
    PdfWrappedScrollModeComponent,
    PdfZoomDropdownComponent,
    PdfZoomInComponent,
    PdfZoomOutComponent,
    PdfZoomToolbarComponent,
    ResponsiveCSSClassPipe,
    TranslatePipe,
  ],
  providers: [NgxExtendedPdfViewerService, NgxKeyboardManagerService],
  exports: [
    NegativeResponsiveCSSClassPipe,
    NgxExtendedPdfViewerComponent,
    PdfAcroformDefaultThemeComponent,
    PdfBookModeComponent,
    PdfContextMenuComponent,
    PdfDarkThemeComponent,
    PdfDrawEditorComponent,
    PdfAltTextDialogComponent,
    PdfDocumentPropertiesDialogComponent,
    PdfDownloadComponent,
    PdfEditorComponent,
    PdfErrorMessageComponent,
    PdfEvenSpreadComponent,
    PdfFindbarComponent,
    PdfFindbarMessageContainerComponent,
    PdfFindButtonComponent,
    PdfFindEntireWordComponent,
    PdfFindHighlightAllComponent,
    PdfFindInputAreaComponent,
    PdfFindMatchCaseComponent,
    PdfFindNextComponent,
    PdfFindPreviousComponent,
    PdfFindResultsCountComponent,
    PdfFirstPageComponent,
    PdfHandToolComponent,
    PdfHighlightEditorComponent,
    PdfHorizontalScrollComponent,
    PdfInfiniteScrollComponent,
    PdfLastPageComponent,
    PdfLightThemeComponent,
    PdfMatchDiacriticsComponent,
    PdfNextPageComponent,
    PdfNoSpreadComponent,
    PdfOddSpreadComponent,
    PdfOpenFileComponent,
    PdfPageNumberComponent,
    PdfPagingAreaComponent,
    PdfPasswordDialogComponent,
    PdfPreparePrintingDialogComponent,
    PdfPresentationModeComponent,
    PdfPreviousPageComponent,
    PdfPrintComponent,
    PdfRotatePageComponent,
    PdfSearchInputFieldComponent,
    PdfSecondaryToolbarComponent,
    PdfSelectToolComponent,
    PdfShyButtonComponent,
    PdfSidebarComponent,
    PdfSidebarContentComponent,
    PdfSidebarToolbarComponent,
    PdfSinglePageModeComponent,
    PdfStampEditorComponent,
    PdfTextEditorComponent,
    PdfToggleSecondaryToolbarComponent,
    PdfToggleSidebarComponent,
    PdfToolbarComponent,
    PdfVerticalScrollModeComponent,
    PdfWrappedScrollModeComponent,
    PdfZoomDropdownComponent,
    PdfZoomInComponent,
    PdfZoomOutComponent,
    PdfZoomToolbarComponent,
    ResponsiveCSSClassPipe,
  ],
})
export class NgxExtendedPdfViewerModule {}
