import { Component } from '@angular/core';

/** List of all field that can be customized */
const requiredIds = [
  'toolbarViewer',
  'numPages',
  'pageNumber',
  'scaleSelectContainer',
  'customScaleOption',
  'previous',
  'next',
  'zoomIn',
  'zoomOut',
  'viewFind',
  'openFile',
  'print',
  'presentationMode',
  'download',
  'viewBookmark',
  'secondaryToolbar',
  'secondaryToolbarToggle',
  'secondaryToolbarButtonContainer',
  'secondaryPresentationMode',
  'secondaryOpenFile',
  'secondaryPrint',
  'secondaryDownload',
  'secondaryViewBookmark',
  'firstPage',
  'lastPage',
  'pageRotateCw',
  'pageRotateCcw',
  'cursorSelectTool',
  'cursorHandTool',
  'scrollVertical',
  'scrollHorizontal',
  'scrollWrapped',
  'spreadNone',
  'spreadOdd',
  'spreadEven',
  'documentProperties',
  'contextFirstPage',
  'contextLastPage',
  'contextPageRotateCw',
  'contextPageRotateCcw',
  'outerContainer',
  'viewerContainer',
  'sidebarToggle',
  'viewThumbnail',
  'viewOutline',
  'viewAttachments',
  'thumbnailView',
  'outlineView',
  'attachmentsView',
  'outerContainer',
  'sidebarResizer',
  'findbar',
  'viewFind',
  'findInput',
  'findInputMultiline',
  'findHighlightAll',
  'findMatchCase',
  'findEntireWord',
  'findMultipleSearchTexts',
  'findIgnoreAccents',
  'findMsg',
  'findResultsCount',
  'findPrevious',
  'findNext',
  'passwordOverlay',
  'passwordText',
  'password',
  'passwordSubmit',
  'passwordCancel',
  'documentPropertiesOverlay',
  'documentPropertiesClose',
  'fileNameField',
  'fileSizeField',
  'titleField',
  'authorField',
  'subjectField',
  'keywordsField',
  'creationDateField',
  'modificationDateField',
  'creatorField',
  'producerField',
  'versionField',
  'pageCountField',
  'pageSizeField',
  'linearizedField',
  'errorWrapper',
  'errorMessage',
  'errorClose',
  'errorMoreInfo',
  'errorShowMore',
  'errorShowLess',
  'scaleSelectContainer'
];

@Component({
  selector: 'pdf-dummy-components',
  templateUrl: './pdf-dummy-components.component.html'
})
export class PdfDummyComponentsComponent {
  private dummyComponentsContainer: Element;

  public addMissingStandardWidgets(): void {
    this.dummyComponentsContainer = document.getElementsByClassName('dummy-pdf-viewer-components')[0];
    const container = this.dummyComponentsContainer as HTMLElement;
    if (container) {
      for (let i = 0; i < container.children.length; i++) {
        const child = container.firstChild;
        if (child) {
          container.removeChild(child);
        }
      }
    }

    requiredIds.forEach(id => {
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
