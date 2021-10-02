import { NgxExtendedPdfViewerCommonModule } from './ngx-extended-pdf-viewer-common.module';
import { NgxExtendedPdfViewerServerComponent } from './ngx-extended-pdf-viewer-server.component';
import { PdfHandToolComponent } from './toolbar/pdf-hand-tool/pdf-hand-tool.component';
// tslint:disable:max-line-length

import { NgModule } from '@angular/core';
import { PdfBookmarkComponent } from './toolbar/pdf-bookmark/pdf-bookmark.component';
import { PdfContextMenuComponent } from './toolbar/pdf-context-menu/pdf-context-menu.component';
import { PdfDocumentPropertiesOverlayComponent } from './document-properties/pdf-document-properties-overlay/pdf-document-properties-overlay.component';
import { PdfDownloadComponent } from './toolbar/pdf-download/pdf-download.component';
import { PdfFindbarComponent } from './toolbar/pdf-findbar/pdf-findbar.component';
import { PdfFindbarMessageContainerComponent } from './toolbar/pdf-findbar/pdf-findbar-message-container/pdf-findbar-message-container.component';
import { PdfFindbarOptionsOneContainerComponent } from './toolbar/pdf-findbar/pdf-findbar-options-one-container/pdf-findbar-options-one-container.component';
import { PdfFindbarOptionsThreeContainerComponent } from './toolbar/pdf-findbar/pdf-findbar-options-three-container/pdf-findbar-options-three-container.component';
import { PdfFindbarOptionsTwoContainerComponent } from './toolbar/pdf-findbar/pdf-findbar-options-two-container/pdf-findbar-options-two-container.component';
import { PdfFindButtonComponent } from './toolbar/pdf-find-button/pdf-find-button.component';
import { PdfFindEntireWordComponent } from './toolbar/pdf-findbar/pdf-findbar-options-two-container/pdf-find-entire-word/pdf-find-entire-word.component';
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
import { PdfSidebarContentComponent } from './sidebar/pdf-sidebar/pdf-sidebar-content/pdf-sidebar-content.component';
import { PdfSidebarToolbarComponent } from './sidebar/pdf-sidebar/pdf-sidebar-toolbar/pdf-sidebar-toolbar.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxExtendedPdfViewerService } from './ngx-extended-pdf-viewer-server.service';

@NgModule({
  imports: [NgxExtendedPdfViewerCommonModule, CommonModule, FormsModule],
  declarations: [
    NgxExtendedPdfViewerServerComponent,
  ],
  providers: [NgxExtendedPdfViewerService],
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
    PdfPageNumberComponent,
    PdfZoomInComponent,
    PdfZoomOutComponent,
    NgxExtendedPdfViewerServerComponent,
  ],
})
export class NgxExtendedPdfViewerServerModule {
  constructor() {}
}
