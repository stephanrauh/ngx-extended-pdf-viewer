import { Component, inject, signal } from '@angular/core';
import { NgxExtendedPdfViewerModule, NgxExtendedPdfViewerService, PdfLayer } from 'ngx-extended-pdf-viewer';
import { SplitViewComponent } from '../../../../shared/components/split-view.component';
import { SetMinifiedLibraryUsageDirective } from '../../../../shared/directives/set-minified-library-usage.directive';
import { ContentPageComponent } from '../../../../shared/components/content-page/content-page.component';
import { MarkdownContentComponent } from '../../../../shared/components/markdown-content.component';
import { FormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';
import { ButtonDirective } from '../../../../core/directives/button.directive';

@Component({
  selector: 'pvs-layers-page',
  standalone: true,
  imports: [
    ContentPageComponent,
    MarkdownContentComponent,
    NgxExtendedPdfViewerModule,
    SplitViewComponent,
    SetMinifiedLibraryUsageDirective,
    FormsModule,
    NgClass,
    ButtonDirective,
  ],
  template: ` <pvs-content-page [demoTemplate]="demo">
    <pvs-markdown src="/assets/pages/configuration/layers/pdf/text.md" />
    <ng-template #demo>
      <pvs-split-view [stickyEnd]="true">
        <div class="grid gap-4">
          @for (layer of layers(); track layer.layerId) {
            <button
              pvsButton
              [ngClass]="{
                'bg-primary-variant-light': !layer.visible,
                'text-on-primary-variant-light': !layer.visible,
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
          zoom="auto"
          [textLayer]="true"
          pvsSetMinifiedLibraryUsage
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
