import { Component, inject, signal } from '@angular/core';
import { NgxExtendedPdfViewerModule, NgxExtendedPdfViewerService, PdfLayer } from 'ngx-extended-pdf-viewer';
import { FormsModule } from '@angular/forms';
import { SetMinifiedLibraryUsageDirective } from '../../../../shared/directives/set-minified-library-usage.directive';
import { SetDefaultViewerHeightDirective } from '../../../../shared/directives/set-default-viewer-height.directive';
import { SetDefaultZoomLevelDirective } from '../../../../shared/directives/set-default-zoom-level.directive';
import { ContentPageComponent } from '../../../../shared/components/content-page/content-page.component';
import { MarkdownContentComponent } from '../../../../shared/components/markdown-content.component';
import { SplitViewComponent } from '../../../../shared/components/split-view.component';
import { NgClass } from '@angular/common';
import { ButtonDirective } from '../../../../core/directives/button.directive';

@Component({
  selector: 'pvs-layers-page',
  standalone: true,
  imports: [
    NgxExtendedPdfViewerModule,
    FormsModule,
    SetMinifiedLibraryUsageDirective,
    SetDefaultViewerHeightDirective,
    SetDefaultZoomLevelDirective,
    ContentPageComponent,
    MarkdownContentComponent,
    SplitViewComponent,
    NgClass,
    ButtonDirective,
  ],
  template: ` <pvs-content-page [demoTemplate]="demo">
    <pvs-markdown src="/assets/pages/configuration/layers/pdf/text.md" />
    <ng-template #demo>
      <pvs-split-view>
        <div class="grid gap-4">
          @for (layer of layers(); track layer.layerId) {
            <button
              pvsButton
              [ngClass]="{
                'bg-primary-variant-light dark:bg-primary-variant-dark': !layer.visible,
                'text-on-primary-variant-light dark:text-on-primary-variant-dark': !layer.visible,
              }"
              (click)="toggleLayer(layer.layerId)"
            >
              {{ layer.visible ? 'Hide' : 'Show' }} {{ layer.name }}
            </button>
          }
        </div>
        <ngx-extended-pdf-viewer
          slot="end"
          src="/assets/pdfs/themes_de_la_Science-fiction.pdf"
          [textLayer]="true"
          pvsSetMinifiedLibraryUsage
          pvsSetDefaultViewerHeight
          pvsSetDefaultZoomLevel
          (pagesLoaded)="listLayers()"
        />
      </pvs-split-view>
    </ng-template>
  </pvs-content-page>`,
})
export class PdfLayerPageComponent {
  private pdfService = inject(NgxExtendedPdfViewerService);

  layers = signal<PdfLayer[]>([]);

  async listLayers(): Promise<void> {
    const layers = await this.pdfService.listLayers();
    if (layers) {
      this.layers.set(layers);
      return;
    }
    console.log("This document either hasn't layers, or you've called listLayers() before the PDF layers have been rendered");
  }

  async toggleLayer(layerId: string): Promise<void> {
    await this.pdfService.toggleLayer(layerId);
    await this.listLayers();
  }
}
