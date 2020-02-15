// tslint:disable:max-line-length
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxExtendedPdfViewerComponent } from './ngx-extended-pdf-viewer.component';
import { NgxExtendedPdfViewerService } from './ngx-extended-pdf-viewer.service';
import { PdfZoomDropdownComponent } from './toolbar/pdf-zoom-dropdown/pdf-zoom-dropdown.component';
import { PdfContextMenuComponent } from './toolbar/pdf-context-menu/pdf-context-menu.component';
import { PdfPresentationModeComponent } from './toolbar/pdf-presentation-mode/pdf-presentation-mode.component';
import { PdfOpenFileComponent } from './toolbar/pdf-open-file/pdf-open-file.component';
import { PdfPrintComponent } from './toolbar/pdf-print/pdf-print.component';
import { PdfDownloadComponent } from './toolbar/pdf-download/pdf-download.component';
import { PdfBookmarkComponent } from './toolbar/pdf-bookmark/pdf-bookmark.component';
import { PdfZoomToolbarComponent } from './toolbar/pdf-zoom-toolbar/pdf-zoom-toolbar.component';
import { PdfPagingAreaComponent } from './toolbar/pdf-paging-area/pdf-paging-area.component';
import { PdfFindbarComponent } from './toolbar/pdf-findbar/pdf-findbar.component';
import { PdfSidebarComponent } from './sidebar/pdf-sidebar/pdf-sidebar.component';
import { PdfSecondaryToolbarComponent } from './secondary-toolbar/pdf-secondary-toolbar/pdf-secondary-toolbar.component';
import { PdfDocumentPropertiesOverlayComponent } from './document-properties/pdf-document-properties-overlay/pdf-document-properties-overlay.component';
import { PdfSearchInputFieldComponent } from './toolbar/pdf-findbar/pdf-search-input-field/pdf-search-input-field.component';
import { PdfFindPreviousComponent } from './toolbar/pdf-findbar/pdf-find-previous/pdf-find-previous.component';
import { PdfFindNextComponent } from './toolbar/pdf-findbar/pdf-find-next/pdf-find-next.component';
import { PdfFindInputAreaComponent } from './toolbar/pdf-findbar/pdf-find-input-area/pdf-find-input-area.component';
import { PdfFindbarOptionsTwoContainerComponent } from './toolbar/pdf-findbar/pdf-findbar-options-two-container/pdf-findbar-options-two-container.component';
import { PdfFindbarOptionsOneContainerComponent } from './toolbar/pdf-findbar/pdf-findbar-options-one-container/pdf-findbar-options-one-container.component';
import { PdfFindMatchCaseComponent } from './toolbar/pdf-findbar/pdf-findbar-options-one-container/pdf-find-match-case/pdf-find-match-case.component';
import { PdfFindHighlightAllComponent } from './toolbar/pdf-findbar/pdf-findbar-options-one-container/pdf-find-highlight-all/pdf-find-highlight-all.component';
import { PdfFindEntireWordComponent } from './toolbar/pdf-findbar/pdf-findbar-options-two-container/pdf-find-entire-word/pdf-find-entire-word.component';
import { PdfFindIgnoreAccentsComponent } from './toolbar/pdf-findbar/pdf-findbar-options-three-container/pdf-find-ignore-accents/pdf-find-ignore-accents.component';
import { PdfFindbarOptionsThreeContainerComponent } from './toolbar/pdf-findbar/pdf-findbar-options-three-container/pdf-findbar-options-three-container.component';
import { PdfFindResultsCountComponent } from './toolbar/pdf-findbar/pdf-findbar-options-three-container/pdf-find-results-count/pdf-find-results-count.component';
import { PdfFindbarMessageContainerComponent } from './toolbar/pdf-findbar/pdf-findbar-message-container/pdf-findbar-message-container.component';
import { PdfSplitToolbarButtonComponent } from './toolbar/pdf-findbar/pdf-split-toolbar-button/pdf-split-toolbar-button.component';
import { PdfFindMultipleSearchTextsComponent } from './toolbar/pdf-findbar/pdf-findbar-options-two-container/pdf-find-entire-phrase/pdf-find-entire-phrase.component';
import { FormsModule } from '@angular/forms';

function isKeyIgnored(cmd: number, keycode: number | 'WHEEL'): boolean {
  const options = (window as any).PDFViewerApplicationOptions;
  const ignoreKeys: Array<string> = options.get('ignoreKeys');
  const acceptKeys: Array<string> = options.get('acceptKeys');
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
  const ignoreKeyboard = options.get('ignoreKeyboard');
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
  return settings.some(keyDef => isKey(keyDef, cmd, keycode));
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
  return key === keycode && cmd === cmdDef;
}

(window as any).isKeyIgnored = isKeyIgnored;

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [
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
    PdfSplitToolbarButtonComponent
  ],
  providers: [NgxExtendedPdfViewerService],
  exports: [NgxExtendedPdfViewerComponent,
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
    PdfSplitToolbarButtonComponent
]
})
export class NgxExtendedPdfViewerModule {
  constructor() {}
}
