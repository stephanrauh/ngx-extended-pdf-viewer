import { Component } from '@angular/core';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { ContentPageComponent } from '../../../shared/components/content-page/content-page.component';
import { MarkdownContentComponent } from '../../../shared/components/markdown-content.component';
import { SplitViewComponent } from '../../../shared/components/split-view.component';
import { SetMinifiedLibraryUsageDirective } from '../../../shared/directives/set-minified-library-usage.directive';
import { SetDefaultViewerHeightDirective } from '../../../shared/directives/set-default-viewer-height.directive';
import { SetDefaultZoomLevelDirective } from '../../../shared/directives/set-default-zoom-level.directive';

@Component({
  selector: 'pvs-mobile-devices-page',
  standalone: true,
  imports: [
    NgxExtendedPdfViewerModule,
    ContentPageComponent,
    MarkdownContentComponent,
    SplitViewComponent,
    SetMinifiedLibraryUsageDirective,
    SetDefaultViewerHeightDirective,
    SetDefaultZoomLevelDirective,
  ],
  template: `<pvs-content-page [demoTemplate]="demo">
    <pvs-markdown src="/assets/pages/viewing/mobile-devices/text.md" />
    <ng-template #demo>
      <pvs-split-view>
        <p>Smartphone mockup taken from <a href="https://github.com/marvelapp/devices.css">https://github.com/marvelapp/devices.css</a></p>

        <div class="marvel-device iphone8" slot="end">
          <div class="top-bar"></div>
          <div class="sleep"></div>
          <div class="volume"></div>
          <div class="camera"></div>
          <div class="sensor"></div>
          <div class="speaker"></div>
          <div class="screen">
            <ngx-extended-pdf-viewer
              src="/assets/pdfs/A COOL KID LIKE ME.pdf"
              height="667px"
              [mobileFriendlyZoom]="'150%'"
              [showSecondaryToolbarButton]="false"
              pvsSetMinifiedLibraryUsage
              pvsSetDefaultViewerHeight
              pvsSetDefaultZoomLevel
            >
            </ngx-extended-pdf-viewer>
          </div>
          <div class="home"></div>
          <div class="bottom-bar"></div>
        </div>
      </pvs-split-view>
    </ng-template>
  </pvs-content-page>`,
  styleUrls: ['./devices.min.css'],
  styles: `
    ::ng-deep button#print,
    ::ng-deep button#print * {
      display: block !important;
    }

    ::ng-deep button#download,
    ::ng-deep button#download * {
      display: block !important;
    }

    ::ng-deep #toolbarViewerMiddle {
      display: none;
    }

    .mat-mdc-radio-button {
      padding-top: 5px;
      display: block;
    }

    .distance-top {
      padding-top: 8px;
    }
  `,
})
export class MobileDevicesPageComponent {}
