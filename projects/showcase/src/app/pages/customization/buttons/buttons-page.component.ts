import { Component } from '@angular/core';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { SplitViewComponent } from '../../../shared/components/split-view.component';
import { SetMinifiedLibraryUsageDirective } from '../../../shared/directives/set-minified-library-usage.directive';
import { ContentPageComponent } from '../../../shared/components/content-page/content-page.component';
import { MarkdownContentComponent } from '../../../shared/components/markdown-content.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SetDefaultViewerHeightDirective } from '../../../shared/directives/set-default-viewer-height.directive';
import { SetDefaultZoomLevelDirective } from '../../../shared/directives/set-default-zoom-level.directive';

@Component({
  selector: 'pvs-buttons-page',
  standalone: true,
  imports: [
    ContentPageComponent,
    MarkdownContentComponent,
    NgxExtendedPdfViewerModule,
    SplitViewComponent,
    SetMinifiedLibraryUsageDirective,
    ReactiveFormsModule,
    FormsModule,
    SetDefaultViewerHeightDirective,
    SetDefaultZoomLevelDirective,
  ],
  template: ` <pvs-content-page [demoTemplate]="demo">
    <pvs-markdown src="/assets/pages/customization/buttons/text.md" />
    <ng-template #demo>
      <pvs-split-view [stickyEnd]="true">
        <div class="input-group">
          <label for="toolbar">showToolbar (hiding the toolbar hides every button)</label>
          <input id="toolbar" type="checkbox" [(ngModel)]="showToolbar" />

          <label for="secondaryToolbar">showSecondaryToolbarButton (only shown if there are menu items)</label>
          <input id="secondaryToolbar" type="checkbox" [(ngModel)]="showSecondaryToolbarButton" [disabled]="!showToolbar" />

          <label for="sidebarButton">showSidebarButton</label>
          <input id="sidebarButton" type="checkbox" [(ngModel)]="showSidebarButton" [disabled]="!showToolbar" />

          <label for="findButton">showFindButton (requires text layer)</label>
          <input id="findButton" type="checkbox" [(ngModel)]="showFindButton" [disabled]="!showToolbar" />

          <label for="findbarVisible">findbarVisible</label>
          <input id="findbarVisible" type="checkbox" [(ngModel)]="findbarVisible" [disabled]="!showToolbar && showFindButton" />

          <label for="pagingButtons">showPagingButtons</label>
          <input id="pagingButtons" type="checkbox" [(ngModel)]="showPagingButtons" [disabled]="!showToolbar" />

          <label for="zoomButtons">showZoomButtons</label>
          <input id="zoomButtons" type="checkbox" [(ngModel)]="showZoomButtons" [disabled]="!showToolbar" />

          <label for="drawEditor">showDrawEditor</label>
          <input id="drawEditor" type="checkbox" [(ngModel)]="showDrawEditor" [disabled]="!showToolbar" />

          <label for="highlightEditor">showHighlightEditor</label>
          <input id="highlightEditor" type="checkbox" [(ngModel)]="showHighlightEditor" [disabled]="!showToolbar" />

          <label for="stampEditor">showStampEditor</label>
          <input id="stampEditor" type="checkbox" [(ngModel)]="showStampEditor" [disabled]="!showToolbar" />

          <label for="textEditor">showTextEditor</label>
          <input id="textEditor" type="checkbox" [(ngModel)]="showTextEditor" [disabled]="!showToolbar" />

          <label for="presentationMode">showPresentationModeButton</label>
          <input id="presentationMode" type="checkbox" [(ngModel)]="showPresentationModeButton" [disabled]="!showToolbar" />

          <label for="openFile">showOpenFileButton</label>
          <input id="openFile" type="checkbox" [(ngModel)]="showOpenFileButton" [disabled]="!showToolbar" />

          <label for="printButton">showPrintButton</label>
          <input id="printButton" type="checkbox" [(ngModel)]="showPrintButton" [disabled]="!showToolbar" />

          <label for="downloadButton">showDownloadButton</label>
          <input id="downloadButton" type="checkbox" [(ngModel)]="showDownloadButton" [disabled]="!showToolbar" />

          @if (showDownloadButton) {
            <label for="downloadFileName">filename for download</label>
            <input id="downloadFileName" type="text" [(ngModel)]="downloadFileName" />
          }

          <label for="rotateButton">showRotateButton</label>
          <input id="rotateButton" type="checkbox" [(ngModel)]="showRotateButton" [disabled]="!showToolbar" />

          <label for="rotateCw">showRotateCwButton</label>
          <input id="rotateCw" type="checkbox" [(ngModel)]="showRotateCwButton" [disabled]="!showToolbar" />

          <label for="rotateCcw">showRotateCcwButton</label>
          <input id="rotateCcw" type="checkbox" [(ngModel)]="showRotateCcwButton" [disabled]="!showToolbar" />

          <label for="handTool">showHandToolButton</label>
          <input id="handTool" type="checkbox" [(ngModel)]="showHandToolButton" [disabled]="!showToolbar" />

          <label for="scrolling">showScrollingButtons</label>
          <input id="scrolling" type="checkbox" [(ngModel)]="showScrollingButtons" [disabled]="!showToolbar" />

          <label for="spread">showSpreadButton</label>
          <input id="spread" type="checkbox" [(ngModel)]="showSpreadButton" [disabled]="!showToolbar" />

          <label for="properties">showPropertiesButton</label>
          <input id="properties" type="checkbox" [(ngModel)]="showPropertiesButton" [disabled]="!showToolbar" />

          <label for="propertiesDialog">propertiesDialogVisible</label>
          <input id="propertiesDialog" type="checkbox" [(ngModel)]="propertiesDialogVisible" [disabled]="!showToolbar" />
        </div>

        <ngx-extended-pdf-viewer
          slot="end"
          src="/assets/pdfs/user-experience.pdf"
          [showToolbar]="showToolbar"
          [showSidebarButton]="showSidebarButton"
          [showFindButton]="showFindButton"
          [showDrawEditor]="showDrawEditor"
          [showStampEditor]="showStampEditor"
          [showHighlightEditor]="showHighlightEditor"
          [showTextEditor]="showTextEditor"
          [textLayer]="true"
          [showPagingButtons]="showPagingButtons"
          [showZoomButtons]="showZoomButtons"
          [showPresentationModeButton]="showPresentationModeButton"
          [showOpenFileButton]="showOpenFileButton"
          [showPrintButton]="showPrintButton"
          [showDownloadButton]="showDownloadButton"
          [showSecondaryToolbarButton]="showSecondaryToolbarButton"
          [showRotateCwButton]="showRotateCwButton"
          [showRotateCcwButton]="showRotateCcwButton"
          [showHandToolButton]="showHandToolButton"
          [showScrollingButtons]="showScrollingButtons"
          [showSpreadButton]="showSpreadButton"
          [showPropertiesButton]="showPropertiesButton"
          [(findbarVisible)]="findbarVisible"
          [(propertiesDialogVisible)]="propertiesDialogVisible"
          pvsSetMinifiedLibraryUsage
          pvsSetDefaultViewerHeight
          pvsSetDefaultZoomLevel
        />
      </pvs-split-view>
    </ng-template>
  </pvs-content-page>`,
})
export class ButtonsPageComponent {
  showToolbar = true;
  showSecondaryToolbarButton = true;
  showSidebarButton = false;
  showFindButton = true;
  findbarVisible = false;
  showPagingButtons = false;
  showZoomButtons = false;
  showDrawEditor = false;
  showHighlightEditor = false;
  showStampEditor = false;
  showTextEditor = false;
  showPresentationModeButton = false;
  showOpenFileButton = false;
  showPrintButton = false;
  showDownloadButton = true;
  downloadFileName = 'user-defined-name.pdf';
  showRotateButton = false;
  showRotateCwButton = false;
  showRotateCcwButton = false;
  showHandToolButton = false;
  showScrollingButtons = false;
  showSpreadButton = false;
  showPropertiesButton = false;
  propertiesDialogVisible = false;
}
