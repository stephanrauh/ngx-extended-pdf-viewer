import { Component, Directive, OnDestroy, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { PdfSidebarContentComponent } from './pdf-sidebar-content.component';
import { PDFNotificationService } from '../../../pdf-notification-service';
import { IPDFViewerApplication } from '../../../options/pdf-viewer-application';
import { createSignalAwareEventBus } from '../../../testing/signal-aware-event-bus';

@Directive({ selector: '[trackThumbnail]', standalone: false })
class TrackThumbnailDirective implements OnDestroy {
  static destroyed = jest.fn();
  ngOnDestroy(): void {
    TrackThumbnailDirective.destroyed();
  }
}

@Component({
  standalone: false,
  template: `<ng-template #thumbnail><div trackThumbnail><img /></div></ng-template>
    <pdf-sidebar-content [customThumbnail]="thumbnail" />`,
})
class ThumbnailHostComponent {}

describe('Thumbnail embedded view lifecycle', () => {
  function setup() {
    const eventBus = createSignalAwareEventBus();
    const appSignal = signal<IPDFViewerApplication | undefined>(
      { eventBus } as unknown as IPDFViewerApplication,
    );
    TestBed.configureTestingModule({
      declarations: [ThumbnailHostComponent, TrackThumbnailDirective, PdfSidebarContentComponent],
      providers: [{ provide: PDFNotificationService, useValue: { onPDFJSInitSignal: appSignal } }],
    });
    const fixture = TestBed.createComponent(ThumbnailHostComponent);
    fixture.detectChanges();
    TestBed.flushEffects();
    const container = document.createElement('div');
    const render = (id: number) => eventBus.dispatch('rendercustomthumbnail', {
      id, container, linkService: { page: 1 },
      thumbPageTitlePromiseOrPageL10nArgs: JSON.stringify({ page: id }),
    });
    return { fixture, eventBus, container, render };
  }

  beforeEach(() => TrackThumbnailDirective.destroyed.mockClear());

  it('destroys manually appended thumbnail views with the sidebar', () => {
    const { fixture, container, render } = setup();
    render(1);
    render(2);
    expect(container.querySelectorAll('img')).toHaveLength(2);
    expect(TrackThumbnailDirective.destroyed).not.toHaveBeenCalled();
    fixture.destroy();
    expect(TrackThumbnailDirective.destroyed).toHaveBeenCalledTimes(2);
    expect(container.querySelectorAll('img')).toHaveLength(0);
  });

  it('destroys a replaced page view without accumulating duplicate thumbnails', () => {
    const { fixture, container, render } = setup();
    render(1);
    render(1);
    expect(TrackThumbnailDirective.destroyed).toHaveBeenCalledTimes(1);
    expect(container.querySelectorAll('img')).toHaveLength(1);
    fixture.destroy();
    expect(TrackThumbnailDirective.destroyed).toHaveBeenCalledTimes(2);
  });

  it('releases the old document and independently owns the next document views', () => {
    const { fixture, eventBus, render } = setup();
    render(1);
    render(2);
    eventBus.dispatch('pagesdestroy');
    expect(TrackThumbnailDirective.destroyed).toHaveBeenCalledTimes(2);
    eventBus.dispatch('pagesdestroy');
    expect(TrackThumbnailDirective.destroyed).toHaveBeenCalledTimes(2);
    render(1);
    fixture.destroy();
    expect(TrackThumbnailDirective.destroyed).toHaveBeenCalledTimes(3);
    expect(eventBus.getListenerCount('pagesdestroy')).toBe(0);
  });
});
