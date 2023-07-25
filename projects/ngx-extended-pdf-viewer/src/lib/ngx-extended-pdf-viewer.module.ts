// tslint:disable:max-line-length
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DynamicCssComponent } from './dynamic-css/dynamic-css.component';
import { NgxExtendedPdfViewerComponent } from './ngx-extended-pdf-viewer.component';
import { NgxExtendedPdfViewerService } from './ngx-extended-pdf-viewer.service';
import { NgxConsole } from './options/ngx-console';
import { IPDFViewerApplicationOptions } from './options/pdf-viewer-application-options';
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
import { PdfEditorComponent } from './toolbar/pdf-editor/pdf-editor.component';
import { PdfEvenSpreadComponent } from './toolbar/pdf-even-spread/pdf-even-spread.component';
import { PdfFindButtonComponent } from './toolbar/pdf-find-button/pdf-find-button.component';
import { PdfFindInputAreaComponent } from './toolbar/pdf-findbar/pdf-find-input-area/pdf-find-input-area.component';
import { PdfFindNextComponent } from './toolbar/pdf-findbar/pdf-find-next/pdf-find-next.component';
import { PdfFindPreviousComponent } from './toolbar/pdf-findbar/pdf-find-previous/pdf-find-previous.component';
import { PdfFindbarMessageContainerComponent } from './toolbar/pdf-findbar/pdf-findbar-message-container/pdf-findbar-message-container.component';
import { PdfFindHighlightAllComponent } from './toolbar/pdf-findbar/pdf-findbar-options-one-container/pdf-find-highlight-all/pdf-find-highlight-all.component';
import { PdfFindMatchCaseComponent } from './toolbar/pdf-findbar/pdf-findbar-options-one-container/pdf-find-match-case/pdf-find-match-case.component';
import { PdfFindbarOptionsOneContainerComponent } from './toolbar/pdf-findbar/pdf-findbar-options-one-container/pdf-findbar-options-one-container.component';
import { PdfFindResultsCountComponent } from './toolbar/pdf-findbar/pdf-findbar-options-three-container/pdf-find-results-count/pdf-find-results-count.component';
import { PdfFindbarOptionsThreeContainerComponent } from './toolbar/pdf-findbar/pdf-findbar-options-three-container/pdf-findbar-options-three-container.component';
import { PdfFindEntireWordComponent } from './toolbar/pdf-findbar/pdf-findbar-options-two-container/pdf-find-entire-word/pdf-find-entire-word.component';
import { PdfFindbarOptionsTwoContainerComponent } from './toolbar/pdf-findbar/pdf-findbar-options-two-container/pdf-findbar-options-two-container.component';
import { PdfMatchDiacriticsComponent } from './toolbar/pdf-findbar/pdf-findbar-options-two-container/pdf-match-diacritics/pdf-match-diacritics.component';
import { PdfFindbarComponent } from './toolbar/pdf-findbar/pdf-findbar.component';
import { PdfSearchInputFieldComponent } from './toolbar/pdf-findbar/pdf-search-input-field/pdf-search-input-field.component';
import { PdfHandToolComponent } from './toolbar/pdf-hand-tool/pdf-hand-tool.component';
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
import { PdfRotatePageComponent } from './toolbar/pdf-rotate-page/pdf-rotate-page.component';
import { PdfSelectToolComponent } from './toolbar/pdf-select-tool/pdf-select-tool.component';
import { PdfShyButtonComponent } from './toolbar/pdf-shy-button/pdf-shy-button.component';
import { PdfSinglePageModeComponent } from './toolbar/pdf-single-page-mode/pdf-single-page-mode.component';
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

function isKeyIgnored(cmd: number, keycode: number | 'WHEEL'): boolean {
  const PDFViewerApplicationOptions: IPDFViewerApplicationOptions = (window as any).PDFViewerApplicationOptions;

  const ignoreKeys: Array<string> = PDFViewerApplicationOptions.get('ignoreKeys');
  const acceptKeys: Array<string> = PDFViewerApplicationOptions.get('acceptKeys');
  if (keycode === 'WHEEL') {
    if (isKeyInList(ignoreKeys, cmd, 'WHEEL')) {
      return true;
    }
    if (!!acceptKeys && acceptKeys.length > 0) {
      return !isKeyInList(acceptKeys, cmd, 'WHEEL');
    }

    return false;
  }

  if (keycode === 16 || keycode === 17 || keycode === 18 || keycode === 224) {
    // ignore solitary SHIFT, ALT, CMD, and CTRL because they only make sense as two-key-combinations
    return true;
  }
  // cmd is a bit-array:
  // 1 == CTRL
  // 2 == ALT
  // 4 == SHIFT
  // 8 == META
  const ignoreKeyboard = PDFViewerApplicationOptions.get('ignoreKeyboard');
  if (!!ignoreKeyboard) {
    return true;
  }

  if (!!ignoreKeys && ignoreKeys.length > 0) {
    if (isKeyInList(ignoreKeys, cmd, keycode)) {
      return true;
    }
  }

  if (!!acceptKeys && acceptKeys.length > 0) {
    return !isKeyInList(acceptKeys, cmd, keycode);
  }
  return false;
}

function isKeyInList(settings: Array<string>, cmd: number, keycode: number | 'WHEEL'): boolean {
  if (!settings) {
    return true;
  }
  return settings.some((keyDef) => isKey(keyDef, cmd, keycode));
}

function isKey(keyDef: string, cmd: number, keycode: number | 'WHEEL'): boolean {
  let cmdDef = 0;
  let key = 0;
  keyDef = keyDef.toLowerCase();
  // tslint:disable: no-bitwise
  if (keyDef.includes('ctrl+')) {
    cmdDef |= 1;
    keyDef = keyDef.replace('ctrl+', '');
  }
  if (keyDef.includes('cmd+')) {
    cmdDef |= 8;
    keyDef = keyDef.replace('cmd+', '');
  }
  if (keyDef.includes('alt+')) {
    cmdDef |= 2;
    keyDef = keyDef.replace('alt+', '');
  }
  if (keyDef.includes('shift+')) {
    cmdDef |= 4;
    keyDef = keyDef.replace('shift+', '');
  }
  if (keyDef.includes('meta+')) {
    cmdDef |= 8;
    keyDef = keyDef.replace('meta+', '');
  }

  if (keyDef === 'up') {
    key = 38;
  } else if (keyDef === 'down') {
    key = 40;
  } else if (keyDef === '+' || keyDef === '"+"') {
    key = 171;
  } else if (keyDef === '-' || keyDef === '"-"') {
    key = 173;
  } else if (keyDef === 'esc') {
    key = 27;
  } else if (keyDef === 'enter') {
    key = 13;
  } else if (keyDef === 'space') {
    key = 32;
  } else if (keyDef === 'f4') {
    key = 115;
  } else if (keyDef === 'backspace') {
    key = 8;
  } else if (keyDef === 'home') {
    key = 36;
  } else if (keyDef === 'end') {
    key = 35;
  } else if (keyDef === 'left') {
    key = 37;
  } else if (keyDef === 'right') {
    key = 39;
  } else if (keyDef === 'pagedown') {
    key = 34;
  } else if (keyDef === 'pageup') {
    key = 33;
  } else {
    key = keyDef.toUpperCase().charCodeAt(0);
  }
  if (keycode === 'WHEEL') {
    return keyDef === 'wheel' && cmd === cmdDef;
  }
  return key === keycode && cmd === cmdDef;
}

if (typeof window !== 'undefined') {
  (window as any).isKeyIgnored = isKeyIgnored;
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
    PdfDocumentPropertiesComponent,
    PdfDocumentPropertiesDialogComponent,
    PdfDownloadComponent,
    PdfDummyComponentsComponent,
    PdfEditorComponent,
    PdfErrorMessageComponent,
    PdfEvenSpreadComponent,
    PdfFindbarComponent,
    PdfFindbarMessageContainerComponent,
    PdfFindbarOptionsOneContainerComponent,
    PdfFindbarOptionsThreeContainerComponent,
    PdfFindbarOptionsTwoContainerComponent,
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
  providers: [NgxExtendedPdfViewerService],
  exports: [
    NegativeResponsiveCSSClassPipe,
    NgxExtendedPdfViewerComponent,
    PdfAcroformDefaultThemeComponent,
    PdfBookModeComponent,
    PdfContextMenuComponent,
    PdfDarkThemeComponent,
    PdfDocumentPropertiesDialogComponent,
    PdfDownloadComponent,
    PdfEditorComponent,
    PdfErrorMessageComponent,
    PdfEvenSpreadComponent,
    PdfFindbarComponent,
    PdfFindbarMessageContainerComponent,
    PdfFindbarOptionsOneContainerComponent,
    PdfFindbarOptionsThreeContainerComponent,
    PdfFindbarOptionsTwoContainerComponent,
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
