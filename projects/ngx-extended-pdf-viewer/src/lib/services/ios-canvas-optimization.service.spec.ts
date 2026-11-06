import { pdfDefaultOptions } from '../options/pdf-default-options';
import { IPDFViewerApplication } from '../options/pdf-viewer-application';
import { IOSCanvasOptimizationService } from './ios-canvas-optimization.service';

/**
 * The service used to lower `maxCanvasPixels` during a two-finger touch and, 2.1 s after it,
 * `reset()` every visible page to "restore" the resolution. Existing page views cache their
 * own `maxCanvasPixels`, so the resolution never changed; the reset threw away the canvas and
 * the text, annotation and editor layers of the visible pages for nothing, and its second,
 * untracked timer could fire after a new pinch had already started.
 */
describe('IOSCanvasOptimizationService', () => {
  const originalMaxCanvasPixels = pdfDefaultOptions.maxCanvasPixels;

  function fakeApplication() {
    const page = {
      renderingState: 3, // FINISHED
      reset: jest.fn(),
      div: { getBoundingClientRect: () => ({ top: 0, left: 0, bottom: 100, right: 100 }) },
    };
    const pdfViewer = { maxCanvasPixels: 33554432, _pages: [page], renderingQueue: { renderView: jest.fn() } };
    const pdfThumbnailViewer = { maxCanvasPixels: 33554432 };
    const app = { pdfViewer, pdfThumbnailViewer } as unknown as IPDFViewerApplication;
    return { app, page, pdfViewer, pdfThumbnailViewer };
  }

  function touch(type: string, fingers: number): void {
    const event = new Event(type);
    const touches = Array.from({ length: fingers }, (_, identifier) => ({ identifier }));
    Object.defineProperty(event, 'touches', { value: touches });
    window.dispatchEvent(event);
  }

  let service: IOSCanvasOptimizationService;

  beforeEach(() => {
    jest.useFakeTimers();
    service = new IOSCanvasOptimizationService();
  });

  afterEach(() => {
    service.destroy();
    jest.clearAllTimers();
    jest.useRealTimers();
    pdfDefaultOptions.maxCanvasPixels = originalMaxCanvasPixels;
  });

  it('never resets the visible pages after a pinch, nor when a second pinch starts during the cooldown', () => {
    const { app, page, pdfViewer } = fakeApplication();
    service.initialize(app);

    touch('touchstart', 2);
    touch('touchend', 1);
    jest.advanceTimersByTime(2000); // the old cooldown
    touch('touchstart', 2); // a new gesture inside the old 100 ms window
    jest.advanceTimersByTime(100);
    touch('touchend', 0);
    jest.advanceTimersByTime(10_000);

    expect(page.reset).not.toHaveBeenCalled();
    expect(pdfViewer.renderingQueue.renderView).not.toHaveBeenCalled();
    expect(jest.getTimerCount()).toBe(0);
  });

  it('leaves the canvas budgets alone during a two-finger touch', () => {
    const { app, pdfViewer, pdfThumbnailViewer } = fakeApplication();
    const before = pdfDefaultOptions.maxCanvasPixels;
    service.initialize(app);

    touch('touchstart', 2);

    expect(pdfViewer.maxCanvasPixels).toBe(33554432);
    expect(pdfThumbnailViewer.maxCanvasPixels).toBe(33554432);
    expect(pdfDefaultOptions.maxCanvasPixels).toBe(before);
    expect(service.isPinchingActive()).toBe(false);
  });

  it('keeps no timer and no listener alive after destroy()', () => {
    const { app, page } = fakeApplication();
    service.initialize(app);
    service.destroy();

    touch('touchstart', 2);
    touch('touchend', 0);
    jest.advanceTimersByTime(10_000);

    expect(page.reset).not.toHaveBeenCalled();
    expect(jest.getTimerCount()).toBe(0);
  });

  it('setCanvasSize() configures the budget of documents opened afterwards, without re-rendering', () => {
    const { app, page } = fakeApplication();
    service.initialize(app);

    service.setCanvasSize(16_777_216);
    jest.advanceTimersByTime(10_000);

    expect(pdfDefaultOptions.maxCanvasPixels).toBe(16_777_216);
    expect(service.getCurrentCanvasSize()).toBe(16_777_216);
    expect(page.reset).not.toHaveBeenCalled();
  });
});
