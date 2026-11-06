import { Injectable } from '@angular/core';
import { IPDFViewerApplication } from '../options/pdf-viewer-application';
import { pdfDefaultOptions } from '../options/pdf-default-options';

/**
 * Formerly lowered `maxCanvasPixels` during two-finger gestures (#2939).
 *
 * It no longer does anything during gestures. The pages which were already on screen kept
 * their own canvas budget, so their resolution never changed, while the "restore" after
 * each gesture reset every visible page - its canvas, text, annotation and editor layers -
 * and could do so in the middle of the next pinch. pdf.js does not re-render the pages
 * during a zoom gesture anyway: it scales the existing canvases until the gesture pauses,
 * and caps the canvas area itself (`capCanvasAreaFactor`, the detail canvas).
 *
 * @deprecated Kept for API compatibility; it will be removed in a future major version.
 * Use `pdfDefaultOptions.maxCanvasPixels` to configure the canvas budget.
 */
@Injectable({
  providedIn: 'root',
})
export class IOSCanvasOptimizationService {
  /** @deprecated Does nothing. */
  initialize(_pdfViewerApplication: IPDFViewerApplication): void {}

  /** The canvas budget of the documents opened from now on. */
  getCurrentCanvasSize(): number {
    return pdfDefaultOptions.maxCanvasPixels;
  }

  /** @deprecated Always `false`: the service doesn't track gestures anymore. */
  isPinchingActive(): boolean {
    return false;
  }

  /**
   * Sets `pdfDefaultOptions.maxCanvasPixels`. Like that option, it applies to the
   * documents opened afterwards: the pages of an open document keep their budget.
   */
  setCanvasSize(maxCanvasPixels: number): void {
    pdfDefaultOptions.maxCanvasPixels = maxCanvasPixels;
  }

  /** @deprecated Does nothing. */
  destroy(): void {}
}
