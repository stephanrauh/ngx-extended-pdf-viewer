import { Component } from '@angular/core';

/** List of all fields that can be customized */
const requiredIds = [
  'attachmentsView',
  'authorField',
  'contextFirstPage',
  'contextLastPage',
  'contextPageRotateCcw',
  'contextPageRotateCw',
  'creationDateField',
  'creatorField',
  'currentOutlineItem',
  'cursorHandTool',
  'cursorSelectTool',
  'customScaleOption',
  'documentProperties',
  'documentPropertiesClose',
  'download',
  'editorSignatureButton',
  'primaryEditorFreeText',
  'primaryEditorHighlight',
  'primaryEditorInk',
  'primaryEditorStamp',
  'editorModeButtons',
  'editorNone',
  //  'editorSignatureButton',
  'editorSignatureAddSignature',
  'editorStampAddImage',
  'errorClose',
  'errorMessage',
  'errorMoreInfo',
  'errorShowLess',
  'errorShowMore',
  'errorWrapper',
  'fileNameField',
  'fileSizeField',
  'findbar',
  'findCurrentPage',
  'findEntireWord',
  'findFuzzy',
  'findHighlightAll',
  'findIgnoreAccents',
  'findInput',
  'findInputMultiline',
  'findMatchCase',
  'findMatchDiacritics',
  'findMsg',
  'findMultipleSearchTexts',
  'findNext',
  'findPrevious',
  'findRange',
  'findResultsCount',
  'firstPage',
  'individualWordsMode',
  'individualWordsModeLabel',
  'keywordsField',
  'lastPage',
  'linearizedField',
  'modificationDateField',
  'movePageUpButton',
  'movePageDownButton',
  'next',
  'numPages',
  'openFile',
  'outerContainer',
  'outerContainer',
  'outlineOptionsContainer',
  'outlineView',
  'pageCountField',
  'pageNumber',
  'pageRotateCcw',
  'pageRotateCw',
  'pageSizeField',
  'password',
  'passwordCancel',
  'passwordSubmit',
  'passwordText',
  'presentationMode',
  'previous',
  'printButton',
  'producerField',
  'scaleSelect',
  'scaleSelectContainer',
  'scrollHorizontal',
  'scrollPage',
  'scrollVertical',
  'scrollWrapped',
  'secondaryDownload',
  'secondaryOpenFile',
  'secondaryPresentationMode',
  'secondaryPrintButton',
  'secondaryToolbar',
  'secondaryToolbarButtonContainer',
  'secondaryToolbarToggle',
  'secondaryViewBookmark',
  'sidebarResizer',
  'primarySidebarToggle',
  'spreadEven',
  'spreadNone',
  'spreadOdd',
  'subjectField',
  'thumbnailView',
  'titleField',
  'toolbarViewer',
  'versionField',
  'viewAttachments',
  'viewAttachments',
  'viewBookmark',
  'viewerContainer',
  'viewFind',
  'viewLayers',
  'viewOutline',
  'viewOutline',
  'viewThumbnail',
  'viewThumbnail',
  'primaryZoomIn',
  'primaryZoomOut',
  'viewsManagerAddFileButton',
  'viewsManagerSelectorButton',
  'viewsManagerSelectorOptions',
  'viewsManagerHeaderLabel',
  'viewsManagerStatus',
  'viewsManagerStatusAction',
  'viewsManagerStatusActionButton',
  'viewsManagerStatusActionLabel',
  'viewsManagerStatusActionLabelContainer',
  'viewsManagerStatusActionOptions',
  'viewsManagerStatusActionCopy',
  'viewsManagerStatusActionCut',
  'viewsManagerStatusActionDelete',
  'viewsManagerStatusActionExport',
  'viewsManagerStatusUndo',
  'viewsManagerStatusUndoLabel',
  'viewsManagerStatusUndoButton',
  'viewsManagerStatusUndoCloseButton',
  'viewsManagerStatusWarning',
  'viewsManagerStatusWarningLabel',
  'viewsManagerStatusWarningCloseButton',
  'viewsManagerStatusWaiting',
  'viewsManagerStatusWaitingLabel',
  'viewsManagerStatusWaitingCloseButton',
  // #2853 added by ngx-extended-pdf-viewer
  // IDs required by viewer.js that were missing, needed for [customPdfViewer]
  'altTextCancel',
  'altTextDialog',
  'altTextSave',
  'altTextSettingsCloseButton',
  'altTextSettingsDialog',
  'altTextSettingsLearnMore',
  'commentManagerCancelButton',
  'commentManagerDialog',
  'commentManagerSaveButton',
  'commentManagerTextInput',
  'commentManagerTitle',
  'commentManagerToolbar',
  'createModelButton',
  'decorativeButton',
  'descriptionButton',
  'descriptionTextarea',
  'documentPropertiesDialog',
  'downloadButton',
  'editorCommentButton',
  'editorCommentsSidebar',
  'editorCommentsSidebarCloseButton',
  'editorCommentsSidebarCount',
  'editorCommentsSidebarList',
  'editorCommentsSidebarResizer',
  'editorCommentsSidebarTitle',
  'editorFreeTextColor',
  'editorFreeTextFontSize',
  'editorFreeHighlightThickness',
  'editorHighlightShowAll',
  'editorInkColor',
  'editorInkOpacity',
  'editorInkParamsToolbar',
  'editorInkThickness',
  'editorUndoBar',
  'editorUndoBarCloseButton',
  'editorUndoBarMessage',
  'editorUndoBarUndoButton',
  'findMultiple',
  'mainContainer',
  'matchRegExp',
  'newAltTextCancel',
  'newAltTextCloseButton',
  'newAltTextDescriptionTextarea',
  'newAltTextDialog',
  'newAltTextDisclaimer',
  'newAltTextDownloadModel',
  'newAltTextError',
  'newAltTextImagePreview',
  'newAltTextLearnMore',
  'newAltTextNotNow',
  'newAltTextSave',
  'newAltTextTitle',
  'passwordDialog',
  'toolbarContainer',
  'viewer',
  'viewer-alert',
  // #2853 end of modification by ngx-extended-pdf-viewer
];

@Component({
    selector: 'pdf-dummy-components',
    templateUrl: './pdf-dummy-components.component.html',
    standalone: false
})
export class PdfDummyComponentsComponent {
  private dummyComponentsContainer!: Element;

  public addMissingStandardWidgets(): void {
    this.dummyComponentsContainer = document.getElementsByClassName('dummy-pdf-viewer-components')[0];
    const container = this.dummyComponentsContainer as HTMLElement;
    if (!container) {
      return;
    }

    for (let i = 0; i < container.children.length; i++) {
      const child = container.firstChild;
      if (child) {
        child.remove();
      }
    }

    requiredIds.forEach((id) => {
      if (this.needsDummyWidget(id)) {
        const dummy = document.createElement('span');
        dummy.id = id;
        dummy.className = 'invisible dummy-component';
        this.dummyComponentsContainer.appendChild(dummy);
      }
    });

    if (this.needsDummyWidget('scaleSelect')) {
      const dummy = document.createElement('select');
      dummy.id = 'scaleSelect';
      dummy.className = 'invisible dummy-component';
      this.dummyComponentsContainer.appendChild(dummy);
    }
  }

  private needsDummyWidget(id: string): boolean {
    const widget = document.getElementById(id);
    if (!widget) {
      return true;
    }
    return false;
  }

  // #2853 added by ngx-extended-pdf-viewer
  /** Fallback for when viewChild can't find the component (e.g. [customPdfViewer]) */
  public static addMissingStandardWidgetsStatic(): void {
    const container = document.getElementsByClassName('dummy-pdf-viewer-components')[0] as HTMLElement;
    if (!container) {
      return;
    }
    while (container.firstChild) {
      container.firstChild.remove();
    }
    requiredIds.forEach((id) => {
      if (!document.getElementById(id)) {
        const dummy = document.createElement('span');
        dummy.id = id;
        dummy.className = 'invisible dummy-component';
        container.appendChild(dummy);
      }
    });
    if (!document.getElementById('scaleSelect')) {
      const dummy = document.createElement('select');
      dummy.id = 'scaleSelect';
      dummy.className = 'invisible dummy-component';
      container.appendChild(dummy);
    }
  }
  // #2853 end of modification by ngx-extended-pdf-viewer
}
