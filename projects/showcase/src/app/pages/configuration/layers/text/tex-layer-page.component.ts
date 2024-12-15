import { Component } from '@angular/core';
import { NgxExtendedPdfViewerModule, TextLayerRenderedEvent } from 'ngx-extended-pdf-viewer';
import { FormsModule } from '@angular/forms';
import { BehaviorSubject, combineLatest, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ContentPageComponent } from '../../../../shared/components/content-page/content-page.component';
import { MarkdownContentComponent } from '../../../../shared/components/markdown-content.component';
import { SplitViewComponent } from '../../../../shared/components/split-view.component';
import { SetMinifiedLibraryUsageDirective } from '../../../../shared/directives/set-minified-library-usage.directive';
import { SetDefaultViewerHeightDirective } from '../../../../shared/directives/set-default-viewer-height.directive';
import { SetDefaultZoomLevelDirective } from '../../../../shared/directives/set-default-zoom-level.directive';

@Component({
  selector: 'pvs-layers-page',
  standalone: true,
  imports: [
    NgxExtendedPdfViewerModule,
    FormsModule,
    ContentPageComponent,
    MarkdownContentComponent,
    SplitViewComponent,
    SetMinifiedLibraryUsageDirective,
    SetDefaultViewerHeightDirective,
    SetDefaultZoomLevelDirective,
  ],
  template: ` <pvs-content-page [demoTemplate]="demo">
    <pvs-markdown src="/assets/pages/configuration/layers/text/text.md" />
    <ng-template #demo>
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
          [textLayer]="true"
          pvsSetMinifiedLibraryUsage
          pvsSetDefaultViewerHeight
          pvsSetDefaultZoomLevel
          (textLayerRendered)="setRenderedLayers($event)"
        />
      </pvs-split-view>
    </ng-template>
  </pvs-content-page>`,
})
export class TexLayerPageComponent {
  private renderedTextLayers$ = new BehaviorSubject<HTMLSpanElement[]>([]);

  markLongWords$ = new BehaviorSubject<boolean>(false);
  showBoxes$ = new BehaviorSubject<boolean>(false);
  showTextLayer$ = new BehaviorSubject<boolean>(false);

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

  setRenderedLayers(event: TextLayerRenderedEvent) {
    const layers = event.source.textLayer?.highlighter.textDivs ?? [];
    const previousLayers = [...this.renderedTextLayers$.getValue()];
    this.renderedTextLayers$.next([...previousLayers, ...layers]);
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
