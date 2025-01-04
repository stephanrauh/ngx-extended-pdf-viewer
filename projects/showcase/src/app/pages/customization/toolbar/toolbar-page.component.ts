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
  selector: 'pvs-toolbar-page',
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
    <pvs-markdown src="/assets/pages/customization/toolbar/text.md" />
    <ng-template #demo>
      <pvs-split-view>
        <div class="input-group">
          <input id="standard-layout" type="radio" name="layout" [(ngModel)]="layout" value="default" />
          <label for="standard-layout">Standard layout </label>

          <input id="custom-findbar" type="radio" name="layout" [(ngModel)]="layout" value="findbar" />
          <label for="custom-findbar">Custom findbar (large input field in a dedicated line) </label>

          <input id="radiobutton-zoom" type="radio" name="layout" [(ngModel)]="layout" value="checkbox" />
          <label for="radiobutton-zoom">Radiobutton zoom </label>

          <input id="custom-color" type="radio" name="layout" [(ngModel)]="layout" value="additional" />
          <label for="custom-color">Custom color and additional button ("open PDF in new tab") </label>

          <input id="floating-zoom" type="radio" name="layout" [(ngModel)]="layout" value="floating" />
          <label for="floating-zoom">Floating zoombar </label>

          <input id="floating-bar" type="checkbox" [(ngModel)]="showFreeFloatingBar" />
          <label for="floating-bar">show floating zoombar</label>
        </div>

        <ngx-extended-pdf-viewer
          slot="end"
          src="/assets/pdfs/dachstein.pdf"
          [textLayer]="true"
          [showPresentationModeButton]="true"
          [customFindbarInputArea]="layout === 'findbar' ? customFindbarInputArea : undefined"
          [customFindbarButtons]="layout === 'findbar' ? customFindbarButtons : undefined"
          [customToolbar]="layout === 'checkbox' ? customCheckboxZoomToolbar : layout === 'additional' ? additionalButtons : undefined"
          [customFreeFloatingBar]="layout === 'floating' ? floatingZoombar : undefined"
          [showFreeFloatingBar]="showFreeFloatingBar"
          pvsSetMinifiedLibraryUsage
          pvsSetDefaultViewerHeight
          pvsSetDefaultZoomLevel
        />
        <ng-template #customFindbarInputArea>
          <div id="findbarInputContainer">
            <pdf-search-input-field></pdf-search-input-field>
          </div>
        </ng-template>

        <ng-template #customFindbarButtons>
          <div class="no-float">
            <pdf-find-input-area [customFindbarInputArea]="customFindbarInputArea"></pdf-find-input-area>
          </div>
          <div class="no-float">
            <pdf-find-highlight-all></pdf-find-highlight-all>
            <pdf-find-match-case></pdf-find-match-case>
            <pdf-find-entire-word></pdf-find-entire-word>
            <pdf-find-results-count></pdf-find-results-count>
            <pdf-findbar-message-container></pdf-findbar-message-container>
            <pdf-find-previous></pdf-find-previous>
            <pdf-find-next></pdf-find-next>
          </div>
        </ng-template>

        <ng-template #customCheckboxZoomToolbar>
          <div id="toolbarViewer">
            <div id="toolbarViewerMiddle">
              <pdf-zoom-dropdown class="invisible"></pdf-zoom-dropdown>

              <input type="radio" id="zoom50" class="toolbarField radio" tabindex="94" (click)="zoom = '50%'" name="zoom" [checked]="zoom === '50%'" />
              <label for="zoom50" class="toolbarLabel">50%</label>

              <input type="radio" id="zoom100" class="toolbarField radio" tabindex="95" (click)="zoom = '100%'" name="zoom" [checked]="zoom === '100%'" />
              <label for="zoom100" class="toolbarLabel">100%</label>

              <input type="radio" id="zoom200" class="toolbarField radio" tabindex="96" (click)="zoom = '200%'" name="zoom" [checked]="zoom === '200%'" />
              <label for="zoom200" class="toolbarLabel">200%</label>

              <input type="radio" id="zoom-auto" class="toolbarField radio" tabindex="97" (click)="zoom = 'auto'" name="zoom" [checked]="zoom === 'auto'" />
              <label for="zoom-auto" class="toolbarLabel">auto</label>
            </div>
          </div>
        </ng-template>

        <ng-template #additionalButtons>
          <div id="toolbarViewer" style="background-color:rgb(232 246 255)">
            <div id="toolbarViewerLeft">
              <pdf-toggle-sidebar></pdf-toggle-sidebar>
              <div class="toolbarButtonSpacer"></div>
              <pdf-find-button [showFindButton]="true" [textLayer]="true"></pdf-find-button>
              <pdf-paging-area></pdf-paging-area>
            </div>
            <pdf-zoom-toolbar></pdf-zoom-toolbar>
            <div id="toolbarViewerRight">
              <pdf-open-file></pdf-open-file>
              <pdf-presentation-mode></pdf-presentation-mode>
              <pdf-print></pdf-print>
              <div>
                <pdf-shy-button
                  [cssClass]="'lg' | responsiveCSSClass"
                  class="newTab"
                  title="open PDF file in a new tab"
                  primaryToolbarId="openInNewTab"
                  [toggled]="hasBeenClicked"
                  [action]="onClick"
                  [order]="1"
                  [closeOnClick]="true"
                  image="<svg xmlns='http://www.w3.org/2000/svg' height='24' viewBox='0 0 24 24' width='24'>
    <path fill='red' d='M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z'/>
  </svg>"
                >
                </pdf-shy-button>
              </div>
              <pdf-download></pdf-download>
              <pdf-toggle-secondary-toolbar></pdf-toggle-secondary-toolbar>
            </div>
          </div>
        </ng-template>

        <ng-template #floatingZoombar>
          <div style="position: absolute;bottom:20px;left:41%;z-index:1;background-color:#dbe5e9;padding:4px;padding-bottom: 8px;border:1px solid darkgray">
            <div>
              <pdf-zoom-dropdown class="invisible"></pdf-zoom-dropdown>

              <input type="radio" id="zoom50" class="toolbarField radio" tabindex="94" (click)="zoom = '50%'" name="zoom" [checked]="zoom === '50%'" />
              <label for="zoom50" class="toolbarLabel">50%</label>

              <input type="radio" id="zoom100" class="toolbarField radio" tabindex="95" (click)="zoom = '100%'" name="zoom" [checked]="zoom === '100%'" />
              <label for="zoom100" class="toolbarLabel">100%</label>

              <input type="radio" id="zoom200" class="toolbarField radio" tabindex="96" (click)="zoom = '200%'" name="zoom" [checked]="zoom === '200%'" />
              <label for="zoom200" class="toolbarLabel">200%</label>

              <input type="radio" id="zoom-auto" class="toolbarField radio" tabindex="97" (click)="zoom = 'auto'" name="zoom" [checked]="zoom === 'auto'" />
              <label for="zoom-auto" class="toolbarLabel">auto</label>
            </div>
          </div>
        </ng-template>
      </pvs-split-view>
    </ng-template>
  </pvs-content-page>`,
})
export class ToolbarPageComponent {
  layout = 'additional';
  showFreeFloatingBar = true;
  zoom = '100%';

  hasBeenClicked = false;

  onClick() {
    this.hasBeenClicked = true;
    window.open('assets/pdfs/dachstein.pdf', '#');
  }
}
