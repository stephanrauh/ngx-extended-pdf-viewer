import { PdfHandToolComponent } from './toolbar/pdf-hand-tool/pdf-hand-tool.component';
// tslint:disable:max-line-length

import { CommonModule, Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IPDFViewerApplicationOptions } from './options/pdf-viewer-application-options';
import { NgModule } from '@angular/core';
import { NgxExtendedPdfViewerComponent } from './ngx-extended-pdf-viewer.component';
import { NgxExtendedPdfViewerService } from './ngx-extended-pdf-viewer.service';
import { PageNumberComponent } from './toolbar/pdf-paging-area/page-number/page-number.component';
import { PdfBookmarkComponent } from './toolbar/pdf-bookmark/pdf-bookmark.component';
import { PdfContextMenuComponent } from './toolbar/pdf-context-menu/pdf-context-menu.component';
import { PdfDocumentPropertiesOverlayComponent } from './document-properties/pdf-document-properties-overlay/pdf-document-properties-overlay.component';
import { PdfDownloadComponent } from './toolbar/pdf-download/pdf-download.component';
import { PdfDummyComponentsComponent } from './pdf-dummy-components/pdf-dummy-components.component';
import { PdfFindbarComponent } from './toolbar/pdf-findbar/pdf-findbar.component';
import { PdfFindbarMessageContainerComponent } from './toolbar/pdf-findbar/pdf-findbar-message-container/pdf-findbar-message-container.component';
import { PdfFindbarOptionsOneContainerComponent } from './toolbar/pdf-findbar/pdf-findbar-options-one-container/pdf-findbar-options-one-container.component';
import { PdfFindbarOptionsThreeContainerComponent } from './toolbar/pdf-findbar/pdf-findbar-options-three-container/pdf-findbar-options-three-container.component';
import { PdfFindbarOptionsTwoContainerComponent } from './toolbar/pdf-findbar/pdf-findbar-options-two-container/pdf-findbar-options-two-container.component';
import { PdfFindButtonComponent } from './toolbar/pdf-find-button/pdf-find-button.component';
import { PdfFindEntireWordComponent } from './toolbar/pdf-findbar/pdf-findbar-options-two-container/pdf-find-entire-word/pdf-find-entire-word.component';
import { PdfFindFuzzilyComponent } from './toolbar/pdf-findbar/pdf-findbar-options-three-container/pdf-find-fuzzily/pdf-find-fuzzily.component';
import { PdfFindHighlightAllComponent } from './toolbar/pdf-findbar/pdf-findbar-options-one-container/pdf-find-highlight-all/pdf-find-highlight-all.component';
import { PdfFindIgnoreAccentsComponent } from './toolbar/pdf-findbar/pdf-findbar-options-three-container/pdf-find-ignore-accents/pdf-find-ignore-accents.component';
import { PdfFindInputAreaComponent } from './toolbar/pdf-findbar/pdf-find-input-area/pdf-find-input-area.component';
import { PdfFindMatchCaseComponent } from './toolbar/pdf-findbar/pdf-findbar-options-one-container/pdf-find-match-case/pdf-find-match-case.component';
import { PdfFindMultipleSearchTextsComponent } from './toolbar/pdf-findbar/pdf-findbar-options-two-container/pdf-find-entire-phrase/pdf-find-entire-phrase.component';
import { PdfFindNextComponent } from './toolbar/pdf-findbar/pdf-find-next/pdf-find-next.component';
import { PdfFindPreviousComponent } from './toolbar/pdf-findbar/pdf-find-previous/pdf-find-previous.component';
import { PdfFindResultsCountComponent } from './toolbar/pdf-findbar/pdf-findbar-options-three-container/pdf-find-results-count/pdf-find-results-count.component';
import { PdfFirstPageComponent } from './toolbar/pdf-paging-area/pdf-first-page/pdf-first-page.component';
import { PdfLastPageComponent } from './toolbar/pdf-paging-area/pdf-last-page/pdf-last-page.component';
import { PdfNextPageComponent } from './toolbar/pdf-paging-area/pdf-next-page/pdf-next-page.component';
import { PdfOpenFileComponent } from './toolbar/pdf-open-file/pdf-open-file.component';
import { PdfPageNumberComponent } from './toolbar/pdf-paging-area/pdf-page-number/pdf-page-number.component';
import { PdfPagingAreaComponent } from './toolbar/pdf-paging-area/pdf-paging-area.component';
import { PdfPresentationModeComponent } from './toolbar/pdf-presentation-mode/pdf-presentation-mode.component';
import { PdfPreviousPageComponent } from './toolbar/pdf-paging-area/pdf-previous-page/pdf-previous-page.component';
import { PdfPrintComponent } from './toolbar/pdf-print/pdf-print.component';
import { PdfRotatePageComponent } from './toolbar/pdf-rotate-page/pdf-rotate-page.component';
import { PdfSearchInputFieldComponent } from './toolbar/pdf-findbar/pdf-search-input-field/pdf-search-input-field.component';
import { PdfSecondaryToolbarComponent } from './secondary-toolbar/pdf-secondary-toolbar/pdf-secondary-toolbar.component';
import { PdfSidebarComponent } from './sidebar/pdf-sidebar/pdf-sidebar.component';
import { PdfToggleSecondaryToolbarComponent } from './toolbar/pdf-toggle-secondary-toolbar/pdf-toggle-secondary-toolbar.component';
import { PdfToggleSidebarComponent } from './toolbar/pdf-toggle-sidebar/pdf-toggle-sidebar.component';
import { PdfToolbarComponent } from './toolbar/pdf-toolbar/pdf-toolbar.component';
import { PdfZoomDropdownComponent } from './toolbar/pdf-zoom-toolbar/pdf-zoom-dropdown/pdf-zoom-dropdown.component';
import { PdfZoomInComponent } from './toolbar/pdf-zoom-toolbar/pdf-zoom-in/pdf-zoom-in.component';
import { PdfZoomOutComponent } from './toolbar/pdf-zoom-toolbar/pdf-zoom-out/pdf-zoom-out.component';
import { PdfZoomToolbarComponent } from './toolbar/pdf-zoom-toolbar/pdf-zoom-toolbar.component';
import { PdfSelectToolComponent } from './toolbar/pdf-select-tool/pdf-select-tool.component';
import { DynamicCssComponent } from './dynamic-css/dynamic-css.component';
import { PDFNotificationService } from './pdf-notification-service';
import { PdfSidebarContentComponent } from './sidebar/pdf-sidebar/pdf-sidebar-content/pdf-sidebar-content.component';
import { PdfSidebarToolbarComponent } from './sidebar/pdf-sidebar/pdf-sidebar-toolbar/pdf-sidebar-toolbar.component';import { PdfPhotonComponent } from './theme/pdf-photon-theme/pdf-photon.component';
import { PdfOriginalComponent } from './theme/pdf-original-theme/pdf-original.component';
import { PdfDarkComponent } from './theme/pdf-dark-theme/pdf-dark.component';
if (!Promise['allSettled']) {
  if ((!!window['Zone']) && (!window['__zone_symbol__Promise.allSettled'])) {
    console.error('Please update zone.js to version 0.10.3 or higher. Otherwise, you\'ll run the slow ECMAScript 5 version even on modern browser that can run the fast ESMAScript 2015 version.');
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
    NgxExtendedPdfViewerComponent,
    PdfZoomDropdownComponent,
    PdfContextMenuComponent,
    PdfPresentationModeComponent,
    PdfOpenFileComponent,
    PdfPrintComponent,
    PdfDownloadComponent,
    PdfBookmarkComponent,
    PdfZoomToolbarComponent,
    PdfPagingAreaComponent,
    PdfFindbarComponent,
    PdfSidebarComponent,
    PdfHandToolComponent,
    PdfSelectToolComponent,
    PdfSecondaryToolbarComponent,
    PdfDocumentPropertiesOverlayComponent,
    PdfSearchInputFieldComponent,
    PdfFindPreviousComponent,
    PdfFindNextComponent,
    PdfFindInputAreaComponent,
    PdfFindbarOptionsTwoContainerComponent,
    PdfFindbarOptionsOneContainerComponent,
    PdfFindMatchCaseComponent,
    PdfFindHighlightAllComponent,
    PdfFindEntireWordComponent,
    PdfFindFuzzilyComponent,
    PdfFindMultipleSearchTextsComponent,
    PdfFindIgnoreAccentsComponent,
    PdfFindbarOptionsThreeContainerComponent,
    PdfFindResultsCountComponent,
    PdfFindbarMessageContainerComponent,
    PdfToolbarComponent,
    PdfFindButtonComponent,
    PdfToggleSidebarComponent,
    PdfToggleSecondaryToolbarComponent,
    PdfLastPageComponent,
    PdfFirstPageComponent,
    PdfNextPageComponent,
    PdfPreviousPageComponent,
    PageNumberComponent,
    PdfPageNumberComponent,
    PdfRotatePageComponent,
    PdfZoomInComponent,
    PdfZoomOutComponent,
    PdfDummyComponentsComponent,
    PdfSidebarContentComponent,
    PdfSidebarToolbarComponent,
    PdfOriginalComponent,
    PdfDarkComponent,
    PdfPhotonComponent,
  ],
  providers: [NgxExtendedPdfViewerService, PDFNotificationService, Location, { provide: LocationStrategy, useClass: PathLocationStrategy }],
  exports: [
    PdfZoomDropdownComponent,
    PdfContextMenuComponent,
    PdfPresentationModeComponent,
    PdfOpenFileComponent,
    PdfPrintComponent,
    PdfDownloadComponent,
    PdfBookmarkComponent,
    PdfZoomToolbarComponent,
    PdfPagingAreaComponent,
    PdfFindbarComponent,
    PdfSidebarComponent,
    PdfSidebarContentComponent,
    PdfSidebarToolbarComponent,
    PdfSecondaryToolbarComponent,
    PdfDocumentPropertiesOverlayComponent,
    PdfSearchInputFieldComponent,
    PdfFindPreviousComponent,
    PdfFindNextComponent,
    PdfFindInputAreaComponent,
    PdfFindbarOptionsTwoContainerComponent,
    PdfFindbarOptionsOneContainerComponent,
    PdfFindMatchCaseComponent,
    PdfFindHighlightAllComponent,
    PdfFindEntireWordComponent,
    PdfFindMultipleSearchTextsComponent,
    PdfFindIgnoreAccentsComponent,
    PdfFindbarOptionsThreeContainerComponent,
    PdfFindResultsCountComponent,
    PdfFindbarMessageContainerComponent,
    PdfHandToolComponent,
    PdfRotatePageComponent,
    PdfSelectToolComponent,
    PdfToolbarComponent,
    PdfFindButtonComponent,
    PdfToggleSidebarComponent,
    PdfToggleSecondaryToolbarComponent,
    PdfLastPageComponent,
    PdfFirstPageComponent,
    PdfNextPageComponent,
    PdfPreviousPageComponent,
    PageNumberComponent,
    PdfPageNumberComponent,
    PdfZoomInComponent,
    PdfZoomOutComponent,
    NgxExtendedPdfViewerComponent
  ],
})
export class NgxExtendedPdfViewerModule {
  constructor() { }
}
