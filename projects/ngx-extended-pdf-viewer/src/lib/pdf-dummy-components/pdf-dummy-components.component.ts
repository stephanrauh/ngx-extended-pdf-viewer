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
  'editorFreeText',
  'editorInk',
  'editorStamp',
  'editorModeButtons',
  'editorNone',
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
  'print',
  'producerField',
  'scaleSelect',
  'scaleSelectContainer',
  'scaleSelectContainer',
  'scrollHorizontal',
  'scrollPage',
  'scrollVertical',
  'scrollWrapped',
  'secondaryDownload',
  'secondaryOpenFile',
  'secondaryPresentationMode',
  'secondaryPrint',
  'secondaryToolbar',
  'secondaryToolbarButtonContainer',
  'secondaryToolbarToggle',
  'secondaryViewBookmark',
  'sidebarResizer',
  'sidebarToggle',
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
  'viewFind',
  'viewLayers',
  'viewOutline',
  'viewOutline',
  'viewThumbnail',
  'viewThumbnail',
  'zoomIn',
  'zoomOut',
];

@Component({
  selector: 'pdf-dummy-components',
  templateUrl: './pdf-dummy-components.component.html',
})
export class PdfDummyComponentsComponent {
  private dummyComponentsContainer: Element;

  public addMissingStandardWidgets(): void {
    this.dummyComponentsContainer = document.getElementsByClassName('dummy-pdf-viewer-components')[0];
    const container = this.dummyComponentsContainer as HTMLElement;
    if (!container) {
      return;
    }

    for (let i = 0; i < container.children.length; i++) {
      const child = container.firstChild;
      if (child) {
        container.removeChild(child);
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
}
