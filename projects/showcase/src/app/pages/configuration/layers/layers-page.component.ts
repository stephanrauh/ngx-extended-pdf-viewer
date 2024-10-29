import { Component, inject, signal } from '@angular/core';
import { NgxExtendedPdfViewerModule, NgxExtendedPdfViewerService, PdfLayer, TextLayerRenderedEvent } from 'ngx-extended-pdf-viewer';
import { SplitViewComponent } from '../../../shared/components/split-view.component';
import { SetMinifiedLibraryUsageDirective } from '../../../shared/directives/set-minified-library-usage.directive';
import { ContentPageComponent } from '../../../shared/components/content-page/content-page.component';
import { MarkdownContentComponent } from '../../../shared/components/markdown-content.component';
import { FormsModule } from '@angular/forms';
import { BehaviorSubject, combineLatest, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NgClass } from '@angular/common';

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
  ],
  template: `<pvs-content-page
    [otherTabs]="[
      { title: 'Demo - Text Layer', template: demoTextLayer },
      { title: 'Demo - PDF Layers', template: pdfLayers },
    ]"
  >
    <pvs-markdown src="/assets/pages/configuration/layers/text.md" />
    <ng-template #demoTextLayer>
      <pvs-split-view [stickyEnd]="true">
        <div class="fieldset-group">
          <fieldset class="fieldset">
            <p>
              The demos show that the text layer isn't perfect. The positions are good enough for finding and marking text, but they don't match the precise
              positions. Plus, sometime words are spread among several <code>span</code> tags.
            </p>
            <div class="checkbox-group">
              <div>
                <input id="mark-long-words" type="checkbox" [(ngModel)]="markLongWords" />
              </div>
              <label for="mark-long-words">Mark long words</label>
            </div>
            <div class="checkbox-group">
              <div>
                <input id="layer-in-span" type="checkbox" [(ngModel)]="showBoxes" />
              </div>
              <label for="layer-in-span">Put each Text Layer <code>span</code> into a box</label>
            </div>
            <div class="checkbox-group">
              <div>
                <input id="show-text-layer" type="checkbox" [(ngModel)]="showTextLayer" />
              </div>
              <label for="show-text-layer">Show Text Layer</label>
            </div>
          </fieldset>
        </div>
        <ngx-extended-pdf-viewer
          slot="end"
          src="/assets/pdfs/Portugues-para-principiantes-1538054164.pdf"
          zoom="auto"
          [textLayer]="true"
          pvsSetMinifiedLibraryUsage
          (textLayerRendered)="setRenderedLayers($event)"
        />
      </pvs-split-view>
    </ng-template>

    <ng-template #pdfLayers>
      <pvs-split-view [stickyEnd]="true">
        @for (layer of layers(); track layer.layerId) {
          <span>
            <button
              class="bg-primary-light"
              [ngClass]="{
                'bg-primary-light-variant': !layer.visible,
              }"
              (click)="toggleLayer(layer.layerId)"
            >
              Toggle {{ layer.name }}
            </button>
          </span>
        }
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
export class LayersPageComponent {
  private pdfService = inject(NgxExtendedPdfViewerService);

  private renderedTextLayers$ = new BehaviorSubject<HTMLSpanElement[]>([]);

  markLongWords$ = new BehaviorSubject<boolean>(false);
  showBoxes$ = new BehaviorSubject<boolean>(false);
  showTextLayer$ = new BehaviorSubject<boolean>(false);

  layers = signal<PdfLayer[]>([]);

  constructor() {
    combineLatest({
      layers: this.renderedTextLayers$,
      markLongWords: this.markLongWords$,
      showBoxes: this.showBoxes$,
      showTextLayer: this.showTextLayer$,
    })
      .pipe(
        takeUntilDestroyed(),
        tap(({ layers, showTextLayer }) => {
          layers.forEach((layer) => {
            if (!showTextLayer) {
              layer.classList.remove('show-text-layer');
              return;
            }
            layer.classList.add('show-text-layer');
          });
        }),
        tap(({ layers, markLongWords }) => {
          layers.forEach((layer) => {
            this.doMarkLongWordsInLayer(layer, markLongWords);
          });
        }),
        tap(({ layers, showBoxes }) => {
          layers.forEach((layer) => {
            if (showBoxes) {
              layer.classList.add('box');
              return;
            }
            layer.classList.remove('box');
          });
        }),
      )
      .subscribe();
  }

  get markLongWords() {
    return this.markLongWords$.getValue();
  }
  set markLongWords(value: boolean) {
    this.markLongWords$.next(value);
  }

  get showBoxes() {
    return this.showBoxes$.getValue();
  }
  set showBoxes(value: boolean) {
    this.showBoxes$.next(value);
  }

  get showTextLayer() {
    return this.showTextLayer$.getValue();
  }
  set showTextLayer(value: boolean) {
    this.showTextLayer$.next(value);
  }

  async listLayers(): Promise<void> {
    const layers = await this.pdfService.listLayers();
    if (layers) {
      this.layers.set(layers);
      return;
    }
    console.log("This document either hasn't layers, or you've called listLayers() before the PDF layers have been rendered");
  }

  setRenderedLayers(event: TextLayerRenderedEvent) {
    const layers = event.source.textLayer?.highlighter.textDivs ?? [];
    const previousLayers = [...this.renderedTextLayers$.getValue()];
    this.renderedTextLayers$.next([...previousLayers, ...layers]);
  }

  async toggleLayer(layerId: string): Promise<void> {
    await this.pdfService.toggleLayer(layerId);
    await this.listLayers();
  }

  private doMarkLongWordsInLayer(layer: HTMLSpanElement, markLongWords: boolean): void {
    if (!markLongWords) {
      layer.innerHTML = layer.innerText.replace('\n', '');
      return;
    }
    layer.innerHTML = layer.innerText
      .split(' ')
      .map((t) => this.markOneLongWord(t))
      .join(' ');
  }

  private markOneLongWord(word: string) {
    if (word.length > 6) {
      return `<div class="long-word">${word}</div>`;
    }
    return word;
  }
}
